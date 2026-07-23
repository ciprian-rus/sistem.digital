import { describe, expect, it } from 'vitest';

import { parseWebVitalPayload } from './web-vitals';

describe('privacy-friendly web vital payloads', () => {
  it('keeps only the metric name, value and rating', () => {
    expect(
      parseWebVitalPayload({
        id: 'must-not-be-kept',
        name: 'LCP',
        pathname: '/formular?cnp=secret',
        rating: 'good',
        value: 1234.56789,
      }),
    ).toEqual({
      name: 'LCP',
      rating: 'good',
      value: 1234.568,
    });
  });

  it('rejects unknown metrics and invalid numeric values', () => {
    expect(parseWebVitalPayload({ name: 'CUSTOM', rating: 'good', value: 12 })).toBeUndefined();
    expect(
      parseWebVitalPayload({ name: 'CLS', rating: 'good', value: Number.NaN }),
    ).toBeUndefined();
    expect(parseWebVitalPayload({ name: 'INP', rating: 'poor', value: -1 })).toBeUndefined();
  });
});
