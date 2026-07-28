const HTMLElementBase: typeof HTMLElement =
  typeof HTMLElement === 'undefined' ? (class {} as unknown as typeof HTMLElement) : HTMLElement;

export type Cleanup = () => void;

/**
 * Every element here wraps existing light-DOM markup in place; it never
 * renders content of its own, so consumers keep full control over HTML and
 * CSS. `extends HTMLElementBase` (not the bare global) so importing this
 * module outside a browser — an accidental server-side import, or the
 * release pipeline's CommonJS/ESM smoke test — doesn't throw.
 */
export abstract class SdEnhancedElement extends HTMLElementBase {
  #cleanup: Cleanup | undefined;

  connectedCallback(): void {
    this.#cleanup = this.enhance();
  }

  disconnectedCallback(): void {
    this.#cleanup?.();
    this.#cleanup = undefined;
  }

  protected abstract enhance(): Cleanup;
}
