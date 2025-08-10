import React from 'react'
import { Clock, Timer, Command } from 'lucide-react'
import { useQuiz } from '@/contexts/QuizContext'
import { formatTime } from '@/utils'
import { TABS } from '@/utils/constants'
import Button from '@/components/ui/Button'

const FloatingActionBar = () => {
  const { state, dispatch } = useQuiz()

  // 只在练习页面且题目存在时显示
  if (state.activeTab !== TABS.PRACTICE || state.quizComplete || !state.currentQuestion >= 0) {
    return null
  }

  const handleShowCommandPalette = () => {
    dispatch({ type: 'SET_SHOW_COMMAND_PALETTE', payload: true })
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="px-4 py-2 rounded-full glass-card border border-white/20 flex items-center gap-4">
        {/* 用时 */}
        <span className="text-sm text-white/90 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {formatTime(state.timeSpent)}
        </span>
        
        {/* 进度 */}
        <span className="text-sm text-white/90">
          第 {state.currentQuestion + 1}/总题数
        </span>
        
        {/* 考试模式倒计时 */}
        {state.examMode && (
          <span className="text-sm text-purple-200 flex items-center gap-2">
            <Timer className="h-4 w-4" />
            {formatTime(state.countdown)}
          </span>
        )}
        
        {/* 分隔线 */}
        <div className="h-4 w-[1px] bg-white/20" />
        
        {/* 命令面板 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShowCommandPalette}
          className="text-blue-200 hover:text-white text-sm"
        >
          <Command className="h-4 w-4 mr-1" />
          命令面板
        </Button>
      </div>
    </div>
  )
}

export default FloatingActionBar
