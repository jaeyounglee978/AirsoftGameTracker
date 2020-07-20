import { TeamNames } from '../enums/team_names'
import { Player } from './player'
import { PlayerStatus } from '../enums/player_status'

class PlayersInfo {
  private _teamMemberMap: Map<TeamNames, Player[]>
  get teamMemberMap (): Map<TeamNames, Player[]> {
    return this._teamMemberMap
  }

  set teamMemberMap (memberMap: Map<TeamNames, Player[]>) {
    this._teamMemberMap = memberMap
  }

  constructor (teamMemberMap: Map<TeamNames, Player[]>) {
    this._teamMemberMap = teamMemberMap
  }

  setPlayerToTeam (teamName: TeamNames, userId: string) {
    let player = new Player(userId, PlayerStatus.WAITING)
    this.teamMemberMap.get(teamName)?.push(player)
  }

  removePlayerFromTeam (teamName: TeamNames, userId: string) {
    let player = new Player(userId, PlayerStatus.WAITING)
    let newPlayerArray = this.teamMemberMap.get(teamName)?.filter(p => { return p.userId !== userId })

    if (newPlayerArray === undefined) {
      throw Error
    } else {
      this.teamMemberMap.set(teamName, newPlayerArray)
    }
  }

  userKiaAndCheckGameEnd (teamName: TeamNames, userId: string): TeamNames | undefined {
    let players = this.teamMemberMap.get(teamName)

    if (players === undefined) {
      throw Error
    }

    for (let p of players) {
      if (p.userId === userId) {
        p.playerStatus = PlayerStatus.DEAD
        break
      }
    }

    if (players.filter(p => { return p.playerStatus !== PlayerStatus.ALIVE }).length === 0) {
      return teamName
    }

    return undefined
  }

  isGameEnd (): boolean {
    return true
  }
}

export default PlayersInfo
