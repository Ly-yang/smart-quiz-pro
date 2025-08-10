# smart-quiz-pro
智能题库练习系统 - 基于React的现代化在线学习平台
# 智练通 Pro - 智能题库练习系统

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> 🎯 基于 React + Vite + TailwindCSS 构建的现代化智能题库练习系统

## ✨ 特性

### 🧠 智能练习
- **自适应推荐**：根据答题历史智能推荐薄弱知识点
- **多种练习模式**：日常练习、考试模式、专项训练
- **实时统计**：答题准确率、用时分析、知识点掌握度

### 📚 题库管理
- **多格式导入**：支持 JSON、CSV、TXT、Markdown 格式
- **批量操作**：题目导入导出、批量编辑、分类管理
- **智能标签**：自动标签识别、知识点分类

### 📊 学习分析
- **可视化报告**：学习进度、薄弱环节、历史记录
- **个性化建议**：基于数据的学习路径推荐
- **成长追踪**：长期学习效果分析

### 🎨 用户体验
- **响应式设计**：完美适配桌面、平板、手机
- **暗黑模式**：护眼的深色主题
- **快捷键支持**：高效的键盘操作
- **离线存储**：本地数据持久化

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装运行

```bash
# 克隆项目
git clone https://github.com/Ly-yang/smart-quiz-pro.git
cd smart-quiz-pro

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 或使用 yarn
yarn install
yarn dev
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
smart-quiz-pro/
├── public/                 # 静态资源
│   ├── favicon.ico
│   └── manifest.json
├── src/                    # 源代码
│   ├── components/         # 组件库
│   │   ├── ui/            # 基础 UI 组件
│   │   ├── quiz/          # 题目相关组件
│   │   ├── analysis/      # 分析报告组件
│   │   └── common/        # 通用组件
│   ├── hooks/             # 自定义 Hooks
│   ├── utils/             # 工具函数
│   ├── types/             # TypeScript 类型定义
│   ├── data/              # 数据和配置
│   ├── styles/            # 样式文件
│   ├── App.jsx            # 主应用组件
│   ├── main.jsx           # 应用入口
│   └── index.css          # 全局样式
├── docs/                  # 文档
├── tests/                 # 测试文件
├── .github/               # GitHub 配置
│   └── workflows/         # CI/CD 工作流
├── vite.config.js         # Vite 配置
├── tailwind.config.js     # TailwindCSS 配置
├── postcss.config.js      # PostCSS 配置
├── eslint.config.js       # ESLint 配置
└── package.json           # 项目配置
```

## 🛠️ 开发指南

### 代码规范

```bash
# 代码检查
npm run lint

# 自动修复
npm run lint:fix

# 代码格式化
npm run format
```

### 测试

```bash
# 运行测试
npm run test

# 测试覆盖率
npm run coverage

# 测试 UI
npm run test:ui
```

## 📋 功能清单

### 核心功能
- [x] 题目练习与答题
- [x] 多种题库格式支持
- [x] 考试模式
- [x] 学习分析报告
- [x] 收藏和笔记功能
- [x] 暗黑模式
- [x] 响应式设计

### 高级功能
- [x] 智能推荐算法
- [x] 数据导入导出
- [x] 快捷键操作
- [x] 命令面板
- [x] 进度跟踪
- [x] 错题本功能

### 技术特性
- [x] 现代化技术栈
- [x] TypeScript 支持
- [x] 组件化架构
- [x] 性能优化
- [x] SEO 友好
- [x] PWA 支持

## 🎯 使用场景

### 教育机构
- 在线考试系统
- 学生自主学习
- 教师题库管理
- 学习效果评估

### 企业培训
- 员工技能测试
- 培训效果评估
- 知识库管理
- 学习路径规划

### 个人学习
- 自我评估测试
- 知识点复习
- 学习进度跟踪
- 错题强化练习

## 🔧 配置说明

### 环境变量

创建 `.env.local` 文件：

```bash
# 应用配置
VITE_APP_TITLE=智练通 Pro
VITE_APP_VERSION=1.0.0

# API 配置（如需要）
VITE_API_BASE_URL=https://api.example.com

# 功能开关
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PWA=true
```

### 部署配置

#### Vercel
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

#### Netlify
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 构建工具
- [TailwindCSS](https://tailwindcss.com/) - CSS 框架
- [Lucide React](https://lucide.dev/) - 图标库

## 📞 联系方式

- GitHub: [@Ly-yang](https://github.com/Ly-yang)
- Issues: [项目问题反馈](https://github.com/Ly-yang/smart-quiz-pro/issues)

## 🚧 路线图

### v1.1.0
- [ ] 题目编辑器
- [ ] 批量导入优化
- [ ] 更多图表类型

### v1.2.0
- [ ] 多用户支持
- [ ] 云端同步
- [ ] 社区功能

### v2.0.0
- [ ] AI 智能出题
- [ ] 语音答题
- [ ] VR/AR 支持

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
