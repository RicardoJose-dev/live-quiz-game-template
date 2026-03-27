import { Player as PlayerInterface } from "../types"

export class Player implements PlayerInterface {
  name: string
  index: string
  score: number

  constructor(name: string, index: string, score: number = 0) {
    this.name = name
    this.index = index
    this.score = score
  }
}
