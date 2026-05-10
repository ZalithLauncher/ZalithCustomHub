import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SubmissionHeader } from '@/components/submission-header'
import { SourceActions } from '@/components/source-actions'
import { Zl2Renderer } from '@/components/zl2-renderer'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { submissions } from '@/generated/submissions-index'
import { useI18n } from '@/i18n'
import { parseZl2Document } from '@/lib/zl2-parser'
import type { SubmissionRecord } from '@/types/submission'

interface SubmissionDetailContentProps {
  submission: SubmissionRecord
}

function SubmissionDetailContent({ submission }: SubmissionDetailContentProps) {
  const { t } = useI18n()
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    let active = true

    fetch(submission.markdownPath)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${submission.markdownPath}`)
        }
        return response.text()
      })
      .then((text) => {
        if (active) {
          setLoadFailed(false)
          setMarkdown(text)
        }
      })
      .catch(() => {
        if (active) {
          setLoadFailed(true)
          setMarkdown('')
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [submission])

  const parsedDocument = useMemo(() => parseZl2Document(markdown), [markdown])

  return (
    <div className="grid gap-4 sm:gap-6 xl:grid-cols-[0.9fr_1.5fr]">
      <div className="space-y-6">
        <SubmissionHeader submission={submission} />
        <SourceActions
          slug={submission.slug}
          markdownPath={submission.markdownPath}
          rawUrl={submission.rawUrl}
          blobUrl={submission.blobUrl}
        />
      </div>
      <Card className="bg-background/90">
        <CardHeader>
          <CardTitle>{t.detail.preview}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">{t.detail.loading}</p>
          ) : loadFailed ? (
            <EmptyState
              title={t.detail.loadFailed}
              description={t.detail.loadFailedDescription}
            />
          ) : markdown ? (
            <Zl2Renderer document={parsedDocument} />
          ) : (
            <p className="text-sm text-muted-foreground">{t.detail.previewFallback}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function SubmissionDetailPage() {
  const { slug = '' } = useParams()
  const { t } = useI18n()
  const submission = submissions.find((item) => item.slug === slug)

  if (!submission) {
    return (
      <section className="space-y-6">
        <Button asChild variant="outline">
          <Link to="/">
            <ArrowLeft />
            {t.detail.back}
          </Link>
        </Button>
        <EmptyState title={t.detail.notFound} description={t.detail.notFoundDescription} />
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <Button asChild variant="outline" className="w-full sm:w-auto">
        <Link to="/">
          <ArrowLeft />
          {t.detail.back}
        </Link>
      </Button>
      <SubmissionDetailContent key={submission.slug} submission={submission} />
    </section>
  )
}
