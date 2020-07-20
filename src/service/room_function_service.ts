import PlayersInfo from '../data/players_info'
import { TeamNames } from '../enums/team_names'
import { Player } from '../data/player'
import { PlayerStatus } from '../enums/player_status'

let socketFunction = require('../socket')

export function socketCheck (): Map<number, PlayersInfo> {
  return socketFunction.socketCheck()
}

export function makeNewRoom (teamName: TeamNames, userId: string): number {
  let newroomId = Math.trunc(Math.random() * (100 - 0) + 0)

  let newMap = new Map<TeamNames, Player[]>()
  newMap.set(teamName, [new Player(userId, PlayerStatus.WAITING)])
  let newMemberMap = new PlayersInfo(newMap)

  socketFunction.addNewRoomToSocket(newroomId, newMemberMap)

  console.log('new room id: ' + newroomId.toString())

  return newroomId
}

export function getCurrentPlayerList (roomId: number): PlayersInfo {
  return socketFunction.getRoomMemberMap(roomId)
}

export function isValidRoom (roomId: number) {
  return socketFunction.isValidRoomNumber(roomId)
}

export function deleteRoom (roomId: number) {
  socketFunction.deleteRoomMemberMap(roomId)
  console.log('delete room id: ' + roomId.toString())
}
