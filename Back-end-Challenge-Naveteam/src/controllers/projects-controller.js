import Naver from '../models/Naver'

import NaversProject from 'models/NaversProject'

import Project from 'models/Project'

import { getPagination } from 'helpers'

export const index = async ctx => {
  const { name } = ctx.query

  const { page, pageSize, calculatePageCount } = getPagination(ctx.query)

  const Projects = await Project.query()
    .where(builder => {
      if (name) builder.where('name', 'ilike', `%${name}%`)
    })
    .page(page, pageSize)

  return {
    ...Projects,
    page: page + 1,
    pageCount: calculatePageCount(Projects.total)
  }
}

export const show = ctx =>
  Project.query()
    .findOne({ id: ctx.params.id })
    .withGraphFetched('NaverProjects')
    .throwIfNotFound()

export const create = async ctx => {
  const { body } = ctx.request
  return Project.transaction(async trx => {
    const newProject = await Project.query(trx).insert({
      name: body.name
    })

    const naverExists = await Naver.query(trx)
      .whereIn(
        'id',
        body.navers.map(naver => naver.id)
      )
      .throwIfNotFound('Naver not found')

    const naversProjects = await NaversProject.query(trx).insertGraph(
      naverExists.map(naver => ({
        naver_id: naver.id,
        project_id: newProject.id
      }))
    )

    return { ...newProject, navers: naversProjects }
  })
}

export const update = async ctx => {
  const { body } = ctx.request

  return Project.transaction(async trx => {
    const newProject = await Project.query(trx).updateAndFetchById(body.id, {
      name: body.name
    })

    await NaversProject.query(trx).delete().where('project_id', body.id)

    await NaversProject.query(trx).insertGraph(
      body.navers.map(naver => ({
        naver_id: naver.id,
        project_id: newProject.id
      }))
    )

    return { ...newProject }
  })
}

export const destroy = ctx => {
  const id = ctx.params.id
  return Project.transaction(async trx => {
    const project = await Project.query(trx).upsertGraph({
      id,
      name: null
    })
    await NaversProject.query(trx).delete().where('project_id', id)

    await Project.query(trx).deleteById(id)
  })
}

export default {
  index,
  create,
  update,
  show,
  destroy
}
