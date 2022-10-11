import mongoose from 'mongoose'
const Schema = mongoose.Schema
import baseModle from './base_model'

export const articleSchema = new mongoose.Schema({
  ...baseModle,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tagList: {
    type: [String],
    default: null
  },
  favoritesCount: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})
