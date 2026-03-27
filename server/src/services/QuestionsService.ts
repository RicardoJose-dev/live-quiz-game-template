import { Question } from "../types"

class QuestionsService {
  questions: Question[]

  constructor() {
    this.questions = []
  }

  addQuestion(question: Question) {
    this.questions.push(question)
  }
}
