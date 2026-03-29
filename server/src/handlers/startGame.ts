import { WebSocket } from "ws"
import gameService from "../services/GameService.js"
import { WSMessage } from "../types.js"

export function startGame(ws: WebSocket, message: WSMessage) {
  const {
    data: { gameId },
  } = message
  const game = gameService.findGameById(gameId)
  game.startGame()

  return {
    type: "start_game",
    data: {
      gameId,
    },
    id: 0,
  }
}
