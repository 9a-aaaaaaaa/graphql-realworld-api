import { UserInputError } from 'apollo-server-express'
import { GraphQLResolveInfo } from 'graphql'

export default {
  Query: {
    // 分页查询
    async getArcticles(parent: any, args: any, context: any) {
      // 为了性能优化 分开单独查询 使用resolve链进行优化
      return {
        args
      }
    }
  },
  Mutation: {
    async createArcticle(parent: any, args: any, context: any) {
      const dataSources = context.dataSources
      const updateInfo = args.createdata
      const dbArcticle = dataSources.arcticles

      try {
        updateInfo.author = context.userinfo._id
        const saveData = await dbArcticle.createArcticle(updateInfo)
        return {
          arcticle: saveData
        }
      } catch (error) {
        console.log(error)
        throw new UserInputError('写入文章失败')
      }
    }
  },
  // 根据用户id获取用户信息 填充到arcticle.author中 reolve链
  // resolve的返回数据优先会走这个地方，利用这个特性对author的解析单独处理
  Arcticle: {
    async author(parent: any, args: any, context: any) {
      // parent.id 就是绑定的上一个链条上的传递过来的数据
      const dataSources = context.dataSources
      const modelUser = dataSources.users

      const author = await modelUser.findOneById(parent.author)
      return author
    }
  },
  GetArcticlePayLoad: {
    // TODO: 这里无法获取args的参数，不知道怎么回事，目前是通过parent传递过来的
    async arcticles(parent: any, _: any, context: any) {
      const dataSources = context.dataSources
      const dbArcticle = dataSources.arcticles
      const { offset, limit } = parent.args
      const arcticles = await dbArcticle.getList(offset, limit)
      return arcticles
    },

    async count(parent: any, args: any, context: any) {
      const dataSources = context.dataSources
      const dbArcticle = dataSources.arcticles
      const count = await dbArcticle.getCount()
      return count
    }
  }
}
