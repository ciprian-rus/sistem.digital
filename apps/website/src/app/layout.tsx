import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@sistem-digital/tokens/css';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Sistem Digital',
    template: '%s | Sistem Digital',
  },
  description:
    'Infrastructură open-source pentru servicii digitale clare, accesibile și coerente în România.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
