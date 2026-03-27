import playerService from "../services/PlayerService"
import { WSMessage } from "../types"

export function registerUser(message: WSMessage) {
  const { name } = message.data

  const player = playerService.generatePlayer(name)
  playerService.registerPlayer(player)

  return {
    type: "reg",
    data: {
      name: name,
      index: player.index,
      error: false,
      errorText: "",
    },
    id: 0,
  }
}
