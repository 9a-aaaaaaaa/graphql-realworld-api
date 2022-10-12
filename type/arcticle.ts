import { CreateTime } from './base'
import { UserInterface } from './user'

export interface ArcticleInterface extends CreateTime {
  title: string
  description: string
  body: string
  tagList: string
  favoritesCount: number
  author?: Partial<UserInterface>
}
