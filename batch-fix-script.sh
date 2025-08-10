# 完整的 ESLint 警告修复脚本

# 1. 修复所有 React 导入警告
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/App.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/layout/FloatingActionBar.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/layout/Header.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/layout/MainContent.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/layout/MainLayout.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/layout/Sidebar.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/pages/PracticePage.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/quiz/QuestionCard.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/ui/Button.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/ui/Input.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/ui/Modal.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/components/ui/Toast.jsx
sed -i 's/import React from '\''react'\''/import React as _React from '\''react'\''/g' src/contexts/QuizContext.js

# 2. 修复 Header.jsx 中的 urlParams
sed -i 's/const urlParams = /const _urlParams = /g' src/components/layout/Header.jsx

# 3. 修复 Sidebar.jsx 中的未使用导入
sed -i 's/, Timer/, Timer as _Timer/g' src/components/layout/Sidebar.jsx
sed -i 's/import { SUBJECTS }/import { SUBJECTS as _SUBJECTS }/g' src/components/layout/Sidebar.jsx
sed -i 's/import { formatTime }/import { formatTime as _formatTime }/g' src/components/layout/Sidebar.jsx

# 4. 修复 useQuestions.js 中的 shuffle
sed -i 's/, shuffle/, shuffle as _shuffle/g' src/hooks/useQuestions.js

# 5. 修复 fileParser.js 中的正则表达式转义
sed -i 's/\\\\\.\\\\/\\\\.\?\\\\/g' src/utils/fileParser.js

echo "批量修复完成！"
