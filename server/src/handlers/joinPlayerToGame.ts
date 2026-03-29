import { WebSocket } from "ws"
import gameService from "../services/GameService.js"
import playerService from "../services/PlayerService.js"
import { WSMessage } from "../types.js"

export function joinPlayerToGame(ws: WebSocket, message: WSMessage) {
  const { code } = message.data

  const game = gameService.findGameByCode(String(code).toLowerCase())
  const player = playerService.getPlayer(ws)

  gameService.addPlayerToGame(player, game)

  return {
    type: "game_joined",
    data: {
      gameId: game.id,
    },
    id: 0,
  }
}
