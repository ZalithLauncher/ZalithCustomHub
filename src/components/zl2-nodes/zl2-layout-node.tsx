import type { CSSProperties, PropsWithChildren } from 'react'
import type { Zl2ColumnNode, Zl2RowNode } from '@/lib/zl2-ast'
import { cn } from '@/lib/utils'

type LayoutNode = Zl2RowNode | Zl2ColumnNode

function parseGap(value?: string) {
  if (!value?.startsWith('spacedBy(')) {
    return undefined
  }

  const rawGap = value.slice('spacedBy('.length, -1).split(',')[0]?.trim()
  if (!rawGap) {
    return undefined
  }

  return `${Number.parseFloat(rawGap)}px`
}

function justifyClass(value?: string, direction: 'row' | 'column' = 'row') {
  if (!value) {
    return direction === 'row' ? 'justify-start' : 'justify-start'
  }

  const normalized = value.toLowerCase()
  if (normalized.includes('spacebetween')) return 'justify-between'
  if (normalized.includes('spacearound')) return 'justify-around'
  if (normalized.includes('spaceevenly')) return 'justify-evenly'
  if (normalized.includes('center')) return 'justify-center'
  if (normalized.includes('end') || normalized.includes('bottom')) return 'justify-end'
  return 'justify-start'
}

function alignClass(value?: string) {
  if (!value) {
    return 'items-start'
  }

  const normalized = value.toLowerCase()
  if (normalized.includes('center')) return 'items-center'
  if (normalized.includes('end') || normalized.includes('bottom')) return 'items-end'
  return 'items-start'
}

function parseWidth(value?: string): CSSProperties['width'] {
  if (!value) {
    return undefined
  }

  if (value.endsWith('dp')) {
    return `${Number.parseFloat(value)}px`
  }

  return value
}

interface Zl2LayoutNodeProps extends PropsWithChildren {
  node: LayoutNode
}

export function Zl2LayoutNodeView({ node, children }: Zl2LayoutNodeProps) {
  const isRow = node.type === 'row'
  const style: CSSProperties = {
    gap: parseGap(isRow ? node.attrs.horizontal : node.attrs.vertical),
    width: parseWidth(node.attrs.width) ?? '100%',
  }

  return (
    <div
      className={cn(
        'flex',
        isRow ? 'flex-row flex-wrap' : 'flex-col',
        justifyClass(isRow ? node.attrs.horizontal : node.attrs.vertical, isRow ? 'row' : 'column'),
        alignClass(isRow ? node.attrs.vertical : node.attrs.horizontal),
      )}
      style={style}
    >
      {children}
    </div>
  )
}
