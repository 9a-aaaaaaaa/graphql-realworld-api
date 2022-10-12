import mongoose from 'mongoose'
import baseModle from './base_model'
import { md5 } from './../util'

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: (value: string) => md5(value),
    select: false // 设置为fasle默认查询不到该字段
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  ...baseModle
})
