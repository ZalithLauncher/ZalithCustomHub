import type { CSSProperties } from 'react'
import type { Zl2ImageNode } from '@/lib/zl2-ast'

function parseWidth(value?: string): CSSProperties['width'] {
  if (!value) {
    return '100%'
  }

  if (value.endsWith('dp')) {
    return `${Number.parseFloat(value)}px`
  }

  return value
}

function parseShape(value?: string): CSSProperties['borderRadius'] {
  if (!value) {
    return '1rem'
  }

  if (value.endsWith('dp')) {
    return `${Number.parseFloat(value)}px`
  }

  return value
}

interface Zl2ImageNodeProps {
  node: Zl2ImageNode
}

export function Zl2ImageNodeView({ node }: Zl2ImageNodeProps) {
  if (!node.attrs.url) {
    return null
  }

  return (
    <img
      src={node.attrs.url}
      alt=""
      className="block max-w-full border border-border object-cover"
      style={{
        width: parseWidth(node.attrs.width),
        borderRadius: parseShape(node.attrs.shape),
      }}
    />
  )
}
