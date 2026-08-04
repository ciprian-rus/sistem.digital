import { existsSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { checkAccessibility } from './accessibility.js';

// Acest pachet nu instalează Chromium — vezi README.md. Testul rulează
// integral doar când un executabil e disponibil (verificat local în acest
// monorepo la /opt/pw-browsers/chromium sau prin variabila de mediu); altfel
// se omite cu un mesaj explicit, la fel ca scripts/lint-php.mjs din
// starters/wordpress pentru `php` indisponibil.
const executablePath =
  process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM ??
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const describeIfChromium = executablePath ? describe : describe.skip;

if (!executablePath) {
  console.warn(
    'Niciun executabil Chromium găsit — teste sd-a11y-axe-wcag omise. Setează SISTEM_DIGITAL_VALIDATOR_CHROMIUM pentru a le rula.',
  );
}

const accessiblePage = `<!doctype html>
<html lang="ro">
<head><title>Pagină accesibilă</title></head>
<body>
  <h1>Titlu</h1>
  <label for="name">Nume</label>
  <input id="name" name="name">
</body>
</html>`;

const inaccessiblePage = `<!doctype html>
<html lang="ro">
<head><title>Pagină cu probleme</title></head>
<body>
  <h1>Titlu</h1>
  <input name="name">
</body>
</html>`;

describeIfChromium('checkAccessibility', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      response.setHeader('content-type', 'text/html; charset=utf-8');
      response.end(request.url === '/inaccessible' ? inaccessiblePage : accessiblePage);
    });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(() => {
    server.close();
  });

  it('passes a page with no accessibility violations', async () => {
    const result = await checkAccessibility(`${baseUrl}/`, { executablePath });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([]);
  }, 30_000);

  it('fails a page with an unlabeled input, with evidence', async () => {
    const result = await checkAccessibility(`${baseUrl}/inaccessible`, { executablePath });
    expect(result.status).toBe('fail');
    expect(result.evidence).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'label' })]),
    );
  }, 30_000);
});
