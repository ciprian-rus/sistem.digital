import type { Metadata } from 'next';

import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';
import { TreeTestRunner } from '../../../components/tree-test-runner';

export const metadata: Metadata = {
  title: 'Testarea structurii informației',
  description: 'Participă anonim la testarea arhitecturii informației pentru Sistem Digital.',
  alternates: { canonical: '/cercetare/tree-testing' },
  robots: { index: false, follow: true },
};

export default function TreeTestingPage() {
  return (
    <>
      <PublicHeader serviceName="Cercetare" />
      <main className="container sd-tree-test-page" id="continut">
        <Breadcrumbs
          items={[{ href: '/', label: 'Acasă' }, { label: 'Testarea structurii informației' }]}
        />
        <header className="sd-tree-test-intro">
          <p className="section-kicker">Tree testing · M3</p>
          <h1>Structura platformei trebuie să fie clară înainte să devină standard.</h1>
          <p>
            Testăm dacă oamenii găsesc intuitiv informația în cele șase categorii ale Sistem
            Digital. Rezultatele vor confirma taxonomia sau vor arăta ce trebuie schimbat.
          </p>
        </header>
        <TreeTestRunner />
        <aside className="sd-tree-test-privacy" aria-labelledby="tree-test-privacy-title">
          <h2 id="tree-test-privacy-title">Cum protejăm răspunsurile</h2>
          <p>
            Colectăm rolul general, opțiunea privind accesibilitatea, alegerile, timpul, nivelul de
            încredere și comentariile opționale. Nu cerem date de contact și nu folosim răspunsurile
            pentru profilare.
          </p>
          <p>
            Rezultatele brute sunt păstrate temporar în logurile tehnice Production; raportul public
            conține numai date agregate și observații anonimizate.
          </p>
        </aside>
      </main>
      <PublicFooter />
    </>
  );
}
