import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SubmissionRecord } from '@/types/submission'
import { useI18n } from '@/i18n'

interface SubmissionHeaderProps {
  submission: SubmissionRecord
}

export function SubmissionHeader({ submission }: SubmissionHeaderProps) {
  const { t } = useI18n()

  return (
    <Card className="bg-background/90">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{submission.locale ?? 'zh-CN'}</Badge>
          <Badge>{submission.author}</Badge>
        </div>
        <CardTitle className="text-2xl sm:text-3xl">{submission.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground sm:text-base">{submission.description}</p>
        <div className="grid gap-2 text-sm text-muted-foreground sm:flex sm:flex-wrap sm:gap-4">
          <span className="break-all sm:break-normal">
            {t.home.author}: {submission.author}
          </span>
          <span>
            {t.common.updated}: {submission.updatedAt ?? submission.createdAt ?? '-'}
          </span>
          <span>
            {t.detail.language}: {submission.locale ?? 'zh-CN'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
