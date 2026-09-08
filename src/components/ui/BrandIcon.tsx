import { getBrand } from '@/lib/brands'
import { cn } from '@/lib/cn'

interface BrandIconProps {
  name: string
  /** Renders the logo white on the brand color; default is the brand color on transparent. */
  solid?: boolean
  className?: string
}

/** Real brand logo rendered as an SVG. */
export function BrandIcon({ name, solid, className }: BrandIconProps) {
  const brand = getBrand(name)
  if (!brand) return null
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn('h-6 w-6 shrink-0', className)}
      role="img"
    >
      <title>{brand.name}</title>
      <path fill={solid ? '#fff' : `#${brand.hex}`} d={brand.path} />
    </svg>
  )
}
