import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('technical SEO and error states', () => {
  test('serves valid discovery routes', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain('https://sistem.digital/componente/catalog');

    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBe(true);
    expect(await robots.text()).toContain('Sitemap: https://sistem.digital/sitemap.xml');

    const manifest = await request.get('/manifest.webmanifest');
    expect(manifest.ok()).toBe(true);
    expect((await manifest.json()).lang).toBe('ro');
  });

  test('returns an accessible, noindex 404 in Romanian', async ({ page }) => {
    const response = await page.goto('/pagina-care-nu-exista');
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Pagina nu a fost găsită' }),
    ).toBeVisible();

    const robots = page.locator('meta[name="robots"]');
    await expect(robots.first()).toHaveAttribute('content', /noindex/);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('publishes canonical metadata and structured data', async ({ page }) => {
    await page.goto('/guvernanta');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://sistem.digital/guvernanta',
    );
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const structuredData = await jsonLd.allTextContents();
    expect(
      structuredData.some((value) => {
        const data = JSON.parse(value) as { '@type'?: string };
        return data['@type'] === 'Organization';
      }),
    ).toBe(true);
  });
});
