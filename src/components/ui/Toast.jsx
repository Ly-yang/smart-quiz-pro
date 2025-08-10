import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/utils'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const toastStyles = {
  success: 'bg-green-600/90 text-white border-green-500',
  error: 'bg-red-600/90 text-white border-red-500',
  warning: 'bg-yellow-600/90 text-white border-yellow-500',
  info: 'bg-blue-600/90 text-white border-blue-500',
}

const Toast = ({ id, type = 'info', message, onClose }) => {
  const Icon = toastIcons[type]
  
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm',
        'animate-slide-up transition-all duration-300',
        toastStyles[type]
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random()
    const newToast = { id, message, type }
    
    setToasts(prev => [...prev, newToast])
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const toast = {
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
  }

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast, removeAllToasts }}>
      {children}
      
      {/* Toast容器 */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
        {toasts.map(toastItem => (
          <Toast
            key={toastItem.id}
            id={toastItem.id}
            type={toastItem.type}
            message={toastItem.message}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
