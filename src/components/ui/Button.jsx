import React from 'react'
import { cn } from '@/utils'

const buttonVariants = {
  default: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  link: 'underline-offset-4 hover:underline text-primary',
}

const buttonSizes = {
  sm: 'h-8 px-3 text-xs',
  default: 'h-10 px-4',
  lg: 'h-12 px-6 text-lg',
  icon: 'h-10 w-10 p-0',
}

export const Button = ({
  className,
  variant = 'default',
  size = 'default',
  children,
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'btn',
        buttonVariants[variant],
        buttonSizes[size],
        loading && 'opacity-70 cursor-not-allowed',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
