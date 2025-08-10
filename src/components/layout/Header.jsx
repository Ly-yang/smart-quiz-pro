import React from 'react'
import { Brain, Target, BookOpen, BarChart2, Eye, EyeOff, Share2, Command, User, List, X } from 'lucide-react'
import { useQuiz } from '@/contexts/QuizContext'
import { useToast } from '@/components/ui/Toast'
import Button from '@/components/ui/Button'
import { TABS } from '@/utils/constants'
import { copyToClipboard, urlParams } from '@/utils'

const Header = () => {
  const { state, dispatch } = useQuiz()
  const { toast } = useToast()

  const navigationTabs = [
    { key: TABS.PRACTICE, label: '智能练习', icon: Target },
    { key: TABS.BANK, label: '题库管理', icon: BookOpen },
    { key: TABS.ANALYSIS, label: '学习分析', icon: BarChart2 }
  ]

  const handleTabChange = (tab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab })
    if (state.showMobileMenu) {
      dispatch({ type: 'SET_SHOW_MOBILE_MENU', payload: false })
    }
  }

  const handleToggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' })
  }

  const handleShareLink = async () => {
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('subject', state.selectedSubject)
      if (state.filterDifficulty !== 'all') {
        url.searchParams.set('difficulty', state.filterDifficulty)
      }
      if (state.searchQuery) {
        url.searchParams.set('q', state.searchQuery)
      }
      
      await copyToClipboard(url.toString())
      toast.success('分享链接已复制到剪贴板')
    } catch (error) {
      toast.error('复制链接失败')
    }
  }

  const handleShowCommandPalette = () => {
    dispatch({ type: 'SET_SHOW_COMMAND_PALETTE', payload: true })
  }

  const handleToggleMobileMenu = () => {
    dispatch({ type: 'SET_SHOW_MOBILE_MENU', payload: !state.showMobileMenu })
  }

  return (
    <header className="backdrop-blur bg-white/10 dark:bg-black/20 border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">智练通 Pro</span>
            </div>
            
            {/* 桌面导航 */}
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              {navigationTabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    state.activeTab === tab.key
                      ? 'border-blue-400 text-white'
                      : 'border-transparent text-gray-300 hover:border-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="mr-1 h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* 右侧工具栏 */}
          <div className="hidden md:flex items-center space-x-3">
            {/* 主题切换 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleDarkMode}
              title={state.darkMode ? '切换到浅色主题' : '切换到深色主题'}
            >
              {state.darkMode ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Button>

            {/* 分享 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShareLink}
              title="分享当前页面"
            >
              <Share2 className="h-5 w-5" />
            </Button>

            {/* 命令面板 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShowCommandPalette}
              title="打开命令面板 (Ctrl/⌘+K)"
            >
              <Command className="h-5 w-5" />
            </Button>

            {/* 用户头像 */}
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="-mr-2 flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleMobileMenu}
              className="text-gray-300 hover:text-white"
            >
              {state.showMobileMenu ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* 移动端菜单展开 */}
      {state.showMobileMenu && (
        <div className="md:hidden border-t border-white/10">
          <div className="pt-2 pb-3 space-y-1">
            {navigationTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                  state.activeTab === tab.key
                    ? 'bg-blue-500/10 border-blue-400 text-blue-200'
                    : 'border-transparent text-gray-300 hover:bg-white/10 hover:border-gray-400'
                }`}
              >
                <tab.icon className="inline mr-2 h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* 移动端工具栏 */}
          <div className="border-t border-white/10 pt-4 pb-3">
            <div className="flex items-center justify-around px-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleDarkMode}
                className="text-gray-300"
              >
                {state.darkMode ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
                主题
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShareLink}
                className="text-gray-300"
              >
                <Share2 className="h-4 w-4 mr-1" />
                分享
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShowCommandPalette}
                className="text-gray-300"
              >
                <Command className="h-4 w-4 mr-1" />
                命令
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
