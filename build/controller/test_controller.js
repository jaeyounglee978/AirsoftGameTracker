"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.echo = exports.defaultResponse = void 0;
function defaultResponse(req, res) {
    res.send('Hello World!');
}
exports.defaultResponse = defaultResponse;
function echo(req, res) {
    res.json(req.query);
}
exports.echo = echo;
