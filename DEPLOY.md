# GitHub Pages 部署指南

## 项目概述

本项目使用 Vue + Vite 构建，通过 GitHub Actions 自动部署到 GitHub Pages。

- 仓库地址：https://github.com/Penicillinn/pages-test
- 访问地址：https://penicillinn.github.io/pages-test/

## 分支说明

| 分支 | 用途 |
|------|------|
| `main` | 原生 HTML/CSS/JS 页面（静态页面演示） |
| `vue-project` | Vue + Vite 工程化项目源代码 |
| `gh-pages` | 部署分支，存放构建产物（由 GitHub Actions 自动生成和维护） |

## 部署原理

```
vue-project 分支（源代码）
    ↓ git push 触发
GitHub Actions
    ↓ npm install → npm run build
生成 dist/ 目录
    ↓ peaceiris/actions-gh-pages
gh-pages 分支（只存放静态文件）
    ↓ GitHub Pages 读取
https://penicillinn.github.io/pages-test/
```

## 日常开发流程

### 1. 克隆项目

```bash
git clone https://github.com/Penicillinn/pages-test.git
cd pages-test
git checkout vue-project
npm install
```

### 2. 本地开发

```bash
npm run dev
```

浏览器打开 `http://localhost:5173` 即可预览。

### 3. 修改代码并部署

```bash
# 修改代码后
git add -A
git commit -m "描述你的修改"
git push
```

推送后 GitHub Actions 会自动触发构建和部署，无需手动操作。

### 4. 查看部署进度

1. 打开 GitHub 仓库页面
2. 点击顶部 **Actions** 标签页
3. 查看最新的工作流运行状态：
   - 🟡 黄色旋转图标 = 正在运行
   - 🟢 绿色勾 = 部署成功
   - 🔴 红色叉 = 部署失败（点击查看日志排查）
4. 部署成功后约 1-2 分钟，刷新访问地址即可看到更新

## 配置说明

### vite.config.js

```js
export default defineConfig({
  plugins: [vue()],
  base: '/pages-test/', // 必须与仓库名一致
})
```

`base` 配置必须与 GitHub 仓库名一致，否则资源路径会 404。

### .github/workflows/deploy.yml

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [vue-project]  # 监听 vue-project 分支的推送

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: gh-pages
```

## GitHub Pages 设置（仅首次需要）

1. 打开仓库 **Settings → Pages**
2. **Source** 选择 `Deploy from a branch`
3. **Branch** 选择 `gh-pages`，目录选 `/ (root)`
4. 点击 **Save**

## 常见问题

### 页面显示空白或 404

1. 检查 `vite.config.js` 中的 `base` 是否与仓库名一致
2. 确认 GitHub Pages 设置中的分支选的是 `gh-pages`
3. 检查 Actions 是否成功运行

### Actions 运行失败

1. 点击失败的运行记录查看日志
2. 常见原因：依赖安装失败、构建报错
3. 先在本地执行 `npm run build` 确认能正常构建

### 部署后页面没更新

- GitHub Pages 有缓存，部署成功后等待 1-2 分钟再刷新
- 可以尝试强制刷新（Ctrl+Shift+R 或 Cmd+Shift+R）