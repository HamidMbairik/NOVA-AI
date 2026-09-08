import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in seconds. */
  delay?: number
  /** Direction the element moves in from. */
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
}

const offsets: Record<NonNullable<RevealProps['from']>, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
}

/** Fades + slides content in when it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  from = 'up',
}: RevealProps) {
  const { ref, inView } = useInView()
  const offset = offsets[from]

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}