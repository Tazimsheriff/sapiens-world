export type ContentAction = {
  label: string
  href: string
}

export type InteractiveContent = {
  id: string
  title: string
  description: string
  action?: ContentAction
  tags?: readonly string[]
}

export type SearchResult = {
  id: string
  title: string
  kind: 'zone' | 'object'
  x: number
  y: number
  contentId?: string
}
