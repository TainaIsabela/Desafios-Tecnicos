import Router from 'koa-router'

import UserController from 'controllers/users-controller'

const router = new Router()

router.post('/users/signup', UserController.create)
router.post('/users/login', UserController.login)

export default router.routes()
