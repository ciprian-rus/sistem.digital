import type { LocalService } from './local-services';

// Catalog demonstrativ pentru modelul sectorial „minister" (#132). Aceleași
// convenții ca la „primărie" (#129), „școală" (#130) și „spital" (#131):
// denumire după nevoie, un singur serviciu funcțional end-to-end, restul
// marcate explicit „în pregătire" — intrări de catalog oneste, nu mockup-uri.
export const ministryServices: readonly LocalService[] = [
  {
    id: 'cerere-informatii-publice',
    title: 'Solicită informații de interes public',
    description:
      'Depui o cerere de informații publice, conform Legii 544/2001, fără să justifici interesul.',
    eligibility: 'Disponibil oricărei persoane, fără nicio condiție de eligibilitate.',
    status: 'available',
    href: '/exemple/cerere-informatii-publice',
  },
  {
    id: 'comentariu-consultare-publica',
    title: 'Comentează un proiect de act normativ',
    description:
      'Trimiți un comentariu la un proiect de act normativ aflat în consultare publică, înainte de termenul limită.',
    eligibility: 'Disponibil oricărei persoane, pe durata consultării publice active.',
    status: 'in-preparation',
  },
  {
    id: 'verifica-stadiu-petitie',
    title: 'Verifică stadiul unei petiții',
    description: 'Urmărești stadiul de soluționare al unei petiții deja depuse la instituție.',
    eligibility: 'Disponibil persoanei care a depus petiția, cu numărul de înregistrare.',
    status: 'in-preparation',
  },
  {
    id: 'audienta-conducere',
    title: 'Solicită o audiență la conducere',
    description: 'Depui o cerere de audiență la conducerea instituției, pe o temă precizată.',
    eligibility: 'Disponibil oricărei persoane sau organizații, cu motivarea cererii.',
    status: 'in-preparation',
  },
];
