import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('M4 reference service', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/exemple/adeverinta');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
  });

  test('completes the end-to-end request and exposes a status', async ({ page }, testInfo) => {
    await expect(
      page.getByRole('heading', { name: 'Solicită o adeverință administrativă' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Începe' }).click();
    await page.getByLabel('Da').check();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Fără cont').check();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Nume complet').fill('Persoană Exemplu');
    await page.getByLabel('CNP demonstrativ').fill('1990101223344');
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();

    const results = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('reference-service-review-axe', {
      body: JSON.stringify(results.violations, null, 2),
      contentType: 'application/json',
    });
    expect(results.violations).toEqual([]);

    await page.getByLabel('Declar că informațiile furnizate de mine sunt corecte.').check();
    await page.getByRole('button', { name: 'Trimite cererea demonstrativă' }).click();
    await expect(
      page.getByRole('heading', { name: 'Cererea demonstrativă a fost trimisă' }),
    ).toBeVisible();
    await expect(page.getByText('SD-2026-0723-0042')).toBeVisible();
    await expect(page.getByText('În verificare')).toBeVisible();
  });

  test('saves, restores and can recover from an unavailable submission', async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 915 });
    await page.getByRole('button', { name: 'Începe' }).click();
    await page.getByLabel('Da').check();
    await page.getByRole('button', { name: 'Salvează și continuă mai târziu' }).click();
    await expect(page.getByRole('status')).toContainText('salvat');
    await page.reload();
    await expect(
      page.getByRole('heading', { name: 'Poți solicita această adeverință?' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Fără cont').check();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Nume complet').fill('Persoană Exemplu');
    await page.getByLabel('CNP demonstrativ').fill('1990101223344');
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Declar că informațiile furnizate de mine sunt corecte.').check();
    await page.getByText('Testează o stare de indisponibilitate').click();
    await page.getByLabel('Simulează eroarea temporară la trimitere').check();
    await page.getByRole('button', { name: 'Trimite cererea demonstrativă' }).click();
    // Next.js also renders an internal route announcer with role=alert.
    await expect(page.locator('.sd-error-summary')).toContainText('temporar indisponibil');

    await page.getByLabel('Simulează eroarea temporară la trimitere').uncheck();
    await page.getByRole('button', { name: 'Trimite cererea demonstrativă' }).click();
    await expect(
      page.getByRole('heading', { name: 'Cererea demonstrativă a fost trimisă' }),
    ).toBeVisible();
  });
});
