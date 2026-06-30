import type { Bot, Context } from 'grammy';
import { mainMenu } from '../../shared/keyboards';
import { getUserState } from '../../shared/userState';
import { checkFact } from './factCheckService';

export function registerFactCheckHandlers(bot: Bot): void {
  bot.callbackQuery('check', async (ctx) => {
    const state = getUserState(ctx);
    if (state)
      state.mode = 'checking';

    await ctx.answerCallbackQuery();
    await ctx.reply('Пришли ссылку, статью или утверждение для проверки.');
  });
}

export async function handleFactCheckText(text: string): Promise<string> {
  return checkFact(text);
}

export async function replyWithFactCheck(ctx: Context, text: string): Promise<void> {
  await ctx.reply('Проверяю…');
  await ctx.reply(await handleFactCheckText(text), { reply_markup: mainMenu });
}
