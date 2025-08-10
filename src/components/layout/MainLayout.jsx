import React from 'react'
import { useQuiz } from '@/contexts/QuizContext'
import Header from './Header'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import FloatingActionBar from './FloatingActionBar'
import CommandPalette from '../common/CommandPalette'
import UploadModal from '../common/UploadModal'

const MainLayout = () => {
  const { state } = useQuiz()

  return (
    <div className={`min-h-screen ${state.darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900">
        {/* 顶部导航 */}
        <Header />

        {/* 主内容区域 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左侧边栏 */}
            <div className="lg:w-72 flex-shrink-0">
              <Sidebar />
            </div>

            {/* 主内容 */}
            <div className="flex-1">
              <MainContent />
            </div>
          </div>
        </main>

        {/* 浮动操作栏 */}
        <FloatingActionBar />

        {/* 模态框 */}
        <UploadModal />
        <CommandPalette />
      </div>
    </div>
  )
}

export default MainLayout
