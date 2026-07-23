import type { Metadata } from 'next';

import { ReferenceService } from '../../../components/reference-service';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';

export const metadata: Metadata = {
  title: 'Serviciu demonstrativ — solicită o adeverință',
  description: 'Un serviciu public digital demonstrativ, construit integral cu Sistem Digital.',
  alternates: { canonical: '/exemple/adeverinta' },
  robots: { index: true, follow: true },
};

export default function ReferenceServicePage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Serviciu demonstrativ" />
      <main className="container sd-reference-page" id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/pattern-uri', label: 'Pattern-uri' },
            { label: 'Solicită o adeverință' },
          ]}
        />
        <ReferenceService />
      </main>
      <PublicFooter>
        <p>
          Acesta este un serviciu fictiv pentru demonstrație și training. Nu trimite date către o
          instituție publică.
        </p>
      </PublicFooter>
    </>
  );
}
