'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.md5 = exports.decode = exports.verify = exports.sign = void 0
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
const util_1 = require('util')
const crypto_1 = require('crypto')
const { sign: sign2, verify: verify2, decode: decode2 } = jsonwebtoken_1.default
exports.sign = (0, util_1.promisify)(sign2)
exports.verify = (0, util_1.promisify)(verify2)
exports.decode = (0, util_1.promisify)(decode2)
function md5(str) {
  return (0, crypto_1.createHash)('md5')
    .update('I love cupcakes' + str)
    .digest('hex')
}
exports.md5 = md5
//# sourceMappingURL=index.js.map
