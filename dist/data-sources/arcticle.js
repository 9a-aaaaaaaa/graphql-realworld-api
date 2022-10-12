"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_mongodb_1 = require("apollo-datasource-mongodb");
class Arcticle extends apollo_datasource_mongodb_1.MongoDataSource {
    async createArcticle(data) {
        // @ts-expect-error The rationale for this override is described in issue #1337 on GitLab
        const arcticle = new this.model(data);
        // 使用mongoose提供的方法 -> 映射到当前数据 默认会查询这个值
        // 或者使用 resolve链的方式
        // arcticle.populate('author')
        return arcticle.save();
    }
    // 分页从offset 0开始
    async getList(offset = 0, limit = 0) {
        // @ts-expect-error The rationale for this override is described in issue #1337 on GitLab
        return await this.model.find().skip(offset).limit(limit);
    }
    async getCount() {
        return await this.collection.countDocuments();
    }
}
exports.default = Arcticle;
//# sourceMappingURL=arcticle.js.map