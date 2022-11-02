import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class NaversProject extends modelUuid(baseModel) {
  static tableName = 'navers-projects'

  static relationMappings = {
    navers: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Naver',
      join: {
        from: 'navers.id',
        to: 'navers-projects.naver_id'
      }
    },
    projects: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Project',
      join: {
        from: 'projects.id',
        to: 'navers-projects.project_id'
      }
    }
  }
}

export default NaversProject
