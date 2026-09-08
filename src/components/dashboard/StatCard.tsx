import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

interface StatCardProps {
  label: string
  value: string
  sub?: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  trendLabel?: string
  tone?: 'default' | 'primary' | 'cyan'
}

const trendColors = {
  up: 'text-emerald-400',
  down: 'text-red-400',
  neutral: 'text-muted',
}

const toneClasses = {
  default: 'bg-primary/10 text-accent-soft',
  primary: 'bg-primary/15 text-accent-soft',
  cyan: 'bg-accent/10 text-accent',
}

/** Dashboard KPI card. */
export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  trend = 'neutral',
  trendLabel,
  tone = 'default',
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-surface p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
            {value}
          </p>
        </div>
        <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', toneClasses[tone])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      {(sub || trendLabel) && (
        <div className="mt-3 flex items-center gap-2">
          {trendLabel && (
            <span className={cn('text-xs font-medium', trendColors[trend])}>{trendLabel}</span>
          )}
          {sub && <span className="text-xs text-muted">{sub}</span>}
        </div>
      )}
    </div>
  )
}