import * as dbModel from './../models'

import Users from './user'
import Arcticles from './arcticle'

export default () => {
  return {
    users: new Users(dbModel.User),
    arcticles: new Arcticles(dbModel.Arcticle)
  }
}
