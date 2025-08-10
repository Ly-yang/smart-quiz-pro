import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { defaultQuestionBank } from '@/data/questions'
import { quizReducer, initialState } from '@/reducers/quizReducer'
import { STORAGE_KEY } from '@/utils/constants'

const QuizContext = createContext()

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  // 初始化数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const data = JSON.parse(saved)
          dispatch({ type: 'LOAD_DATA', payload: data })
        } else {
          // 初始化默认题库
          dispatch({ type: 'SET_QUESTION_BANK', payload: defaultQuestionBank })
        }
      } catch (error) {
        console.error('Failed to load data:', error)
        dispatch({ type: 'SET_QUESTION_BANK', payload: defaultQuestionBank })
      }
    }
    loadData()
  }, [])

  // 数据持久化
  useEffect(() => {
    const dataToSave = {
      darkMode: state.darkMode,
      starredQuestions: state.starredQuestions,
      questionNotes: state.questionNotes,
      customQuestions: state.customQuestions,
      testHistory: state.testHistory,
      examConfig: state.examConfig,
      selectedSubject: state.selectedSubject,
      questionBank: state.questionBank,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  }, [
    state.darkMode,
    state.starredQuestions,
    state.questionNotes,
    state.customQuestions,
    state.testHistory,
    state.examConfig,
    state.selectedSubject,
    state.questionBank,
  ])

  const value = {
    state,
    dispatch,
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
