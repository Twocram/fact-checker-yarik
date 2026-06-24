interface GroqResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

const model = Bun.env.GROQ_MODEL ?? 'llama-3.1-8b-instant';

export async function askGroq(prompt: string) {
  const apiKey = Bun.env.GROQ_API_KEY;
  if (!apiKey)
    return;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'Ты помощник по медиаграмотности для школьников. Отвечай по-русски, кратко, уверенно там, где есть общеизвестные проверяемые факты. Не используй Markdown-разметку.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0,
      max_tokens: 700,
    }),
  });

  if (!response.ok) {
    console.warn(`Groq unavailable: ${response.status}`);
    return;
  }

  const data = await response.json() as GroqResponse;
  return data.choices?.[0]?.message?.content?.trim();
}
