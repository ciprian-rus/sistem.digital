import { afterEach, describe, expect, it, vi } from 'vitest';

import { POST } from './route';

function request(body: string, headers: Record<string, string> = {}) {
  return new Request('https://sistem.digital/api/web-vitals', {
    body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    method: 'POST',
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Core Web Vitals endpoint', () => {
  it('logs only the validated metric fields in Production', async () => {
    const log = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const response = await POST(
      request(
        JSON.stringify({
          id: 'must-not-be-logged',
          name: 'LCP',
          pathname: '/formular?cnp=secret',
          rating: 'good',
          value: 1234.56789,
        }),
      ),
    );

    expect(response.status).toBe(204);
    expect(JSON.parse(String(log.mock.calls[0]?.[0]))).toEqual({
      level: 'info',
      message: 'core_web_vital',
      name: 'LCP',
      rating: 'good',
      value: 1234.568,
    });
  });

  it('does not collect metrics outside the Production domains', async () => {
    const log = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const response = await POST(
      new Request('https://preview.example/api/web-vitals', {
        body: JSON.stringify({ name: 'CLS', rating: 'good', value: 0.01 }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }),
    );

    expect(response.status).toBe(204);
    expect(log).not.toHaveBeenCalled();
  });

  it('rejects invalid content types, payloads and actual bodies over 1 KiB', async () => {
    expect(
      (
        await POST(
          request(JSON.stringify({ name: 'CLS', rating: 'good', value: 0.01 }), {
            'Content-Type': 'text/plain',
          }),
        )
      ).status,
    ).toBe(415);
    expect((await POST(request('{invalid'))).status).toBe(400);
    expect((await POST(request(`{"padding":"${'x'.repeat(1100)}"}`))).status).toBe(413);
  });
});
