import type { Metadata } from 'next';

import {
  ReferenceService,
  type ReferenceServiceConfig,
} from '../../../components/reference-service';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';

export const metadata: Metadata = {
  title: 'Serviciu demonstrativ — solicită o copie a unui document medical',
  description: 'Un serviciu public digital demonstrativ, construit integral cu Sistem Digital.',
  alternates: { canonical: '/exemple/cerere-document-medical' },
  robots: { index: true, follow: true },
};

const cerereDocumentMedicalConfig: ReferenceServiceConfig = {
  storageKey: 'sd-reference-service-draft-v1-document-medical',
  introTitle: 'Solicită o copie a unui document medical',
  introChecklist: [
    'ai fost pacient al acestei unități sanitare;',
    'ai un document de identitate valabil;',
    'opțional, ai numărul foii de observație sau al biletului de ieșire.',
  ],
  eligibilityTitle: 'Poți solicita această copie?',
  eligibilityLegend:
    'Ai fost pacient al acestei unități sanitare și ai un act de identitate valabil?',
  requestTitle: 'Despre cine este documentul medical?',
  subjectLabel: 'Nume complet',
  personalIdLabel: 'CNP demonstrativ',
  personalIdHint: 'Introdu exact 13 cifre fictive. Valoarea nu părăsește browserul.',
  purposeLabel: 'Tipul documentului solicitat (de exemplu, bilet de ieșire sau scrisoare medicală)',
  deliveryTitle: 'Cum vrei să primești documentul?',
  deliveryDigitalLabel: 'Document digital, în cont',
  deliveryCounterLabel: 'Ridicare de la arhiva medicală',
  deliveryFieldLabel: 'Livrare',
  attachmentLabel: 'Document justificativ',
  attachmentFieldLabel: 'Atașament',
};

export default function CerereDocumentMedicalPage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Serviciu demonstrativ" />
      <main className="container sd-reference-page" id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/exemple/spital-model', label: 'Spitalul Model' },
            { href: '/exemple/spital-model/servicii', label: 'Servicii' },
            { label: 'Copie document medical' },
          ]}
        />
        <ReferenceService config={cerereDocumentMedicalConfig} />
      </main>
      <PublicFooter>
        <p>
          Acesta este un serviciu fictiv pentru demonstrație și training. Nu trimite date către o
          unitate sanitară și nu colectează nicio dată medicală reală.
        </p>
      </PublicFooter>
    </>
  );
}
