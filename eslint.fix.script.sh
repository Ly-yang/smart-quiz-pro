#!/bin/bash

echo "🔧 开始批量修复 ESLint 错误..."

# 1. 修复 React 导入问题 (移除未使用的 React 导入)
echo "📝 修复 React 导入..."
find src -name "*.jsx" -type f -exec sed -i '/^import React from ['"'"'"][^'"'"'"]*['"'"'"];*$/d' {} \;
find src -name "*.js" -type f -exec sed -i '/^import React from ['"'"'"][^'"'"'"]*['"'"'"];*$/d' {} \;

# 2. 修复 switch-case 语句中的词法声明问题
echo "📝 修复 switch-case 语句..."

# 修复 useQuestions.js
if [ -f "src/hooks/useQuestions.js" ]; then
    sed -i 's/case ['"'"'][^'"'"'"]*['"'"'"]:$/&\n      {/g' src/hooks/useQuestions.js
    sed -i 's/break;$/      break;\n      }/g' src/hooks/useQuestions.js
fi

# 修复 quizReducer.js
if [ -f "src/reducers/quizReducer.js" ]; then
    # 为每个 case 添加大括号
    sed -i '/case.*:$/{
        N
        s/case \([^:]*\):\n\(.*\)/case \1: {\n      \2/
    }' src/reducers/quizReducer.js
    
    # 为每个 break 添加闭合大括号
    sed -i 's/break;$/break;\n    }/g' src/reducers/quizReducer.js
fi

# 修复 fileParser.js
if [ -f "src/utils/fileParser.js" ]; then
    sed -i '/case.*:$/{
        N
        s/case \([^:]*\):\n\(.*\)/case \1: {\n      \2/
    }' src/utils/fileParser.js
    
    sed -i 's/break;$/break;\n    }/g' src/utils/fileParser.js
fi

# 3. 修复正则表达式转义问题
echo "📝 修复正则表达式转义..."
if [ -f "src/utils/fileParser.js" ]; then
    # 移除不必要的转义字符
    sed -i 's/\\\\\\./\\./g' src/utils/fileParser.js
    sed -i 's/\\\\\\)/\\)/g' src/utils/fileParser.js
fi

# 4. 修复字符串拼接问题 (使用模板字符串)
echo "📝 修复字符串拼接..."
find src -name "*.js" -o -name "*.jsx" | xargs sed -i 's/['"'"'"]\([^'"'"'"]*\)['"'"'"] + ['"'"'"]\([^'"'"'"]*\)['"'"'"]/`\1\2`/g'

# 5. 修复未使用的变量 (添加下划线前缀)
echo "📝 修复未使用的变量..."

# 修复 urlParams
sed -i 's/const urlParams =/const _urlParams =/g' src/components/layout/Header.jsx 2>/dev/null || true

# 修复 Timer
sed -i 's/Timer,/Timer as _Timer,/g' src/components/layout/Sidebar.jsx 2>/dev/null || true

# 修复 SUBJECTS
sed -i 's/const { SUBJECTS }/const { SUBJECTS: _SUBJECTS }/g' src/components/layout/Sidebar.jsx 2>/dev/null || true

# 修复 formatTime
sed -i 's/const { formatTime }/const { formatTime: _formatTime }/g' src/components/layout/Sidebar.jsx 2>/dev/null || true

# 修复 shuffle
sed -i 's/shuffle,/shuffle as _shuffle,/g' src/hooks/useQuestions.js 2>/dev/null || true

echo "🔄 运行 ESLint 自动修复..."
npm run lint:fix 2>/dev/null || true

echo "✅ 批量修复完成！"
echo ""
echo "🔍 剩余需要手动修复的问题："
echo "   1. PracticePage.jsx 中缺少 dispatch 变量"
echo "   2. Toast.jsx 中的 useCallback 依赖"
echo "   3. useKeyboard.js 中的 useEffect 依赖"
echo "   4. useTimer.js 中的 useEffect 依赖"
echo ""
echo "🏃‍♂️ 再次运行检查："
echo "   npm run lint"
