'use client';

import { useEffect } from 'react';

import { enhanceErrorSummaryLinks, focusErrorSummary } from '@sistem-digital/components';

export function FormErrorEnhancement() {
  useEffect(() => {
    const summary = document.querySelector<HTMLElement>('[data-sd-error-summary]');
    if (!summary) return undefined;

    focusErrorSummary({ root: document });
    return enhanceErrorSummaryLinks(summary);
  }, []);

  return null;
}
