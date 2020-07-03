"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const test_controller = require("../controller/test_controller");
router.get('/top', test_controller.top);
router.get('/chat/new-chat', test_controller.makeNewChat);
router.get('/chat/participate-chat', test_controller.participateChat);
router.get('/chat/:chatroomId', test_controller.chat);
module.exports = router;
