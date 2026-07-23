import { parseWebVitalPayload } from '../../../lib/web-vitals';

const maxPayloadBytes = 1024;
const productionHosts = new Set(['sistem.digital', 'www.sistem.digital']);
const noStoreHeaders = { 'Cache-Control': 'no-store' };

function jsonError(error: string, status: number): Response {
  return Response.json(
    { error },
    {
      headers: noStoreHeaders,
      status,
    },
  );
}

export async function POST(request: Request): Promise<Response> {
  if (!productionHosts.has(new URL(request.url).hostname)) {
    return new Response(null, {
      headers: noStoreHeaders,
      status: 204,
    });
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > maxPayloadBytes) {
    return jsonError('Payload prea mare.', 413);
  }

  const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase();
  if (contentType !== 'application/json') {
    return jsonError('Tip de conținut invalid.', 415);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > maxPayloadBytes) {
    return jsonError('Payload prea mare.', 413);
  }

  const rawPayload = (() => {
    try {
      return JSON.parse(rawBody) as unknown;
    } catch {
      return undefined;
    }
  })();
  const metric = parseWebVitalPayload(rawPayload);
  if (!metric) return jsonError('Metrică invalidă.', 400);

  console.info(
    JSON.stringify({
      level: 'info',
      message: 'core_web_vital',
      ...metric,
    }),
  );

  return new Response(null, {
    headers: noStoreHeaders,
    status: 204,
  });
}
