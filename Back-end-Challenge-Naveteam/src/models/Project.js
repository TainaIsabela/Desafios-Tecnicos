import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class Project extends modelUuid(baseModel) {
  static tableName = 'projects'

  static relationMappings = {
    NaverProjects: {
      relation: Model.HasManyRelation,
      modelClass: 'NaversProject',
      join: {
        from: 'projects.id',
        to: 'navers-projects.project_id'
      }
    },
    Navers: {
      relation: Model.ManyToManyRelation,
      modelClass: 'Naver',
      join: {
        from: 'projects.id',
        through: {
          from: 'navers-projects.project_id',
          to: 'navers-projects.naver_id'
        },
        to: 'navers.id'
      }
    }
  }
}

export default Project
