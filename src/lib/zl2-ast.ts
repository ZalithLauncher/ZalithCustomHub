export interface Zl2AttributeMap {
  [key: string]: string
}

export interface Zl2MarkdownNode {
  type: 'markdown'
  content: string
}

export interface Zl2UnknownNode {
  type: 'unknown'
  raw: string
}

export interface Zl2ButtonNode {
  type: 'button'
  variant: 'default' | 'outline' | 'tonal' | 'text'
  attrs: Zl2AttributeMap
}

export interface Zl2ImageNode {
  type: 'image'
  attrs: Zl2AttributeMap
}

export interface Zl2CardNode {
  type: 'card'
  attrs: Zl2AttributeMap
  children: Zl2Node[]
}

export interface Zl2RowNode {
  type: 'row'
  attrs: Zl2AttributeMap
  children: Zl2Node[]
}

export interface Zl2ColumnNode {
  type: 'column'
  attrs: Zl2AttributeMap
  children: Zl2Node[]
}

export type Zl2Node =
  | Zl2MarkdownNode
  | Zl2UnknownNode
  | Zl2ButtonNode
  | Zl2ImageNode
  | Zl2CardNode
  | Zl2RowNode
  | Zl2ColumnNode

export interface Zl2Document {
  nodes: Zl2Node[]
  warnings: string[]
}
