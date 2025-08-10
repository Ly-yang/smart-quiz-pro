import { useMemo } from 'react'
import { useQuiz } from '@/contexts/QuizContext'
import { calculateAdaptiveScore, sampleN, shuffle } from '@/utils'

const useQuestions = () => {
  const { state } = useQuiz()

  // 所有题目（扁平化）
  const allQuestionsFlat = useMemo(() => {
    return [
      ...(state.questionBank.ai || []),
      ...(state.questionBank.prompt || []),
      ...state.customQuestions
    ]
  }, [state.questionBank, state.customQuestions])

  // 根据选中主题获取题目池
  const getPoolBySubject = useMemo(() => {
    if (state.selectedSubject === 'starred') {
      return allQuestionsFlat.filter(q => state.starredQuestions.includes(q.id))
    }
    if (state.selectedSubject === 'wrong') {
      const wrongIds = state.userAnswers.filter(a => !a.isCorrect).map(a => a.question.id)
      return allQuestionsFlat.filter(q => wrongIds.includes(q.id))
    }
    if (state.selectedSubject === 'custom') {
      return state.customQuestions
    }
    return state.questionBank[state.selectedSubject] || []
  }, [
    state.selectedSubject, 
    allQuestionsFlat, 
    state.starredQuestions, 
    state.userAnswers, 
    state.customQuestions, 
    state.questionBank
  ])

  // 筛选和排序后的题目池
  const filteredAndSortedPool = useMemo(() => {
    let list = [...getPoolBySubject]

    // 搜索过滤
    const query = (state.searchQuery || '').toLowerCase()
    if (query) {
      list = list.filter(item =>
        item.question?.toLowerCase().includes(query) ||
        (item.tags || []).some(tag => tag.toLowerCase().includes(query))
      )
    }

    // 难度过滤
    if (state.filterDifficulty !== 'all') {
      list = list.filter(item => item.difficulty === state.filterDifficulty)
    }

    // 标签过滤
    if (state.tagFilter.length > 0) {
      list = list.filter(item => 
        item.tags?.some(t => state.tagFilter.includes(t))
      )
    }

    // 排序
    switch (state.sortBy) {
      case 'difficulty':
        const difficultyOrder = { '基础': 0, '中等': 1, '高级': 2 }
        list.sort((a, b) => 
          (difficultyOrder[a.difficulty] ?? 99) - (difficultyOrder[b.difficulty] ?? 99)
        )
        break
      
      case 'recent':
        list.sort((a, b) => 
          new Date(b.lastTested || 0) - new Date(a.lastTested || 0)
        )
        break
      
      case 'accuracy':
        list.sort((a, b) => (a.accuracy ?? 0) - (b.accuracy ?? 0))
        break
      
      default: // 自适应排序
        list.sort((a, b) => calculateAdaptiveScore(b) - calculateAdaptiveScore(a))
        break
    }

    return list
  }, [getPoolBySubject, state.searchQuery, state.filterDifficulty, state.tagFilter, state.sortBy])

  // 当前可见题目（考试模式下使用固定题集）
  const currentQuestions = useMemo(() => {
    let finalList = filteredAndSortedPool

    if (state.examMode && state.examQuestionIds.length > 0) {
      const questionMap = new Map(filteredAndSortedPool.map(q => [q.id, q]))
      finalList = state.examQuestionIds.map(id => questionMap.get(id)).filter(Boolean)
    }

    return finalList
  }, [filteredAndSortedPool, state.examMode, state.examQuestionIds])

  // 当前题目
  const currentQuestion = useMemo(() => {
    return currentQuestions[state.currentQuestion] || null
  }, [currentQuestions, state.currentQuestion])

  // 生成考试题集
  const generateExamQuestions = () => {
    if (filteredAndSortedPool.length === 0) return []
    
    const questionCount = Math.min(state.examConfig.questionCount, filteredAndSortedPool.length)
    
    if (state.examConfig.shuffle) {
      return sampleN(filteredAndSortedPool.map(q => q.id), questionCount)
    } else {
      return filteredAndSortedPool.slice(0, questionCount).map(q => q.id)
    }
  }

  // 获取题目统计信息
  const getQuestionStats = () => {
    return {
      total: currentQuestions.length,
      completed: state.currentQuestion,
      remaining: Math.max(0, currentQuestions.length - state.currentQuestion - 1),
      accuracy: state.userAnswers.length > 0 
        ? Math.round((state.score / state.userAnswers.length) * 100) 
        : 0
    }
  }

  // 获取标签统计
  const getTagStats = () => {
    const tagMap = new Map()
    
    state.userAnswers.forEach(answer => {
      const tags = answer.question.tags || []
      tags.forEach(tag => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, { correct: 0, total: 0 })
        }
        const stats = tagMap.get(tag)
        stats.total += 1
        if (answer.isCorrect) {
          stats.correct += 1
        }
      })
    })

    return Array.from(tagMap.entries()).map(([tag, stats]) => ({
      tag,
      ...stats,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    })).sort((a, b) => a.accuracy - b.accuracy) // 按准确率升序排序，薄弱知识点在前
  }

  return {
    allQuestionsFlat,
    filteredAndSortedPool,
    currentQuestions,
    currentQuestion,
    generateExamQuestions,
    getQuestionStats,
    getTagStats,
  }
}

export default useQuestions
