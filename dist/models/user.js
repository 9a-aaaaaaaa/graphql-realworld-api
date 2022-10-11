'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.userSchema = void 0
const mongoose_1 = __importDefault(require('mongoose'))
const base_model_1 = __importDefault(require('./base_model'))
const util_1 = require('./../util')
exports.userSchema = new mongoose_1.default.Schema({
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
    set: (value) => (0, util_1.md5)(value),
    select: false
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  ...base_model_1.default
})
//# sourceMappingURL=user.js.map
