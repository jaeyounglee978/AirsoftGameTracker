"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const test_controller = require("../controller/test_controller");
router.get('/socket-check', test_controller.socketCheck);
router.get('/top', test_controller.top);
router.get('/new-game', test_controller.makeNewGameRoom);
router.get('/game/:gameRoomId', test_controller.joinGameRoom);
router.get('/', function (req, res) {
    res.redirect('/top');
});
module.exports = router;
