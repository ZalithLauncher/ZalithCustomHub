# ZL2 Custom Page Hub

[English](README.md) | [简体中文](README_ZH.md)

Static showcase for community-made ZL2 custom homepage files. The site lists submitted works first, opens a full browser-side preview, and provides both source downloads and raw file links.

## Stack

- `Vite + React + TypeScript`
- `Tailwind CSS` + shadcn-style UI components
- Browser-side Markdown rendering with a lightweight ZL2 extension parser
- Static deployment target: `EdgeOne Pages`
- Mobile-first responsive layouts for gallery, detail, and editor pages

## Local Development

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build:submissions
npm run validate:submissions
npm run build
```

Useful routes during local verification:

```text
/
/works/monochrome-launcher
/editor
```

## Repository Structure

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

## Submission Rules

Each work must live in its own directory under `submissions/<slug>/`.

Required files:

- `manifest.json`
- `page.md`
- `cover.png` or another image file referenced by `cover`

Required `manifest.json` fields:

```json
{
  "title": "Work title",
  "author": "Creator name",
  "description": "Short summary for the listing page",
  "cover": "cover.png"
}
```

Optional fields:

- `locale`
- `createdAt`
- `updatedAt`

## Submission Workflow

1. Fork the repository.
2. Create a new directory in `submissions/<slug>/`.
3. Add `manifest.json`, `page.md`, and a cover image.
4. Run `npm run validate:submissions`.
5. Open a Pull Request using the provided template.

## Deployment Notes

- Build output directory: `dist`
- Suggested environment variables:
  - `VITE_GITHUB_OWNER`
  - `VITE_GITHUB_REPO`
  - `VITE_GITHUB_BRANCH`
- Recommended custom domain: `custom.zalithlauncher.cn`
- Skills Repository: `https://github.com/leemwood/zl2-custom-page`
- This project uses `HashRouter` for EdgeOne static deployment compatibility.
- Production routes should be accessed as:
  - `/#/`
  - `/#/works/<slug>`
  - `/#/editor`
- `public/404.html` is retained to redirect old clean-path visits such as `/works/<slug>` to the equivalent hash route.

## Editor Page

- Route: `/#/editor`
- Features:
  - Edit ZL2 Markdown source in the browser
  - Preview rendered output in real time
  - Copy source content
  - Download the current Markdown as `.md`
