# MD 文章渲染器

一款支持 **13 种精选主题** 的 Markdown 文章编写与排版工具。基于 Vue 3 + Express.js 构建。

![预览](https://img.shields.io/badge/Vue-3-42b883?style=flat-square)
![预览](https://img.shields.io/badge/Node.js-Express.js-green?style=flat-square)
![预览](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## 特性

- **13 种文章主题**：默认、GitHub、护眼、深色、学术、极简、打字机、森林、海洋、樱花、赛博、杂志、薄荷
- **实时预览**：左右分栏布局，所见即所得
- **富文本复制**：一键复制渲染后的 HTML，粘贴到 Word 等编辑器保留样式
- **JSON 存储**：轻量级后端，无需数据库

## 快速开始

### 1. 安装依赖

```bash
# 前端
cd frontend && npm install

# 后端
cd backend && npm install
```

### 2. 启动服务

```bash
# 终端 1 - 后端 (端口 9523)
cd backend && npm start

# 终端 2 - 前端 (端口 8523)
cd frontend && npm run dev
```

### 3. 访问

打开浏览器访问 **http://localhost:8523**

## 项目结构

```
article_helper/
├── frontend/           # Vue 3 前端
│   ├── src/
│   │   ├── components/ # Editor, Preview, ThemeSelector, ArticleList
│   │   ├── views/      # Home (编辑), List (列表)
│   │   ├── stores/     # Pinia 状态管理
│   │   ├── themes/     # 13 种文章主题 CSS
│   │   └── api/        # API 调用
│   └── vite.config.js
│
└── backend/            # Express 后端
    ├── routes/         # CRUD API
    └── data/           # JSON 存储
```

## API

| 方法 | 路径 | 描述 |
|:---:|:---|:---|
| GET | /api/articles | 获取文章列表 |
| GET | /api/articles/:id | 获取单篇文章 |
| POST | /api/articles | 创建文章 |
| PUT | /api/articles/:id | 更新文章 |
| DELETE | /api/articles/:id | 删除文章 |

## 文章主题

| ID | 名称 | 风格 |
|:---|:---|:---|
| default | 默认 | 紫蓝渐变标题 |
| github | GitHub | 程序员风格 |
| sepia | 护眼 | 信纸横线格 |
| dark | 深色 | 暗色点阵 |
| academic | 学术 | 论文双线标题 |
| minimal | 极简 | 无装饰 |
| typewriter | 打字机 | 复古等宽字体 |
| forest | 森林 | 绿色自然 |
| ocean | 海洋 | 蓝色海洋 |
| sakura | 樱花 | 日式粉色 |
| cyberpunk | 赛博 | 霓虹发光 |
| magazine | 杂志 | 红黑大字体 |
| mint | 薄荷 | 清新绿 |

## 技术栈

- **前端**: Vue 3, Vite, Pinia, markdown-it, vue-router
- **后端**: Express.js, UUID, CORS

## License

MIT
