import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { themeInitScript } from '@sistem-digital/tokens';
import '@sistem-digital/tokens/css';
import '@sistem-digital/tokens/themes.css';
import './base.css';
import './documentation.css';
import './catalog.css';
import './feedback.css';
import '@sistem-digital/components/forms.css';
import '@sistem-digital/components/navigation.css';
import '@sistem-digital/components/content.css';
import '@sistem-digital/components/interactive.css';

import { InteractiveEnhancements } from '../components/interactive-enhancements';
import { WebVitalsReporter } from '../components/web-vitals-reporter';

export const metadata: Metadata = {
  metadataBase: new URL('https://sistem.digital'),
  title: {
    default: 'Sistem Digital',
    template: '%s | Sistem Digital',
  },
  description:
    'Infrastructură open-source pentru servicii digitale clare, accesibile și coerente în România.',
  applicationName: 'Sistem Digital',
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    siteName: 'Sistem Digital',
    url: '/',
    title: 'Sistem Digital',
    description:
      'Infrastructură open-source pentru servicii digitale clare, accesibile și coerente în România.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sistem Digital',
  url: 'https://sistem.digital',
  description:
    'Infrastructură open-source pentru servicii digitale clare, accesibile și coerente în România.',
  sameAs: ['https://github.com/ciprian-rus/sistem.digital'],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        {children}
        <InteractiveEnhancements />
        <WebVitalsReporter />
      </body>
    </html>
  );
}
