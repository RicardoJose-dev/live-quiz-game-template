import { Game as GameInterface, Question, Player } from "../types"

export class Game implements GameInterface {
  id: string
  code: string
  hostId: string
  questions: Question[]
  players: Player[]
  currentQuestion: number
  status: "waiting" | "in_progress" | "finished"
  playerAnswers: Map<string, { answerIndex: number; timestamp: number }>

  constructor(id: string, code: string, hostId: string, questions: Question[]) {
    this.id = id
    this.code = code
    this.hostId = hostId
    this.questions = questions
    this.players = []
    this.currentQuestion = -1
    this.status = "waiting"
    this.playerAnswers = new Map()
  }

  broadcastPlayerJoined(newPlayer: Player) {
    for (const player of this.players) {
      player.ws?.send(
        JSON.stringify({
          type: "player_joined",
          data: {
            playerName: newPlayer.name,
            playerCount: this.players.length,
          },
          id: 0,
        })
      )
    }
  }

  broadcastUpdatePlayers() {
    for (const player of this.players) {
      player.ws?.send(
        JSON.stringify({
          type: "update_players",
          data: this.players.map(({ index, name, score }) => ({
            index,
            name,
            score,
          })),
          id: 0,
        })
      )
    }
  }

  addPlayerToGame(player: Player) {
    this.players.push(player)
    this.broadcastPlayerJoined(player)
    this.broadcastUpdatePlayers()
  }

  startGame() {
    this.status = "in_progress"
    this.currentQuestion++

    for (const player of this.players) {
      if (!player.ws) {
        continue
      }

      const question = this.questions[this.currentQuestion]

      player.ws.send(
        JSON.stringify({
          type: "question",
          data: {
            questionNumber: this.currentQuestion + 1,
            totalQuestions: this.questions.length,
            text: question.text,
            options: question.options,
            timeLimitSec: question.timeLimitSec,
          },
          id: 0,
        })
      )
    }
  }
}
