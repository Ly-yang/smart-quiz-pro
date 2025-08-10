export const initialState = {
  // 练习状态
  currentQuestion: 0,
  selectedAnswer: null,
  showResult: false,
  userAnswers: [],
  quizComplete: false,
  score: 0,
  timeSpent: 0,
  startTime: null,
  
  // UI 状态
  activeTab: 'practice',
  selectedSubject: 'ai',
  showUploadModal: false,
  showAnalysis: false,
  showMobileMenu: false,
  showCommandPalette: false,
  
  // 筛选和排序
  searchQuery: '',
  filterDifficulty: 'all',
  sortBy: 'default',
  tagFilter: [],
  
  // 考试模式
  examMode: false,
  examConfig: {
    questionCount: 10,
    timeLimitMin: 15,
    shuffle: true,
    hideExplanation: false,
    allowBack: true,
  },
  countdown: 0,
  isPaused: false,
  examQuestionIds: [],
  
  // 功能状态
  eliminatedOptions: {},
  hintsUsed: {},
  starredQuestions: [],
  questionNotes: {},
  
  // 数据
  questionBank: {},
  customQuestions: [],
  testHistory: [],
  uploadedFiles: [],
  uploadProgress: 0,
  isUploading: false,
  
  // 设置
  darkMode: false,
  deviceView: 'auto',
  soundEnabled: false,
  animationsEnabled: true,
  activeReportTab: 'progress',
}

