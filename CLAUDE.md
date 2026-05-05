# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**MD 文章渲染器** - 一个支持 13 种文章主题选择的 Markdown 文章编写与排版工具。前端基于 Vue 3，后端使用 JSON 文件存储文章。

## 技术栈

- **前端**: Vue 3 + Vite + TypeScript
- **Markdown 解析**: markdown-it
- **主题系统**: CSS Variables + `data-article-theme` 属性
- **后端**: Express.js (Node.js)
- **数据存储**: JSON 文件

## 架构设计

```
article_helper/
├── frontend/src/
│   ├── components/         # Vue 组件
│   ├── views/              # 页面视图
│   ├── stores/              # Pinia 状态管理
│   ├── themes/              # 主题 CSS 文件
│   │   ├── variables.css    # App 级 CSS 变量
│   │   ├── article.css      # 文章主题 CSS 变量 (13种)
│   │   └── article-preview.css # 文章内容渲染样式
│   └── api/                 # API 调用封装
└── backend/                 # Express 后端
```

## 主题系统架构

- **App 主题** (`data-theme`): 控制整个应用 UI 外观
- **文章主题** (`data-article-theme`): 控制文章渲染区域的样式，包括背景、颜色、标题、列表等

两者独立，互不影响。

## 常用命令

```bash
# 前端开发 (端口 8523)
cd frontend && npm run dev

# 后端启动 (端口 9523)
cd backend && npm start

# 构建生产版本
cd frontend && npm run build
```

## API 设计

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/articles | 获取文章列表 |
| GET | /api/articles/:id | 获取单篇文章 |
| POST | /api/articles | 创建文章 |
| PUT | /api/articles/:id | 更新文章 |
| DELETE | /api/articles/:id | 删除文章 |

## 文章主题 (13 种)

| ID | 名称 | 说明 |
|----|------|------|
| default | 默认 | 白色背景、蓝色链接 |
| github | GitHub | GitHub 风格 |
| sepia | 护眼 | 浅褐色背景 |
| dark | 深色 | 深色模式 |
| academic | 学术 | 正式文档风格、双线标题 |
| minimal | 极简 | 极简风格 |
| typewriter | 打字机 | 复古打字机风格、等宽字体 |
| forest | 森林 | 绿色自然风格 |
| ocean | 海洋 | 蓝色海洋风格 |
| sakura | 樱花 | 日式樱花风格 |
| cyberpunk | 赛博 | 霓虹赛博朋克风格 |
| magazine | 杂志 | 现代杂志风格 |
| mint | 薄荷 | 清新薄荷绿风格 |
