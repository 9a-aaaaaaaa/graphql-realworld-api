import { AuthenticationError } from 'apollo-server-express'
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { verify } from 'jsonwebtoken'
import { getJwtSecret } from '../util'

export function authDirectiveTransformer(schema: GraphQLSchema, directiveName: string) {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
      if (directiveName !== 'auth') throw new AuthenticationError('自定义指令类型不正确')
      if (upperDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const { token, dataSources } = context

          // token 验证
          const jwtSecret = getJwtSecret()
          const jwtJson = verify(token, jwtSecret)
          if (!jwtJson || typeof jwtJson !== 'object') {
            throw new AuthenticationError('token 未授权')
          }

          // 用户验证
          try {
            const getUserInfo = await dataSources.users.findOneById(jwtJson.userId)
            context.userinfo = getUserInfo
          } catch (error) {
            console.log(error)
            throw new AuthenticationError('未授权，查询用户失败')
          }

          // 过期时间验证

          // 相当于拦截器，执行原有的函数
          const result = await resolve(source, args, context, info)
          return result
        }
        return fieldConfig
      }
    }
  })
}

// This function takes in a schema and adds upper-casing logic
// to every resolver for an object field that has a directive with
// the specified name (we're using `upper`)
export function upperDirectiveTransformer(schema: GraphQLSchema, directiveName: string) {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig
        // 重写该字段的resolve
        fieldConfig.resolve = async function (source, args, context, info) {
          // 之前函数的执行结果
          const result = await resolve(source, args, context, info)
          console.log('~~~~~', result, directiveName)
          if (typeof result === 'string' && directiveName === 'upper') {
            return result.toUpperCase()
          }
          return result
        }
        return fieldConfig
      }
    }
  })
}
