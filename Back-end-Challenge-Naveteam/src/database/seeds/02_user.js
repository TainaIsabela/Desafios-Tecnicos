import { v4 } from 'uuid'

import { encryptPassword } from '../../helpers/password'

export const seed = async knex => {
  await knex('users').del()
  await knex('users').insert([
    {
      id: v4(),
      name: 'Taina',
      email: 'taina@nave.rs',
      password: await encryptPassword('teste')
    }
  ])
  await knex('projects').del()
  await knex('projects').insert([
    {
      id: v4(),
      name: 'Nave Team'
    }
  ])
}
