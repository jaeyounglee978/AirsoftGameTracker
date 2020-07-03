"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://gongzza.github.io/javascript/nodejs/typescript-express-starter-3/
// require로 가져오면 any 타입이라서 ts를 쓰는 의미가 없다!
const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use('/', require('./router/router'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handle
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        data: err.data
    });
});
exports.default = app;
