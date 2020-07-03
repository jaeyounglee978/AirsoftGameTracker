"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participateChat = exports.makeNewChat = exports.top = exports.chat = void 0;
const socket_1 = require("../socket");
let path = require('path');
// https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
function chat(req, res) {
    console.log('id = ' + req.params.chatroomId);
    const id = Number(req.params.chatroomId);
    const isValid = socket_1.isValidRoom(id);
    if (!isValid) {
        res.status(404);
        res.send('room not found');
    }
    else {
        res.render('pages/chat', { roomId: id });
    }
}
exports.chat = chat;
function top(req, res) {
    res.render('pages/top');
}
exports.top = top;
function makeNewChat(req, res) {
    let newroomnum = Math.trunc(Math.random() * (100 - 0) + 0);
    console.log('newroomnum = ' + newroomnum);
    socket_1.makeNewRoom(newroomnum);
    res.send(newroomnum.toString());
}
exports.makeNewChat = makeNewChat;
function participateChat(req, res) {
    console.log(req.params.chatroomId);
    res.json(req.query);
}
exports.participateChat = participateChat;
