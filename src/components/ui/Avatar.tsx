import { cn } from '@/lib/cn'

interface AvatarProps {
  initials: string
  className?: string
  /** Optional photo URL — renders an <img> instead of initials. */
  src?: string
  alt?: string
  /** Optional solid-ish gradient background mix (used only for initials). */
  colorClassName?: string
}

const defaults = 'bg-gradient-to-br from-primary to-secondary'

/** Circular avatar — real photo if `src` is provided, otherwise initials. */
export function Avatar({
  initials,
  className,
  src,
  alt,
  colorClassName,
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className={cn('inline-block h-9 w-9 shrink-0 rounded-full object-cover', className)}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-text',
        colorClassName ?? defaults,
        className,
      )}
    >
      {initials}
    </span>
  )
}