import React from 'react'
import { Brain, BookOpen, Plus, Star, AlertCircle, Timer } from 'lucide-react'
import { useQuiz } from '@/contexts/QuizContext'
import { SUBJECTS } from '@/utils/constants'
import { formatTime } from '@/utils'
import ExamModeSettings from '../quiz/ExamModeSettings'
import QuizProgress from '../quiz/QuizProgress'

const Sidebar = () => {
  const { state, dispatch } = useQuiz()

  const subjects = {
    ai: { name: "生成式AI基础", icon: Brain, color: "bg-blue-500" },
    prompt: { name: "提示词工程", icon: BookOpen, color: "bg-green-500" },
    custom: { name: "自定义题库", icon: Plus, color: "bg-purple-500" },
    starred: { name: "收藏题目", icon: Star, color: "bg-yellow-500" },
    wrong: { name: "错题本", icon: AlertCircle, color: "bg-red-500" }
  }

  const handleSubjectChange = (subjectKey) => {
    dispatch({ type: 'SET_SELECTED_SUBJECT', payload: subjectKey })
  }

  const getSubjectBadgeCount = (key) => {
    switch (key) {
      case 'starred':
        return state.starredQuestions.length
      case 'wrong':
        return state.userAnswers.filter(a => !a.isCorrect).length
      default:
        return 0
    }
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* 主题选择 */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-medium text-white mb-3">选择学习主题</h2>
      </div>
      
      <div className="divide-y divide-white/10">
        {Object.entries(subjects).map(([key, subject]) => {
          const badgeCount = getSubjectBadgeCount(key)
          
          return (
            <button
              key={key}
              onClick={() => handleSubjectChange(key)}
              className={`w-full text-left p-4 flex items-center transition-colors ${
                state.selectedSubject === key ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className={`h-8 w-8 rounded-full ${subject.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                <subject.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-white flex-1">{subject.name}</span>
              {badgeCount > 0 && (
                <span className={`ml-auto text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  key === 'starred' ? 'bg-yellow-500/20 text-yellow-200' : 'bg-red-500/20 text-red-200'
                }`}>
                  {badgeCount}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 考试模式设置 */}
      {state.activeTab === 'practice' && !state.quizComplete && (
        <ExamModeSettings />
      )}

      {/* 练习进度 */}
      {state.activeTab === 'practice' && !state.quizComplete && (
        <QuizProgress />
      )}
    </div>
  )
}

export default Sidebar
