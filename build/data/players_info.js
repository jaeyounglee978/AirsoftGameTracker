"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("./player");
const player_status_1 = require("../enums/player_status");
class PlayersInfo {
    constructor(teamMemberMap) {
        this._teamMemberMap = teamMemberMap;
    }
    get teamMemberMap() {
        return this._teamMemberMap;
    }
    set teamMemberMap(memberMap) {
        this._teamMemberMap = memberMap;
    }
    setPlayerToTeam(teamName, userId) {
        var _a;
        let player = new player_1.Player(userId, player_status_1.PlayerStatus.WAITING);
        (_a = this.teamMemberMap.get(teamName)) === null || _a === void 0 ? void 0 : _a.push(player);
    }
    removePlayerFromTeam(teamName, userId) {
        var _a;
        let player = new player_1.Player(userId, player_status_1.PlayerStatus.WAITING);
        let newPlayerArray = (_a = this.teamMemberMap.get(teamName)) === null || _a === void 0 ? void 0 : _a.filter(p => { return p.userId !== userId; });
        if (newPlayerArray === undefined) {
            throw Error;
        }
        else {
            this.teamMemberMap.set(teamName, newPlayerArray);
        }
    }
    userKiaAndCheckGameEnd(teamName, userId) {
        let players = this.teamMemberMap.get(teamName);
        if (players === undefined) {
            throw Error;
        }
        for (let p of players) {
            if (p.userId === userId) {
                p.playerStatus = player_status_1.PlayerStatus.DEAD;
                break;
            }
        }
        if (players.filter(p => { return p.playerStatus !== player_status_1.PlayerStatus.ALIVE; }).length === 0) {
            return teamName;
        }
        return undefined;
    }
    isGameEnd() {
        return true;
    }
}
exports.default = PlayersInfo;
