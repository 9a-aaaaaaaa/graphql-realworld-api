import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb'
import { ArcticleInterface } from './../type'

// This is optional
interface Context {
  loggedInUser: ArcticleInterface
}

export default class Arcticle extends MongoDataSource<ArcticleInterface, Context> {}
