"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatus = void 0;
var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus[PlayerStatus["WAITING"] = 0] = "WAITING";
    PlayerStatus[PlayerStatus["READY"] = 1] = "READY";
    PlayerStatus[PlayerStatus["ALIVE"] = 2] = "ALIVE";
    PlayerStatus[PlayerStatus["DEAD"] = 3] = "DEAD";
})(PlayerStatus = exports.PlayerStatus || (exports.PlayerStatus = {}));
