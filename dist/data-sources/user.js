"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_mongodb_1 = require("apollo-datasource-mongodb");
class Users extends apollo_datasource_mongodb_1.MongoDataSource {
    getUser(userId) {
        // this.context has type `Context` as defined above
        // this.findOneById has type `(id: ObjectId) => Promise<UserDocument | null | undefined>`
        return this.findOneById(userId);
    }
    async saveData(args) {
        // @ts-expect-error The rationale for this override is described in issue #1337 on GitLab
        const newUser = await this.model(args);
        return await newUser.save();
    }
    async loginFind(email) {
        const newUser = await this.collection.findOne(email);
        return newUser;
    }
    async updateUser(userId, updateData) {
        try {
            return await this.collection.findOneAndUpdate({ _id: userId }, { $set: updateData }, {
                // 返回更新之后的数据
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                new: true
            });
        }
        catch (error) {
            console.log('!!!!', error);
        }
        return null;
    }
}
exports.default = Users;
//# sourceMappingURL=user.js.map