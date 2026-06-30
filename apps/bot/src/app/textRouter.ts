import type { Bot } from 'grammy';
import { replyWithFactCheck } from '../features/fact-check/factCheckHandlers';
import { replyWithLearningResult } from '../features/learning/learningHandlers';
import { replyWithSubmissionResult } from '../features/submission/submissionHandlers';
import { mainMenu } from '../shared/keyboards';
import { getUserState } from '../shared/userState';

export function registerTextRouter(bot: Bot): void {
  bot.on('message:text', async (ctx) => {
    const state = getUserState(ctx);
    if (!state)
      return;

    const text = ctx.message.text;

    if (state.mode === 'checking') {
      state.mode = 'idle';
      await replyWithFactCheck(ctx, text);
      return;
    }

    if (state.mode === 'playing') {
      await replyWithLearningResult(ctx, state, text);
      return;
    }

    if (state.mode === 'submitting') {
      state.mode = 'idle';
      await replyWithSubmissionResult(ctx, text);
      return;
    }

    await ctx.reply('Выбери действие:', { reply_markup: mainMenu });
  });
}
