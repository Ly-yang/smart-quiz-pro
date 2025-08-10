import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils'
import Button from './Button'

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  className,
  size = 'default',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    default: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* 模态框内容 */}
      <div 
        className={cn(
          'relative w-full mx-4 glass-card rounded-lg shadow-xl animate-scale-in',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* 头部 */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h3 className="text-lg font-medium text-white">{title}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        {/* 内容 */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
