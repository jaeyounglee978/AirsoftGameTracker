import { Router } from 'express'

const router = Router()

import * as test_controller from '../controller/test_controller'

router.get('/', test_controller.defaultResponse)
router.get('/test', test_controller.echo)

module.exports = router
