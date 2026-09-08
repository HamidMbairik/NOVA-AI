import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from '@/components/marketing/Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
  className?: string
}

/** Consistent marketing section header (eyebrow pill + title + description). */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              'inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-soft',
            )}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}