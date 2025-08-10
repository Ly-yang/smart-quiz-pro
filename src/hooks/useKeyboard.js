import { useEffect } from 'react'
import { useQuiz } from '@/contexts/QuizContext'
import { useToast } from '@/components/ui/Toast'
import { SHORTCUTS } from '@/utils/constants'
import { sampleN } from '@/utils'
import useQuestions from './useQuestions'

const useKeyboard = () => {
  const { state, dispatch } = useQuiz()
  const { toast } = useToast()
  const { currentQuestion } = useQuestions()

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 忽略在输入框中的按键
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      // 忽略修饰键组合（除了快捷键）
      if (e.altKey || e.shiftKey || (e.ctrlKey && e.key !== 'k') || (e.metaKey && e.key !== 'k')) {
        return
      }

      // 命令面板打开时不处理其他快捷键
      if (state.showCommandPalette && e.key !== 'Escape') {
        return
      }

      // 题目不存在或已完成时不处理答题快捷键
      if (!currentQuestion || state.quizComplete) {
        if (e.key === 'r' || e.key === 'R') {
          handleRestartQuiz()
        }
        return
      }

      switch (e.key) {
        case SHORTCUTS.ANSWER_1:
        case SHORTCUTS.ANSWER_2:
        case SHORTCUTS.ANSWER_3:
        case SHORTCUTS.ANSWER_4:
          if (!state.showResult) {
            const index = parseInt(e.key, 10) - 1
            if (currentQuestion.options[index]) {
              dispatch({ type: 'SELECT_ANSWER', payload: index })
            }
          }
          break

        case SHORTCUTS.SUBMIT:
          e.preventDefault()
          if (!state.showResult && state.selectedAnswer !== null) {
            handleSubmitAnswer()
          } else if (state.showResult) {
            handleNextQuestion()
          }
          break

        case SHORTCUTS.NEXT:
          if (state.showResult) {
            handleNextQuestion()
          }
          break

        case SHORTCUTS.PREV:
          if (!state.examMode || state.examConfig.allowBack) {
            const prevIndex = Math.max(0, state.currentQuestion - 1)
            dispatch({ type: 'SET_CURRENT_QUESTION', payload: prevIndex })
          }
          break

        case SHORTCUTS.STAR:
        case 'S':
          handleToggleStarQuestion()
          break

        case SHORTCUTS.FIFTY_FIFTY:
        case 'F':
          handleFiftyFifty()
          break

        case SHORTCUTS.HINT:
        case 'H':
          handleShowHint()
          break

        case SHORTCUTS.RESTART:
        case 'R':
          handleRestartQuiz()
          break

        case SHORTCUTS.COMMAND_PALETTE:
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            dispatch({ type: 'SET_SHOW_COMMAND_PALETTE', payload: true })
          }
          break

        case 'Escape':
          if (state.showCommandPalette) {
            dispatch({ type: 'SET_SHOW_COMMAND_PALETTE', payload: false })
          }
          break

        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    state.showResult,
    state.selectedAnswer,
    state.currentQuestion,
    state.quizComplete,
    state.examMode,
    state.examConfig.allowBack,
    state.showCommandPalette,
    currentQuestion,
    dispatch,
    toast
  ])

  // 提交答案
  const handleSubmitAnswer = () => {
    if (state.selectedAnswer === null || !currentQuestion) return

    const isCorrect = state.selectedAnswer === currentQuestion.correct
    
    dispatch({
      type: 'SHOW_RESULT',
      payload: {
        question: currentQuestion,
        selected: state.selectedAnswer,
        isCorrect
      }
    })

    // 更新题目统计
    dispatch({
      type: 'UPDATE_QUESTION_STATS',
      payload: {
        questionId: currentQuestion.id,
        isCorrect
      }
    })
  }

  // 下一题
  const handleNextQuestion = () => {
    const nextIndex = state.currentQuestion + 1
    const totalQuestions = state.examMode && state.examQuestionIds.length > 0 
      ? state.examQuestionIds.length 
      : state.currentQuestions?.length || 0

    if (nextIndex < totalQuestions) {
      dispatch({ type: 'NEXT_QUESTION' })
    } else {
      dispatch({ type: 'FINISH_QUIZ', payload: { total: totalQuestions } })
    }
  }

  // 收藏题目
  const handleToggleStarQuestion = () => {
    if (!currentQuestion) return
    
    dispatch({ type: 'TOGGLE_STAR_QUESTION', payload: currentQuestion.id })
    
    const isStarred = state.starredQuestions.includes(currentQuestion.id)
    toast.success(isStarred ? '已取消收藏' : '已添加收藏')
  }

  // 50/50 功能
  const handleFiftyFifty = () => {
    if (!currentQuestion || state.showResult) return

    const correctIndex = currentQuestion.correct
    const wrongOptions = currentQuestion.options
      .map((_, index) => index)
      .filter(index => index !== correctIndex)
    
    const optionsToEliminate = sampleN(wrongOptions, 2)
    
    dispatch({
      type: 'ELIMINATE_OPTIONS',
      payload: {
        questionId: currentQuestion.id,
        options: optionsToEliminate
      }
    })

    toast.info('已排除两个错误选项')
  }

  // 显示提示
  const handleShowHint = () => {
    if (!currentQuestion) return

    dispatch({
      type: 'USE_HINT',
      payload: { questionId: currentQuestion.id }
    })

    // 生成提示内容
    const hint = generateHint(currentQuestion)
    toast.info(hint)
  }

  // 重新开始
  const handleRestartQuiz = () => {
    dispatch({ type: 'RESTART_QUIZ' })
    toast.info('已重新开始测验')
  }

  // 生成提示
  const generateHint = (question) => {
    if (question.explanation) {
      const sentences = question.explanation.split(/[。.!?]/)
      return sentences[0] + '...'
    }
    
    if (question.tags && question.tags.length > 0) {
      return `提示：关注 "${question.tags[0]}" 相关知识点`
    }
    
    return '提示：仔细分析题目，排除明显错误的选项'
  }

  return {
    handleSubmitAnswer,
    handleNextQuestion,
    handleToggleStarQuestion,
    handleFiftyFifty,
    handleShowHint,
    handleRestartQuiz,
  }
}

export default useKeyboard
