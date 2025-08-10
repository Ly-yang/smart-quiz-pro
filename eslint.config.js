import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: ['dist', 'node_modules', 'build', '.github', 'docs'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        // 浏览器环境全局变量
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Blob: 'readonly',
        prompt: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        fetch: 'readonly',
        
        // Node.js 环境全局变量（用于配置文件）
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        
        // 应用特定全局变量
        __APP_VERSION__: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { 
      react: { version: '18.2' } 
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      
      // React 相关规则
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off', // 如果使用 TypeScript，可以关闭 prop-types
      'react/react-in-jsx-scope': 'off', // React 17+ JSX Transform
      
      // React Refresh 规则
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // 变量和函数相关规则
      'no-unused-vars': [
        'warn', 
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        }
      ],
      
      // 语法相关规则
      'no-case-declarations': 'error', // 修复 switch-case 中的词法声明问题
      'no-useless-escape': 'error',    // 修复正则表达式转义问题
      
      // React Hooks 规则
      'react-hooks/exhaustive-deps': 'warn', // 依赖数组警告而不是错误
      'react-hooks/rules-of-hooks': 'error',
      
      // 开发环境相关规则
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      
      // 代码质量规则
      'prefer-const': 'warn',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-template': 'warn',
    },
  },
  
  // 为配置文件提供特殊规则
  {
    files: ['vite.config.js', 'tailwind.config.js', 'postcss.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
]
