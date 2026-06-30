export type Difficulty = 'basic' | 'advanced';
export type UserMode = 'idle' | 'checking' | 'playing' | 'submitting';

export interface Task {
  id: string
  difficulty: Difficulty
  text: string
  errors: string[]
  comment: string
}

export interface UserState {
  mode: UserMode
  score: number
  difficulty?: Difficulty
  taskId?: string
}
