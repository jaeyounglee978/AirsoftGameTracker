"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.isValidRoom = exports.makeNewRoom = void 0;
const app_1 = require("./app");
let http = require('http').createServer(app_1.default);
let io = require('socket.io')(http);
let room = new Map();
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('use disconnected');
    });
    socket.on('joinRoom', (num) => {
        let roomName = room.get(num);
        socket.join(roomName, () => {
            console.log('someone join a ' + roomName);
            io.to(roomName).emit('joinRoom', num);
        });
    });
    socket.on('leaveRoom', (num) => {
        let roomName = room.get(num);
        socket.leave(roomName, () => {
            console.log('someone leave a ' + roomName);
            io.to(roomName).emit('leaveRoom', num);
        });
    });
    socket.on('chat message', (num, msg) => {
        console.log('message: ' + msg);
        io.to(room.get(num)).emit('chat message', msg);
    });
});
function makeNewRoom(roomId) {
    room.set(roomId, 'room' + roomId);
    console.log('(new)room status: ' + room);
}
exports.makeNewRoom = makeNewRoom;
function isValidRoom(roomId) {
    return room.has(roomId);
}
exports.isValidRoom = isValidRoom;
function deleteRoom(roomId) {
    room.delete(roomId);
    console.log('(del)room status: ' + room);
}
exports.deleteRoom = deleteRoom;
exports.default = http;
