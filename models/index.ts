import mongoose from 'mongoose'
import { userSchema } from './user'
import { articleSchema } from './arcticle'
import dotenv from 'dotenv'

// 需要提前加载
dotenv.config()

const dbURI = process.env.mongoDbURI

if (!dbURI) {
  throw new Error('dbURI not found')
}

// 连接 MongoDB 数据库
mongoose.connect(dbURI)

const db = mongoose.connection
// 当连接失败的时候
db.on('error', (err) => {
  console.log('MongoDB 数据库连接失败！', err)
})
// 当连接成功的时候
db.once('open', function () {
  console.log('MongoDB 数据库连接成功！')
})

export const User = mongoose.model('User', userSchema)
export const Arcticle = mongoose.model('Arcticle', articleSchema)
