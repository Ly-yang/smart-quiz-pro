import Papa from 'papaparse'
import { generateId } from './index'

// 构建标准题目对象
const buildQuestion = (base, filename) => ({
  id: generateId(),
  question: base.question?.trim() || '未命名题目',
  options: base.options || [base.A, base.B, base.C, base.D].filter(Boolean),
  correct: typeof base.correct === 'number' ? base.correct : parseInt(base.correct || '0', 10),
  explanation: base.explanation || '',
  difficulty: base.difficulty || '中等',
  tags: Array.isArray(base.tags) 
    ? base.tags 
    : (typeof base.tags === 'string' 
      ? base.tags.split(';').map(s => s.trim()).filter(Boolean) 
      : []),
  source: filename,
  lastTested: null,
  accuracy: 0,
  testCount: 0
})

// JSON格式解析
const parseJSON = (text, filename) => {
  try {
    const data = JSON.parse(text)
    if (Array.isArray(data)) {
      return data.map(item => buildQuestion(item, filename))
    }
    throw new Error('JSON文件必须包含题目数组')
  } catch (error) {
    throw new Error(`JSON解析失败: ${error.message}`)
  }
}

// CSV格式解析
const parseCSV = (text, filename) => {
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        try {
          if (results.errors.length > 0) {
            throw new Error(`CSV解析错误: ${results.errors[0].message}`)
          }
          
          const questions = results.data.map(row => buildQuestion({
            question: row.question || row.Question || row.题目,
            A: row.A || row.a || row.选项A,
            B: row.B || row.b || row.选项B,
            C: row.C || row.c || row.选项C,
            D: row.D || row.d || row.选项D,
            correct: row.correct || row.Correct || row.正确答案,
            explanation: row.explanation || row.Explanation || row.解析,
            difficulty: row.difficulty || row.Difficulty || row.难度,
            tags: row.tags || row.Tags || row.标签
          }, filename))
          
          resolve(questions)
        } catch (error) {
          reject(error)
        }
      },
      error: (error) => {
        reject(new Error(`CSV解析失败: ${error.message}`))
      }
    })
  })
}

// TXT格式解析 (每题一行，使用|分隔)
const parseTXT = (text, filename) => {
  const lines = text.split(/\r?\n/).filter(line => line.trim())
  
  return lines.map(line => {
    const parts = line.split('|').map(part => part.trim())
    if (parts.length < 6) {
      throw new Error(`TXT格式错误，每行至少需要6个部分（用|分隔）`)
    }
    
    const [question, A, B, C, D, correct, explanation = '', difficulty = '中等', tags = ''] = parts
    
    return buildQuestion({
      question,
      A, B, C, D,
      correct: parseInt(correct, 10),
      explanation,
      difficulty,
      tags
    }, filename)
  })
}

// Markdown格式解析
const parseMarkdown = (text, filename) => {
  // 以双换行符分割题目块
  const blocks = text.split(/\n\s*\n/).filter(block => block.trim())
  
  return blocks.map(block => {
    const lines = block.split(/\r?\n/).map(line => line.trim()).filter(Boolean)
    
    if (lines.length < 2) {
      throw new Error('Markdown格式错误，每个题目块至少需要题干和选项')
    }
    
    const question = lines[0]
    const options = lines.filter(line => /^[A-D][\.\)]\s*/.test(line))
      .map(line => line.replace(/^[A-D][\.\)]\s*/, ''))
    
    // 查找特殊标记行
    const correctLine = lines.find(line => /^正确[:：]/.test(line))
    const explanationLine = lines.find(line => /^解析[:：]/.test(line))
    const difficultyLine = lines.find(line => /^难度[:：]/.test(line))
    const tagsLine = lines.find(line => /^标签[:：]/.test(line))
    
    const correct = correctLine 
      ? parseInt((correctLine.split(/[:：]/)[1] || '0').trim(), 10)
      : 0
      
    const explanation = explanationLine 
      ? explanationLine.split(/[:：]/)[1]?.trim() || ''
      : ''
      
    const difficulty = difficultyLine 
      ? difficultyLine.split(/[:：]/)[1]?.trim() || '中等'
      : '中等'
      
    const tags = tagsLine 
      ? tagsLine.split(/[:：]/)[1]?.trim() || ''
      : ''
    
    return buildQuestion({
      question,
      options,
      correct: isNaN(correct) ? 0 : correct,
      explanation,
      difficulty,
      tags
    }, filename)
  })
}

// 主解析函数
export const parseQuestionFile = async (file) => {
  const text = await file.text()
  const extension = file.name.split('.').pop()?.toLowerCase()
  
  try {
    switch (extension) {
      case 'json':
        return parseJSON(text, file.name)
        
      case 'csv':
        return await parseCSV(text, file.name)
        
      case 'txt':
        return parseTXT(text, file.name)
        
      case 'md':
      case 'markdown':
        return parseMarkdown(text, file.name)
        
      default:
        throw new Error(`不支持的文件格式: .${extension}`)
    }
  } catch (error) {
    console.error('文件解析失败:', error)
    
    // 返回示例题目作为fallback
    return [{
      id: generateId(),
      question: `从文件 ${file.name} 导入的示例题（解析失败）`,
      options: ["A. 选项1", "B. 选项2", "C. 选项3", "D. 选项4"],
      correct: 1,
      explanation: `文件解析失败: ${error.message}。这是一个示例题目。`,
      difficulty: "中等",
      tags: ["导入", "示例"],
      source: file.name,
      lastTested: null,
      accuracy: 0,
      testCount: 0
    }]
  }
}

// 导出题目为不同格式
export const exportQuestions = (questions, format = 'json') => {
  if (!questions || questions.length === 0) {
    throw new Error('没有可导出的题目')
  }
  
  let content, mimeType, extension
  
  switch (format.toLowerCase()) {
    case 'json':
      content = JSON.stringify(questions, null, 2)
      mimeType = 'application/json'
      extension = 'json'
      break
      
    case 'csv':
      const csvData = questions.map(q => ({
        question: q.question,
        A: q.options[0] || '',
        B: q.options[1] || '',
        C: q.options[2] || '',
        D: q.options[3] || '',
        correct: q.correct,
        explanation: (q.explanation || '').replace(/\n/g, ' '),
        difficulty: q.difficulty || '',
        tags: (q.tags || []).join(';')
      }))
      
      content = Papa.unparse(csvData)
      mimeType = 'text/csv'
      extension = 'csv'
      break
      
    case 'txt':
      content = questions.map(q => [
        q.question,
        ...(q.options || []).slice(0, 4),
        q.correct,
        q.explanation || '',
        q.difficulty || '',
        (q.tags || []).join(';')
      ].join('|')).join('\n')
      mimeType = 'text/plain'
      extension = 'txt'
      break
      
    default:
      throw new Error(`不支持的导出格式: ${format}`)
  }
  
  return {
    content,
    mimeType,
    extension,
    filename: `questions_${Date.now()}.${extension}`
  }
}

// 下载文件
export const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// 验证题目数据
export const validateQuestion = (question) => {
  const errors = []
  
  if (!question.question || question.question.trim() === '') {
    errors.push('题目不能为空')
  }
  
  if (!question.options || question.options.length < 2) {
    errors.push('至少需要2个选项')
  }
  
  if (typeof question.correct !== 'number' || question.correct < 0 || question.correct >= (question.options?.length || 0)) {
    errors.push('正确答案索引无效')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
