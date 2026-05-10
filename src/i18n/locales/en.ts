export const en = {
  app: {
    badge: 'Community Gallery',
    title: 'ZL2 Custom Page Hub',
    description:
      'Browse community-submitted ZL2 custom pages with full browser previews, source downloads, and raw file links.',
    github: 'GitHub Repository',
    submit: 'Submission Guide',
    officialWebsite: 'Official Website',
    organization: 'GitHub Org',
    footer: 'Static site with browser-side Markdown and ZL2 extension rendering',
  },
  nav: {
    gallery: 'Gallery',
    editor: 'Editor',
  },
  home: {
    eyebrow: 'Show existing pages and previews first',
    title: 'Explore community-made homepages',
    description:
      'Each work lives in its own repository directory. Cards prefer the submitted cover and gracefully fall back to text excerpts.',
    empty: 'No works yet. Submit the first ZL2 custom page to get started.',
    open: 'Open full preview',
    author: 'Author',
    countSuffix: 'works',
  },
  detail: {
    back: 'Back to gallery',
    preview: 'Full preview',
    source: 'Source access',
    sourceDescription: 'Download the Markdown file or copy the GitHub raw file link.',
    download: 'Download MD',
    copy: 'Copy raw link',
    copied: 'Link copied',
    copyFailed: 'Copy failed. Please copy the link manually below.',
    rawLink: 'Raw link',
    repository: 'Open in repository',
    loading: 'Loading Markdown...',
    notFound: 'Work not found',
    notFoundDescription: 'Return to the gallery and choose another work, or verify the slug.',
    previewFallback: 'This work does not have renderable content yet.',
    loadFailed: 'Preview failed to load',
    loadFailedDescription:
      'The Markdown file could not be loaded. Check the static asset path and SPA fallback configuration.',
    language: 'Language',
  },
  editor: {
    title: 'Editor',
    description:
      'Write ZL2 Markdown directly in the browser and preview the rendered result in real time before exporting.',
    source: 'Source',
    preview: 'Live preview',
    copy: 'Copy source',
    copied: 'Source copied',
    download: 'Download MD',
  },
  preview: {
    unsupportedEvent: 'This event only works inside ZL2',
    invalidStructure: 'Unclosed or unknown extension syntax was detected and safely downgraded.',
  },
  common: {
    language: 'Language',
    chinese: '简中',
    english: 'English',
    updated: 'Updated',
    backToHome: 'Back to home',
    pageNotFound: 'Page not found',
    pageNotFoundDescription:
      'There is no page for this path. Go back home or use the site navigation.',
  },
} as const
