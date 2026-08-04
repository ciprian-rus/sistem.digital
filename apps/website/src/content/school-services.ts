import type { LocalService } from './local-services';

// Catalog demonstrativ pentru modelul sectorial „școală" (#130). Aceleași
// convenții ca la modelul „primărie" (#129): denumire după nevoie, nu după
// structura instituțională, un singur serviciu funcțional end-to-end, restul
// marcate explicit „în pregătire" — intrări de catalog oneste, nu mockup-uri.
export const schoolServices: readonly LocalService[] = [
  {
    id: 'inscriere-scoala',
    title: 'Înscrie copilul la școală',
    description:
      'Depui o cerere de înscriere pentru anul școlar curent, cu eligibilitate verificată înainte de a completa formularul.',
    eligibility:
      'Necesită domiciliul sau reședința în circumscripția școlară și vârsta corespunzătoare nivelului de învățământ.',
    status: 'available',
    href: '/exemple/inscriere-scoala',
  },
  {
    id: 'situatie-scolara',
    title: 'Solicită o situație școlară',
    description:
      'Obții o adeverință cu situația școlară a copilului, pentru un dosar de bursă, transfer sau alte proceduri.',
    eligibility: 'Disponibil părintelui sau tutorelui unui elev înscris.',
    status: 'in-preparation',
  },
  {
    id: 'transfer-scolar',
    title: 'Solicită transferul la altă unitate de învățământ',
    description:
      'Depui o cerere de transfer al copilului către o altă școală, în timpul anului școlar.',
    eligibility: 'Necesită acordul ambelor unități de învățământ implicate.',
    status: 'in-preparation',
  },
  {
    id: 'duplicat-foaie-matricola',
    title: 'Solicită un duplicat al foii matricole',
    description: 'Obții o copie oficială a foii matricole, pentru un dosar pierdut sau deteriorat.',
    eligibility: 'Disponibil absolvenților unității de învățământ sau tutorelui legal al acestora.',
    status: 'in-preparation',
  },
];
