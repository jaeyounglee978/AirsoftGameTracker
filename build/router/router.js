"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const test_controller = require("../controller/test_controller");
router.get('/', test_controller.defaultResponse);
router.get('/test', test_controller.echo);
module.exports = router;
