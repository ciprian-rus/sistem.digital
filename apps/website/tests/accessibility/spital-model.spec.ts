import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const spitalModelPaths = [
  '/exemple/spital-model',
  '/exemple/spital-model/servicii',
  '/exemple/cerere-document-medical',
] as const;

test.describe('Modelul sectorial Spitalul Model (Epic E)', () => {
  for (const path of spitalModelPaths) {
    test(`${path} is accessible`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole('main')).toHaveAttribute('id', 'continut');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('links from the institutional page to the services catalog', async ({ page }) => {
    await page.goto('/exemple/spital-model');
    await page.getByRole('link', { name: 'Vezi serviciile disponibile' }).click();
    await expect(page).toHaveURL(/\/exemple\/spital-model\/servicii$/u);
    await expect(page.getByRole('heading', { name: 'Servicii pentru pacienți' })).toBeVisible();
  });

  test('marks in-preparation services distinctly and links the available one to the real flow', async ({
    page,
  }) => {
    await page.goto('/exemple/spital-model/servicii');

    await expect(
      page.getByRole('link', { name: 'Solicită o copie a unui document medical' }),
    ).toHaveAttribute('href', '/exemple/cerere-document-medical');

    await expect(page.getByText('Disponibil online')).toBeVisible();
    await expect(page.getByText('În pregătire').first()).toBeVisible();
  });

  test('completes the medical document request end-to-end', async ({ page }) => {
    await page.goto('/exemple/cerere-document-medical');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    await expect(
      page.getByRole('heading', { name: 'Solicită o copie a unui document medical' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Începe' }).click();
    await page.getByLabel('Da').check();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Fără cont').check();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Nume complet').fill('Persoană Exemplu');
    await page.getByLabel('CNP demonstrativ').fill('2990101223344');
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Declar că informațiile furnizate de mine sunt corecte.').check();
    await page.getByRole('button', { name: 'Trimite cererea demonstrativă' }).click();

    await expect(
      page.getByRole('heading', { name: 'Cererea demonstrativă a fost trimisă' }),
    ).toBeVisible();
  });
});
