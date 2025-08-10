import React from 'react'
import { 
  Star, 
  HelpCircle, 
  Zap, 
  Timer, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'
import { useQuiz } from '@/contexts/QuizContext'
import { useToast } from '@/components/ui/Toast'
import useQuestions from '@/hooks/useQuestions'
import useKeyboard from '@/hooks/useKeyboard'
import Button from '@/components/ui/Button'
import { formatTime, cn } from '@/utils'

const QuestionCard = () => {
  const { state, dispatch } = useQuiz()
  const { toast } = useToast()
  const { currentQuestion, currentQuestions } = useQuestions()
  const {
    handleSubmitAnswer,
    handleNextQuestion,
    handleToggleStarQuestion,
    handleFiftyFifty,
    handleShowHint
  } = useKeyboard()

  if (!currentQuestion) {
    return (
      <div className="glass-card rounded-xl p-8 text-center">
        <div className="text-gray-400">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-500/20 flex items-center justify-center">
            📝
          </div>
          <h3 className="text-lg font-medium mb-2 text-white">没有题目</h3>
          <p>请选择一个有题目的主题开始练习</p>
        </div>
      </div>
    )
  }

  const isStarred = state.starredQuestions.includes(currentQuestion.id)
  const eliminatedOptions = state.eliminatedOptions[currentQuestion.id] || []

  const handleAnswerSelect = (index) => {
    if (state.showResult || state.quizComplete) return
    dispatch({ type: 'SELECT_ANSWER', payload: index })
  }

  const handlePrevQuestion = () => {
    if (state.currentQuestion === 0 || (state.examMode && !state.examConfig.allowBack)) return
    
    const prevIndex = Math.max(0, state.currentQuestion - 1)
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: prevIndex })
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case '基础':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case '中等':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case '高级':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  return (
    <div className={cn(
      'glass-card rounded-xl p-6 mb-6 transition-all',
      state.animationsEnabled && 'hover:shadow-2xl hover:-translate-y-0.5'
    )}>
      {/* 题目头部信息 */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium',
            getDifficultyColor(currentQuestion.difficulty)
          )}>
            {currentQuestion.difficulty}
          </span>
          
          <span className="text-sm text-gray-400">
            第 {state.currentQuestion + 1} / {currentQuestions.length} 题
          </span>
          
          {state.examMode && state.countdown > 0 && (
            <span className="flex items-center text-sm text-purple-400">
              <Timer className="h-4 w-4 mr-1" />
              {formatTime(state.countdown)}
            </span>
          )}
        </div>

        {/* 工具按钮 */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleStarQuestion}
            className={cn(
              'p-2 rounded-full transition-colors',
              isStarred ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
            )}
            title="收藏题目 (S)"
          >
            <Star className={cn('h-5 w-5', isStarred && 'fill-current')} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShowHint}
            className="p-2 rounded-full text-gray-400 hover:text-blue-400"
            title="获取提示 (H)"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFiftyFifty}
            disabled={state.showResult || eliminatedOptions.length > 0}
            className="p-2 rounded-full text-gray-400 hover:text-pink-400 disabled:opacity-50"
            title="50/50 排除 (F)"
          >
            <Zap className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* 题目内容 */}
      <h3 className="text-lg font-semibold mb-6 text-white leading-relaxed">
        {currentQuestion.question}
      </h3>

      {/* 选项列表 */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => {
          const isEliminated = eliminatedOptions.includes(index)
          const isSelected = state.selectedAnswer === index
          const isCorrect = index === currentQuestion.correct
          const showResult = state.showResult

          let buttonClass = cn(
            'w-full text-left p-4 rounded-lg border transition-all focus:outline-none focus:ring-2',
            'hover:border-blue-300 dark:hover:border-blue-600',
            state.animationsEnabled && 'active:scale-[0.99]'
          )

          if (isEliminated) {
            buttonClass = cn(buttonClass, 'opacity-40 pointer-events-none grayscale')
          } else if (isSelected && !showResult) {
            buttonClass = cn(buttonClass, 
              'border-blue-500 ring-blue-300 bg-blue-50 dark:bg-blue-900/30 ring-2'
            )
          } else if (showResult) {
            if (isCorrect) {
              buttonClass = cn(buttonClass, 'bg-green-50 border-green-500 dark:bg-green-900/20')
            } else if (isSelected) {
              buttonClass = cn(buttonClass, 'bg-red-50 border-red-500 dark:bg-red-900/20')
            }
          } else {
            buttonClass = cn(buttonClass, 'border-gray-300 dark:border-gray-700')
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={state.showResult || state.quizComplete || isEliminated}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-white flex-1 text-left">
                  {option}
                </span>
                
                <div className="flex items-center gap-2">
                  {/* 键盘提示 */}
                  {!showResult && !isEliminated && (
                    <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {index + 1}
                    </span>
                  )}
                  
                  {/* 结果图标 */}
                  {showResult && (
                    <>
                      {isCorrect && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* 解析区域 */}
      {state.showResult && (!state.examMode || !state.examConfig.hideExplanation) && (
        <div className="mt-4 p-4 rounded-lg bg-white/60 dark:bg-gray-700/60 border border-white/20">
          <h4 className="font-medium mb-2 text-gray-900 dark:text-white">解析</h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {currentQuestion.explanation || '暂无解析'}
          </p>
          
          {/* 标签 */}
          {currentQuestion.tags && currentQuestion.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">标签：</span>
              {currentQuestion.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 笔记区域 */}
          {state.questionNotes[currentQuestion.id] ? (
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
              <h5 className="font-medium text-sm text-yellow-800 dark:text-yellow-200 mb-1">
                我的笔记
              </h5>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {state.questionNotes[currentQuestion.id]}
              </p>
            </div>
          ) : (
            <div className="mt-3">
              <button
                onClick={() => {
                  const note = prompt('为这道题添加笔记（最多200字）', '')
                  if (note && note.trim()) {
                    if (note.length <= 200) {
                      dispatch({
                        type: 'ADD_QUESTION_NOTE',
                        payload: { questionId: currentQuestion.id, note: note.trim() }
                      })
                      toast.success('笔记已添加')
                    } else {
                      toast.warning('笔记长度不能超过200字')
                    }
                  }
                }}
                className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
              >
                + 添加笔记
              </button>
            </div>
          )}
        </div>
      )}

      {/* 操作按钮区域 */}
      <div className="mt-6 flex flex-wrap gap-3 justify-between">
        {/* 左侧导航按钮 */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePrevQuestion}
            disabled={
              state.currentQuestion === 0 || 
              (state.examMode && !state.examConfig.allowBack)
            }
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            上一题
          </Button>
        </div>

        {/* 右侧操作按钮 */}
        <div className="flex gap-2">
          {!state.showResult ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={state.selectedAnswer === null}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            >
              提交答案 (Enter)
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center"
            >
              {state.currentQuestion < currentQuestions.length - 1 ? (
                <>
                  下一题 <ChevronRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                '查看结果'
              )}
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => {
              dispatch({ type: 'SELECT_ANSWER', payload: null })
              if (state.showResult) {
                dispatch({ type: 'SET_CURRENT_QUESTION', payload: state.currentQuestion })
              }
            }}
          >
            重选
          </Button>
        </div>
      </div>

      {/* 键盘快捷键提示 */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-gray-400 flex flex-wrap gap-4">
          <span>快捷键：</span>
          <span>1-4: 选择选项</span>
          <span>Enter: 提交</span>
          <span>S: 收藏</span>
          <span>F: 50/50</span>
          <span>H: 提示</span>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
