import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class Naver extends modelUuid(baseModel) {
  static tableName = 'navers'

  static relationMappings = {
    naversProjects: {
      relation: Model.HasManyRelation,
      modelClass: 'NaversProject',
      join: {
        from: 'navers.id',
        to: 'navers-projects.naver_id'
      }
    },
    projects: {
      relation: Model.ManyToManyRelation,
      modelClass: 'Project',
      join: {
        from: 'navers.id',
        through: {
          from: 'navers-projects.naver_id',
          to: 'navers-projects.project_id'
        },
        to: 'projects.id'
      }
    }
  }
}

export default Naver
