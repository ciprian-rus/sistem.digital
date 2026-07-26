export const formComponentNames = [
  'label',
  'hint',
  'fieldset',
  'legend',
  'input',
  'textarea',
  'select',
  'checkbox',
  'radio',
  'error-message',
  'error-summary',
  'button',
  'button-group',
  'file-upload',
  'segmented-control',
  'character-count',
] as const;

export type FormComponentName = (typeof formComponentNames)[number];

export interface ErrorSummaryFocusOptions {
  root?: ParentNode;
  selector?: string;
  requireErrorLinks?: boolean;
}

const defaultErrorSummarySelector = '[data-sd-error-summary]';

function documentRoot(): ParentNode | undefined {
  return typeof document === 'undefined' ? undefined : document;
}

/**
 * Focuses the first error summary after a server-rendered validation response.
 *
 * The form and error links remain fully usable without JavaScript. Calling this
 * helper is an optional enhancement that moves keyboard and screen-reader focus
 * to the summary once the page has rendered.
 */
export function focusErrorSummary(options: ErrorSummaryFocusOptions = {}): boolean {
  const root = options.root ?? documentRoot();
  if (!root) return false;

  const summary = root.querySelector<HTMLElement>(options.selector ?? defaultErrorSummarySelector);
  if (!summary) return false;

  const requireErrorLinks = options.requireErrorLinks ?? true;
  if (requireErrorLinks && !summary.querySelector('a[href^="#"]')) return false;

  if (!summary.hasAttribute('tabindex')) summary.setAttribute('tabindex', '-1');
  summary.focus();
  return true;
}

/**
 * Enhances error-summary links so their target field receives focus after the
 * native fragment navigation. Returns a cleanup function.
 */
export function enhanceErrorSummaryLinks(summary: HTMLElement): () => void {
  const handleClick = (event: Event) => {
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;

    const targetId = decodeURIComponent(link.hash.slice(1));
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!(target instanceof HTMLElement)) return;

    window.setTimeout(() => target.focus(), 0);
  };

  summary.addEventListener('click', handleClick);
  return () => summary.removeEventListener('click', handleClick);
}

export interface CharacterCountOptions {
  root?: ParentNode;
}

/**
 * Without JavaScript, the field shows only the static "maximum N characters"
 * hint written in markup. With JavaScript, a live region below it counts
 * down (or over) as the visitor types, updated on every input event.
 */
export function enhanceCharacterCount({ root }: CharacterCountOptions = {}): () => void {
  const resolvedRoot = root ?? documentRoot();
  if (!resolvedRoot) return () => {};

  const cleanups: Array<() => void> = [];
  for (const wrapper of resolvedRoot.querySelectorAll<HTMLElement>('[data-sd-character-count]')) {
    const field = wrapper.querySelector<HTMLTextAreaElement | HTMLInputElement>(
      '[data-sd-character-count-field]',
    );
    const status = wrapper.querySelector<HTMLElement>('[data-sd-character-count-status]');
    const max = Number(wrapper.dataset.sdCharacterCount);
    if (!field || !status || !Number.isFinite(max) || max <= 0) continue;

    const update = () => {
      const remaining = max - field.value.length;
      status.textContent =
        remaining < 0
          ? `${Math.abs(remaining)} caractere peste limita permisă`
          : `Mai aveți ${remaining} caractere`;
      wrapper.classList.toggle('sd-character-count--error', remaining < 0);
    };

    field.addEventListener('input', update);
    update();

    cleanups.push(() => {
      field.removeEventListener('input', update);
      wrapper.classList.remove('sd-character-count--error');
    });
  }

  return () => {
    for (const cleanup of cleanups.reverse()) cleanup();
  };
}
