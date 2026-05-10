import type { CSSProperties, PropsWithChildren } from 'react'
import type { Zl2CardNode } from '@/lib/zl2-ast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function parseShape(value?: string) {
  if (!value) {
    return undefined
  }

  if (value.endsWith('dp')) {
    return `${Number.parseFloat(value)}px`
  }

  return value
}

function parsePadding(value?: string): CSSProperties['padding'] {
  if (!value) {
    return undefined
  }

  const parts = value
    .replace(/[()]/g, '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (parts.length === 1) {
    return `${Number.parseFloat(parts[0])}px`
  }

  if (parts.length === 2) {
    return `${Number.parseFloat(parts[1])}px ${Number.parseFloat(parts[0])}px`
  }

  if (parts.length === 4) {
    return parts.map((item) => `${Number.parseFloat(item)}px`).join(' ')
  }

  return undefined
}

interface Zl2CardNodeProps extends PropsWithChildren {
  node: Zl2CardNode
}

export function Zl2CardNodeView({ node, children }: Zl2CardNodeProps) {
  const borderRadius = parseShape(node.attrs.shape)
  const padding = parsePadding(node.attrs.contentPadding)

  return (
    <Card className="overflow-hidden bg-card/95" style={{ borderRadius }}>
      {node.attrs.title ? (
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{node.attrs.title}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent style={padding ? { padding } : undefined}>{children}</CardContent>
    </Card>
  )
}
