'use client';

import { useReportWebVitals } from 'next/web-vitals';

const productionHosts = new Set(['sistem.digital', 'www.sistem.digital']);

type WebVitalsMetric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0];

function reportWebVital(metric: WebVitalsMetric) {
  if (!productionHosts.has(window.location.hostname)) return;

  const payload = JSON.stringify({
    name: metric.name,
    rating: metric.rating ?? 'unknown',
    value: metric.value,
  });
  const body = new Blob([payload], { type: 'application/json' });

  if (navigator.sendBeacon('/api/web-vitals', body)) return;
  void fetch('/api/web-vitals', {
    body: payload,
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    method: 'POST',
  }).catch(() => undefined);
}

export function WebVitalsReporter() {
  useReportWebVitals(reportWebVital);
  return null;
}
