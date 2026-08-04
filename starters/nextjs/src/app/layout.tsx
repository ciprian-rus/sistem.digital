import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { themeInitScript } from '@sistem-digital/tokens';
import '@sistem-digital/tokens/css';
import '@sistem-digital/tokens/themes.css';
import '@sistem-digital/components/navigation.css';
import '@sistem-digital/components/forms.css';
import '@sistem-digital/components/content.css';
import '@sistem-digital/components/interactive.css';
import './globals.css';

import { InteractiveEnhancements } from '../components/interactive-enhancements';

export const metadata: Metadata = {
  title: 'Serviciu digital — pornit cu Sistem Digital',
  description:
    'Pagină de pornire Next.js construită cu pachetele publicate @sistem-digital/tokens și @sistem-digital/components.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <InteractiveEnhancements />
      </body>
    </html>
  );
}
