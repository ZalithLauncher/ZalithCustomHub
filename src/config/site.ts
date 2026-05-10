const siteUrl = 'https://custom.zalithlauncher.cn'

export const siteConfig = {
  name: 'ZL2 Custom Page Hub',
  description: 'Community-built ZL2 custom pages with live browser previews.',
  siteUrl,
  githubOwner: import.meta.env.VITE_GITHUB_OWNER ?? 'zalithlauncher',
  githubRepo: import.meta.env.VITE_GITHUB_REPO ?? 'zalithcostumehub',
  githubBranch: import.meta.env.VITE_GITHUB_BRANCH ?? 'main',
} as const

export function buildGithubRawUrl(filePath: string) {
  return `https://raw.githubusercontent.com/${siteConfig.githubOwner}/${siteConfig.githubRepo}/${siteConfig.githubBranch}/${filePath}`
}

export function buildGithubBlobUrl(filePath: string) {
  return `https://github.com/${siteConfig.githubOwner}/${siteConfig.githubRepo}/blob/${siteConfig.githubBranch}/${filePath}`
}

export function toPublicSubmissionAsset(slug: string, fileName: string) {
  return `/submissions/${slug}/${fileName}`
}
