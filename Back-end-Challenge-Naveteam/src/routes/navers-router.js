import Router from 'koa-router'

import NaversController from 'controllers/navers-controller'

const router = new Router()

router.get('/naver', NaversController.index)

router.post('/naver', NaversController.create)

router.get('/naver/:id', NaversController.show)

router.put('/naver/:id', NaversController.update)

router.delete('/naver/:id', NaversController.destroy)

export default router.routes()
