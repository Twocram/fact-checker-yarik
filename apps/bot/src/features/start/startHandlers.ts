import type { Bot } from 'grammy';
import { mainMenu } from '../../shared/keyboards';
import { getUserState } from '../../shared/userState';

export function registerStartHandlers(bot: Bot): void {
  bot.command('start', async (ctx) => {
    getUserState(ctx);
    await ctx.reply(
      'Привет! Я бот для факт-чека и тренировки поиска дезинформации.\n\n🔎 Проверка фактов работает через AI-разбор, а обучающий режим пока использует подготовленные задания.\n\nВыбери режим:',
      { reply_markup: mainMenu },
    );
  });
}
