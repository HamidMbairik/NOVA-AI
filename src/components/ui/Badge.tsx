import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'default' | 'primary' | 'cyan' | 'success' | 'warning' | 'error' | 'muted'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
  dot?: boolean
}

const toneClasses: Record<Tone, string> = {
  default: 'bg-elevated text-muted border-white/10',
  primary: 'bg-primary/15 text-accent-soft border-primary/30',
  cyan: 'bg-accent/10 text-accent border-accent/25',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  error: 'bg-red-500/10 text-red-400 border-red-500/25',
  muted: 'bg-white/5 text-muted border-white/10',
}

const dotTones: Record<Tone, string> = {
  default: 'bg-muted',
  primary: 'bg-accent-soft',
  cyan: 'bg-accent',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error: 'bg-red-400',
  muted: 'bg-muted',
}

export function Badge({
  className,
  tone = 'default',
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn('h-1.5 w-1.5 rounded-full', dotTones[tone])}
        />
      )}
      {children}
    </span>
  )
}
