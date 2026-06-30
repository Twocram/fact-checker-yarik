import type { Bot } from 'grammy';
import { getRating } from '../../shared/userState';

export function registerRatingHandlers(bot: Bot): void {
  bot.callbackQuery('rating', async (ctx) => {
    await ctx.answerCallbackQuery();

    const rows = getRating().map(([id, state], index) => (
      `${index + 1}. ${id}: ${state.score} баллов`
    ));

    await ctx.reply(rows.length ? rows.join('\n') : 'Рейтинг пока пуст.');
  });
}
