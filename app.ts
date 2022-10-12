import { ApolloServer, gql } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core'
import express from 'express'
import http from 'http'
import dataSources from './data-sources'
import { schema } from './type-defs/schema'

async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    dataSources,
    // 所有的查询都会经过这里
    context({ req }) {
      const token = req.headers.authorization
      return { token }
    },
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

startApolloServer()
