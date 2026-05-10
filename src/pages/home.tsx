import { submissions } from '@/generated/submissions-index'
import { SubmissionGrid } from '@/components/submission-grid'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

export function HomePage() {
  const { t } = useI18n()

  return (
    <section className="space-y-8">
      <div className="grid gap-4 md:gap-6">
        <div className="rounded-[2rem] border border-border bg-background/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)] sm:p-8">
          <Badge variant="outline" className="mb-4">
            {t.home.eyebrow}
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
            {t.home.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-lg">
            {t.home.description}
          </p>
        </div>
      </div>
      <SubmissionGrid submissions={submissions} />
    </section>
  )
}
