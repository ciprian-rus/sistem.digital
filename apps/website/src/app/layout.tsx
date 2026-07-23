import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { themeInitScript } from '@sistem-digital/tokens';
import '@sistem-digital/tokens/css';
import '@sistem-digital/tokens/themes.css';
import './base.css';
import './documentation.css';
import '@sistem-digital/components/forms.css';
import '@sistem-digital/components/navigation.css';
import '@sistem-digital/components/content.css';
import '@sistem-digital/components/interactive.css';

import { InteractiveEnhancements } from '../components/interactive-enhancements';

export const metadata: Metadata = {
  metadataBase: new URL('https://sistem.digital'),
  title: {
    default: 'Sistem Digital',
    template: '%s | Sistem Digital',
  },
  description:
    'Infrastructură open-source pentru servicii digitale clare, accesibile și coerente în România.',
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
