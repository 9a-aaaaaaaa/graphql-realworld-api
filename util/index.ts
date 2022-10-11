import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { createHash } from 'crypto'

const { sign: sign2, verify: verify2, decode: decode2 } = jwt

export const sign = promisify(sign2)
export const verify = promisify(verify2)
export const decode = promisify(decode2)

export function md5(str: string) {
  return createHash('md5')
    .update('I love cupcakes' + str)
    .digest('hex')
}
