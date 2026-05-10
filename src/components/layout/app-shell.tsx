import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { SiteNav } from '@/components/layout/site-nav'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { useI18n } from '@/i18n'

export function AppShell({ children }: PropsWithChildren) {
  const { t } = useI18n()

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl flex-col justify-center gap-4 px-4 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-0 lg:px-8">
          {/* Logo & Navigation */}
          <div className="flex items-center justify-between sm:justify-start sm:gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                {t.app.title}
              </h1>
              <Badge variant="outline" className="hidden sm:inline-flex rounded-full px-2 py-0 text-[10px] bg-muted/30 border-muted-foreground/20 font-medium">
                {t.app.badge}
              </Badge>
            </Link>
            
            {/* 移动端的 LanguageSwitcher 移到这里 */}
            <div className="sm:hidden">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Navigation (Mobile: Row 2, Desktop: Row 1) */}
          <div className="flex items-center justify-between sm:hidden">
             <SiteNav />
             <Button asChild variant="default" size="sm" className="rounded-full px-4 h-8 text-xs font-medium">
              <a
                href={`https://github.com/${siteConfig.githubOwner}/${siteConfig.githubRepo}#readme`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center !text-white"
              >
                {t.app.submit}
              </a>
            </Button>
          </div>

          {/* Actions & Language (Desktop only) */}
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <div className="hidden sm:flex">
               <SiteNav />
            </div>
            <div className="hidden sm:block h-4 w-px bg-border"></div>
            <LanguageSwitcher />
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <a
                  href={`https://github.com/${siteConfig.githubOwner}/${siteConfig.githubRepo}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t.app.github}
                </a>
              </Button>
              <Button asChild variant="default" size="sm" className="rounded-full font-medium">
                <a
                  href={`https://github.com/${siteConfig.githubOwner}/${siteConfig.githubRepo}#readme`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center !text-white"
              >
                  {t.app.submit}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        {/* We keep the description text here as a page header instead of global nav */}
        <div className="mb-8 hidden sm:block">
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t.app.description}
          </p>
        </div>
        {children}
      </main>

      <footer className="mx-auto w-full max-w-7xl border-t border-border/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img src="/zl_icon.webp" alt="Zalith Launcher" className="w-10 h-10 rounded-xl shadow-sm" />
            <span className="font-bold text-lg tracking-tight text-foreground">Zalith Launcher</span>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href="https://www.zalithlauncher.cn" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              {t.app.officialWebsite}
            </a>
            <a href="https://github.com/ZalithLauncher" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              {t.app.organization}
            </a>
          </div>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <p>版权所有 © {new Date().getFullYear()} Zalith Launcher | MIT 许可证</p>
            <p className="flex items-center gap-2">
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                新ICP备2024015133号-4
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
