import { Game } from "../entities/Game.js"
import { CodeGenerator } from "./CodeGenerator.js"
import { Question } from "../types.js"
import { Player } from "../entities/Player.js"

class GameService {
  gamesByCode: { [key: string]: Game }
  gamesById: { [key: string]: Game }
  playersByGame: Map<Player, Game>

  constructor() {
    this.gamesByCode = {}
    this.gamesById = {}
    this.playersByGame = new Map()
  }

  generateGame(id: string, questions: Question[]) {
    const gameId = CodeGenerator.generateGameId()
    const gameCode = CodeGenerator.generateGameCode()
    return new Game(gameId, gameCode, id, questions)
  }

  registerGame(game: Game) {
    this.gamesByCode[game.code] = game
    this.gamesById[game.id] = game
  }

  findGameByCode(code: string) {
    const game = this.gamesByCode[code]

    if (!game) {
      throw new Error("Game not found")
    }

    return game
  }

  findGameById(id: string) {
    const game = this.gamesById[id]

    if (!game) {
      throw new Error("Game not found")
    }

    return game
  }

  findGameByPlayer(player: Player) {
    const game = this.playersByGame.get(player)

    if (!game) {
      throw new Error("Game not found")
    }

    return game
  }

  addPlayerToGame(player: Player, game: Game) {
    this.playersByGame.set(player, game)
    game.addPlayerToGame(player)
  }
}

const gameService = new GameService()

export default gameService
