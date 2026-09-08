import { cn } from '@/lib/cn'

interface MarqueeProps {
  children: React.ReactNode
  /** Speed in seconds for one full loop. */
  duration?: number
  className?: string
}

/**
 * Horizontally scrolls its children from right to left, looping seamlessly.
 * Children are duplicated internally so the track is always wide enough to loop.
 */
export function Marquee({ children, duration = 30, className }: MarqueeProps) {
  return (
    <div className={cn('relative flex overflow-hidden', className)}>
      <div
        className="marquee-track flex shrink-0 items-center will-change-transform"
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center gap-5 pr-5">{children}</div>
        <div className="flex shrink-0 items-center gap-5 pr-5" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
