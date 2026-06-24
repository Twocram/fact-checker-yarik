import type { Bot } from 'grammy';
import { mainMenu } from '../keyboards';
import { getUserState } from '../state';

export function registerCommandHandlers(bot: Bot) {
  bot.command('start', async (ctx) => {
    getUserState(ctx);
    await ctx.reply(
      'Привет! Я бот для факт-чека и тренировки поиска дезинформации.\n\n⚠️ MVP: ИИ пока не подключён, ответы строятся на тестовых правилах и учебной базе.\n\nВыбери режим:',
      { reply_markup: mainMenu },
    );
  });
}
