import type { MetadataRoute } from 'next';

import { catalogItems, getCatalogHref } from '../content/catalog';
import { getAvailableSitePaths } from '../content/site-map';

const origin = 'https://sistem.digital';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...getAvailableSitePaths(), ...catalogItems.map((item) => getCatalogHref(item))];

  return [...new Set(paths)].map((path) => ({
    url: new URL(path, origin).toString(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
