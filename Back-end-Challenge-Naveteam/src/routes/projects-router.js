import Router from 'koa-router'

import ProjectController from 'controllers/projects-controller'

const router = new Router()

router.get('/project', ProjectController.index)

router.post('/project', ProjectController.create)

router.get('/project/:id', ProjectController.show)

router.put('/project/:id', ProjectController.update)

router.delete('/project/:id', ProjectController.destroy)

export default router.routes()
