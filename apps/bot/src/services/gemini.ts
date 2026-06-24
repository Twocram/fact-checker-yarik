interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>
    }
  }>
}

const model = Bun.env.GEMINI_MODEL ?? 'gemini-1.5-flash';

export async function askGemini(prompt: string) {
  const apiKey = Bun.env.GEMINI_API_KEY;
  if (!apiKey)
    return;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 700,
      },
    }),
  });

  if (!response.ok)
    throw new Error(`Gemini API error: ${response.status} ${await response.text()}`);

  const data = await response.json() as GeminiResponse;
  return data.candidates?.[0]?.content?.parts?.map(part => part.text).join('').trim();
}
