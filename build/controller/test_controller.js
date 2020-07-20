"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinGameRoom = exports.makeNewGameRoom = exports.socketCheck = exports.top = void 0;
let roomFunctionService = require('./../service/room_function_service');
let path = require('path');
function top(req, res) {
    res.render('pages/top');
}
exports.top = top;
function socketCheck(req, res) {
    let socketRoomInfo = roomFunctionService.socketCheck();
    res.send(JSON.stringify(Array.from(socketRoomInfo.entries())));
}
exports.socketCheck = socketCheck;
// https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
function makeNewGameRoom(req, res) {
    let teamName = req.params.teamName;
    let userId = req.params.userId;
    let newRoomId = roomFunctionService.makeNewRoom(teamName, userId);
    res.send(newRoomId.toString());
}
exports.makeNewGameRoom = makeNewGameRoom;
function joinGameRoom(req, res) {
    const roomId = Number(req.params.gameRoomId);
    const userId = String(req.query.userId);
    const teamName = String(req.query.teamName);
    const isValid = roomFunctionService.isValidRoom(roomId);
    if (!isValid) {
        res.status(404);
        res.send('room not found');
    }
    else {
        const playersInfo = roomFunctionService.getCurrentPlayerList(roomId);
        console.log(`membermap = ${playersInfo.teamMemberMap}`);
        res.render('pages/chat', {
            userId: userId,
            roomId: roomId,
            players: playersInfo.teamMemberMap,
            teamName: teamName
        });
    }
}
exports.joinGameRoom = joinGameRoom;
