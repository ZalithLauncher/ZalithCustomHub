import { access, readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const submissionsDir = path.join(rootDir, 'submissions')

interface SubmissionManifest {
  title?: string
  author?: string
  description?: string
  cover?: string
  locale?: 'zh-CN' | 'en'
  createdAt?: string
  updatedAt?: string
}

async function fileExists(pathname: string) {
  try {
    await access(pathname)
    return true
  } catch {
    return false
  }
}

async function main() {
  const slugSet = new Set<string>()
  const entries = await readdir(submissionsDir, { withFileTypes: true }).catch(() => [])
  const errors: string[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue
    }

    const slug = entry.name
    if (slugSet.has(slug)) {
      errors.push(`Duplicate slug detected: ${slug}`)
      continue
    }
    slugSet.add(slug)

    const submissionRoot = path.join(submissionsDir, slug)
    const entryStat = await stat(submissionRoot)
    if (!entryStat.isDirectory()) {
      continue
    }

    const manifestPath = path.join(submissionRoot, 'manifest.json')
    const markdownPath = path.join(submissionRoot, 'page.md')

    if (!(await fileExists(manifestPath))) {
      errors.push(`[${slug}] missing manifest.json`)
      continue
    }

    if (!(await fileExists(markdownPath))) {
      errors.push(`[${slug}] missing page.md`)
    }

    const manifest = JSON.parse(
      await readFile(manifestPath, 'utf8'),
    ) as SubmissionManifest

    for (const field of ['title', 'author', 'description', 'cover'] as const) {
      if (!manifest[field]) {
        errors.push(`[${slug}] missing required field: ${field}`)
      }
    }

    if (manifest.cover) {
      const coverPath = path.join(submissionRoot, manifest.cover)
      if (!(await fileExists(coverPath))) {
        errors.push(`[${slug}] missing cover file: ${manifest.cover}`)
      }
    }
  }

  if (errors.length) {
    console.error('Submission validation failed:\n')
    for (const error of errors) {
      console.error(`- ${error}`)
    }
    process.exitCode = 1
    return
  }

  console.log('Submission validation passed.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
