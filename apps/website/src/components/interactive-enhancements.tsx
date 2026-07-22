'use client';

import { useEffect } from 'react';

import { enhanceInteractiveComponents } from '@sistem-digital/components';

export function InteractiveEnhancements() {
  useEffect(() => enhanceInteractiveComponents(), []);
  return null;
}
