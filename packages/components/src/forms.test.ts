import { describe, expect, it } from 'vitest';

import { focusErrorSummary, formComponentNames } from './forms';

interface MockSummary {
  focused: boolean;
  attributes: Map<string, string>;
  querySelector: (selector: string) => object | null;
  hasAttribute: (name: string) => boolean;
  setAttribute: (name: string, value: string) => void;
  focus: () => void;
}

function createSummary(hasErrorLink = true): MockSummary {
  const attributes = new Map<string, string>();
  return {
    focused: false,
    attributes,
    querySelector: (selector) =>
      hasErrorLink && selector === 'a[href^="#"]' ? { href: '#field' } : null,
    hasAttribute: (name) => attributes.has(name),
    setAttribute: (name, value) => attributes.set(name, value),
    focus() {
      this.focused = true;
    },
  };
}

describe('form component contract', () => {
  it('publishes the complete form MVP inventory', () => {
    expect(formComponentNames).toEqual([
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
    ]);
  });

  it('focuses an error summary with linked field errors', () => {
    const summary = createSummary();
    const root = {
      querySelector: (selector: string) =>
        selector === '[data-sd-error-summary]' ? summary : null,
    } as unknown as ParentNode;

    expect(focusErrorSummary({ root })).toBe(true);
    expect(summary.focused).toBe(true);
    expect(summary.attributes.get('tabindex')).toBe('-1');
  });

  it('does not focus an empty summary by default', () => {
    const summary = createSummary(false);
    const root = { querySelector: () => summary } as unknown as ParentNode;

    expect(focusErrorSummary({ root })).toBe(false);
    expect(summary.focused).toBe(false);
  });

  it('can focus a status summary without error links when explicitly requested', () => {
    const summary = createSummary(false);
    const root = { querySelector: () => summary } as unknown as ParentNode;

    expect(focusErrorSummary({ root, requireErrorLinks: false })).toBe(true);
    expect(summary.focused).toBe(true);
  });

  it('is safe during server-side rendering', () => {
    expect(focusErrorSummary()).toBe(false);
  });
});
