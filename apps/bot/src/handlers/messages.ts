import type { Bot } from 'grammy';
import { mainMenu } from '../keyboards';
import { checkFact } from '../services/factCheck';
import { getTask, gradeAnswer } from '../services/learning';
import { getUserState } from '../state';

export function registerMessageHandlers(bot: Bot) {
  bot.on('message:text', async (ctx) => {
    const state = getUserState(ctx);
    if (!state)
      return;

    if (state.mode === 'checking') {
      state.mode = 'idle';
      await ctx.reply(checkFact(ctx.message.text), { reply_markup: mainMenu });
      return;
    }

    if (state.mode === 'playing') {
      const task = getTask(state.taskId);
      if (!task)
        return;

      const result = gradeAnswer(ctx.message.text, task);
      state.score += result.points;
      state.mode = 'idle';

      await ctx.reply(
        `Найдено совпадений: ${result.found}/${result.total}. +${result.points} баллов.\n\nКомментарий: ${task.comment}`,
        { reply_markup: mainMenu },
      );
      return;
    }

    if (state.mode === 'submitting') {
      state.mode = 'idle';
      console.log('User fact proposal:', { userId: ctx.from.id, text: ctx.message.text });
      await ctx.reply('Спасибо! Факт отправлен на модерацию.', { reply_markup: mainMenu });
      return;
    }

    await ctx.reply('Выбери действие:', { reply_markup: mainMenu });
  });
}
