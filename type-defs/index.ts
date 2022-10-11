import { gql } from 'apollo-server-express'

export default gql`
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

  type UserPayLoad {
    user: User
  }

  type Mutation {
    login(user: LoginInput): UserPayLoad
    createUser(user: CreateUserInput): UserPayLoad
  }

  type Query {
    books: [Book]
  }
`
