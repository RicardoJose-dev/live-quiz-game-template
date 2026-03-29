import { WebSocket } from "ws"
import gameService from "../services/GameService"
import playerService from "../services/PlayerService"

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
