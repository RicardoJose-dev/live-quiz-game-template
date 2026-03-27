import crypto from "crypto"
import { Game } from "../entities/Game"
import { CodeGenerator } from "./CodeGenerator"
import { Question } from "../types"

class GameService {
  games: { [key: string]: Game }

  constructor() {
    this.games = {}
  }

  generateGame(id: string, questions: Question[]) {
    const gameId = CodeGenerator.generateGameId()
    const gameCode = CodeGenerator.generateGameCode()
    return new Game(gameId, gameCode, id, questions)
  }

  registerGame(game: Game) {
    this.games[game.id] = game
  }
}

const gameService = new GameService()

export default gameService
