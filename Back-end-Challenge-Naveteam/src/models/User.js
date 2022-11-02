import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class User extends modelUuid(baseModel) {
  static tableName = 'users'

  static relationMappings = {
    navers: {
      relation: Model.HasManyRelation,
      modelClass: 'Naver',
      join: {
        from: 'users.id',
        to: 'navers.user_id'
      }
    }
  }
}

export default User
