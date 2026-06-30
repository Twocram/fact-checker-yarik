import { Bot } from 'grammy';
import { registerFactCheckHandlers } from '../features/fact-check/factCheckHandlers';
import { registerLearningHandlers } from '../features/learning/learningHandlers';
import { registerRatingHandlers } from '../features/rating/ratingHandlers';
import { registerStartHandlers } from '../features/start/startHandlers';
import { registerSubmissionHandlers } from '../features/submission/submissionHandlers';
import { registerTextRouter } from './textRouter';

export function createBot(token: string): Bot {
  const bot = new Bot(token);

  registerStartHandlers(bot);
  registerFactCheckHandlers(bot);
  registerLearningHandlers(bot);
  registerRatingHandlers(bot);
  registerSubmissionHandlers(bot);
  registerTextRouter(bot);

  return bot;
}
