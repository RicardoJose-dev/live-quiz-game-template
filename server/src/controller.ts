import { registerUser, createGame } from "./handlers/index"
import { WSMessage } from "./types"

export function processMessage(message: WSMessage) {
  const { type } = message

  switch (type) {
    case "reg":
      return registerUser(message)
    case "create_game":
      return createGame(message)
    default:
      break
  }
}
