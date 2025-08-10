import React from 'react'
import { useQuiz } from '@/contexts/QuizContext'
import { TABS } from '@/utils/constants'

// 导入页面组件
import PracticePage from '../pages/PracticePage'
import QuestionBankPage from '../pages/QuestionBankPage'
import AnalysisPage from '../pages/AnalysisPage'

const MainContent = () => {
  const { state } = useQuiz()

  const renderContent = () => {
    switch (state.activeTab) {
      case TABS.PRACTICE:
        return <PracticePage />
      case TABS.BANK:
        return <QuestionBankPage />
      case TABS.ANALYSIS:
        return <AnalysisPage />
      default:
        return <PracticePage />
    }
  }

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  )
}

export default MainContent
