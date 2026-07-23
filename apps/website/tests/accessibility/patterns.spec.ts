import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const patternPaths = [
  '/pattern-uri/inainte-sa-incepi',
  '/pattern-uri/transfer-extern',
  '/pattern-uri/status-confirmare-reluare',
  '/pattern-uri/verifica-raspunsurile',
] as const;

test.describe('M4 service patterns', () => {
  for (const path of patternPaths) {
    test(`${path} is accessible and linked to the reference service`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole('main')).toHaveAttribute('id', 'continut');
      await expect(page.getByText('Alpha', { exact: true }).first()).toBeVisible();
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('keeps the essential pattern guidance available without JavaScript', async ({ browser }) => {
    const page = await browser.newPage({ javaScriptEnabled: false });
    try {
      await page.goto('/pattern-uri/status-confirmare-reluare');
      await expect(page.getByRole('heading', { name: 'Confirmarea depunerii' })).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'Fără cont și fără JavaScript' }),
      ).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Responsabilități' })).toBeVisible();
    } finally {
      await page.close();
    }
  });

  test('provides a server-rendered submission path without JavaScript', async ({ browser }) => {
    const page = await browser.newPage({ javaScriptEnabled: false });
    try {
      await page.goto('/exemple/adeverinta/fara-javascript');
      await expect(
        page.getByRole('heading', { name: 'Verifică răspunsurile înainte de trimitere' }),
      ).toBeVisible();
      await page.getByLabel('Declar că informațiile furnizate de mine sunt corecte.').check();
      await page.getByRole('button', { name: 'Trimite cererea demonstrativă' }).click();
      await expect(
        page.getByRole('heading', { name: 'Cererea demonstrativă a fost primită' }),
      ).toBeVisible();
      await expect(page.getByText('SD-NOJS-2026-0042')).toBeVisible();
    } finally {
      await page.close();
    }
  });
});
