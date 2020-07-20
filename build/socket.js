"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRoomNumber = exports.deleteRoomMemberMap = exports.updateRoomMemberMap = exports.getRoomMemberMap = exports.addNewRoomToSocket = exports.socketCheck = void 0;
const app_1 = require("./app");
let http = require('http').createServer(app_1.default);
let io = require('socket.io')(http);
let room = new Map();
function getPlayerInfoByRoomId(roomId) {
    console.log(room);
    console.log('check = ' + roomId.toString());
    room.forEach(e => { console.log(e.teamMemberMap); });
    console.log(room.has(roomId));
    let players = room.get(roomId);
    console.log(JSON.stringify(players));
    if (players === undefined) {
        throw Error;
    }
    return players;
}
io.on('connection', (socket) => {
    console.log('a user connected');
    // socket.on('disconnect', (roomId: number, teamName: TeamNames, userId: string) => {
    //   console.log('user disconnected')
    //   let players = getPlayerInfoByRoomId(roomId)
    //   players.removePlayerFromTeam(teamName, userId)
    //   socket.leave(
    //     roomId,
    //     () => { io.to(roomId).emit('userLeave', userId) }
    //   )
    // })
    socket.on('joinRoom', (roomId, teamName, userId, userName) => {
        let players = getPlayerInfoByRoomId(roomId);
        players.setPlayerToTeam(teamName, userId);
        socket.join(roomId, () => { io.to(roomId).emit('userJoin', teamName, userId); });
    });
    socket.on('leaveRoom', (roomId, teamName, userId, userName) => {
        let players = getPlayerInfoByRoomId(roomId);
        players.removePlayerFromTeam(teamName, userId);
        socket.leave(roomId, () => { io.to(roomId).emit('userLeave', teamName, userId); });
    });
    socket.on('ready', (roomId, teamName, userId, userName) => {
        getPlayerInfoByRoomId(roomId);
        io.to(roomId).emit('userReady', teamName, userId);
    });
    socket.on('died', (roomId, teamName, userId) => {
        let players = getPlayerInfoByRoomId(roomId);
        let result = players.userKiaAndCheckGameEnd(teamName, userId);
        io.to(room.get(roomId)).emit('userDied', teamName, userId);
        if (result !== undefined) {
            io.to(room.get(roomId)).emit('gameEnd', teamName);
        }
    });
});
function socketCheck() {
    return room;
}
exports.socketCheck = socketCheck;
function addNewRoomToSocket(roomId, roomMemberMap) {
    if (room.has(roomId)) {
        throw Error();
    }
    room.set(roomId, roomMemberMap);
    console.log(room);
}
exports.addNewRoomToSocket = addNewRoomToSocket;
function getRoomMemberMap(roomId) {
    let memberMap = room.get(roomId);
    if (memberMap === undefined) {
        throw Error;
    }
    else {
        return memberMap;
    }
}
exports.getRoomMemberMap = getRoomMemberMap;
function updateRoomMemberMap(roomId, roomMemberMap) {
    if (!room.has(roomId)) {
        throw Error();
    }
    room.set(roomId, roomMemberMap);
}
exports.updateRoomMemberMap = updateRoomMemberMap;
function deleteRoomMemberMap(roomId) {
    room.delete(roomId);
}
exports.deleteRoomMemberMap = deleteRoomMemberMap;
function isValidRoomNumber(roomId) { return room.has(roomId); }
exports.isValidRoomNumber = isValidRoomNumber;
exports.default = http;
