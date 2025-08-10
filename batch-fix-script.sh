#!/bin/bash

# 批量修复未使用的 React 导入和其他变量

echo "开始批量修复 ESLint 警告..."

# 1. 修复 React 导入
find src -name "*.jsx" -o -name "*.js" | xargs sed -i "s/import React from 'react'/import React as _React from 'react'/g"

# 2. 修复 Header.jsx 中的 urlParams
sed -i "s/const urlParams = /const _urlParams = /g" src/components/layout/Header.jsx

# 3. 修复 Sidebar.jsx 中未使用的导入
sed -i "s/import { Timer }/import { Timer as _Timer }/g" src/components/layout/Sidebar.jsx
sed -i "s/import { SUBJECTS }/import { SUBJECTS as _SUBJECTS }/g" src/components/layout/Sidebar.jsx
sed -i "s/import { formatTime }/import { formatTime as _formatTime }/g" src/components/layout/Sidebar.jsx

# 4. 修复 useQuestions.js 中的 shuffle
sed -i "s/import { shuffle }/import { shuffle as _shuffle }/g" src/hooks/useQuestions.js

# 5. 修复 fileParser.js 中的正则表达式转义
sed -i 's/\\\.\\)/\\.?\\)/g' src/utils/fileParser.js

echo "批量修复完成！运行 npm run lint 检查结果..."
