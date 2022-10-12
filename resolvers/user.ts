import { UserInputError } from 'apollo-server-express'
import { genergetToken, getJwtSecret, md5 } from './../util'

export default {
  Query: {
    getUser(_: any, arg: any, context: any, info: any) {
      // 获取当用户的登录信息 客户端请求的时候必须带着token
      // 在http的请求头里面带着
      // 无法获取请求头，通过全局的context传递给resolve来使用
      // 校验登录状态的校验
      // 解决方案： 自定义指令解决登录认证
      return context.userinfo
    },
    hello() {
      return 'this is lowerCase words!'
    }
  },

  Mutation: {
    async login(parent: any, args: any, context: any) {
      const dataSources = context.dataSources
      const queryUserdata = args.user
      const dbUser = dataSources.users
      // 用户是否存在
      const resEmail = await dbUser.loginFind({ email: queryUserdata.email })
      console.log('resEmail', resEmail)
      if (!resEmail) throw new UserInputError('暂时没没有注册，请先注册')

      console.log('passwod', resEmail)
      // 密码是否正确
      if (md5(queryUserdata.password) !== resEmail.password) {
        throw new UserInputError('密码不正确')
      }

      // 生成新用户
      // 生成token 发送给客户端
      const jwtSecret = getJwtSecret()
      const token = genergetToken(resEmail, jwtSecret)
      return {
        user: {
          ...resEmail,
          token
        }
      }
    },

    async createUser(parent: any, args: any, context: any) {
      const dataSources = context.dataSources
      const queryUserdata = args.user
      const dbUser = dataSources.users

      // 验证邮箱是否存在

      const resEmail = await dbUser.findByFields({ email: queryUserdata.email })
      if (resEmail.length) throw new UserInputError('邮箱已经存在')

      // 验证用户名是否存在
      const resName = await dbUser.findByFields({ username: queryUserdata.username })
      if (resName.length) throw new UserInputError('用户名已经存在')

      const saveUser = await dbUser.saveData(queryUserdata)

      // 判断用户 邮箱是否存在 保存用户
      // 生成token 发送给客户端
      const jwtSecret = process.env.jwtSecret || 's'
      if (!jwtSecret) throw new UserInputError('配置文件 jwtSecret not founded')
      const token = genergetToken(saveUser, jwtSecret)

      return {
        user: {
          ...saveUser.toObject(),
          token
        }
      }
    },

    async updateUser(parent: any, args: any, context: any) {
      const dataSources = context.dataSources
      const updateInfo = args.info
      const dbUser = dataSources.users
      const { userinfo } = context
      const res = await dbUser.updateUser(userinfo._id, updateInfo)
      return {
        user: res.value
      }
    }
  }
}
