import { Link } from 'react-router-dom'
import { ArrowRight, UserRound } from 'lucide-react'
import type { SubmissionRecord } from '@/types/submission'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n'

interface SubmissionCardProps {
  submission: SubmissionRecord
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  const { t } = useI18n()

  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-background/90 transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
        <img
          src={submission.coverPath}
          alt={submission.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardHeader className="space-y-3">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Badge variant="outline">{submission.locale ?? 'zh-CN'}</Badge>
          <span className="text-xs text-muted-foreground">
            {t.common.updated}: {submission.updatedAt ?? submission.createdAt ?? '-'}
          </span>
        </div>
        <CardTitle className="text-lg sm:text-xl">{submission.title}</CardTitle>
        <CardDescription>{submission.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UserRound className="size-4" />
          <span>
            {t.home.author}: {submission.author}
          </span>
        </div>
        <p className="line-clamp-4 text-sm text-foreground/80">{submission.previewText}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="h-11 w-full">
          <Link to={`/works/${submission.slug}`} className="!text-white">
            {t.home.open}
            <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
