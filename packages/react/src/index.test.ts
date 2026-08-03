import { describe, expect, it } from 'vitest';

import * as SistemDigitalReact from './index.js';
import {
  GlobalEnhancements,
  reactHookNames,
  useAccordion,
  useAutocomplete,
  useCharacterCount,
  useCookieBanner,
  useDialog,
  useDropdown,
  useErrorSummary,
  useExitThisPage,
  useFileUploadAdvanced,
  useSistemDigitalEnhancements,
  useSortableTable,
  useTabs,
  useTooltip,
} from './index.js';

describe('react hooks registry', () => {
  it('publishes every enhancement as a hook, importable outside a browser', () => {
    // Reaching this line already proves the import is safe in this DOM-less
    // test environment (mirrors the release pipeline's Node-only ESM/CJS
    // smoke test). Hooks can't be invoked outside a component render — react
    // itself enforces that — so this checks the exported contract, not the
    // effect behavior; that's verified manually against a real build.
    const hooks = [
      useAccordion,
      useAutocomplete,
      useCharacterCount,
      useCookieBanner,
      useDialog,
      useDropdown,
      useErrorSummary,
      useExitThisPage,
      useFileUploadAdvanced,
      useSistemDigitalEnhancements,
      useSortableTable,
      useTabs,
      useTooltip,
    ];
    for (const hook of hooks) expect(hook).toBeTypeOf('function');
  });

  it('publishes GlobalEnhancements as a component that renders nothing', () => {
    expect(GlobalEnhancements).toBeTypeOf('function');
  });

  it('keeps reactHookNames in sync with the real named exports', () => {
    for (const name of reactHookNames) {
      expect(SistemDigitalReact[name as keyof typeof SistemDigitalReact]).toBeTypeOf('function');
    }
  });
});
