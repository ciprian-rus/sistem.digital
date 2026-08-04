import type { LocalService } from './local-services';

// Catalog demonstrativ pentru modelul sectorial „spital" (#131). Aceleași
// convenții ca la „primărie" (#129) și „școală" (#130): denumire după nevoie,
// un singur serviciu funcțional end-to-end, restul marcate explicit
// „în pregătire" — intrări de catalog oneste, nu mockup-uri. Niciun serviciu
// nu afișează sau colectează date medicale reale.
export const hospitalServices: readonly LocalService[] = [
  {
    id: 'cerere-document-medical',
    title: 'Solicită o copie a unui document medical',
    description:
      'Obții o copie a biletului de ieșire sau a scrisorii medicale, online, fără drum la arhiva medicală.',
    eligibility: 'Disponibil oricui a fost pacient al acestei unități sanitare.',
    status: 'available',
    href: '/exemple/cerere-document-medical',
  },
  {
    id: 'programare-consultatie',
    title: 'Programează-te la o consultație',
    description:
      'Alegi o secție și un interval orar disponibil pentru o consultație în ambulatoriu.',
    eligibility: 'Disponibil oricui are nevoie de o consultație, cu sau fără bilet de trimitere.',
    status: 'in-preparation',
  },
  {
    id: 'rezultate-laborator',
    title: 'Solicită o copie a rezultatelor de laborator',
    description: 'Obții o copie a rezultatelor unei analize efectuate în această unitate sanitară.',
    eligibility: 'Disponibil pacientului care a efectuat analiza sau reprezentantului său legal.',
    status: 'in-preparation',
  },
  {
    id: 'adeverinta-medicala-concediu',
    title: 'Solicită o adeverință medicală pentru concediu',
    description: 'Obții o adeverință medicală necesară angajatorului, pentru un concediu medical.',
    eligibility: 'Disponibil pacientului aflat în evidența unității sanitare.',
    status: 'in-preparation',
  },
];
