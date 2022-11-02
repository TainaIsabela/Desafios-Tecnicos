import bcrypt from 'bcryptjs'

import User from 'models/User'

import { Unauthorized, encryptPassword, generateTokens } from 'helpers'

export const login = async ctx => {
  const { body } = ctx.request

  const user = await User.query()
    .findOne({ email: body.email })
    .throwIfNotFound()
    .catch(() => {
      throw Unauthorized('Unauthorized, User not found')
    })

  const isValid = await bcrypt.compare(body.password, user.password)

  if (!isValid) {
    throw Unauthorized('Unauthorized, password is invalid')
  }

  const parsedUser = user.toJSON()

  return {
    ...parsedUser,
    ...generateTokens({
      id: parsedUser.id,
      role_id: parsedUser.role_id
    })
  }
}

export const create = async ctx => {
  const { body } = ctx.request
  return User.query().insert({
    name: body.name,
    password: await encryptPassword(body.password),
    email: body.email
  })
}

export default {
  create,
  login
}
