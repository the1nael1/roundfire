export type Team = 'a' | 'b'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Category = {
  id: string
  name: string
  icon: string
  color: string
}

export type Question = {
  id: string
  category_id: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_option: 'a' | 'b' | 'c' | 'd'
  difficulty: Difficulty
  points: number
}

export type Lifelines = {
  skip: boolean
  fifty_fifty: boolean
}

export type GameState = {
  teamAName: string
  teamBName: string
  teamAScore: number
  teamBScore: number
  currentTurn: Team
  selectedCategories: string[]
  usedCategories: string[]
  lifelines: { a: Lifelines; b: Lifelines }
  currentCategory: Category | null
  currentQuestion: Question | null
  sessionId: string | null
}