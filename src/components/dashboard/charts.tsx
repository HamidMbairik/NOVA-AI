import { useId } from 'react'

interface LineChartProps {
  /** Two series of equal length. */
  series: {
    name: string
    values: number[]
    color: string
  }[]
  labels: string[]
  height?: number
}

/** Accessible, dependency-free SVG line/area chart. */
export function LineChart({ series, labels, height = 220 }: LineChartProps) {
  const gradId = useId()
  const w = 600
  const h = height
  const pad = { top: 12, right: 12, bottom: 28, left: 12 }
  const iw = w - pad.left - pad.right
  const ih = h - pad.top - pad.bottom

  const all = series.flatMap((s) => s.values)
  const max = Math.max(...all) * 1.15
  const stepX = iw / (labels.length - 1)

  const toPoints = (values: number[]) =>
    values.map((v, i) => `${pad.left + stepX * i},${pad.top + ih - (v / max) * ih}`).join(' ')

  const gridLines = [0.25, 0.5, 0.75, 1]

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      role="img"
      aria-label={`Line chart: ${series.map((s) => s.name).join(', ')}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>

      {gridLines.map((g) => (
        <line
          key={g}
          x1={pad.left}
          x2={w - pad.right}
          y1={pad.top + ih - g * ih}
          y2={pad.top + ih - g * ih}
          stroke="rgba(255,255,255,0.05)"
        />
      ))}

      {series.map((s) => (
        <g key={s.name}>
          {s.values.length > 0 && (
            <polygon
              points={`${pad.left},${pad.top + ih} ${toPoints(s.values)} ${w - pad.right},${pad.top + ih}`}
              fill={`url(#${gradId})`}
            />
          )}
          <polyline
            points={toPoints(s.values)}
            fill="none"
            stroke={s.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      {labels.map((label, i) => (
        <text
          key={label}
          x={pad.left + stepX * i}
          y={h - 8}
          textAnchor="middle"
          fontSize="10"
          fill="#9ca3af"
        >
          {label}
        </text>
      ))}
    </svg>
  )
}

/** Simple horizontal stacked/ranged bar for proportions. */
export function BarRow({
  label,
  value,
  pct,
  color = 'from-primary to-accent',
}: {
  label: string
  value: string
  pct: number
  color?: string
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="text-text">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}