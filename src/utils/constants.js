export const STORAGE_KEY = 'smartQuizPro:v1'

export const SUBJECTS = {
  ai: { name: "生成式AI基础", color: "bg-blue-500" },
  prompt: { name: "提示词工程", color: "bg-green-500" },
  custom: { name: "自定义题库", color: "bg-purple-500" },
  starred: { name: "收藏题目", color: "bg-yellow-500" },
  wrong: { name: "错题本", color: "bg-red-500" }
}

export const DIFFICULTY_OPTIONS = [
  { value: 'all', label: '全部难度' },
  { value: '基础', label: '基础' },
  { value: '中等', label: '中等' },
  { value: '高级', label: '高级' }
]

export const SORT_OPTIONS = [
  { value: 'default', label: '自适应优先' },
  { value: 'difficulty', label: '按难度' },
  { value: 'recent', label: '最近做过' },
  { value: 'accuracy', label: '准确率' }
]

export const SUPPORTED_FORMATS = [
  { 
    ext: '.txt', 
    description: '纯文本格式(每题一行，使用 | 分隔：题干|A|B|C|D|正确索引0-3|解析|难度|tag1;tag2)' 
  },
  { 
    ext: '.json', 
    description: 'JSON数组：[{question,options[],correct,explanation,difficulty,tags[]}]' 
  },
  { 
    ext: '.csv', 
    description: 'CSV：question,A,B,C,D,correct,explanation,difficulty,tags' 
  },
  { 
    ext: '.md', 
    description: 'Markdown（简单解析，题干行 + 选项行）' 
  },
  { 
    ext: '.xlsx', 
    description: 'Excel（需先转CSV/JSON再导入）' 
  }
]

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

export const TABS = {
  PRACTICE: 'practice',
  BANK: 'bank',
  ANALYSIS: 'analysis'
}

export const DEVICE_VIEWS = {
  AUTO: 'auto',
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop'
}

export const REPORT_TABS = {
  PROGRESS: 'progress',
  WEAKNESS: 'weakness',
  HISTORY: 'history'
}

export const SHORTCUTS = {
  ANSWER_1: '1',
  ANSWER_2: '2', 
  ANSWER_3: '3',
  ANSWER_4: '4',
  SUBMIT: 'Enter',
  NEXT: 'ArrowRight',
  PREV: 'ArrowLeft',
  STAR: 's',
  FIFTY_FIFTY: 'f',
  HINT: 'h',
  RESTART: 'r',
  COMMAND_PALETTE: 'k'
}
