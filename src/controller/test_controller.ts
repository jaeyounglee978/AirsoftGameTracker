import { Request, Response } from 'express'

let roomFunctionService = require('./../service/RoomFunctionService')
let path = require('path')

export function top (req: Request, res: Response) {
  res.render('pages/top')
}

// https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error

export function makeNewGameRoom (req: Request, res: Response) {
  let teamName = req.params.teamName
  let userId = req.params.userId

  let newRoomId = roomFunctionService.makeNewRoom(teamName, userId)

  res.send(newRoomId.toString())
}

export function joinGameRoom (req: Request, res: Response) {
  console.log('id = ' + req.params.chatroomId)
  const id = Number(req.params.chatroomId)
  const isValid = roomFunctionService.isValidRoom(id)
  if (!isValid) {
    res.status(404)
    res.send('room not found')
  } else {
    res.render('pages/chat', { roomId: id })
  }
}


export function participateChat (req: Request, res: Response) {
  console.log(req.params.chatroomId)
  res.json(req.query)
}
