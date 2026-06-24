import { createBot } from './bot';

const token = Bun.env.BOT_TOKEN;
if (!token)
  throw new Error('BOT_TOKEN is required');

Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),
  fetch: () => new Response('ok'),
});

void createBot(token).start();
