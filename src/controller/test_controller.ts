import { Request, Response } from 'express'
import { makeNewRoom, isValidRoom } from '../socket'

let path = require('path')

// https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
export function chat (req: Request, res: Response) {
  console.log('id = ' + req.params.chatroomId)
  const id = Number(req.params.chatroomId)
  const isValid = isValidRoom(id)
  if (!isValid) {
    res.status(404)
    res.send('room not found')
  } else {
    res.render('pages/chat', { roomId: id })
  }
}

export function top (req: Request, res: Response) {
  res.render('pages/top')
}

export function makeNewChat (req: Request, res: Response) {
  let newroomnum = Math.trunc(Math.random() * (100 - 0) + 0)
  console.log('newroomnum = ' + newroomnum)
  makeNewRoom(newroomnum)
  res.send(newroomnum.toString())
}

export function participateChat (req: Request, res: Response) {
  console.log(req.params.chatroomId)
  res.json(req.query)
}
