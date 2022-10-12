"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
// Our GraphQL schema
exports.default = (0, apollo_server_express_1.gql) `
  # 自定义指令
  directive @upper on FIELD_DEFINITION
  directive @auth on FIELD_DEFINITION

  type User {
    username: String
    email: String
    password: String
    bio: String
    image: String
    token: String
    following: Boolean
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

  input UserUpdateInfo {
    email: String
    username: String
    password: String
    image: String
    bio: String
  }

  input CreateArcticleDataInput {
    title: String!
    description: String!
    body: String!
    tagList: [String]!
  }

  type UserPayLoad {
    user: User
  }

  type CreateArcticlePayload {
    arcticle: Arcticle
  }

  type Arcticle {
    _id: String! # 唯一标识
    title: String!
    description: String!
    body: String!
    tagList: [String]
    createdAt: String!
    updatedAt: String!
    favorited: Boolean
    favoritesCount: Int
    author: User
  }

  type GetArcticlePayLoad {
    arcticles: [Arcticle!]
    count: Int!
  }

  type Mutation {
    # user 登录
    login(user: LoginInput): UserPayLoad
    createUser(user: CreateUserInput): UserPayLoad
    updateUser(info: UserUpdateInfo): UserPayLoad @auth

    # arcticle 文章
    createArcticle(createdata: CreateArcticleDataInput): CreateArcticlePayload @auth
  }

  type Query {
    getUser: User @auth
    hello: String @upper
    getArcticles(offset: Int = 0, limit: Int = 2): GetArcticlePayLoad
  }
`;
//# sourceMappingURL=index.js.map