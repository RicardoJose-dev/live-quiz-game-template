import { Player } from "../entities/Player"
import { CodeGenerator } from "./CodeGenerator"

class PlayerService {
  players: { [key: string]: Player }

  constructor() {
    this.players = {}
  }

  generatePlayer(name: string) {
    const playerIndex = CodeGenerator.generatePlayerIndex()
    return new Player(name, playerIndex)
  }

  registerPlayer(player: Player) {
    this.players[player.index] = player
  }
}

const playerService = new PlayerService()

export default playerService
