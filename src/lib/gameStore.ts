import { create } from 'zustand'
import { GameState, Team, Category, Question } from './types'

type GameStore = GameState & {
  setTeams: (a: string, b: string) => void
  setSessionId: (id: string) => void
  setCurrentCategory: (cat: Category) => void
  setCurrentQuestion: (q: Question) => void
  addScore: (team: Team, points: number) => void
  markCategoryUsed: (categoryId: string) => void
  switchTurn: () => void
  useLifeline: (team: Team, lifeline: 'skip' | 'fifty_fifty') => void
  resetGame: () => void
}

const defaultLifelines = { skip: false, fifty_fifty: false }

const initialState: GameState = {
  teamAName: '',
  teamBName: '',
  teamAScore: 0,
  teamBScore: 0,
  currentTurn: 'a',
  selectedCategories: [],
  usedCategories: [],
  lifelines: { a: { ...defaultLifelines }, b: { ...defaultLifelines } },
  currentCategory: null,
  currentQuestion: null,
  sessionId: null,
}

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setTeams: (a, b) => set({ teamAName: a, teamBName: b }),
  setSessionId: (id) => set({ sessionId: id }),
  setCurrentCategory: (cat) => set({ currentCategory: cat }),
  setCurrentQuestion: (q) => set({ currentQuestion: q }),

  addScore: (team, points) =>
    set((s) => ({
      teamAScore: team === 'a' ? s.teamAScore + points : s.teamAScore,
      teamBScore: team === 'b' ? s.teamBScore + points : s.teamBScore,
    })),

  markCategoryUsed: (categoryId) =>
    set((s) => ({ usedCategories: [...s.usedCategories, categoryId] })),

  switchTurn: () =>
    set((s) => ({ currentTurn: s.currentTurn === 'a' ? 'b' : 'a' })),

  useLifeline: (team, lifeline) =>
    set((s) => ({
      lifelines: {
        ...s.lifelines,
        [team]: { ...s.lifelines[team], [lifeline]: true },
      },
    })),

  resetGame: () => set(initialState),
}))