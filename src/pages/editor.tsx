import { useMemo, useState } from 'react'
import { EditorPane } from '@/components/editor/editor-pane'
import { defaultEditorValue } from '@/components/editor/editor-default'
import { PreviewPane } from '@/components/editor/preview-pane'
import { EditorToolbar } from '@/components/editor/editor-toolbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n'
import { parseZl2Document } from '@/lib/zl2-parser'

function downloadMarkdown(source: string) {
  const blob = new Blob([source], { type: 'text/markdown;charset=utf-8' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'zl2-custom-page.md'
  link.click()
  window.URL.revokeObjectURL(url)
}

export function EditorPage() {
  const { t } = useI18n()
  const [source, setSource] = useState(defaultEditorValue)
  const [copied, setCopied] = useState(false)
  const parsedDocument = useMemo(() => parseZl2Document(source), [source])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(source)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="space-y-6">
      <Card className="bg-background/90">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl sm:text-3xl">{t.editor.title}</CardTitle>
          <CardDescription className="max-w-3xl text-sm leading-6 sm:text-base">
            {t.editor.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <EditorToolbar
            onCopy={handleCopy}
            onDownload={() => downloadMarkdown(source)}
            copyLabel={copied ? t.editor.copied : t.editor.copy}
            downloadLabel={t.editor.download}
          />
        </CardContent>
      </Card>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="bg-background/90">
          <CardContent className="p-4 sm:p-6">
            <EditorPane value={source} onChange={setSource} label={t.editor.source} />
          </CardContent>
        </Card>
        <Card className="bg-background/90">
          <CardContent className="p-4 sm:p-6">
            <PreviewPane title={t.editor.preview} document={parsedDocument} />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
