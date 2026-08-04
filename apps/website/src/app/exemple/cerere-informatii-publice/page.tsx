import type { Metadata } from 'next';

import {
  ReferenceService,
  type ReferenceServiceConfig,
} from '../../../components/reference-service';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';

export const metadata: Metadata = {
  title: 'Serviciu demonstrativ — solicită informații de interes public',
  description: 'Un serviciu public digital demonstrativ, construit integral cu Sistem Digital.',
  alternates: { canonical: '/exemple/cerere-informatii-publice' },
  robots: { index: true, follow: true },
};

const cerereInformatiiPubliceConfig: ReferenceServiceConfig = {
  storageKey: 'sd-reference-service-draft-v1-informatii-publice',
  introTitle: 'Solicită informații de interes public',
  introChecklist: [
    'orice persoană poate depune o cerere, fără să justifice interesul;',
    'cererea nu necesită un document de identitate sau CNP;',
    'termenul legal de răspuns este de 10 zile, extins la maximum 30 în cazuri complexe, conform Legii 544/2001.',
  ],
  eligibilityTitle: 'Poți depune această cerere?',
  eligibilityLegend:
    'Cererea ta se referă la informații publice, nu la date cu caracter personal sau informații clasificate?',
  requestTitle: 'Despre ce este cererea de informații?',
  subjectLabel: 'Nume complet',
  personalIdRequired: false,
  personalIdLabel: 'Adresă de contact (e-mail sau adresă poștală)',
  personalIdHint: 'Modalitatea prin care primești răspunsul. Valoarea nu părăsește browserul.',
  purposeLabel: 'Descrierea informațiilor solicitate',
  deliveryTitle: 'Cum vrei să primești răspunsul?',
  deliveryDigitalLabel: 'Răspuns digital, pe e-mail',
  deliveryCounterLabel: 'Răspuns pe adresă poștală',
  deliveryFieldLabel: 'Modalitate de răspuns',
  attachmentLabel: 'Document justificativ',
  attachmentFieldLabel: 'Atașament',
};

export default function CerereInformatiiPublicePage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Serviciu demonstrativ" />
      <main className="container sd-reference-page" id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/exemple/minister-model', label: 'Ministerul Model' },
            { href: '/exemple/minister-model/servicii', label: 'Servicii' },
            { label: 'Cerere de informații publice' },
          ]}
        />
        <ReferenceService config={cerereInformatiiPubliceConfig} />
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
