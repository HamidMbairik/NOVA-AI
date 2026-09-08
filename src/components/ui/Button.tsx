import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { buttonClasses, type ButtonVariant, type ButtonSize } from '@/lib/buttonStyles'
import { cn } from '@/lib/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconRight?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', icon, iconRight, children, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(buttonClasses(variant, size), className)}
      {...props}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  ),
)

Button.displayName = 'Button'

export type { ButtonVariant, ButtonSize }