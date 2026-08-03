// Registru de metadate de maturitate, conform docs/product/component-metadata-schema.md.
// Opțional și separat de catalog-data.mjs: o componentă fără intrare aici este
// pur și simplu „neevaluată” încă, nu invalidă. Nu migrează retroactiv restul
// componentelor publicate — vezi docs/governance/component-maturity-model.md.
export const componentMaturity = [
  {
    id: 'content-bar-chart',
    state: 'candidate',
    owner: 'ciprian-rus',
    since: '2026-07-31',
    lastReviewed: '2026-08-03',
    evidence: ['https://github.com/ciprian-rus/sistem.digital/pull/97'],
    transitions: [
      {
        from: 'experimental',
        to: 'candidate',
        date: '2026-07-31',
        approvedBy: 'ciprian-rus',
        reason:
          'Componentă documentată, testată manual (0 violări axe-core pe 4 teme, fără overflow la 320px) și publicată în catalogul versionat sub stadiu alpha.',
      },
    ],
  },
];
