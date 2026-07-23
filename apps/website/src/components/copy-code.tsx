'use client';

import { useId, useState } from 'react';

export function CopyCodeButton({ code }: Readonly<{ code: string }>) {
  const statusId = useId();
  const [status, setStatus] = useState('');

  async function copyCode() {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API indisponibil');
      await navigator.clipboard.writeText(code);
      setStatus('Cod copiat.');
    } catch {
      setStatus('Copierea automată nu este disponibilă. Selectează codul manual.');
    }
  }

  return (
    <div className="sd-doc-code-actions">
      <button
        className="sd-button sd-button--secondary sd-doc-copy-button"
        type="button"
        onClick={copyCode}
        aria-describedby={statusId}
      >
        Copiază codul
      </button>
      <span className="sd-visually-hidden" id={statusId} aria-live="polite">
        {status}
      </span>
    </div>
  );
}
