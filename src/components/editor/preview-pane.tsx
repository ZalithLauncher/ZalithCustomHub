import { Zl2Renderer } from '@/components/zl2-renderer'
import type { Zl2Document } from '@/lib/zl2-ast'

interface PreviewPaneProps {
  title: string
  document: Zl2Document
}

export function PreviewPane({ title, document }: PreviewPaneProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Zl2Renderer document={document} />
    </section>
  )
}
