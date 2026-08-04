import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const scoalaModelPaths = [
  '/exemple/scoala-model',
  '/exemple/scoala-model/servicii',
  '/exemple/inscriere-scoala',
] as const;

test.describe('Modelul sectorial Școala Model (Epic E)', () => {
  for (const path of scoalaModelPaths) {
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
    await page.goto('/exemple/scoala-model');
    await page.getByRole('link', { name: 'Vezi serviciile disponibile' }).click();
    await expect(page).toHaveURL(/\/exemple\/scoala-model\/servicii$/u);
    await expect(
      page.getByRole('heading', { name: 'Servicii pentru părinți și elevi' }),
    ).toBeVisible();
  });

  test('marks in-preparation services distinctly and links the available one to the real flow', async ({
    page,
  }) => {
    await page.goto('/exemple/scoala-model/servicii');

    await expect(page.getByRole('link', { name: 'Înscrie copilul la școală' })).toHaveAttribute(
      'href',
      '/exemple/inscriere-scoala',
    );

    await expect(page.getByText('Disponibil online')).toBeVisible();
    await expect(page.getByText('În pregătire').first()).toBeVisible();
  });

  test('completes the school enrollment request end-to-end', async ({ page }) => {
    await page.goto('/exemple/inscriere-scoala');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    await expect(
      page.getByRole('heading', { name: 'Cerere de înscriere la Școala Model' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Începe' }).click();
    await page.getByLabel('Da').check();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Fără cont').check();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Numele complet al copilului').fill('Copil Exemplu');
    await page.getByLabel('CNP demonstrativ al copilului').fill('5150101223344');
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Declar că informațiile furnizate de mine sunt corecte.').check();
    await page.getByRole('button', { name: 'Trimite cererea demonstrativă' }).click();

    await expect(
      page.getByRole('heading', { name: 'Cererea demonstrativă a fost trimisă' }),
    ).toBeVisible();
  });
});
