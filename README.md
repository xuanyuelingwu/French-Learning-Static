# 新无国界法语学习助手（静态版）

Le Nouveau Sans Frontières - Unité 1 & 2 学习网站

## 功能特点

- 📚 **词汇库**：424个词汇按单元和课文分类，包含音标和例句
- 📖 **语法知识**：15个语法点系统讲解，包括疑问句、命令式、否定句等
- 🔄 **动词变位**：32个动词的完整现在时变位表
- 📝 **课文对照**：25篇课文的法语原文和中文翻译逐句对照
- 🔍 **词性分类**：按名词（阴性/阳性）、动词、形容词等分类展示

## 技术栈

- React 19 + TypeScript
- Tailwind CSS 4
- Vite
- Wouter (路由)
- shadcn/ui (UI组件)

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 部署

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

每次推送到 `main` 分支时，会自动触发构建和部署流程。

## 数据来源

所有学习数据（词汇、语法、动词变位、课文）均来自《新无国界法语》第一册第一、二单元。

## License

MIT
