import { existsSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { checkFocusVisible } from './focus-visible.js';

// Vezi accessibility.test.ts pentru explicația acestui tipar de omitere.
const executablePath =
  process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM ??
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const describeIfChromium = executablePath ? describe : describe.skip;

describeIfChromium('checkFocusVisible', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      switch (request.url) {
        case '/default-outline':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><button>Implicit</button></body></html>',
          );
          return;
        case '/custom-visible':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><head><style>button:focus { outline: none; box-shadow: 0 0 0 3px blue; }</style></head><body><button>Personalizat</button></body></html>',
          );
          return;
        case '/no-indicator':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><head><style>button { outline: none; } button:focus { outline: none; }</style></head><body><button>Fără indicator</button></body></html>',
          );
          return;
        case '/skip-link':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><head><style>' +
              '.skip { position: fixed; top: 8px; left: 8px; outline: none; transform: translateY(-180%); background: blue; color: white; padding: 8px; }' +
              '.skip:focus { transform: translateY(0); }' +
              '</style></head><body><a class="skip" href="#main">Sari la conținut</a></body></html>',
          );
          return;
        default:
          response.statusCode = 404;
          response.end('Not found');
      }
    });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(() => {
    server.close();
  });

  it('passes when the browser default outline appears on focus', async () => {
    const result = await checkFocusVisible(`${baseUrl}/default-outline`, { executablePath });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([expect.objectContaining({ hasVisibleIndicator: true })]);
  }, 30_000);

  it('passes when outline is replaced with a custom box-shadow', async () => {
    const result = await checkFocusVisible(`${baseUrl}/custom-visible`, { executablePath });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([expect.objectContaining({ hasVisibleIndicator: true })]);
  }, 30_000);

  it('warns, never fails, when no focus indicator is detected at all', async () => {
    const result = await checkFocusVisible(`${baseUrl}/no-indicator`, { executablePath });
    expect(result.status).toBe('warn');
    expect(result.severity).toBe('warning');
    expect(result.evidence).toEqual([expect.objectContaining({ hasVisibleIndicator: false })]);
  }, 30_000);

  it('detects a transform-only reveal pattern (skip-link style), not just outline/box-shadow', async () => {
    const result = await checkFocusVisible(`${baseUrl}/skip-link`, { executablePath });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([expect.objectContaining({ hasVisibleIndicator: true })]);
  }, 30_000);
});
