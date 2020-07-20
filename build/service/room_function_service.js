"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.isValidRoom = exports.getCurrentPlayerList = exports.makeNewRoom = exports.socketCheck = void 0;
const players_info_1 = require("../data/players_info");
const player_1 = require("../data/player");
const player_status_1 = require("../enums/player_status");
let socketFunction = require('../socket');
function socketCheck() {
    return socketFunction.socketCheck();
}
exports.socketCheck = socketCheck;
function makeNewRoom(teamName, userId) {
    let newroomId = Math.trunc(Math.random() * (100 - 0) + 0);
    let newMap = new Map();
    newMap.set(teamName, [new player_1.Player(userId, player_status_1.PlayerStatus.WAITING)]);
    let newMemberMap = new players_info_1.default(newMap);
    socketFunction.addNewRoomToSocket(newroomId, newMemberMap);
    console.log('new room id: ' + newroomId.toString());
    return newroomId;
}
exports.makeNewRoom = makeNewRoom;
function getCurrentPlayerList(roomId) {
    return socketFunction.getRoomMemberMap(roomId);
}
exports.getCurrentPlayerList = getCurrentPlayerList;
function isValidRoom(roomId) {
    return socketFunction.isValidRoomNumber(roomId);
}
exports.isValidRoom = isValidRoom;
function deleteRoom(roomId) {
    socketFunction.deleteRoomMemberMap(roomId);
    console.log('delete room id: ' + roomId.toString());
}
exports.deleteRoom = deleteRoom;
