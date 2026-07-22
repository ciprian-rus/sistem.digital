# Exemple de implementare pentru teme

## Pagină informativă

```html
<!doctype html>
<html lang="ro" data-sd-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="/vendor/sistem-digital/theme-init.js"></script>
    <link rel="stylesheet" href="/vendor/sistem-digital/tokens.css" />
    <link rel="stylesheet" href="/vendor/sistem-digital/themes.css" />
  </head>
  <body>
    <main>
      <h1>Programul instituției</h1>
      <p>Informația folosește rolurile de text și suprafață ale temei active.</p>
      <a href="/contact">Contactează instituția</a>
    </main>
  </body>
</html>
```

Linkul păstrează stările implicit, hover, active și visited în fiecare temă. Implementarea nu setează local o culoare albastră.

## Serviciu tranzacțional

```css
.form-page {
  background: var(--sd-color-surface-page);
  color: var(--sd-color-text);
}

.form-control {
  border: 2px solid var(--sd-color-border-strong);
  background: var(--sd-color-surface-raised);
  color: var(--sd-color-text);
}

.primary-action {
  background: var(--sd-color-action-primary-background);
  color: var(--sd-color-action-primary-text);
}

.primary-action:hover {
  background: var(--sd-color-action-primary-hover);
}

.primary-action:active {
  background: var(--sd-color-action-primary-active);
}
```

Stările nu sunt calculate în aplicație. Ele vin din tema validată.

## Mesaj de eroare

```html
<div class="error-message" role="alert">
  <span aria-hidden="true">×</span>
  <div>
    <strong>Câmp incomplet</strong>
    <p>Introdu codul poștal pentru a continua.</p>
  </div>
</div>
```

```css
.error-message {
  border: 2px solid var(--sd-color-feedback-danger-border);
  background: var(--sd-color-feedback-danger-background);
  color: var(--sd-color-feedback-danger-text);
}
```

Eroarea are rol programatic, simbol, titlu și descriere. Culoarea este numai unul dintre semnale.

## Accent instituțional

```html
<html lang="ro" data-sd-theme="light" data-sd-accent="burgundy">
```

Accentul schimbă brandul și acțiunea principală. Linkurile, focusul și mesajele de stare rămân cele ale temei oficiale.

## Preferința utilizatorului

```js
import { themeStorageKey } from '@sistem-digital/tokens';

localStorage.setItem(themeStorageKey, 'high-contrast-dark');
```

După modificare, aplicația setează și atributul `data-sd-theme` fără reîncărcare. Pentru revenire la preferința sistemului:

```js
localStorage.removeItem(themeStorageKey);
```

## Randare pe server

Când preferința este disponibilă într-un cookie sau profil, serverul scrie direct:

```html
<html data-sd-theme="dark">
```

Scriptul de inițializare rămâne util ca fallback, dar nu trebuie să înlocuiască atributul cunoscut de server.

## Ce trebuie evitat

```css
/* Incorect: ignoră tema și semantica. */
button {
  background: #005ea8;
  color: white;
}

/* Incorect: transformă succesul într-o culoare de brand locală. */
.success {
  color: var(--institution-brand-color);
}

/* Incorect: dezactivează preferința utilizatorului. */
* {
  forced-color-adjust: none;
}
```
