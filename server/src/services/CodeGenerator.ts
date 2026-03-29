import crypto from "crypto"

export class CodeGenerator {
  static generatePlayerIndex() {
    return crypto.randomBytes(5).toString("hex")
  }

  static generateGameCode() {
    return crypto.randomBytes(3).toString("hex")
  }

  static generateGameId() {
    return crypto.randomBytes(5).toString("hex")
  }
}
