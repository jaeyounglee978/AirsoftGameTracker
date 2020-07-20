"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const player_status_1 = require("../enums/player_status");
class Player {
    constructor(userId, playerStatus) {
        this.userId = userId;
        this.playerStatus = playerStatus && playerStatus || player_status_1.PlayerStatus.WAITING;
    }
}
exports.Player = Player;
