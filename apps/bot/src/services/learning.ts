import type { Difficulty, Task } from '../types';
import tasksJson from '../../data/tasks.json';

const tasks = tasksJson as Task[];

export function getRandomTask(difficulty: Difficulty) {
  const pool = tasks.filter(task => task.difficulty === difficulty);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getTask(id?: string) {
  return tasks.find(task => task.id === id);
}

export function gradeAnswer(text: string, task: Task) {
  const found = task.errors.filter(error => includesAny(text, error.split(/\s+/))).length;
  const points = found * (task.difficulty === 'advanced' ? 20 : 10);

  return { found, points, total: task.errors.length };
}

function includesAny(text: string, words: string[]) {
  const lower = text.toLowerCase();
  return words.some(word => word.length > 4 && lower.includes(word.toLowerCase()));
}
