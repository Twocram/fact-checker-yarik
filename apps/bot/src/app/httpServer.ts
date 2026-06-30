import { checkFact } from '../features/fact-check/factCheckService';

const allowedOrigins = (Bun.env.WEB_ORIGIN ?? '*')
  .split(',')
  .map(origin => origin.trim().replace(/\/$/, ''));

export function startHttpServer(): ReturnType<typeof Bun.serve> {
  return Bun.serve({
    port: Number(Bun.env.PORT ?? 3000),
    async fetch(request) {
      const url = new URL(request.url);
      const headers = corsHeaders(request);

      if (request.method === 'OPTIONS')
        return new Response(null, { status: 204, headers });

      if (url.pathname === '/api/check' && request.method === 'POST')
        return handleFactCheckRequest(request, headers);

      return new Response('ok', { headers });
    },
  });
}

async function handleFactCheckRequest(request: Request, headers: Record<string, string>): Promise<Response> {
  const { text } = await request.json() as { text?: string };
  if (!text?.trim())
    return json({ error: 'Text is required' }, headers, 400);

  const result = await checkFact(text.slice(0, 4000));
  return json({ result }, headers);
}

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin')?.replace(/\/$/, '');
  const allowedOrigin = allowedOrigins.includes('*')
    ? '*'
    : origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Origin': allowedOrigin,
    'Vary': 'Origin',
  };
}

function json(data: unknown, headers: Record<string, string>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}
