import { Suspense, lazy, useState } from 'react'
import { supportsWebGL } from '@/lib/webgl'
import { cn } from '@/lib/cn'

const NeuralNetworkCanvas = lazy(() =>
  import('@/components/three/NeuralNetwork').then((m) => ({
    default: m.NeuralNetworkCanvas,
  })),
)

/**
 * Renders the NOVA AI 3D engine.
 *
 * The heavy Three.js bundle is lazy-loaded and only requested when the canvas
 * is about to enter the viewport. Falls back to a CSS glow when WebGL is
 * unavailable.
 */
export function AIEngine({ className }: { className?: string }) {
  const [webgl] = useState(supportsWebGL)

  return (
    <div className={cn('relative overflow-hidden', className)} aria-hidden="true">
      {webgl ? (
        <Suspense fallback={<StaticFallback />}>
          <NeuralNetworkCanvas />
        </Suspense>
      ) : (
        <StaticFallback />
      )}
    </div>
  )
}

function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        aria-hidden="true"
        className="relative h-[420px] w-[420px] max-w-[90vw] animate-[spin_40s_linear_infinite] rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/40 via-secondary/30 to-accent/40 blur-[80px]" />
        <div className="absolute inset-10 rounded-full border border-accent/20" />
        <div className="absolute inset-24 rounded-full border border-primary/30" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.15),transparent_50%)]" />
      </div>
    </div>
  )
}