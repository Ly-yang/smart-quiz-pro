import React from 'react'
import { cn } from '@/utils'

export const Input = ({ className, type = 'text', ...props }) => {
  return (
    <input
      type={type}
      className={cn('input', className)}
      {...props}
    />
  )
}

export const Select = ({ className, children, ...props }) => {
  return (
    <select
      className={cn(
        'input cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        'input min-h-[80px] resize-none',
        className
      )}
      {...props}
    />
  )
}

export default Input
