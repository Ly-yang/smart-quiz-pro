import { useEffect } from 'react'
import { useQuiz } from '@/contexts/QuizContext'

const useTimer = () => {
  const { state, dispatch } = useQuiz()

  useEffect(() => {
    if (!state.startTime || state.quizComplete || state.isPaused) return

    const timer = setInterval(() => {
      const now = Date.now()
      const startTime = new Date(state.startTime).getTime()
      const timeSpent = Math.floor((now - startTime) / 1000)

      let countdown = state.countdown
      if (state.examMode && countdown > 0) {
        countdown = Math.max(0, countdown - 1)
      }

      dispatch({
        type: 'UPDATE_TIME',
        payload: { timeSpent, countdown }
      })

      // 考试模式倒计时结束
      if (state.examMode && countdown === 0) {
        dispatch({ type: 'FINISH_QUIZ', payload: { total: state.currentQuestions?.length || 0 } })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [state.startTime, state.quizComplete, state.isPaused, state.examMode, state.countdown, dispatch])

  return {
    timeSpent: state.timeSpent,
    countdown: state.countdown,
    isPaused: state.isPaused,
  }
}

export default useTimer
