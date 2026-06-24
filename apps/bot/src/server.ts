import { checkFact } from './services/factCheck';

const corsHeaders = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Origin': Bun.env.WEB_ORIGIN ?? '*',
};

export function startHttpServer() {
  return Bun.serve({
    port: Number(Bun.env.PORT ?? 3000),
    async fetch(request) {
      const url = new URL(request.url);

      if (request.method === 'OPTIONS')
        return new Response(null, { headers: corsHeaders });

      if (url.pathname === '/api/check' && request.method === 'POST') {
        const { text } = await request.json() as { text?: string };
        if (!text?.trim())
          return json({ error: 'Text is required' }, 400);

        const result = await checkFact(text.slice(0, 4000));
        return json({ result });
      }

      return new Response('ok', { headers: corsHeaders });
    },
  });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}
