'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const apollo_server_express_1 = require('apollo-server-express')
exports.default = {
  Query: {
    books: () => {
      return [{ title: '11', author: 'jack' }]
    }
  },
  Mutation: {
    //   login(user:LoginInput): UserPayLoad,
    //  createUser(user: CreateUserInput): UserPayLoad
    async createUser(parent, args, context) {
      const dataSources = context.dataSources
      const queryUserdata = args.user
      const dbUser = dataSources.users
      // 验证邮箱是否存在
      const resEmail = await dbUser.findByFields({ email: queryUserdata.email })
      if (resEmail.length) throw new apollo_server_express_1.UserInputError('邮箱已经存在')
      // 验证用户名是否存在
      const resName = await dbUser.findByFields({ username: queryUserdata.username })
      if (resName.length) throw new apollo_server_express_1.UserInputError('用户名已经存在')
      const saveUser = await dbUser.saveData(queryUserdata)
      // 判断用户 邮箱是否存在 保存用户
      // 生成token 发送给客户端
      return {
        user: {
          ...saveUser.toObject(),
          token: '21312312'
        }
      }
    }
  }
}
//# sourceMappingURL=index.js.map
