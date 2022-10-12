import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ArcticleInterface } from './../type'

// This is optional
interface Context {
  loggedInUser: ArcticleInterface
}

export default class Arcticle extends MongoDataSource<ArcticleInterface, Context> {
  async createArcticle(data: Partial<ArcticleInterface>) {
    // @ts-expect-error The rationale for this override is described in issue #1337 on GitLab
    const arcticle = new this.model(data)
    // 使用mongoose提供的方法 -> 映射到当前数据 默认会查询这个值
    // 或者使用 resolve链的方式
    // arcticle.populate('author')
    return arcticle.save()
  }

  // 分页从offset 0开始
  async getList(offset = 0, limit = 0) {
    // @ts-expect-error The rationale for this override is described in issue #1337 on GitLab
    return await this.model.find().skip(offset).limit(limit)
  }

  async getCount() {
    return await this.collection.countDocuments()
  }
}
