import bcrypt from 'bcryptjs'

import Naver from '../models/Naver'

import NaversProject from 'models/NaversProject'

import Project from 'models/Project'

import { getPagination } from 'helpers'

export const index = async ctx => {
  const { name, admission_date, job_role } = ctx.query

  const { page, pageSize, calculatePageCount } = getPagination(ctx.query)

  const Navers = await Naver.query()
    .where(builder => {
      if (admission_date) builder.where('admission_date', admission_date)

      if (name) builder.where('name', 'ilike', `%${name}%`)

      if (job_role) builder.where('job_role', 'ilike', `%${job_role}%`)
    })
    .page(page, pageSize)

  return {
    ...Navers,
    page: page + 1,
    pageCount: calculatePageCount(Navers.total)
  }
}

export const show = ctx =>
  Naver.query()
    .findOne({ id: ctx.params.id })
    .withGraphFetched('naversProjects')
    .throwIfNotFound()

export const create = async ctx => {
  const { body } = ctx.request

  return Naver.transaction(async trx => {
    const newNaver = await Naver.query(trx).insert({
      name: body.name,
      admission_date: body.admission_date,
      job_role: body.job_role,
      birthdate: body.birthdate,
      email: body.email,
      user_id: ctx.state.user.id
    })
    const ProjectExists = await Project.query(trx)
      .whereIn(
        'name',
        body.projects.map(project => project.name)
      )
      .throwIfNotFound('projects not found')

    const Projects = await NaversProject.query(trx).upsertGraph(
      ProjectExists.map(project => ({
        naver_id: newNaver.id,
        project_id: project.id
      }))
    )

    return { ...newNaver, Projects }
  })
}

export const update = async ctx => {
  const { body } = ctx.request

  return Naver.transaction(async trx => {
    const newNaver = await Naver.query(trx)
      .updateAndFetchById(body.id, {
        name: body.name,
        admission_date: body.admission_date,
        job_role: body.job_role,
        birthdate: body.birthdate,
        email: body.email
      })
      .withGraphFetched('naversProjects')

    await NaversProject.query(trx).delete().where('naver_id', body.id)

    await NaversProject.query(trx).insertGraph(
      body.projects.map(project => ({
        naver_id: body.id,
        project_id: project.id
      }))
    )

    return { ...newNaver }
  })
}

export const destroy = ctx => {
  return Naver.transaction(async trx => {
    const id = ctx.params.id
    await Naver.query(trx).upsertGraph({
      id,
      name: null,
      admission_date: null,
      job_role: null,
      birthdate: null,
      email: null
    })

    await NaversProject.query(trx).delete().where('naver_id', id)

    await Naver.query(trx).deleteById(id)
  })
}
export default {
  index,
  create,
  update,
  show,
  destroy
}
