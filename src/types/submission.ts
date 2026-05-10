export type SubmissionLocale = 'zh-CN' | 'en'

export interface SubmissionManifest {
  title: string
  author: string
  description: string
  cover: string
  locale?: SubmissionLocale
  createdAt?: string
  updatedAt?: string
}

export interface SubmissionRecord extends SubmissionManifest {
  slug: string
  coverPath: string
  markdownPath: string
  rawUrl: string
  blobUrl: string
  previewText: string
}
