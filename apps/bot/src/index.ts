import { createBot } from './app/createBot';
import { startHttpServer } from './app/httpServer';

const token = Bun.env.BOT_TOKEN;
const pollingEnabled = Bun.env.BOT_POLLING !== 'false';

startHttpServer();

if (token && pollingEnabled)
  void createBot(token).start();
else
  console.warn('Telegram polling disabled. HTTP API is running only.');
