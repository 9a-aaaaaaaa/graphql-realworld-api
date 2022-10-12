import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb'
import { Condition } from 'mongoose'
import { UserInterface } from './../type'

// This is optional
interface Context {
  loggedInUser: UserInterface
}

export default class Users extends MongoDataSource<UserInterface, Context> {
  getUser(userId: string | ObjectId) {
    // this.context has type `Context` as defined above
    // this.findOneById has type `(id: ObjectId) => Promise<UserDocument | null | undefined>`

    return this.findOneById(userId)
  }

  async saveData(args: Partial<UserInterface>) {
    // @ts-expect-error The rationale for this override is described in issue #1337 on GitLab
    const newUser = await this.model(args)
    return await newUser.save()
  }

  async loginFind(email: Pick<UserInterface, 'email'>) {
    const newUser = await this.collection.findOne(email)
    return newUser
  }

  async updateUser(userId: Condition<ObjectId>, updateData: UserInterface) {
    try {
      return await this.collection.findOneAndUpdate(
        { _id: userId },
        { $set: updateData },
        {
          // 返回更新之后的数据
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          new: true
        }
      )
    } catch (error) {
      console.log('!!!!', error)
    }

    return null
  }
}
