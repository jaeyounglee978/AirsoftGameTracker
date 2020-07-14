import app from './app'
import PlayersInfo from './data/players_info'
import { type } from 'os'
import { Socket } from 'dgram'
import { TeamNames } from './enums/team_names'

let http = require('http').createServer(app)
let io = require('socket.io')(http)

let room = new Map<number, PlayersInfo>()

io.on('connection', (socket: any) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('joinRoom', (roomId: number, userId: string, userName?: string) => {
    let players = room.get(roomId)
    socket.join(
      roomId,
       () => {
         let welcomeMessage = `${userName && userName || `guest(${userId})`} has joined the room`
         console.log(welcomeMessage)
         io.to(roomId).emit('joinRoom', welcomeMessage, players)
       })
  })

  socket.on('leaveRoom', (roomId: number, teamName: TeamNames, userId: string, userName?: string) => {
    // TODO: 이거 service 로직으로 옮기기.
    let players = room.get(roomId)
    let newPlayersArray = players!.teamMemberMap.get(teamName)!.filter((elem, index, array) => { return elem.userId !== userId })
    players!.teamMemberMap.set(teamName, newPlayersArray)
    room.set(roomId, players!)

    socket.leave(
      roomId,
       () => {
         let goodByeMessage = `${userName && userName || `guest(${userId})`} has left the room`
         console.log(goodByeMessage)
         io.to(roomId).emit('leaveRoom', goodByeMessage, players)
       })
  })

  socket.on('died', (roomId: number, userId: string, msg: string) => {
    console.log('message: ' + msg)
    io.to(room.get(roomId)).emit('chat message', msg)
  })
})

export function addNewRoomToSocket (roomId: number, roomMemberMap: PlayersInfo) {
  if (room.has(roomId)) {
    throw Error()
  }

  room.set(roomId, roomMemberMap)
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
