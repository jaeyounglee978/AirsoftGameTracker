import app from './app'
import PlayersInfo from './data/players_info'
import { type } from 'os'
import { Socket } from 'dgram'
import { TeamNames } from './enums/team_names'

let http = require('http').createServer(app)
let io = require('socket.io')(http)

let room = new Map<number, PlayersInfo>()

function getPlayerInfoByRoomId (roomId: number): PlayersInfo {
  console.log(room)
  console.log('check = ' + roomId.toString())
  room.forEach(e => { console.log(e.teamMemberMap) })
  console.log(room.has(roomId))
  let players = room.get(roomId)
  console.log(JSON.stringify(players))

  if (players === undefined) {
    throw Error
  }

  return players
}

io.on('connection', (socket: any) => {
  console.log('a user connected')

  // socket.on('disconnect', (roomId: number, teamName: TeamNames, userId: string) => {
  //   console.log('user disconnected')
  //   let players = getPlayerInfoByRoomId(roomId)
  //   players.removePlayerFromTeam(teamName, userId)

  //   socket.leave(
  //     roomId,
  //     () => { io.to(roomId).emit('userLeave', userId) }
  //   )
  // })

  socket.on('joinRoom', (roomId: number, teamName: TeamNames, userId: string, userName?: string) => {
    let players = getPlayerInfoByRoomId(roomId)
    players.setPlayerToTeam(teamName, userId)

    socket.join(
      roomId,
      () => { io.to(roomId).emit('userJoin', teamName, userId) }
    )
  })

  socket.on('leaveRoom', (roomId: number, teamName: TeamNames, userId: string, userName?: string) => {
    let players = getPlayerInfoByRoomId(roomId)
    players.removePlayerFromTeam(teamName, userId)

    socket.leave(
      roomId,
      () => { io.to(roomId).emit('userLeave', teamName, userId) }
    )
  })

  socket.on('ready', (roomId: number, teamName: TeamNames, userId: string, userName?: string) => {
    getPlayerInfoByRoomId(roomId)

    io.to(roomId).emit('userReady', teamName, userId)
  })

  socket.on('died', (roomId: number, teamName: TeamNames, userId: string) => {
    let players = getPlayerInfoByRoomId(roomId)
    let result = players.userKiaAndCheckGameEnd(teamName, userId)

    io.to(room.get(roomId)).emit('userDied', teamName, userId)

    if (result !== undefined) {
      io.to(room.get(roomId)).emit('gameEnd', teamName)
    }
  })
})

export function socketCheck (): Map<number, PlayersInfo> {
  return room
}

export function addNewRoomToSocket (roomId: number, roomMemberMap: PlayersInfo) {
  if (room.has(roomId)) {
    throw Error()
  }

  room.set(roomId, roomMemberMap)
  console.log(room)
}

export function getRoomMemberMap (roomId: number): PlayersInfo {
  let memberMap = room.get(roomId)

  if (memberMap === undefined) {
    throw Error
  } else {
    return memberMap
  }
}

export function updateRoomMemberMap (roomId: number, roomMemberMap: PlayersInfo) {
  if (!room.has(roomId)) {
    throw Error()
  }

  room.set(roomId, roomMemberMap)
}

export function deleteRoomMemberMap (roomId: number) {
  room.delete(roomId)
}

export function isValidRoomNumber (roomId: number): Boolean { return room.has(roomId) }

export default http
