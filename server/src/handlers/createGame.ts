import { WebSocket } from "ws"
import gameService from "../services/GameService.js"
import playerService from "../services/PlayerService.js"
import { WSMessage } from "../types.js"

export function createGame(ws: WebSocket, message: WSMessage) {
  const {
    id,
    data: { questions },
  } = message

  const game = gameService.generateGame(`${id}`, questions)
  gameService.registerGame(game)

  const player = playerService.getPlayer(ws)
  gameService.addPlayerToGame(player, game)

  return {
    type: "game_created",
    data: {
      gameId: game.id,
      code: game.code,
    },
    id: 0,
  }
}
