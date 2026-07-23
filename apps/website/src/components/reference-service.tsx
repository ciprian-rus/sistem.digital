'use client';

import { useEffect, useId, useState } from 'react';

type Step = 'start' | 'eligibility' | 'identity' | 'request' | 'documents' | 'review' | 'done';

interface Draft {
  step: Step;
  eligible: string;
  identity: string;
  fullName: string;
  personalId: string;
  purpose: string;
  delivery: string;
  attachmentName: string;
}

const storageKey = 'sd-reference-service-draft-v1';
const initialDraft: Draft = {
  step: 'start',
  eligible: '',
  identity: '',
  fullName: '',
  personalId: '',
  purpose: '',
  delivery: 'digital',
  attachmentName: '',
};

const orderedSteps: readonly Step[] = ['eligibility', 'identity', 'request', 'documents', 'review'];

function maskPersonalId(value: string) {
  if (value.length < 4) return '—';
  return `${value.slice(0, 1)}••••••••${value.slice(-3)}`;
}

export function ReferenceService() {
  const titleId = useId();
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState('');
  const [savedNotice, setSavedNotice] = useState('');
  const [simulateUnavailable, setSimulateUnavailable] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        setDraft(JSON.parse(saved) as Draft);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setHydrated(true);
  }, []);

  const update = (partial: Partial<Draft>) => {
    setDraft((current) => ({ ...current, ...partial }));
    setError('');
    setSavedNotice('');
  };

  const goTo = (step: Step) => {
    update({ step });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const save = () => {
    window.localStorage.setItem(storageKey, JSON.stringify(draft));
    setSavedNotice('Progresul a fost salvat numai în acest browser.');
  };

  const restart = () => {
    window.localStorage.removeItem(storageKey);
    setDraft(initialDraft);
    setError('');
    setSavedNotice('');
    setSimulateUnavailable(false);
  };

  const continueFromEligibility = () => {
    if (!draft.eligible) {
      setError('Alege dacă îndeplinești condițiile.');
      return;
    }
    if (draft.eligible === 'no') return;
    goTo('identity');
  };

  const continueFromIdentity = () => {
    if (!draft.identity) {
      setError('Alege cum vrei să continui.');
      return;
    }
    goTo('request');
  };

  const continueFromRequest = () => {
    if (draft.fullName.trim().length < 3 || !/^\d{13}$/u.test(draft.personalId)) {
      setError('Completează numele și un CNP demonstrativ format din 13 cifre.');
      return;
    }
    goTo('documents');
  };

  const submit = () => {
    if (simulateUnavailable) {
      setError('Serviciul este temporar indisponibil. Cererea nu a fost trimisă.');
      return;
    }
    window.localStorage.removeItem(storageKey);
    goTo('done');
  };

  if (!hydrated) {
    return (
      <section aria-labelledby={titleId}>
        <h1 id={titleId}>Solicită o adeverință administrativă</h1>
        <p role="status">Se încarcă serviciul demonstrativ…</p>
      </section>
    );
  }

  if (draft.step === 'start') {
    const hasDraft = window.localStorage.getItem(storageKey) !== null;
    return (
      <section className="sd-reference-intro" aria-labelledby={titleId}>
        <p className="section-kicker">Aplicație de referință · M4</p>
        <h1 id={titleId}>Solicită o adeverință administrativă</h1>
        <p className="sd-reference-lead">
          Parcurge un serviciu public complet, de la verificarea eligibilității până la urmărirea
          cererii. Durează aproximativ 5 minute.
        </p>
        <div className="sd-callout sd-reference-notice">
          <h2>Serviciu demonstrativ</h2>
          <p>
            Nu este conectat la o instituție și nu trimite date. Folosește exclusiv informații
            fictive; progresul este salvat local în browser.
          </p>
        </div>
        <h2>Înainte să începi</h2>
        <ul className="sd-reference-checklist">
          <li>ai domiciliul în România;</li>
          <li>ai un document de identitate valabil;</li>
          <li>opțional, ai un document justificativ PDF, PNG sau JPG.</li>
        </ul>
        <div className="sd-button-group">
          <button
            className="sd-button sd-button--primary"
            type="button"
            onClick={() => goTo(hasDraft ? draft.step : 'eligibility')}
          >
            {hasDraft ? 'Continuă cererea salvată' : 'Începe'}
          </button>
        </div>
        <p className="sd-reference-meta">Acest demo nu necesită autentificare sau plată.</p>
      </section>
    );
  }

  if (draft.step === 'done') {
    return (
      <section className="sd-reference-result" aria-labelledby={titleId}>
        <div className="sd-reference-success" aria-hidden="true">
          ✓
        </div>
        <p className="section-kicker">Cerere înregistrată</p>
        <h1 id={titleId}>Cererea demonstrativă a fost trimisă</h1>
        <p className="sd-reference-lead">
          Număr de înregistrare: <strong>SD-2026-0723-0042</strong>
        </p>
        <dl className="sd-summary-list">
          <div className="sd-summary-list__row">
            <dt>Status</dt>
            <dd>
              <span className="sd-tag">În verificare</span>
            </dd>
          </div>
          <div className="sd-summary-list__row">
            <dt>Termen estimat</dt>
            <dd>2 zile lucrătoare</dd>
          </div>
          <div className="sd-summary-list__row">
            <dt>Livrare</dt>
            <dd>{draft.delivery === 'digital' ? 'Document digital' : 'Ridicare de la ghișeu'}</dd>
          </div>
        </dl>
        <div className="sd-callout">
          <h2>Ce urmează</h2>
          <p>
            Într-un serviciu real ai primi notificări la schimbarea statusului și ai putea descărca
            documentul din cont.
          </p>
        </div>
        <button className="sd-button sd-button--secondary" type="button" onClick={restart}>
          Repornește demonstrația
        </button>
      </section>
    );
  }

  const currentIndex = orderedSteps.indexOf(draft.step);
  const progress = Math.round(((currentIndex + 1) / orderedSteps.length) * 100);

  return (
    <section className="sd-reference-flow" aria-labelledby={titleId}>
      <aside className="sd-reference-progress" aria-label="Progresul cererii">
        <p>
          Pasul {currentIndex + 1} din {orderedSteps.length}
        </p>
        <progress value={currentIndex + 1} max={orderedSteps.length}>
          {progress}%
        </progress>
        <span>{progress}% completat</span>
      </aside>

      {error ? (
        <div className="sd-error-summary" role="alert" tabIndex={-1}>
          <h2 className="sd-error-summary__title">Există o problemă</h2>
          <p className="sd-error-summary__intro">{error}</p>
        </div>
      ) : null}

      {draft.step === 'eligibility' ? (
        <>
          <p className="section-kicker">Eligibilitate</p>
          <h1 id={titleId}>Poți solicita această adeverință?</h1>
          <fieldset className="sd-fieldset">
            <legend className="sd-legend sd-legend--large">
              Ai domiciliul în România și un act de identitate valabil?
            </legend>
            <div className="sd-choice-list">
              {[
                ['yes', 'Da'],
                ['no', 'Nu'],
              ].map(([value, label]) => (
                <label className="sd-choice" key={value}>
                  <input
                    className="sd-choice__control"
                    type="radio"
                    name="eligible"
                    value={value}
                    checked={draft.eligible === value}
                    onChange={(event) => update({ eligible: event.target.value })}
                  />
                  <span className="sd-choice__label">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {draft.eligible === 'no' ? (
            <div className="sd-callout">
              <h2>Nu poți continua online în acest scenariu</h2>
              <p>
                Într-un serviciu real ai primi alternativa potrivită și datele de contact ale
                instituției, nu un capăt de drum.
              </p>
            </div>
          ) : null}
          <FlowActions
            onBack={() => goTo('start')}
            onContinue={continueFromEligibility}
            onSave={save}
          />
        </>
      ) : null}

      {draft.step === 'identity' ? (
        <>
          <p className="section-kicker">Acces</p>
          <h1 id={titleId}>Cum vrei să continui?</h1>
          <fieldset className="sd-fieldset">
            <legend className="sd-legend sd-legend--large">Alege o opțiune</legend>
            <div className="sd-choice-list">
              <label className="sd-choice">
                <input
                  className="sd-choice__control"
                  type="radio"
                  name="identity"
                  value="account"
                  checked={draft.identity === 'account'}
                  onChange={(event) => update({ identity: event.target.value })}
                />
                <span className="sd-choice__label">
                  Cu identitate digitală
                  <span className="sd-choice__hint">
                    Datele verificate ar fi precompletate automat.
                  </span>
                </span>
              </label>
              <label className="sd-choice">
                <input
                  className="sd-choice__control"
                  type="radio"
                  name="identity"
                  value="guest"
                  checked={draft.identity === 'guest'}
                  onChange={(event) => update({ identity: event.target.value })}
                />
                <span className="sd-choice__label">
                  Fără cont
                  <span className="sd-choice__hint">
                    Completezi datele manual și primești număr de înregistrare.
                  </span>
                </span>
              </label>
            </div>
          </fieldset>
          <FlowActions
            onBack={() => goTo('eligibility')}
            onContinue={continueFromIdentity}
            onSave={save}
          />
        </>
      ) : null}

      {draft.step === 'request' ? (
        <>
          <p className="section-kicker">Datele cererii</p>
          <h1 id={titleId}>Despre cine este adeverința?</h1>
          <div className="sd-form">
            <div className="sd-form-group">
              <label className="sd-label sd-label--large" htmlFor="reference-name">
                Nume complet
              </label>
              <input
                className="sd-input"
                id="reference-name"
                autoComplete="name"
                value={draft.fullName}
                onChange={(event) => update({ fullName: event.target.value })}
              />
            </div>
            <div className="sd-form-group">
              <label className="sd-label sd-label--large" htmlFor="reference-cnp">
                CNP demonstrativ
              </label>
              <p className="sd-hint" id="reference-cnp-hint">
                Introdu exact 13 cifre fictive. Valoarea nu părăsește browserul.
              </p>
              <input
                className="sd-input sd-input--width-20"
                id="reference-cnp"
                inputMode="numeric"
                pattern="[0-9]{13}"
                maxLength={13}
                aria-describedby="reference-cnp-hint"
                value={draft.personalId}
                onChange={(event) =>
                  update({ personalId: event.target.value.replaceAll(/\D/gu, '') })
                }
              />
            </div>
            <div className="sd-form-group">
              <label className="sd-label sd-label--large" htmlFor="reference-purpose">
                Scopul solicitării <span className="sd-required">(opțional)</span>
              </label>
              <textarea
                className="sd-textarea"
                id="reference-purpose"
                rows={4}
                value={draft.purpose}
                onChange={(event) => update({ purpose: event.target.value })}
              />
            </div>
          </div>
          <FlowActions
            onBack={() => goTo('identity')}
            onContinue={continueFromRequest}
            onSave={save}
          />
        </>
      ) : null}

      {draft.step === 'documents' ? (
        <>
          <p className="section-kicker">Documente și livrare</p>
          <h1 id={titleId}>Cum vrei să primești documentul?</h1>
          <fieldset className="sd-fieldset">
            <legend className="sd-legend sd-legend--large">Modalitate de livrare</legend>
            <div className="sd-choice-list">
              <label className="sd-choice">
                <input
                  className="sd-choice__control"
                  type="radio"
                  name="delivery"
                  value="digital"
                  checked={draft.delivery === 'digital'}
                  onChange={(event) => update({ delivery: event.target.value })}
                />
                <span className="sd-choice__label">Document digital</span>
              </label>
              <label className="sd-choice">
                <input
                  className="sd-choice__control"
                  type="radio"
                  name="delivery"
                  value="counter"
                  checked={draft.delivery === 'counter'}
                  onChange={(event) => update({ delivery: event.target.value })}
                />
                <span className="sd-choice__label">Ridicare de la ghișeu</span>
              </label>
            </div>
          </fieldset>
          <div className="sd-form-group">
            <label className="sd-label sd-label--large" htmlFor="reference-file">
              Document justificativ <span className="sd-required">(opțional)</span>
            </label>
            <p className="sd-hint" id="reference-file-hint">
              Pentru demonstrație memorăm doar numele fișierului, nu conținutul.
            </p>
            <input
              className="sd-file-input"
              id="reference-file"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              aria-describedby="reference-file-hint"
              onChange={(event) => update({ attachmentName: event.target.files?.[0]?.name ?? '' })}
            />
          </div>
          <FlowActions
            onBack={() => goTo('request')}
            onContinue={() => goTo('review')}
            onSave={save}
          />
        </>
      ) : null}

      {draft.step === 'review' ? (
        <>
          <p className="section-kicker">Verificare</p>
          <h1 id={titleId}>Verifică răspunsurile înainte de trimitere</h1>
          <dl className="sd-summary-list">
            <SummaryRow
              label="Eligibilitate"
              value="Condiții îndeplinite"
              onChange={() => goTo('eligibility')}
            />
            <SummaryRow
              label="Acces"
              value={draft.identity === 'account' ? 'Identitate digitală' : 'Fără cont'}
              onChange={() => goTo('identity')}
            />
            <SummaryRow label="Nume" value={draft.fullName} onChange={() => goTo('request')} />
            <SummaryRow
              label="CNP"
              value={maskPersonalId(draft.personalId)}
              onChange={() => goTo('request')}
            />
            <SummaryRow
              label="Livrare"
              value={draft.delivery === 'digital' ? 'Document digital' : 'Ridicare de la ghișeu'}
              onChange={() => goTo('documents')}
            />
            <SummaryRow
              label="Atașament"
              value={draft.attachmentName || 'Niciun document'}
              onChange={() => goTo('documents')}
            />
          </dl>
          <details className="sd-details sd-reference-simulation">
            <summary>Testează o stare de indisponibilitate</summary>
            <label className="sd-choice">
              <input
                className="sd-choice__control"
                type="checkbox"
                checked={simulateUnavailable}
                onChange={(event) => setSimulateUnavailable(event.target.checked)}
              />
              <span className="sd-choice__label">Simulează eroarea temporară la trimitere</span>
            </label>
          </details>
          <div className="sd-button-group">
            <button className="sd-button sd-button--primary" type="button" onClick={submit}>
              Trimite cererea demonstrativă
            </button>
            <button
              className="sd-button sd-button--secondary"
              type="button"
              onClick={() => goTo('documents')}
            >
              Înapoi
            </button>
            <button className="sd-button sd-button--secondary" type="button" onClick={save}>
              Salvează și continuă mai târziu
            </button>
          </div>
        </>
      ) : null}

      {savedNotice ? (
        <p className="sd-reference-saved" role="status">
          {savedNotice}
        </p>
      ) : null}
      <button className="sd-reference-reset" type="button" onClick={restart}>
        Șterge datele și reîncepe
      </button>
    </section>
  );
}

function FlowActions({
  onBack,
  onContinue,
  onSave,
}: Readonly<{ onBack: () => void; onContinue: () => void; onSave: () => void }>) {
  return (
    <div className="sd-button-group">
      <button className="sd-button sd-button--primary" type="button" onClick={onContinue}>
        Continuă
      </button>
      <button className="sd-button sd-button--secondary" type="button" onClick={onBack}>
        Înapoi
      </button>
      <button className="sd-button sd-button--secondary" type="button" onClick={onSave}>
        Salvează și continuă mai târziu
      </button>
    </div>
  );
}

function SummaryRow({
  label,
  onChange,
  value,
}: Readonly<{ label: string; onChange: () => void; value: string }>) {
  return (
    <div className="sd-summary-list__row">
      <dt>{label}</dt>
      <dd>{value}</dd>
      <dd className="sd-summary-list__action">
        <button type="button" onClick={onChange}>
          Schimbă <span className="sd-visually-hidden">{label.toLocaleLowerCase('ro')}</span>
        </button>
      </dd>
    </div>
  );
}
