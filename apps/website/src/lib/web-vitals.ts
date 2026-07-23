export const webVitalNames = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'] as const;
export const webVitalRatings = ['good', 'needs-improvement', 'poor', 'unknown'] as const;

export type WebVitalName = (typeof webVitalNames)[number];
export type WebVitalRating = (typeof webVitalRatings)[number];

export interface WebVitalPayload {
  name: WebVitalName;
  rating: WebVitalRating;
  value: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseWebVitalPayload(value: unknown): WebVitalPayload | undefined {
  if (!isRecord(value)) return undefined;
  if (!webVitalNames.includes(value.name as WebVitalName)) return undefined;
  if (!webVitalRatings.includes(value.rating as WebVitalRating)) return undefined;
  if (typeof value.value !== 'number' || !Number.isFinite(value.value)) return undefined;
  if (value.value < 0 || value.value > 600_000) return undefined;

  return {
    name: value.name as WebVitalName,
    rating: value.rating as WebVitalRating,
    value: Number(value.value.toFixed(3)),
  };
}
