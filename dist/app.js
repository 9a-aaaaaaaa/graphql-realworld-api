'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const apollo_server_express_1 = require('apollo-server-express')
const apollo_server_core_1 = require('apollo-server-core')
const express_1 = __importDefault(require('express'))
const http_1 = __importDefault(require('http'))
const type_defs_1 = __importDefault(require('./type-defs'))
const resolvers_1 = __importDefault(require('./resolvers'))
const user_1 = __importDefault(require('./data-sources/user'))
const models_1 = require('./models')
async function startApolloServer(typeDefs, resolvers) {
  const app = (0, express_1.default)()
  const httpServer = http_1.default.createServer(app)
  const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    //dataSources,
    dataSources: () => ({
      // OR
      users: new user_1.default(models_1.User)
    }),
    plugins: [
      (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
      (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true })
    ]
  })
  await server.start()
  server.applyMiddleware({ app })
  const port = process.env.PORT
  await new Promise((resolve) => httpServer.listen({ port }, resolve))
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}
startApolloServer(type_defs_1.default, resolvers_1.default)
//# sourceMappingURL=app.js.map
