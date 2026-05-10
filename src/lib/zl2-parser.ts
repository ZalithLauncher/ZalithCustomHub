import type {
  Zl2AttributeMap,
  Zl2ButtonNode,
  Zl2CardNode,
  Zl2ColumnNode,
  Zl2Document,
  Zl2ImageNode,
  Zl2Node,
  Zl2RowNode,
} from '@/lib/zl2-ast'

type ContainerNode = Zl2CardNode | Zl2RowNode | Zl2ColumnNode

interface StackItem {
  tag: 'card' | 'row' | 'column'
  node: ContainerNode
}

const attributePattern = /([a-zA-Z][\w-]*)=("[^"]*"|\([^)]+\)|[^\s]+)/g

function parseAttributes(input: string) {
  const attrs: Zl2AttributeMap = {}

  for (const match of input.matchAll(attributePattern)) {
    const [, key, rawValue] = match
    attrs[key] = rawValue.replace(/^"|"$/g, '')
  }

  return attrs
}

function createContainer(tag: StackItem['tag'], attrs: Zl2AttributeMap): ContainerNode {
  if (tag === 'card') {
    return { type: 'card', attrs, children: [] }
  }

  if (tag === 'row') {
    return { type: 'row', attrs, children: [] }
  }

  return { type: 'column', attrs, children: [] }
}

function pushNode(rootNodes: Zl2Node[], stack: StackItem[], node: Zl2Node) {
  const currentContainer = stack.at(-1)?.node
  if (currentContainer) {
    currentContainer.children.push(node)
    return
  }

  rootNodes.push(node)
}

function flushMarkdownBuffer(rootNodes: Zl2Node[], stack: StackItem[], markdownBuffer: string[]) {
  if (!markdownBuffer.length) {
    return
  }

  pushNode(rootNodes, stack, {
    type: 'markdown',
    content: markdownBuffer.join('\n').trim(),
  })
  markdownBuffer.length = 0
}

function createSelfClosingNode(name: string, attrs: Zl2AttributeMap): Zl2Node {
  if (name.startsWith('button')) {
    const variant: Zl2ButtonNode['variant'] =
      name === 'button-outlined'
        ? 'outline'
        : name === 'button-filled-tonal'
          ? 'tonal'
          : name === 'button-text'
            ? 'text'
            : 'default'

    return { type: 'button', variant, attrs }
  }

  if (name === 'image') {
    const node: Zl2ImageNode = { type: 'image', attrs }
    return node
  }

  return {
    type: 'unknown',
    raw: `...${name}`,
  }
}

export function parseZl2Document(markdown: string): Zl2Document {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const warnings: string[] = []
  const rootNodes: Zl2Node[] = []
  const stack: StackItem[] = []
  const markdownBuffer: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      markdownBuffer.push('')
      continue
    }

    if (trimmed.startsWith('//')) {
      continue
    }

    if (!trimmed.startsWith('...')) {
      markdownBuffer.push(line)
      continue
    }

    const extensionBody = trimmed.slice(3)
    const [name, ...rest] = extensionBody.split(/\s+/)
    const attributeSource = rest.join(' ')

    flushMarkdownBuffer(rootNodes, stack, markdownBuffer)

    if (name.endsWith('-start')) {
      const tag = name.replace('-start', '') as StackItem['tag']
      if (tag !== 'card' && tag !== 'row' && tag !== 'column') {
        pushNode(rootNodes, stack, { type: 'unknown', raw: trimmed })
        warnings.push(`Unknown start tag: ${trimmed}`)
        continue
      }

      const item: StackItem = {
        tag,
        node: createContainer(tag, parseAttributes(attributeSource)),
      }
      stack.push(item)
      continue
    }

    if (name.endsWith('-end')) {
      const tag = name.replace('-end', '') as StackItem['tag']
      const item = stack.pop()
      if (!item || item.tag !== tag) {
        warnings.push(`Unexpected end tag: ${trimmed}`)
        pushNode(rootNodes, stack, { type: 'unknown', raw: trimmed })
        continue
      }

      pushNode(rootNodes, stack, item.node)
      continue
    }

    pushNode(rootNodes, stack, createSelfClosingNode(name, parseAttributes(attributeSource)))
  }

  flushMarkdownBuffer(rootNodes, stack, markdownBuffer)

  while (stack.length > 0) {
    const item = stack.pop()
    if (!item) {
      continue
    }
    warnings.push(`Unclosed container: ${item.tag}`)
    pushNode(rootNodes, stack, item.node)
  }

  return {
    nodes: rootNodes.filter(
      (node) => node.type !== 'markdown' || node.content.trim().length > 0,
    ),
    warnings,
  }
}
