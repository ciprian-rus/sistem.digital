---
"@sistem-digital/components": patch
"@sistem-digital/web-components": minor
---

Add `@sistem-digital/web-components`: custom elements (`sd-accordion`, `sd-autocomplete`, `sd-character-count`, `sd-cookie-banner`, `sd-dialog`, `sd-dropdown`, `sd-error-summary`, `sd-exit-this-page`, `sd-file-upload-advanced`, `sd-tabs`, `sd-tooltip`) that register the existing `@sistem-digital/components` progressive-enhancement helpers for frameworks other than React, via a `defineWebComponents()` opt-in. `@sistem-digital/components` gains a top-level `types` field alongside its `exports` map so legacy Node10 module resolution — used by the new package's CommonJS build — can locate its type declarations; no runtime or API change.
