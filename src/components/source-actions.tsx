import { useState } from 'react'
import { Copy, Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n'

interface SourceActionsProps {
  slug: string
  markdownPath: string
  rawUrl: string
  blobUrl: string
}

export function SourceActions({
  slug,
  markdownPath,
  rawUrl,
  blobUrl,
}: SourceActionsProps) {
  const { t } = useI18n()
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  // Generate the site URL based on the markdown path
  const siteUrl = typeof window !== 'undefined' 
    ? new URL(markdownPath, window.location.origin).href 
    : rawUrl

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(siteUrl)
      setStatus('copied')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('failed')
    }
  }

  return (
    <Card className="bg-background/90">
      <CardHeader>
        <CardTitle>{t.detail.source}</CardTitle>
        <CardDescription>{t.detail.sourceDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild className="h-11 w-full sm:w-auto">
            <a href={markdownPath} download={`${slug}.md`} className="!text-white">
              <Download />
              {t.detail.download}
            </a>
          </Button>
          <Button variant="outline" className="h-11 w-full sm:w-auto" onClick={handleCopy}>
            <Copy />
            {status === 'copied' ? t.detail.copied : t.detail.copy}
          </Button>
          <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
            <a href={blobUrl} target="_blank" rel="noreferrer">
              <ExternalLink />
              {t.detail.repository}
            </a>
          </Button>
        </div>
        {status === 'failed' ? (
          <div className="space-y-2 rounded-2xl border border-border bg-muted/70 p-4">
            <p className="text-sm text-muted-foreground">{t.detail.copyFailed}</p>
            <input
              readOnly
              value={siteUrl}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm break-all"
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
