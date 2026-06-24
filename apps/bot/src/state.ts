import type { Context } from 'grammy';
import type { UserState } from './types';

const users = new Map<number, UserState>();

export function getUserState(ctx: Context) {
  const id = ctx.from?.id;
  if (!id)
    return;

  const existing = users.get(id);
  if (existing)
    return existing;

  const created: UserState = { mode: 'idle', score: 0 };
  users.set(id, created);
  return created;
}

export function getRating(limit = 10) {
  return [...users.entries()]
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, limit);
}
