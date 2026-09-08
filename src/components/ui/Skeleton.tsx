import { cn } from '@/lib/cn'

/** Shimmering placeholder used while content loads. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse rounded-lg bg-elevated',
        className,
      )}
    />
  )
}