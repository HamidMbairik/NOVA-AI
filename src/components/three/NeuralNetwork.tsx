import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useIsMobile } from '@/hooks/useMediaQuery'

/**
 * The NOVA AI engine: a living neural network.
 *
 * A cloud of pulsing nodes connected by flow lines, orbiting data packets,
 * and a gentle lean that follows the pointer — reads as an engine processing
 * support traffic, not a decorative orb.
 */

// --- Node cloud -------------------------------------------------------------

const NODE_COUNT = 220
const MAX_CONNECTIONS = 170
const CONNECT_DISTANCE = 1.35

const nodeVertexShader = /* glsl */ `
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    float pulse = 0.5 + 0.5 * sin(uTime * 1.6 + aPhase);
    float size = mix(1.3, 2.6, pulse);

    gl_PointSize = size * (240.0 / -mvPosition.z);
    vAlpha = mix(0.4, 1.0, pulse);

    gl_Position = projectionMatrix * mvPosition;
  }
`

const nodeFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.05, d) * vAlpha;
    vec3 glow = vColor + vec3(0.25, 0.35, 0.6) * (1.0 - smoothstep(0.12, 0.5, d));
    gl_FragColor = vec4(glow, alpha);
  }
`

function buildCloud() {
  const positions = new Float32Array(NODE_COUNT * 3)
  const colors = new Float32Array(NODE_COUNT * 3)
  const phases = new Float32Array(NODE_COUNT)
  const purple = new THREE.Color('#7c3aed')
  const cyan = new THREE.Color('#22d3ee')
  const tmp = new THREE.Color()

  for (let i = 0; i < NODE_COUNT; i++) {
    // Even spread across a sphere (Fibonacci sphere)
    const y = 1 - (i / (NODE_COUNT - 1)) * 2
    const radiusXY = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = 2.399963 * i

    const r = THREE.MathUtils.lerp(1.5, 2.5, Math.pow(Math.random(), 0.8))
    let x = Math.cos(theta) * radiusXY
    let z = Math.sin(theta) * radiusXY

    // Strain the shell into two subtle lobes for a non-orb silhouette
    x *= 1 + 0.45 * Math.sin(z * 1.6) * Math.sin(y * 2.4)
    z *= 0.85

    positions[i * 3] = x * r
    positions[i * 3 + 1] = y * r * 0.9
    positions[i * 3 + 2] = z * r

    const t = Math.max(0, x / r)
    tmp.copy(purple).lerp(cyan, t)
    colors[i * 3] = tmp.r
    colors[i * 3 + 1] = tmp.g
    colors[i * 3 + 2] = tmp.b

    phases[i] = Math.random() * Math.PI * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

  // Connection segments between nearby nodes
  const pairVerts: number[] = []
  outer: for (let i = 0; i < NODE_COUNT && pairVerts.length / 6 < MAX_CONNECTIONS; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const dx = positions[i * 3] - positions[j * 3]
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < CONNECT_DISTANCE * CONNECT_DISTANCE) {
        pairVerts.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
        pairVerts.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2])
        if (pairVerts.length / 6 >= MAX_CONNECTIONS) break outer
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(pairVerts), 3),
  )

  return { geometry, lineGeo }
}

function NeuralCloud() {
  const { geometry, lineGeo } = useMemo(() => buildCloud(), [])
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const outer = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)
  const totalRotation = useRef(0)
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    totalRotation.current += delta * 0.06
    if (outer.current) outer.current.rotation.y = totalRotation.current

    if (inner.current) {
      inner.current.rotation.x = THREE.MathUtils.lerp(
        inner.current.rotation.x,
        state.pointer.y * 0.2,
        0.05,
      )
      inner.current.rotation.z = THREE.MathUtils.lerp(
        inner.current.rotation.z,
        -state.pointer.x * 0.14,
        0.05,
      )
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time.current
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={outer}>
        <group ref={inner}>
          <points geometry={geometry} frustumCulled={false}>
            <shaderMaterial
              ref={materialRef}
              vertexShader={nodeVertexShader}
              fragmentShader={nodeFragmentShader}
              uniforms={{ uTime: { value: 0 } }}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
          <lineSegments geometry={lineGeo} frustumCulled={false}>
            <lineBasicMaterial
              color="#7c3aed"
              transparent
              opacity={0.22}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
          <DataPackets count={6} />
        </group>
      </group>
    </Float>
  )
}

// --- Orbiting data packets ---------------------------------------------------

const PACKET_COLORS = ['#7c3aed', '#22d3ee', '#a78bfa', '#4f46e5']

function DataPackets({ count }: { count: number }) {
  const meshes = useRef<THREE.Mesh[]>([])
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    const t = time.current
    meshes.current.forEach((mesh, i) => {
      const speed = 0.18 + (i % 3) * 0.05
      const radius = 2.6 + (i % 2) * 0.5
      const phase = (i / count) * Math.PI * 2
      const tiltX = (i % 4) * 0.35
      const tiltZ = ((i + 1) % 4) * 0.3

      const a = t * speed + phase
      const base = new THREE.Vector3(
        Math.cos(a) * radius,
        Math.sin(a * 0.7) * 0.6,
        Math.sin(a) * radius,
      )
      mesh.position
        .copy(base)
        .applyAxisAngle(new THREE.Vector3(1, 0, 0), tiltX)
        .applyAxisAngle(new THREE.Vector3(0, 0, 1), tiltZ)
      // warm pulse
      const s = 1 + Math.sin(a * 6) * 0.25
      mesh.scale.setScalar(s)
    })
  })

  return (
    <group>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshes.current[i] = el
          }}
        >
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial
            color={PACKET_COLORS[i % PACKET_COLORS.length]}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

// --- Canvas wrapper ----------------------------------------------------------

export function NeuralNetworkCanvas() {
  const isMobile = useIsMobile()

  const maxDpr = isMobile ? 1.25 : 1.75

  return (
    <Canvas
      dpr={[1, maxDpr]}
      camera={{ position: [0, 0, 5.2], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      frameloop="always"
      style={{ background: 'transparent' }}
      aria-hidden="true"
      fallback={null}
    >
      <fog attach="fog" args={['#08090d', 6.5, 9]} />
      <NeuralCloud />
    </Canvas>
  )
}