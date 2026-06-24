export type Difficulty = 'basic' | 'advanced';
export type Mode = 'idle' | 'checking' | 'playing' | 'submitting';

export interface Task {
  id: string
  difficulty: Difficulty
  text: string
  errors: string[]
  comment: string
}

export interface UserState {
  mode: Mode
  score: number
  difficulty?: Difficulty
  taskId?: string
}
