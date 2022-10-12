import * as dbModel from './../models'

import Users from './user'
import Arcticles from './arcticle'

export default () => {
  return {
    // @ts-expect-error The rationale for this override is described in issue #1337 on GitLab
    users: new Users(dbModel.User),
    // @ts-expect-error The rationale for this override is described in issue #1337 on GitLab
    arcticles: new Arcticles(dbModel.Arcticle)
  }
}
