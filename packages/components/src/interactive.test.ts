import { describe, expect, it } from 'vitest';

import {
  enhanceInteractiveComponents,
  formatFileSize,
  interactiveComponentNames,
} from './interactive';

describe('interactive component contract', () => {
  it('publishes the complete interactive MVP inventory', () => {
    expect(interactiveComponentNames).toEqual([
      'accordion',
      'dialog',
      'tabs',
      'step-indicator',
      'date-input',
      'autocomplete',
      'file-upload-advanced',
    ]);
  });

  it('formats file sizes for Romanian interfaces', () => {
    expect(formatFileSize(0)).toBe('0 B');
    expect(formatFileSize(512)).toBe('512 B');
    expect(formatFileSize(1536)).toMatch(/1[,.]5 KB/u);
    expect(formatFileSize(2 * 1024 * 1024)).toBe('2 MB');
  });

  it('guards invalid file sizes', () => {
    expect(formatFileSize(-1)).toBe('0 B');
    expect(formatFileSize(Number.NaN)).toBe('0 B');
  });

  it('is safe during server-side rendering', () => {
    const cleanup = enhanceInteractiveComponents();
    expect(cleanup).toBeTypeOf('function');
    expect(() => cleanup()).not.toThrow();
  });
});
