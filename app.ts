import { ApolloServer, gql } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core'
import express from 'express'
import http from 'http'
import typeDefs from './type-defs'
import resolvers from './resolvers'
import dataSources from './data-sources'
import Users from './data-sources/user'
import { User as UserModel } from './models'

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    //dataSources,
    dataSources: () => ({
      // OR
      users: new Users(UserModel as any)
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ]
  })
  await server.start()
  server.applyMiddleware({ app })
  const port = process.env.PORT
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
