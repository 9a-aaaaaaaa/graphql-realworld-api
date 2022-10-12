import { UserInputError } from 'apollo-server-express'
import { createHash } from 'crypto'
import { sign, verify, decode } from 'jsonwebtoken'

export function md5(str: string) {
  return createHash('md5')
    .update('I love cupcakes' + str)
    .digest('hex')
}

export async function genergetToken(user: { _id: number }, jwtSecret: string) {
  const token = sign({ userId: user._id }, jwtSecret, { expiresIn: 60 * 60 * 24 })
  return token
}

export function getJwtSecret() {
  const jwtSecret = process.env.jwtSecret
  if (!jwtSecret) throw new UserInputError('配置文件 jwtSecret not founded')
  return jwtSecret
}
