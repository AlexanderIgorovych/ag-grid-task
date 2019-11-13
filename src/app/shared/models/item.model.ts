// Models
import { ItemId } from './item.id.model'
import { Snippet } from './snippet.model'

export interface Item {
  kind: string
  etag: string
  id: ItemId
  snippet: Snippet
}
