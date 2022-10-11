import { CreateTime } from './base'

export interface UserInterface extends CreateTime {
  username: string
  email: string
  password: string
  bio: string
  image: string
}
