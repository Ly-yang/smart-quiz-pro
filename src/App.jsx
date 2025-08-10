import React from 'react'
import { QuizProvider } from './contexts/QuizContext'
import MainLayout from './components/layout/MainLayout'
import { ToastProvider } from './components/ui/Toast'
import './App.css'

function App() {
  return (
    <QuizProvider>
      <ToastProvider>
        <div className="App">
          <MainLayout />
        </div>
      </ToastProvider>
    </QuizProvider>
  )
}

export default App
