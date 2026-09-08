import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
  compact?: boolean
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-background"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight text-text">
          NOVA
          <span className="text-gradient"> AI</span>
        </span>
      )}
    </span>
  )
}
