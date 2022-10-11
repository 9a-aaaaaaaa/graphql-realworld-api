'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const apollo_datasource_mongodb_1 = require('apollo-datasource-mongodb')
class Users extends apollo_datasource_mongodb_1.MongoDataSource {
  getUser(userId) {
    // this.context has type `Context` as defined above
    // this.findOneById has type `(id: ObjectId) => Promise<UserDocument | null | undefined>`
    return this.findOneById(userId)
  }
  async saveData(args) {
    //@ts-ignore
    const newUser = await this.model(args)
    return await newUser.save()
  }
}
exports.default = Users
//# sourceMappingURL=user.js.map
