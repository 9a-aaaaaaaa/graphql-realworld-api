/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb'
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
    /* @ts-ignore */
    const newUser = await this.model(args)
    return await newUser.save()
  }
}
