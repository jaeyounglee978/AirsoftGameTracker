import PlayersInfo from '../data/players_info'
import { TeamNames } from '../enums/team_names'

let socketFunction = require('../socket')

export function makeNewRoom (teamName: TeamNames, userId: string): number {
  let newroomId = Math.trunc(Math.random() * (100 - 0) + 0)

  let newMap = new Map<TeamNames, string[]>()
  newMap.set(teamName, [userId])
  let newMemberMap = new PlayersInfo(newMap)

  socketFunction.addNewRoomToSocket(newroomId, newMemberMap)

  console.log('new room id: ' + newroomId.toString())

  return newroomId
}

export function joinGameRoom (roomId: number, teamName: TeamNames, userId: string): number {
  let memberMap = socketFunction.getRoomMemberMap(roomId)

  let memberList = memberMap.teamMemberMap.get(teamName)

  if (memberList === undefined) {
    memberMap.teamMemberMap.set(teamName, [ userId ])
  } else {
    memberList.push(userId)
  }

  socketFunction.updateRoomMemberMap(roomId, memberMap)

  console.log('update room id: ' + roomId.toString() + ', room info : ' + memberMap.toString())

  return roomId
}

export function isValidRoom (roomId: number) {
  return socketFunction.isValidRoomNumber(roomId)
}

export function deleteRoom (roomId: number) {
  socketFunction.deleteRoomMemberMap(roomId)
  console.log('delete room id: ' + roomId.toString())
}
