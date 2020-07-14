import { TeamNames } from '../enums/team_names'
import { Player } from './player'

class PlayersInfo {
  private _teamMemberMap: Map<TeamNames, Player[]>
  get teamMemberMap (): Map<TeamNames, Player[]> {
    return this.teamMemberMap
  }

  set teamMemberMap (memberMap: Map<TeamNames, Player[]>) {
    this._teamMemberMap = memberMap
  }

  constructor (teamMemberMap: Map<TeamNames, Player[]>) {
    this._teamMemberMap = teamMemberMap
  }
}

export default PlayersInfo