export const quizReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.payload,
      }

    case 'SET_QUESTION_BANK':
      return {
        ...state,
        questionBank: action.payload,
      }

    case 'SET_CURRENT_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload,
        selectedAnswer: null,
        showResult: false,
      }

    case 'SELECT_ANSWER':
      return {
        ...state,
        selectedAnswer: action.payload,
      }

    case 'SHOW_RESULT':
      return {
        ...state,
        showResult: true,
        score: action.payload.isCorrect ? state.score + 1 : state.score,
        userAnswers: [
          ...state.userAnswers,
          {
            question: action.payload.question,
            selected: action.payload.selected,
            isCorrect: action.payload.isCorrect,
            timestamp: new Date().toISOString(),
          },
        ],
      }

    case 'NEXT_QUESTION':
      const nextIndex = state.currentQuestion + 1
      return {
        ...state,
        currentQuestion: nextIndex,
        selectedAnswer: null,
        showResult: false,
      }

    case 'FINISH_QUIZ':
      return {
        ...state,
        quizComplete: true,
        showResult: false,
        selectedAnswer: null,
        testHistory: [
          ...state.testHistory,
          {
            date: new Date().toISOString(),
            score: state.score,
            total: action.payload.total,
            subject: state.selectedSubject,
            timeSpent: state.timeSpent,
          },
        ],
      }

    case 'RESTART_QUIZ':
      return {
        ...state,
        currentQuestion: 0,
        selectedAnswer: null,
        showResult: false,
        quizComplete: false,
        score: 0,
        timeSpent: 0,
        startTime: new Date(),
        eliminatedOptions: {},
        hintsUsed: {},
        examQuestionIds: state.examMode ? [] : state.examQuestionIds,
        countdown: state.examMode ? state.examConfig.timeLimitMin * 60 : 0,
      }

    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload,
      }

    case 'SET_SELECTED_SUBJECT':
      return {
        ...state,
        selectedSubject: action.payload,
        currentQuestion: 0,
        selectedAnswer: null,
        showResult: false,
        quizComplete: false,
        score: 0,
        timeSpent: 0,
        startTime: new Date(),
        examQuestionIds: [],
        countdown: state.examMode ? state.examConfig.timeLimitMin * 60 : 0,
      }

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      }

    case 'SET_FILTER_DIFFICULTY':
      return {
        ...state,
        filterDifficulty: action.payload,
      }

    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload,
      }

    case 'SET_TAG_FILTER':
      return {
        ...state,
        tagFilter: action.payload,
      }

    case 'TOGGLE_EXAM_MODE':
      return {
        ...state,
        examMode: !state.examMode,
        examQuestionIds: [],
        countdown: !state.examMode ? state.examConfig.timeLimitMin * 60 : 0,
      }

    case 'SET_EXAM_CONFIG':
      return {
        ...state,
        examConfig: { ...state.examConfig, ...action.payload },
        countdown: action.payload.timeLimitMin ? action.payload.timeLimitMin * 60 : state.countdown,
      }

    case 'SET_EXAM_QUESTION_IDS':
      return {
        ...state,
        examQuestionIds: action.payload,
        currentQuestion: 0,
      }

    case 'UPDATE_TIME':
      return {
        ...state,
        timeSpent: action.payload.timeSpent,
        countdown: action.payload.countdown,
      }

    case 'TOGGLE_PAUSE':
      return {
        ...state,
        isPaused: !state.isPaused,
      }

    case 'ELIMINATE_OPTIONS':
      return {
        ...state,
        eliminatedOptions: {
          ...state.eliminatedOptions,
          [action.payload.questionId]: action.payload.options,
        },
      }

    case 'USE_HINT':
      return {
        ...state,
        hintsUsed: {
          ...state.hintsUsed,
          [action.payload.questionId]: (state.hintsUsed[action.payload.questionId] || 0) + 1,
        },
      }

    case 'TOGGLE_STAR_QUESTION':
      const isStarred = state.starredQuestions.includes(action.payload)
      return {
        ...state,
        starredQuestions: isStarred
          ? state.starredQuestions.filter(id => id !== action.payload)
          : [...state.starredQuestions, action.payload],
      }

    case 'ADD_QUESTION_NOTE':
      return {
        ...state,
        questionNotes: {
          ...state.questionNotes,
          [action.payload.questionId]: action.payload.note,
        },
      }

    case 'ADD_CUSTOM_QUESTIONS':
      return {
        ...state,
        customQuestions: [...state.customQuestions, ...action.payload],
      }

    case 'SET_UPLOAD_PROGRESS':
      return {
        ...state,
        uploadProgress: action.payload,
      }

    case 'SET_UPLOADING':
      return {
        ...state,
        isUploading: action.payload,
      }

    case 'ADD_UPLOADED_FILE':
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
      }

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      }

    case 'SET_DEVICE_VIEW':
      return {
        ...state,
        deviceView: action.payload,
      }

    case 'TOGGLE_SOUND':
      return {
        ...state,
        soundEnabled: !state.soundEnabled,
      }

    case 'TOGGLE_ANIMATIONS':
      return {
        ...state,
        animationsEnabled: !state.animationsEnabled,
      }

    case 'SET_SHOW_UPLOAD_MODAL':
      return {
        ...state,
        showUploadModal: action.payload,
      }

    case 'SET_SHOW_MOBILE_MENU':
      return {
        ...state,
        showMobileMenu: action.payload,
      }

    case 'SET_SHOW_COMMAND_PALETTE':
      return {
        ...state,
        showCommandPalette: action.payload,
      }

    case 'SET_ACTIVE_REPORT_TAB':
      return {
        ...state,
        activeReportTab: action.payload,
      }

    case 'UPDATE_QUESTION_STATS':
      const { questionId, isCorrect } = action.payload
      const updateStats = (questions) =>
        questions.map(q => {
          if (q.id !== questionId) return q
          const testCount = (q.testCount || 0) + 1
          const prevCorrectTotal = Math.round((q.accuracy || 0) * (q.testCount || 0))
          const newCorrectTotal = prevCorrectTotal + (isCorrect ? 1 : 0)
          const accuracy = newCorrectTotal / testCount
          return {
            ...q,
            testCount,
            accuracy,
            lastTested: new Date().toISOString(),
          }
        })

      return {
        ...state,
        questionBank: {
          ...state.questionBank,
          ai: updateStats(state.questionBank.ai || []),
          prompt: updateStats(state.questionBank.prompt || []),
        },
        customQuestions: updateStats(state.customQuestions),
      }

    default:
      return state
  }
}
