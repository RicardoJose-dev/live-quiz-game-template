import type { WebSocket } from "ws"
import { Player as PlayerInterface } from "../types.js"

export class Player implements PlayerInterface {
  name: string
  index: string
  score: number
  ws?: WebSocket
  hasAnswered?: boolean
  answerTime?: number
  answeredCorrectly?: boolean

  constructor(ws: WebSocket, name: string, index: string) {
    this.name = name
    this.index = index
    this.score = 0
    this.ws = ws
  }

  resetAnswerData() {
    this.hasAnswered = undefined
    this.answerTime = undefined
    this.answeredCorrectly = undefined
  }

  updatePlayerAnswerStats(answerTime: number, answeredCorrectly: boolean) {
    this.hasAnswered = true
    this.answerTime = answerTime
    this.answeredCorrectly = answeredCorrectly
  }

  updatePlayerScore(questionStartTime: number, timeLimitSec: number) {
    if (!this.answeredCorrectly || !this.answerTime) {
      return this.score
    }

    const playerTime = this.answerTime - questionStartTime
    const timeRemaining = timeLimitSec * 1000 - playerTime

    this.score += Math.floor(timeRemaining / timeLimitSec)
    return this.score
  }
}
