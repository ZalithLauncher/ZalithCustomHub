import { Globe } from 'lucide-react'
import { useI18n } from '@/i18n'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div className="flex items-center gap-1 rounded-full border border-border/40 bg-background/50 p-1 backdrop-blur-sm">
      <div className="hidden items-center gap-1.5 px-2 text-[11px] font-medium text-muted-foreground lg:flex">
        <Globe className="size-3" />
        <span className="uppercase tracking-wider">{t.common.language}</span>
      </div>
      <div className="flex items-center">
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            'h-7 rounded-full px-2.5 text-xs font-medium transition-colors',
            locale === 'zh-CN' ? 'bg-foreground/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => setLocale('zh-CN')}
        >
          简中
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            'h-7 rounded-full px-2.5 text-xs font-medium transition-colors',
            locale === 'en' ? 'bg-foreground/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => setLocale('en')}
        >
          EN
        </Button>
      </div>
    </div>
  )
}
