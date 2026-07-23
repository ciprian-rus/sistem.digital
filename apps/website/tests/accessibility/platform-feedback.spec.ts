import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page, type TestInfo } from '@playwright/test';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function expectNoAxeViolations(page: Page, testInfo: TestInfo, attachmentName: string) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  await testInfo.attach(attachmentName, {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });
  expect(
    results.violations,
    JSON.stringify(
      results.violations.map(({ id, impact, nodes }) => ({
        id,
        impact,
        targets: nodes.map((node) => node.target),
      })),
      null,
      2,
    ),
  ).toEqual([]);
}

test.describe('M3 search, feedback and privacy-friendly measurement', () => {
  test('searches without diacritics and keeps the canonical category in the URL', async ({
    page,
  }) => {
    await page.goto('/cautare?q=antet&categorie=components');

    await expect(page.getByRole('combobox', { name: 'Categorie' })).toHaveValue('components');
    await expect(
      page.getByRole('link', {
        name: 'Navigație și structură instituțională',
      }),
    ).toBeVisible();
    await expect(page).toHaveURL(/q=antet.*categorie=components/u);
  });

  test('offers clear recovery steps when there are no results', async ({ page }) => {
    await page.goto('/cautare?q=termen-inexistent');

    await expect(
      page.getByRole('heading', {
        name: /Nu am găsit rezultate pentru/u,
      }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Resetează căutarea' })).toHaveAttribute(
      'href',
      '/cautare',
    );
    await expect(page.getByRole('link', { name: 'Răsfoiește catalogul' })).toHaveAttribute(
      'href',
      '/componente/catalog',
    );
  });

  test('prefills page feedback without submitting it automatically', async ({ page }) => {
    await page.goto('/guvernanta/masurare');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Măsurare cu protecția vieții private',
      }),
    ).toBeVisible();
    const negativeFeedback = page.getByRole('link', {
      name: /Nu — deschide un issue GitHub precompletat/u,
    });
    const href = await negativeFeedback.getAttribute('href');
    expect(href).not.toBeNull();
    const issueUrl = new URL(href ?? '');
    expect(issueUrl.pathname).toBe('/ciprian-rus/sistem.digital/issues/new');
    expect(issueUrl.searchParams.get('body')).toContain(
      'https://sistem.digital/guvernanta/masurare',
    );
  });

  for (const pathname of ['/cautare?q=șablon', '/guvernanta/masurare']) {
    test(`has no automatically detectable WCAG violations on ${pathname}`, async ({
      page,
    }, testInfo) => {
      await page.goto(pathname);
      await expectNoAxeViolations(
        page,
        testInfo,
        `m3-platform-axe-${pathname.replaceAll(/[^a-z0-9]+/giu, '-')}`,
      );
    });
  }

  test('reflows search results at 320 CSS pixels', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/cautare?q=dialog&categorie=components');

    const geometry = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));

    expect(geometry.document).toBeLessThanOrEqual(geometry.viewport + 1);
    expect(geometry.body).toBeLessThanOrEqual(geometry.viewport + 1);
  });
});
