import { InlineKeyboard } from 'grammy';

export const mainMenu = new InlineKeyboard()
  .text('🔎 Проверить факт', 'check')
  .row()
  .text('🎓 Обучение', 'learn')
  .text('🏆 Рейтинг', 'rating')
  .row()
  .text('➕ Предложить факт', 'submit');

export const difficultyMenu = new InlineKeyboard()
  .text('Обычный', 'difficulty:basic')
  .text('Продвинутый', 'difficulty:advanced');
