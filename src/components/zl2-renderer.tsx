import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AlertTriangle } from 'lucide-react'
import type { Zl2Document, Zl2Node } from '@/lib/zl2-ast'
import { Zl2ButtonNodeView } from '@/components/zl2-nodes/zl2-button-node'
import { Zl2CardNodeView } from '@/components/zl2-nodes/zl2-card-node'
import { Zl2ImageNodeView } from '@/components/zl2-nodes/zl2-image-node'
import { Zl2LayoutNodeView } from '@/components/zl2-nodes/zl2-layout-node'
import { Card, CardContent } from '@/components/ui/card'
import { useI18n } from '@/i18n'

interface Zl2RendererProps {
  document: Zl2Document
}

function renderNode(node: Zl2Node, key: string): ReactNode {
  if (node.type === 'markdown') {
    return (
      <div key={key} className="markdown-body text-sm leading-7 text-foreground sm:text-base">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{node.content}</ReactMarkdown>
      </div>
    )
  }

  if (node.type === 'button') {
    return <Zl2ButtonNodeView key={key} node={node} />
  }

  if (node.type === 'image') {
    return <Zl2ImageNodeView key={key} node={node} />
  }

  if (node.type === 'card') {
    return (
      <Zl2CardNodeView key={key} node={node}>
        <div className="space-y-4">
          {node.children.map((child, index) => renderNode(child, `${key}-card-${index}`))}
        </div>
      </Zl2CardNodeView>
    )
  }

  if (node.type === 'row' || node.type === 'column') {
    return (
      <Zl2LayoutNodeView key={key} node={node}>
        {node.children.map((child, index) => renderNode(child, `${key}-layout-${index}`))}
      </Zl2LayoutNodeView>
    )
  }

  return (
    <pre
      key={key}
      className="overflow-x-auto rounded-2xl border border-dashed border-border bg-muted/60 p-4 text-xs text-muted-foreground"
    >
      {node.raw}
    </pre>
  )
}

export function Zl2Renderer({ document }: Zl2RendererProps) {
  const { t } = useI18n()

  return (
    <div className="space-y-5">
      {document.warnings.length ? (
        <Card className="border-dashed bg-muted/70">
          <CardContent className="flex items-start gap-3 p-4 text-sm text-muted-foreground">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>{t.preview.invalidStructure}</span>
          </CardContent>
        </Card>
      ) : null}
      <div className="space-y-4 overflow-hidden rounded-[1.5rem] border border-border bg-gradient-to-b from-white to-neutral-100 p-4 sm:space-y-5 sm:rounded-[1.75rem] sm:p-5">
        {document.nodes.map((node, index) => renderNode(node, `node-${index}`))}
      </div>
    </div>
  )
}
