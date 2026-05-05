# MD 文章渲染器 - 实现方案

## 1. 项目目标

构建一个支持多主题选择的 Markdown 文章编写与排版工具，支持文章的创建、编辑、预览和存储。

## 2. 技术方案

### 2.1 前端 (Vue 3)

| 组件 | 技术选型 | 说明 |
|------|----------|------|
| 框架 | Vue 3 (Composition API) | 响应式组件化 |
| 构建 | Vite | 快速开发热更新 |
| 状态 | Pinia | 轻量级状态管理 |
| Markdown | markdown-it | 解析渲染 |
| 样式 | CSS Variables + Scoped CSS | 文章主题切换 |

### 2.2 后端 (Node.js)

| 组件 | 技术选型 | 说明 |
|------|----------|------|
| 框架 | Express.js | 轻量 API 服务 |
| 存储 | JSON 文件 | articles.json |
| 工具 | uuid | 文章 ID 生成 |

## 3. 文件结构

```
article_helper/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.vue        # Markdown 编辑器
│   │   │   ├── Preview.vue       # 渲染预览 (含文章主题)
│   │   │   ├── ThemeSelector.vue # 文章主题选择器
│   │   │   └── ArticleList.vue   # 文章列表
│   │   ├── views/
│   │   │   ├── Home.vue          # 首页/编辑
│   │   │   └── List.vue          # 文章列表页
│   │   ├── stores/
│   │   │   └── article.js        # 文章状态
│   │   ├── themes/
│   │   │   ├── variables.css      # App 级 CSS 变量
│   │   │   ├── article.css        # 文章主题 CSS 变量
│   │   │   └── article-preview.css # 文章内容样式
│   │   ├── api/
│   │   │   └── article.js        # API 调用
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── routes/
│   │   └── articles.js
│   ├── data/
│   │   └── articles.json
│   ├── server.js
│   └── package.json
└── IMPLEMENTATION.md
```

## 4. API 设计

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/articles | 获取文章列表 |
| GET | /api/articles/:id | 获取单篇文章 |
| POST | /api/articles | 创建文章 |
| PUT | /api/articles/:id | 更新文章 |
| DELETE | /api/articles/:id | 删除文章 |

### 文章 JSON 结构

```json
{
  "id": "uuid",
  "title": "标题",
  "content": "Markdown 内容",
  "theme": "主题名称",
  "createdAt": "ISO 日期",
  "updatedAt": "ISO 日期"
}
```

## 5. 文章主题系统

### 主题列表 (13 种)

| ID | 名称 | 特点 |
|----|------|------|
| default | 默认 | 白色背景、蓝色链接、标准项目符号 |
| github | GitHub | GitHub 风格、灰色背景、dash 列表 |
| sepia | 护眼 | 浅褐色背景、暖色调、圆形列表符号 |
| dark | 深色 | 深色背景、浅色文字、高对比度 |
| academic | 学术 | 正式文档风格、双线标题、学术引用样式 |
| minimal | 极简 | 极简白、黑色链接、点号列表 |
| typewriter | 打字机 | 复古打字机风格、等宽字体、点状下划线 |
| forest | 森林 | 绿色自然风格、✦ 列表符号 |
| ocean | 海洋 | 蓝色海洋风格、◆ 列表符号 |
| sakura | 樱花 | 日式樱花风格、粉色系、❀ 列表符号 |
| cyberpunk | 赛博 | 霓虹风格、深色背景、荧光色 |
| magazine | 杂志 | 现代杂志风格、大字体、红黑配色 |
| mint | 薄荷 | 清新薄荷绿风格、✓ 列表符号 |

### 文章主题 CSS 变量

每个主题定义一套 `--article-*` 变量：

| 变量 | 用途 |
|------|------|
| --article-bg | 文章背景色 |
| --article-text | 正文颜色 |
| --article-text-secondary | 次要文字颜色 |
| --article-link | 链接颜色 |
| --article-link-hover | 链接悬停颜色 |
| --article-border | 边框颜色 |
| --article-code-bg | 代码块背景 |
| --article-h1-color | 一级标题颜色 |
| --article-h1-border-bottom | 一级标题下划线样式 |
| --article-list-bullet | 无序列表符号内容 |
| --article-blockquote-border | 引用块左边框 |
| --article-table-header-bg | 表头背景 |

### 架构说明

- **App 主题**: 使用 `data-theme` 属性，控制整个应用 UI
- **文章主题**: 使用 `data-article-theme` 属性，仅控制文章渲染区域
- 两者独立，互不影响

## 6. 端口配置

- 前端开发服务器: `8523`
- 后端 API 服务器: `9523`
- Vite 代理: `/api` → `http://localhost:9523`

## 7. 常用命令

```bash
# 前端开发
cd frontend && npm install && npm run dev

# 后端启动
cd backend && npm install && npm start

# 构建生产版本
cd frontend && npm run build
```
