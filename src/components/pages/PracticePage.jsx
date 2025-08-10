import React from 'react'
import { useQuiz } from '@/contexts/QuizContext'
import QuestionCard from '../quiz/QuestionCard'
import QuizResults from '../quiz/QuizResults'
import useQuestions from '@/hooks/useQuestions'

const PracticePage = () => {
  const { state, dispatch } = useQuiz() // 添加 dispatch 解构
  const { currentQuestions } = useQuestions()
  
  if (state.quizComplete) {
    return <QuizResults />
  }
  
  if (currentQuestions.length === 0) {
    return (
      <div className="glass-card rounded-xl p-8 text-center">
        <div className="text-gray-400 mb-4">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-500/20 flex items-center justify-center">
            📚
          </div>
          <h3 className="text-lg font-medium mb-2 text-white">没有找到题目</h3>
          <p className="text-gray-400">
            {state.searchQuery || state.filterDifficulty !== 'all' || state.tagFilter.length > 0
              ? '当前筛选条件下没有找到匹配的题目'
              : '当前主题下没有题目'
            }
          </p>
        </div>
        
        {(state.searchQuery || state.filterDifficulty !== 'all' || state.tagFilter.length > 0) && (
          <button
            onClick={() => {
              dispatch({ type: 'SET_SEARCH_QUERY', payload: '' })
              dispatch({ type: 'SET_FILTER_DIFFICULTY', payload: 'all' })
              dispatch({ type: 'SET_TAG_FILTER', payload: [] })
            }}
            className="text-blue-400 hover:underline"
          >
            清除筛选条件
          </button>
        )}
      </div>
    )
  }
  
  return <QuestionCard />
}

export default PracticePage
