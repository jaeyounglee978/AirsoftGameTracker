import { Router } from 'express'

const router = Router()

import * as test_controller from '../controller/test_controller'

router.get('/top', test_controller.top)

router.get('/chat/new-chat', test_controller.makeNewGameRoom)
router.get('/chat/participate-chat', test_controller.participateChat)
router.get('/chat/:chatroomId', test_controller.chat)

module.exports = router
