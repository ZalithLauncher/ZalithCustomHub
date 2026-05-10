import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { en } from '@/i18n/locales/en'
import { zhCN } from '@/i18n/locales/zh-CN'

export type Locale = 'zh-CN' | 'en'

interface Messages {
  app: {
    badge: string
    title: string
    description: string
    github: string
    submit: string
    officialWebsite: string
    organization: string
    footer: string
  }
  nav: {
    gallery: string
    editor: string
  }
  home: {
    eyebrow: string
    title: string
    description: string
    empty: string
    open: string
    author: string
    countSuffix: string
  }
  detail: {
    back: string
    preview: string
    source: string
    sourceDescription: string
    download: string
    copy: string
    copied: string
    copyFailed: string
    rawLink: string
    repository: string
    loading: string
    notFound: string
    notFoundDescription: string
    previewFallback: string
    loadFailed: string
    loadFailedDescription: string
    language: string
  }
  editor: {
    title: string
    description: string
    source: string
    preview: string
    copy: string
    copied: string
    download: string
  }
  preview: {
    unsupportedEvent: string
    invalidStructure: string
  }
  common: {
    language: string
    chinese: string
    english: string
    updated: string
    backToHome: string
    pageNotFound: string
    pageNotFoundDescription: string
  }
}

const messages: Record<Locale, Messages> = {
  'zh-CN': zhCN,
  en,
}

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Messages
}

const I18nContext = createContext<I18nContextValue | null>(null)
const storageKey = 'zl2-custom-page-locale'

function detectLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh-CN'
  }

  const savedLocale = window.localStorage.getItem(storageKey)
  if (savedLocale === 'zh-CN' || savedLocale === 'en') {
    return savedLocale
  }

  return window.navigator.language.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en'
}

export function I18nProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>(detectLocale)

  useEffect(() => {
    window.localStorage.setItem(storageKey, locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: messages[locale],
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }

  return context
}
