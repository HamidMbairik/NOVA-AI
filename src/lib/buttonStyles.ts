import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-accent text-background font-semibold shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_28px_rgba(124,58,237,0.5)] hover:brightness-110 active:brightness-95',
  secondary:
    'bg-elevated text-text border border-white/10 hover:border-white/20 hover:bg-elevated/80',
  ghost: 'text-muted hover:text-text hover:bg-white/5',
  outline:
    'border border-primary/40 text-text hover:border-primary hover:bg-primary/10',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2.5',
}

/** Shared button styles for rendering button-like elements as links. */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-soft select-none whitespace-nowrap',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )
}

export { variantClasses, sizeClasses }