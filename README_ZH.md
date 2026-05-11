# ZL2 自定义页面中心 (Custom Page Hub)

ZL2 自定义页面中心是一个用于展示社区制作的 Zalith Launcher 2 自定义主页文件的静态站点。该站点会列出所有投稿作品，提供完整的浏览器端预览，并支持源码下载和原始文件链接。

## 技术栈

- `Vite + React + TypeScript`
- `Tailwind CSS` + shadcn 风格 UI 组件
- 浏览器端 Markdown 渲染（集成轻量级 ZL2 扩展语法解析器）
- 静态部署目标：`EdgeOne Pages`
- 移动端优先的响应式布局，涵盖画廊、详情和编辑器页面

## 本地开发

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run build:submissions    # 构建投稿索引
npm run validate:submissions # 校验投稿格式
npm run build               # 构建生产版本
```

本地验证时的常用路由：

```text
/
/works/monochrome-launcher
/editor
```

## 仓库结构

```text
submissions/
  <slug>/
    manifest.json
    page.md
    cover.png
src/
  generated/
  pages/
  components/
scripts/
```

## 投稿规则

每个作品必须位于 `submissions/<slug>/` 下的独立目录中。

必要文件：

- `manifest.json`
- `page.md`
- `cover.png`（或在 `manifest.json` 中 `cover` 字段指定的其他图像文件）

`manifest.json` 必要字段：

```json
{
  "title": "作品标题",
  "author": "创作者名称",
  "description": "用于列表页的简短摘要",
  "cover": "cover.png"
}
```

可选字段：

- `locale`: 语言设置 (`zh-CN` 或 `en`)
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

## 投稿流程

1. Fork 本仓库。
2. 在 `submissions/<slug>/` 下创建新目录。
3. 添加 `manifest.json`、`page.md` 和封面图片。
4. 运行 `npm run validate:submissions` 进行校验。
5. 使用提供的模板发起 Pull Request。

## 部署说明

- 构建输出目录：`dist`
- 建议的环境变量：
  - `VITE_GITHUB_OWNER`
  - `VITE_GITHUB_REPO`
  - `VITE_GITHUB_BRANCH`
- 推荐自定义域名：`custom.zalithlauncher.cn`
- 本项目使用 `HashRouter` 以兼容 EdgeOne 静态部署。
- 生产环境路由访问方式：
  - `/#/`
  - `/#/works/<slug>`
  - `/#/editor`
- 保留 `public/404.html` 用于将旧的干净路径（如 `/works/<slug>`）重定向到对应的哈希路由。

## 编辑器页面

- 路由：`/#/editor`
- 功能：
  - 在浏览器中直接编写 ZL2 Markdown 源码
  - 实时查看渲染结果
  - 复制源码内容
  - 将当前 Markdown 下载为 `.md` 文件
