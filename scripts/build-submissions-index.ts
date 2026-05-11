import { mkdir, readdir, readFile, rm, stat, writeFile, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

interface SubmissionManifest {
  title: string
  author: string
  description: string
  cover: string
  locale?: 'zh-CN' | 'en'
  createdAt?: string
  updatedAt?: string
}

interface SubmissionRecord extends SubmissionManifest {
  slug: string
  coverPath: string
  markdownPath: string
  rawUrl: string
  blobUrl: string
  previewText: string
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const submissionsDir = path.join(rootDir, 'submissions')
const publicSubmissionsDir = path.join(rootDir, 'public', 'submissions')
const outputFile = path.join(rootDir, 'src', 'generated', 'submissions-index.ts')

const githubOwner = process.env.VITE_GITHUB_OWNER ?? 'zalithlauncher'
const githubRepo = process.env.VITE_GITHUB_REPO ?? 'zalithcustomhub'
const githubBranch = process.env.VITE_GITHUB_BRANCH ?? 'main'

function buildRawUrl(filePath: string) {
  return `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/${githubBranch}/${filePath}`
}

function buildBlobUrl(filePath: string) {
  return `https://github.com/${githubOwner}/${githubRepo}/blob/${githubBranch}/${filePath}`
}

function createPreviewText(markdown: string) {
  return markdown
    .replace(/^\/\/.*$/gm, '')
    .replace(/^\.\.\..*$/gm, '')
    .replace(/[#>*`[\]-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)
}

async function ensureDirectory(pathname: string) {
  await mkdir(pathname, { recursive: true })
}

async function isDirectory(pathname: string) {
  const entryStat = await stat(pathname)
  return entryStat.isDirectory()
}

async function main() {
  await ensureDirectory(path.dirname(outputFile))
  await ensureDirectory(publicSubmissionsDir)
  await rm(publicSubmissionsDir, { recursive: true, force: true })
  await ensureDirectory(publicSubmissionsDir)

  const records: SubmissionRecord[] = []
  const entries = await readdir(submissionsDir, { withFileTypes: true }).catch(() => [])

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue
    }

    const slug = entry.name
    const submissionRoot = path.join(submissionsDir, slug)
    if (!(await isDirectory(submissionRoot))) {
      continue
    }

    const manifestPath = path.join(submissionRoot, 'manifest.json')
    const markdownPath = path.join(submissionRoot, 'page.md')
    const manifest = JSON.parse(
      await readFile(manifestPath, 'utf8'),
    ) as SubmissionManifest
    const markdown = await readFile(markdownPath, 'utf8')
    const publicTargetDir = path.join(publicSubmissionsDir, slug)

    await ensureDirectory(publicTargetDir)
    await copyFile(markdownPath, path.join(publicTargetDir, 'page.md'))
    await copyFile(
      path.join(submissionRoot, manifest.cover),
      path.join(publicTargetDir, manifest.cover),
    )

    const relativeMarkdownPath = `submissions/${slug}/page.md`
    records.push({
      ...manifest,
      slug,
      coverPath: `/${path.posix.join('submissions', slug, manifest.cover)}`,
      markdownPath: `/${relativeMarkdownPath}`,
      rawUrl: buildRawUrl(relativeMarkdownPath),
      blobUrl: buildBlobUrl(relativeMarkdownPath),
      previewText: createPreviewText(markdown),
    })
  }

  records.sort((a, b) => {
    const left = a.updatedAt ?? a.createdAt ?? ''
    const right = b.updatedAt ?? b.createdAt ?? ''
    return right.localeCompare(left) || a.title.localeCompare(b.title)
  })

  const fileContents = `import type { SubmissionRecord } from '@/types/submission'

export const submissions: SubmissionRecord[] = ${JSON.stringify(records, null, 2)}
`

  await writeFile(outputFile, fileContents)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
