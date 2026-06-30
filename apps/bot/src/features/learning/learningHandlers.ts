import type { Bot, Context } from 'grammy';
import type { Difficulty, UserState } from '../../shared/types';
import { difficultyMenu, mainMenu } from '../../shared/keyboards';
import { getUserState } from '../../shared/userState';
import { getRandomTask, getTask, gradeAnswer } from './learningService';

export function registerLearningHandlers(bot: Bot): void {
  bot.callbackQuery('learn', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply('Выбери сложность задания:', { reply_markup: difficultyMenu });
  });

  bot.callbackQuery(/^difficulty:(basic|advanced)$/, async (ctx) => {
    const state = getUserState(ctx);
    if (!state)
      return;

    const difficulty = ctx.match[1] as Difficulty;
    const task = getRandomTask(difficulty);
    Object.assign(state, { mode: 'playing', difficulty, taskId: task.id });

    await ctx.answerCallbackQuery();
    await ctx.reply(`Найди ошибки и напиши ответ одним сообщением:\n\n${task.text}`);
  });
}

export async function replyWithLearningResult(ctx: Context, state: UserState, text: string): Promise<void> {
  const task = getTask(state.taskId);
  if (!task)
    return;

  const result = gradeAnswer(text, task);
  state.score += result.points;
  state.mode = 'idle';

  await ctx.reply(
    `Найдено совпадений: ${result.found}/${result.total}. +${result.points} баллов.\n\nКомментарий: ${task.comment}`,
    { reply_markup: mainMenu },
  );
}
