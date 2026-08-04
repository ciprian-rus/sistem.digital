export interface LocalService {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  status: 'available' | 'in-preparation';
  href?: string;
}

// Catalog demonstrativ pentru modelul sectorial „primărie" (#129). Denumirile
// urmează nevoia, nu structura instituțională, conform pattern-ului
// „Identificarea serviciului potrivit" (docs/content/content-style-guide.md
// + apps/website/src/content/pages/pattern-identificarea-serviciului.mdx).
// Un singur serviciu este funcțional end-to-end (reutilizează #20); restul
// rămân marcate explicit „în pregătire" — nu sunt mockup-uri false, ci
// intrări de catalog oneste despre ce nu e încă implementat.
export const localServices: readonly LocalService[] = [
  {
    id: 'adeverinta',
    title: 'Solicită o adeverință de la primărie',
    description:
      'Obții o adeverință eliberată de primărie, online, fără drum la ghișeu — de exemplu pentru un dosar de credit sau de angajare.',
    eligibility: 'Disponibil oricui are nevoie de o adeverință, fără cont obligatoriu.',
    status: 'available',
    href: '/exemple/adeverinta',
  },
  {
    id: 'certificat-urbanism',
    title: 'Obține un certificat de urbanism',
    description:
      'Certificatul necesar înainte de a începe o construcție, o extindere sau o schimbare de destinație a unui imobil.',
    eligibility: 'Necesită dovada dreptului de proprietate sau de folosință asupra imobilului.',
    status: 'in-preparation',
  },
  {
    id: 'inscriere-cresa-gradinita',
    title: 'Înscrie copilul la creșă sau grădiniță',
    description:
      'Înscrierea unui copil într-o unitate de învățământ preșcolar aflată în subordinea primăriei.',
    eligibility: 'Necesită domiciliul sau reședința părintelui în raza administrativă a primăriei.',
    status: 'in-preparation',
  },
  {
    id: 'plata-impozit-cladiri-teren',
    title: 'Plătește impozitul pe clădiri și teren',
    description:
      'Plata anuală a impozitului local pentru imobilele deținute în raza administrativă a primăriei.',
    eligibility: 'Disponibil oricărui proprietar de imobil înregistrat la primărie.',
    status: 'in-preparation',
  },
];
