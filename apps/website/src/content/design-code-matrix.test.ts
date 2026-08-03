import { describe, expect, it } from 'vitest';

import { getDesignCodeMatrix } from './design-code-matrix';

describe('design-code matrix', () => {
  it('returns undefined for foundations', () => {
    expect(
      getDesignCodeMatrix({ id: 'foundation-design-tokens', kind: 'foundation' }),
    ).toBeUndefined();
  });

  it('marks html, docs and automatedTests as available for every component', () => {
    const entry = getDesignCodeMatrix({
      id: 'content-link',
      kind: 'component',
      componentName: 'link',
    });
    expect(entry?.html).toBe(true);
    expect(entry?.docs).toBe(true);
    expect(entry?.automatedTests).toBe(true);
  });

  it('detects a component with real Web Components and React equivalents', () => {
    const entry = getDesignCodeMatrix({
      id: 'interactive-accordion',
      kind: 'component',
      componentName: 'accordion',
    });
    expect(entry?.webComponents).toBe(true);
    expect(entry?.react).toBe(true);
  });

  it('does not falsely claim a Web Components or React equivalent for a static component', () => {
    const entry = getDesignCodeMatrix({
      id: 'content-link',
      kind: 'component',
      componentName: 'link',
    });
    expect(entry?.webComponents).toBe(false);
    expect(entry?.react).toBe(false);
  });

  it('keeps figma, keyboardTested and screenReaderTested false until manual evidence exists', () => {
    const entry = getDesignCodeMatrix({
      id: 'interactive-dialog',
      kind: 'component',
      componentName: 'dialog',
    });
    expect(entry?.figma).toBe(false);
    expect(entry?.keyboardTested).toBe(false);
    expect(entry?.screenReaderTested).toBe(false);
  });

  it('recognizes the sortable-table Web Components and React adapters', () => {
    const entry = getDesignCodeMatrix({
      id: 'content-sortable-table',
      kind: 'component',
      componentName: 'sortable-table',
    });
    expect(entry?.webComponents).toBe(true);
    expect(entry?.react).toBe(true);
  });
});
