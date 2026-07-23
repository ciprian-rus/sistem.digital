'use client';

export default function GlobalError({
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return (
    <html lang="ro">
      <body>
        <main className="container sd-state-page" id="continut">
          <p>Eroare critică</p>
          <h1>Sistem Digital nu a putut fi încărcat</h1>
          <p>Reîncearcă încărcarea. Datele introduse pe alte pagini nu sunt afectate.</p>
          <button type="button" onClick={reset}>
            Reîncearcă
          </button>
        </main>
      </body>
    </html>
  );
}
