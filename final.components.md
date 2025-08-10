# 智练通 Pro - 完整项目文件结构

## 📁 项目根目录
```
smart-quiz-pro/
├── 📄 package.json                 # 项目配置和依赖
├── 📄 README.md                    # 项目文档
├── 📄 LICENSE                      # MIT许可证
├── 📄 .gitignore                   # Git忽略文件
├── 📄 .prettierrc                  # Prettier配置
├── 📄 eslint.config.js             # ESLint配置
├── 📄 vite.config.js               # Vite构建配置
├── 📄 tailwind.config.js           # TailwindCSS配置
├── 📄 postcss.config.js            # PostCSS配置
├── 📄 index.html                   # 应用入口HTML
├── 📄 Dockerfile                   # Docker构建文件
├── 📄 nginx.conf                   # Nginx配置
├── 📄 vercel.json                  # Vercel部署配置
├── 📄 netlify.toml                 # Netlify部署配置
```

## 📁 源代码目录 (src/)
```
src/
├── 📄 main.jsx                     # React应用入口
├── 📄 App.jsx                      # 主应用组件
├── 📄 App.css                      # 应用样式
├── 📄 index.css                    # 全局样式
```

## 📁 组件目录 (src/components/)
```
components/
├── ui/                             # 基础UI组件
│   ├── 📄 Toast.jsx               # 消息提示组件
│   ├── 📄 Button.jsx              # 按钮组件
│   ├── 📄 Input.jsx               # 输入框组件
│   └── 📄 Modal.jsx               # 模态框组件
├── layout/                         # 布局组件
│   ├── 📄 MainLayout.jsx          # 主布局
│   ├── 📄 Header.jsx              # 顶部导航
│   ├── 📄 Sidebar.jsx             # 侧边栏
│   ├── 📄 MainContent.jsx         # 主内容区
│   └── 📄 FloatingActionBar.jsx   # 浮动操作栏
├── pages/                          # 页面组件
│   ├── 📄 PracticePage.jsx        # 练习页面
│   ├── 📄 QuestionBankPage.jsx    # 题库管理页面
│   └── 📄 AnalysisPage.jsx        # 分析报告页面
├── quiz/                           # 题目相关组件
│   ├── 📄 QuestionCard.jsx        # 题目卡片
│   ├── 📄 QuizResults.jsx         # 测验结果
│   ├── 📄 ExamModeSettings.jsx    # 考试模式设置
│   ├── 📄 QuizProgress.jsx        # 练习进度
│   └── 📄 QuestionPalette.jsx     # 题号面板
├── analysis/                       # 分析报告组件
│   ├── 📄 ProgressChart.jsx       # 进度图表
│   ├── 📄 WeaknessAnalysis.jsx    # 薄弱环节分析
│   └── 📄 TestHistory.jsx         # 测试历史
└── common/                         # 通用组件
    ├── 📄 UploadModal.jsx         # 文件上传模态框
    ├── 📄 CommandPalette.jsx      # 命令面板
    ├── 📄 LoadingSpinner.jsx      # 加载动画
    └── 📄 ErrorBoundary.jsx       # 错误边界
```

## 📁 状态管理 (src/contexts/, src/reducers/)
```
contexts/
└── 📄 QuizContext.jsx              # 全局状态上下文

reducers/
└── 📄 quizReducer.js               # 状态管理逻辑
```

## 📁 自定义Hooks (src/hooks/)
```
hooks/
├── 📄 useQuestions.js              # 题目相关逻辑
├── 📄 useTimer.js                  # 计时器逻辑
├── 📄 useKeyboard.js               # 键盘快捷键
├── 📄 useDebounce.js               # 防抖Hook
└── 📄 useLocalStorage.js           # 本地存储Hook
```

## 📁 工具函数 (src/utils/)
```
utils/
├── 📄 index.js                     # 通用工具函数
├── 📄 fileParser.js                # 文件解析器
├── 📄 constants.js                 # 常量定义
└── 📄 analytics.js                 # 数据分析工具
```

## 📁 数据和类型 (src/data/, src/types/)
```
data/
├── 📄 questions.js                 # 默认题库数据
└── 📄 subjects.js                  # 学科配置

types/
├── 📄 question.ts                  # 题目类型定义
├── 📄 user.ts                      # 用户类型定义
└── 📄 quiz.ts                      # 测验类型定义
```

## 📁 静态资源 (public/)
```
public/
├── 📄 favicon.ico                  # 网站图标
├── 📄 manifest.json               # PWA配置
├── 📄 robots.txt                  # 搜索引擎配置
├── 📄 sitemap.xml                 # 网站地图
├── 🖼️ og-image.png                # 社交媒体分享图片
└── icons/                          # PWA图标集
    ├── 🖼️ icon-72x72.png
    ├── 🖼️ icon-96x96.png
    ├── 🖼️ icon-128x128.png
    ├── 🖼️ icon-144x144.png
    ├── 🖼️ icon-152x152.png
    ├── 🖼️ icon-192x192.png
    ├── 🖼️ icon-384x384.png
    └── 🖼️ icon-512x512.png
```

## 📁 CI/CD配置 (.github/)
```
.github/
├── workflows/
│   ├── 📄 deploy.yml              # 自动部署流程
│   ├── 📄 test.yml                # 测试流程
│   └── 📄 release.yml             # 发布流程
├── 📄 PULL_REQUEST_TEMPLATE.md    # PR模板
├── 📄 ISSUE_TEMPLATE.md           # Issue模板
└── 📄 CONTRIBUTING.md             # 贡献指南
```

## 📁 文档目录 (docs/)
```
docs/
├── 📄 installation.md             # 安装指南
├── 📄 deployment.md               # 部署文档
├── 📄 api.md                      # API文档
├── 📄 architecture.md             # 架构说明
├── 📄 contributing.md             # 贡献指南
└── 📄 changelog.md                # 更新日志
```

## 📁 测试目录 (tests/)
```
tests/
├── unit/                           # 单元测试
│   ├── 📄 components.test.js
│   ├── 📄 hooks.test.js
│   └── 📄 utils.test.js
├── integration/                    # 集成测试
│   ├── 📄 quiz-flow.test.js
│   └── 📄 file-upload.test.js
└── e2e/                           # 端到端测试
    ├── 📄 user-journey.test.js
    └── 📄 performance.test.js
```

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/Ly-yang/smart-quiz-pro.git
cd smart-quiz-pro
```

### 2. 安装依赖
```bash
npm install
# 或者使用 yarn
yarn install
```

### 3. 启动开发服务器
```bash
npm run dev
# 或者使用 yarn
yarn dev
```

### 4. 构建生产版本
```bash
npm run build
# 或者使用 yarn
yarn build
```

## 🌐 部署选项

### GitHub Pages
推送到 main 分支后自动部署

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

### Docker
```bash
docker build -t smart-quiz-pro .
docker run -p 80:80 smart-quiz-pro
```

## 📦 项目特点

✅ **现代技术栈**: React 18 + Vite + TailwindCSS
✅ **完整功能**: 智能练习、题库管理、学习分析
✅ **响应式设计**: 完美适配所有设备
✅ **PWA支持**: 可安装到桌面和手机
✅ **多种部署方式**: 支持各大平台部署
✅ **完善的CI/CD**: 自动化测试和部署
✅ **国际化准备**: 支持多语言扩展
✅ **可访问性**: 遵循WCAG标准
✅ **SEO优化**: 搜索引擎友好
✅ **性能优化**: 代码分割和懒加载

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](LICENSE) - 自由使用和修改
