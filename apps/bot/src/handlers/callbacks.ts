import type { Bot } from 'grammy';
import type { Difficulty } from '../types';
import { difficultyMenu } from '../keyboards';
import { getRandomTask } from '../services/learning';
import { getRating, getUserState } from '../state';

export function registerCallbackHandlers(bot: Bot) {
  bot.callbackQuery('check', async (ctx) => {
    const state = getUserState(ctx);
    if (state)
      state.mode = 'checking';

    await ctx.answerCallbackQuery();
    await ctx.reply('Пришли ссылку, статью или утверждение для проверки.');
  });

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

  bot.callbackQuery('rating', async (ctx) => {
    await ctx.answerCallbackQuery();

    const rows = getRating().map(([id, state], index) => (
      `${index + 1}. ${id}: ${state.score} баллов`
    ));

    await ctx.reply(rows.length ? rows.join('\n') : 'Рейтинг пока пуст.');
  });

  bot.callbackQuery('submit', async (ctx) => {
    const state = getUserState(ctx);
    if (state)
      state.mode = 'submitting';

    await ctx.answerCallbackQuery();
    await ctx.reply('Пришли факт и доказательства. Администратор сможет проверить и добавить его в базу.');
  });
}
