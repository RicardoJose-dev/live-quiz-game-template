import { WebSocket } from "ws"
import gameService from "../services/GameService.js"
import playerService from "../services/PlayerService.js"
import { WSMessage } from "../types.js"

export function processPlayerAnswer(ws: WebSocket, message: WSMessage) {
  const {
    data: { gameId, questionIndex, answerIndex },
  } = message

  const player = playerService.getPlayer(ws)
  const game = gameService.findGameById(gameId)
  game.processPlayerAnswer(player, questionIndex, answerIndex)

  return {
    type: "answer_accepted",
    data: {
      questionIndex,
    },
    id: 0,
  }
}
