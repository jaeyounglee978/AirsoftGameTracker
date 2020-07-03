import app from './app'

let http = require('http').createServer(app)
let io = require('socket.io')(http)

let room = new Map<number, string>()

io.on('connection', (socket: any) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('use disconnected')
  })

  socket.on('joinRoom', (num: number) => {
    let roomName = room.get(num)
    socket.join(roomName, () => {
      console.log('someone join a ' + roomName)
      io.to(roomName).emit('joinRoom', num)
    })
  })

  socket.on('leaveRoom', (num: number) => {
    let roomName = room.get(num)
    socket.leave(roomName, () => {
      console.log('someone leave a ' + roomName)
      io.to(roomName).emit('leaveRoom', num)
    })
  })

  socket.on('chat message', (num: number, msg: string) => {
    console.log('message: ' + msg)
    io.to(room.get(num)).emit('chat message', msg)
  })
})

export function makeNewRoom (roomId: number) {
  room.set(roomId, 'room' + roomId)
  console.log('(new)room status: ' + room)
}

export function isValidRoom (roomId: number) {
  return room.has(roomId)
}

export function deleteRoom (roomId: number) {
  room.delete(roomId)
  console.log('(del)room status: ' + room)
}

export default http
