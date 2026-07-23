import { parseTreeTestSubmission } from '../../../lib/tree-test';

const maxPayloadBytes = 24 * 1024;
const productionHosts = new Set(['sistem.digital', 'www.sistem.digital']);
const noStoreHeaders = { 'Cache-Control': 'no-store' };

function errorResponse(error: string, status: number): Response {
  return Response.json({ error }, { headers: noStoreHeaders, status });
}

export async function POST(request: Request): Promise<Response> {
  if (!productionHosts.has(new URL(request.url).hostname)) {
    return new Response(null, { headers: noStoreHeaders, status: 204 });
  }

  const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase();
  if (contentType !== 'application/json') return errorResponse('Tip de conținut invalid.', 415);

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > maxPayloadBytes) {
    return errorResponse('Payload prea mare.', 413);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > maxPayloadBytes) {
    return errorResponse('Payload prea mare.', 413);
  }

  const rawPayload = (() => {
    try {
      return JSON.parse(rawBody) as unknown;
    } catch {
      return undefined;
    }
  })();
  const submission = parseTreeTestSubmission(rawPayload);
  if (!submission) return errorResponse('Răspuns invalid.', 400);

  console.info(
    JSON.stringify({
      level: 'info',
      message: 'm3_tree_test_completed',
      ...submission,
    }),
  );

  return new Response(null, { headers: noStoreHeaders, status: 204 });
}
