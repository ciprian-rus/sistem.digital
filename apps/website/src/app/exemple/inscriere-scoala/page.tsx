import type { Metadata } from 'next';

import {
  ReferenceService,
  type ReferenceServiceConfig,
} from '../../../components/reference-service';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';

export const metadata: Metadata = {
  title: 'Serviciu demonstrativ — cerere de înscriere la școală',
  description: 'Un serviciu public digital demonstrativ, construit integral cu Sistem Digital.',
  alternates: { canonical: '/exemple/inscriere-scoala' },
  robots: { index: true, follow: true },
};

const inscriereScoalaConfig: ReferenceServiceConfig = {
  storageKey: 'sd-reference-service-draft-v1-inscriere-scoala',
  introTitle: 'Cerere de înscriere la Școala Model',
  introChecklist: [
    'copilul are vârsta corespunzătoare nivelului de învățământ;',
    'ai domiciliul sau reședința în circumscripția școlară;',
    'ai un document de identitate valabil, ca părinte sau tutore;',
    'opțional, ai certificatul de naștere al copilului, scanat.',
  ],
  eligibilityTitle: 'Poate fi înscris acest copil?',
  eligibilityLegend:
    'Copilul are vârsta necesară și domiciliul sau reședința în circumscripția școlară?',
  requestTitle: 'Despre cine este cererea de înscriere?',
  subjectLabel: 'Numele complet al copilului',
  personalIdLabel: 'CNP demonstrativ al copilului',
  purposeLabel: 'An școlar și clasa solicitată',
  deliveryTitle: 'Cum vrei să primești confirmarea?',
  deliveryDigitalLabel: 'Confirmare digitală',
  deliveryCounterLabel: 'Ridicare de la secretariat',
  deliveryFieldLabel: 'Confirmare',
  attachmentLabel: 'Certificat de naștere al copilului (scanat)',
  attachmentFieldLabel: 'Certificat de naștere',
};

export default function InscriereScoalaPage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Serviciu demonstrativ" />
      <main className="container sd-reference-page" id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/exemple/scoala-model', label: 'Școala Model' },
            { href: '/exemple/scoala-model/servicii', label: 'Servicii' },
            { label: 'Cerere de înscriere' },
          ]}
        />
        <ReferenceService config={inscriereScoalaConfig} />
      </main>
      <PublicFooter>
        <p>
          Acesta este un serviciu fictiv pentru demonstrație și training. Nu trimite date către o
          instituție de învățământ și nu colectează date reale ale unui minor.
        </p>
      </PublicFooter>
    </>
  );
}
