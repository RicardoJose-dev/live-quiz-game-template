import { WebSocket } from "ws"
import gameService from "../services/GameService.js"
import playerService from "../services/PlayerService.js"

export function removePlayer(ws: WebSocket) {
  const player = playerService.getPlayer(ws)

  if (!player) {
    return
  }
  const game = gameService.findGameByPlayer(player)

  if (!game) {
    return
  }

  game.removePlayerFromGame(player)
}
