const redFlags = ['шок', 'срочно', 'скрывают', '100%', 'без доказательств', 'все знают'];

export function checkFact(text: string) {
  const lower = text.toLowerCase();
  const hits = redFlags.filter(flag => lower.includes(flag));

  if (!hits.length) {
    return '⚠️ MVP без ИИ: явных признаков фейка по тестовым правилам не найдено. Для реального вердикта нужна интеграция с ИИ и базой проверенных источников.';
  }

  return `⚠️ MVP без ИИ: найдены признаки недостоверности: ${hits.join(', ')}. Проверь источник, дату, автора и подтверждения в независимых источниках.`;
}
