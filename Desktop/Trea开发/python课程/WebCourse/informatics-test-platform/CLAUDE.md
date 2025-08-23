# 前端代码开发规范

## HTML5 规范

### 文档结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题 - 信息学测试平台</title>
    <!-- 样式和脚本引用 -->
</head>
<body>
    <header><!-- 页眉 --></header>
    <main><!-- 主要内容 --></main>
    <footer><!-- 页脚 --></footer>
</body>
</html>
```

### 语义化标签要求
- 使用 `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- 表单使用 `<fieldset>` 和 `<legend>`
- 按钮使用 `<button>` 而非 `<div>`

## CSS3 规范

### BEM 命名规范
```css
.block { /* 块 */ }
.block__element { /* 元素 */ }
.block--modifier { /* 修饰符 */ }

/* 示例 */
.user-card {}
.user-card__header {}
.user-card--active {}
```

### 样式组织
```css
/* 1. 变量定义 */
:root {
    --primary-color: #007bff;
    --font-size-base: 16px;
}

/* 2. 重置样式 */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 3. 基础样式 */
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

/* 4. 组件样式 */

/* 5. 工具类 */
```

## JavaScript 规范

### ES6+ 语法要求
```javascript
// 使用 const/let 而非 var
const MAX_SCORE = 100;
let currentUser = null;

// 箭头函数
const calculateScore = (answers) => {
    return answers.filter(answer => answer.correct).length;
};

// 模板字符串
const welcomeMessage = `欢迎，${userName}！`;

// 解构赋值
const { name, email } = user;

// 模块化导入导出
export const utils = { /* ... */ };
import { utils } from './utils.js';
```

### 代码组织原则
```javascript
// 1. 导入依赖
import { module } from './module.js';

// 2. 常量定义
const CONFIG = {
    apiUrl: 'https://api.example.com',
    timeout: 5000
};

// 3. 工具函数
function formatTime(date) {
    return new Intl.DateTimeFormat('zh-CN').format(date);
}

// 4. 主逻辑
class TestManager {
    constructor() {
        this.tests = [];
    }
    
    addTest(test) {
        this.tests.push(test);
    }
}

// 5. 事件监听
document.addEventListener('DOMContentLoaded', initApp);
```

## 可访问性规范

### ARIA 标签
```html
<button aria-label="提交答案" onclick="submitAnswer()">
    <span class="sr-only">提交答案</span>
    <i class="icon-submit"></i>
</button>

<!-- 使用 sr-only 类隐藏视觉元素但保持屏幕阅读器可访问 -->
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

## 性能优化要求

### 资源加载
```html
<!-- CSS 放在头部 -->
<link rel="stylesheet" href="styles.css" media="all">

<!-- JavaScript 放在尾部或使用 defer -->
<script src="app.js" defer></script>

<!-- 图片优化 -->
<img src="image.jpg" alt="描述" loading="lazy" width="800" height="600">
```

### 代码分割
```javascript
// 动态导入
const loadEditor = async () => {
    const { MonacoEditor } = await import('./editor.js');
    return MonacoEditor;
};
```

## 代码质量要求

### 注释规范
```javascript
/**
 * 计算测试分数
 * @param {Array} answers - 用户答案数组
 * @param {Array} correctAnswers - 正确答案数组
 * @returns {number} 得分（0-100）
 */
function calculateScore(answers, correctAnswers) {
    // 验证输入参数
    if (!Array.isArray(answers)) {
        throw new Error('answers 必须是数组');
    }
    
    const correctCount = answers.filter((answer, index) => 
        answer === correctAnswers[index]
    ).length;
    
    return Math.round((correctCount / correctAnswers.length) * 100);
}
```

### 错误处理
```javascript
try {
    const result = await fetchData();
    processResult(result);
} catch (error) {
    console.error('数据获取失败:', error);
    showErrorMessage('加载失败，请重试');
}
```

## 浏览器兼容性
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 开发工具配置
- 使用 Prettier 代码格式化
- 使用 ESLint 代码检查
- 使用 BrowserStack 进行跨浏览器测试