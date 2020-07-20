import { PlayerStatus } from '../enums/player_status'

export class Player {
  userId: string
  playerStatus: PlayerStatus

  constructor (userId: string, playerStatus?: PlayerStatus) {
    this.userId = userId
    this.playerStatus = playerStatus && playerStatus || PlayerStatus.WAITING
  }
}
