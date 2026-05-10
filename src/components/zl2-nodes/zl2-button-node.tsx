import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { Button } from '@/components/ui/button'
import type { Zl2ButtonNode } from '@/lib/zl2-ast'
import { useI18n } from '@/i18n'

function parseEvent(event?: string) {
  if (!event) {
    return { kind: 'none' as const, payload: '' }
  }

  const normalized = event.replace(/\s+/g, '')
  const urlMatch = normalized.match(/^url\{(.+)\}$/)
  if (urlMatch) {
    return { kind: 'url' as const, payload: urlMatch[1] }
  }

  const copyMatch = normalized.match(/^copy\{(.+)\}$/)
  if (copyMatch) {
    return { kind: 'copy' as const, payload: copyMatch[1] }
  }

  return { kind: 'native' as const, payload: normalized }
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

interface Zl2ButtonNodeProps {
  node: Zl2ButtonNode
}

export function Zl2ButtonNodeView({ node }: Zl2ButtonNodeProps) {
  const { t } = useI18n()
  const event = useMemo(() => parseEvent(node.attrs.event), [node.attrs.event])

  const variant =
    node.variant === 'outline'
      ? 'outline'
      : node.variant === 'text'
        ? 'ghost'
        : node.variant === 'tonal'
          ? 'secondary'
          : 'default'

  async function handleClick() {
    if (event.kind === 'url') {
      window.open(event.payload, '_blank', 'noopener,noreferrer')
      return
    }

    if (event.kind === 'copy') {
      try {
        await navigator.clipboard.writeText(event.payload)
      } catch {
        window.alert(t.detail.copyFailed)
      }
      return
    }

    if (event.kind === 'native') {
      window.alert(t.preview.unsupportedEvent)
    }
  }

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      style={{ width: parseWidth(node.attrs.width) }}
    >
      {node.attrs.text ?? 'Button'}
    </Button>
  )
}
