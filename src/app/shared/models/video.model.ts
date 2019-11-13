// Models
import { Item } from './item.model'
import { PageInfo } from './page.info.model'

export interface Video {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: PageInfo
  items: Item[]
}
