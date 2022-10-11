'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const apollo_server_express_1 = require('apollo-server-express')
exports.default = (0, apollo_server_express_1.gql)`
  type Book {
    title: String
    author: String
  }
  type User {
    username: String
    email: String
    password: String
    bio: String
    image: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    email: String!
    password: String!
    username: String!
  }

  type UserPayLoad  {
    user: User
  }

  type Mutation {
    login(user:LoginInput): UserPayLoad,
    createUser(user: CreateUserInput): UserPayLoad
  }

  type Query {
    books: [Book]
  }
`
//# sourceMappingURL=index.js.map
