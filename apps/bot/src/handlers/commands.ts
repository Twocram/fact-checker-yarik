import type { Bot } from 'grammy';
import { mainMenu } from '../keyboards';
import { getUserState } from '../state';

export function registerCommandHandlers(bot: Bot) {
  bot.command('start', async (ctx) => {
    getUserState(ctx);
    await ctx.reply(
      'Привет! Я бот для факт-чека и тренировки поиска дезинформации.\n\n🔎 Проверка фактов работает через AI-разбор, а обучающий режим пока использует подготовленные задания.\n\nВыбери режим:',
      { reply_markup: mainMenu },
    );
  });
}
