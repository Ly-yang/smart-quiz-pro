import { clsx } from 'clsx'

// 样式合并工具
export const cn = (...classes) => {
  return clsx(classes)
}

// 数组洗牌
export const shuffle = (array) => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// 随机抽取N个元素
export const sampleN = (array, n) => {
  return shuffle(array).slice(0, Math.min(n, array.length))
}

// 时间格式化
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
}

// 日期格式化
export const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN')
}

// 计算百分比
export const calculatePercentage = (part, total) => {
  if (total === 0) return 0
  return Math.round((part / total) * 100)
}

// 生成唯一ID
export const generateId = () => {
  return Date.now() + Math.floor(Math.random() * 100000)
}

// 防抖函数
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 节流函数
export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 深拷贝
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (obj instanceof Object) {
    const copy = {}
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone(obj[key])
    })
    return copy
  }
}

// 检查是否为移动设备
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// 获取设备类型
export const getDeviceType = () => {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// 本地存储工具
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },
  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch {
      return false
    }
  }
}

// 文件大小格式化
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 复制到剪贴板
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return true
  }
}

// URL参数处理
export const urlParams = {
  get: (key) => {
    const params = new URLSearchParams(window.location.search)
    return params.get(key)
  },
  set: (key, value) => {
    const url = new URL(window.location.href)
    url.searchParams.set(key, value)
    window.history.replaceState({}, '', url.toString())
  },
  remove: (key) => {
    const url = new URL(window.location.href)
    url.searchParams.delete(key)
    window.history.replaceState({}, '', url.toString())
  }
}

// 计算自适应分数（用于题目排序）
export const calculateAdaptiveScore = (question) => {
  const accuracy = question.accuracy ?? 0
  const testCount = question.testCount ?? 0
  const lastTested = question.lastTested ? new Date(question.lastTested).getTime() : 0
  
  // 准确率越低越靠前，测试次数越少越靠前，时间越久越靠前
  const accuracyScore = (1 - accuracy) * 2
  const frequencyScore = 1 / (testCount + 1)
  const timeScore = (Date.now() - lastTested) / (1000 * 60 * 60 * 24 + 1) * 0.001
  
  return accuracyScore + frequencyScore + timeScore
}
