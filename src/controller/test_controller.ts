import { Request, Response } from 'express'
import PlayersInfo from '../data/players_info'
import { TeamNames } from '../enums/team_names'

let roomFunctionService = require('./../service/room_function_service')
let path = require('path')

export function top (req: Request, res: Response) {
  res.render('pages/top')
}

export function socketCheck (req: Request, res: Response) {
  let socketRoomInfo = roomFunctionService.socketCheck()
  res.send(JSON.stringify(Array.from(socketRoomInfo.entries())))
}

// https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
export function makeNewGameRoom (req: Request, res: Response) {
  let teamName = req.params.teamName
  let userId = req.params.userId

  let newRoomId = roomFunctionService.makeNewRoom(teamName, userId)

  res.send(newRoomId.toString())
}

export function joinGameRoom (req: Request, res: Response) {
  const roomId = Number(req.params.gameRoomId)
  const userId = String(req.query.userId)
  const teamName: TeamNames = String(req.query.teamName) as TeamNames
  const isValid = roomFunctionService.isValidRoom(roomId)
  if (!isValid) {
    res.status(404)
    res.send('room not found')
  } else {
    const playersInfo = roomFunctionService.getCurrentPlayerList(roomId)
    console.log(`membermap = ${playersInfo.teamMemberMap}`)
    res.render(
      'pages/chat',
      {
        userId: userId,
        roomId: roomId,
        players: playersInfo.teamMemberMap,
        teamName: teamName
      }
    )
  }
}
