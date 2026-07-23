import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sistem Digital',
    short_name: 'Sistem Digital',
    description:
      'Infrastructură open-source pentru servicii digitale clare, accesibile și coerente în România.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#002a59',
    lang: 'ro',
  };
}
