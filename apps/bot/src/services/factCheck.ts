import { askGemini } from './gemini';

const redFlags = ['шок', 'срочно', 'скрывают', '100%', 'без доказательств', 'все знают'];

export async function checkFact(text: string) {
  try {
    const answer = await askGemini(buildPrompt(text));
    if (answer)
      return `🤖 Разбор Gemini:\n\n${answer}`;
  }
  catch (error) {
    console.error(error);
  }

  return heuristicCheck(text);
}

function heuristicCheck(text: string) {
  const lower = text.toLowerCase();
  const hits = redFlags.filter(flag => lower.includes(flag));

  if (!hits.length)
    return '⚠️ Gemini не подключён или временно недоступен. По тестовым правилам явных признаков фейка не найдено.';

  return `⚠️ Gemini не подключён или временно недоступен. Найдены признаки недостоверности: ${hits.join(', ')}. Проверь источник, дату, автора и подтверждения в независимых источниках.`;
}

function buildPrompt(text: string) {
  return `Ты помощник по медиаграмотности для школьников. Разбери подозрительную новость или утверждение.

Важно:
- не называй утверждение фейком без доказательств;
- если не уверен, так и скажи;
- дай короткий вывод;
- перечисли признаки манипуляции;
- предложи 3 шага проверки источника;
- отвечай по-русски, понятно для подростка;
- максимум 1800 символов.

Текст для проверки:
${text}`;
}
