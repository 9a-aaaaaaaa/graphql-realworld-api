import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from './index'
import { UserResolve, ArcticleResolve } from './../resolvers'
import { upperDirectiveTransformer, authDirectiveTransformer } from './directive'

let schema = makeExecutableSchema({
  typeDefs,
  resolvers: [UserResolve, ArcticleResolve]
})

schema = upperDirectiveTransformer(schema, 'upper')
schema = authDirectiveTransformer(schema, 'auth')

export { schema }
