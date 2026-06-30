import type { Bot, Context } from 'grammy';
import { mainMenu } from '../../shared/keyboards';
import { getUserState } from '../../shared/userState';

export function registerSubmissionHandlers(bot: Bot): void {
  bot.callbackQuery('submit', async (ctx) => {
    const state = getUserState(ctx);
    if (state)
      state.mode = 'submitting';

    await ctx.answerCallbackQuery();
    await ctx.reply('Пришли факт и доказательства. Администратор сможет проверить и добавить его в базу.');
  });
}

export async function replyWithSubmissionResult(ctx: Context, text: string): Promise<void> {
  console.log('User fact proposal:', { userId: ctx.from?.id, text });
  await ctx.reply('Спасибо! Факт отправлен на модерацию.', { reply_markup: mainMenu });
}
