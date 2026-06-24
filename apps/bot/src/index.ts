import { createBot } from './bot';

const token = Bun.env.BOT_TOKEN;
if (!token)
  throw new Error('BOT_TOKEN is required');

createBot(token).start();
