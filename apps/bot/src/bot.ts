import { Bot } from 'grammy';
import { registerCallbackHandlers } from './handlers/callbacks';
import { registerCommandHandlers } from './handlers/commands';
import { registerMessageHandlers } from './handlers/messages';

export function createBot(token: string) {
  const bot = new Bot(token);

  registerCommandHandlers(bot);
  registerCallbackHandlers(bot);
  registerMessageHandlers(bot);

  return bot;
}
