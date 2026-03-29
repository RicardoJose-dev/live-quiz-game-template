import { WebSocket } from "ws"
import gameService from "../services/GameService"
import playerService from "../services/PlayerService"
import { WSMessage } from "../types"

export function joinPlayerToGame(ws: WebSocket, message: WSMessage) {
  const { code } = message.data
  const game = gameService.findGameByCode(String(code).toLowerCase())

  if (game === undefined) {
    throw new Error("Game not found")
  }

  const player = playerService.getPlayer(ws)

  if (player === undefined) {
    throw new Error("Player not found")
  }

  game.addPlayerToGame(player)

  return {
    type: "game_joined",
    data: {
      gameId: game.id,
    },
    id: 0,
  }
}
