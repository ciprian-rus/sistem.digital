import type { Metadata } from 'next';

import type { SiteSectionId } from './site-map';

export type DocumentationStatus = 'alpha' | 'planned' | 'stable';

export interface DocumentationFrontmatter {
  title: string;
  description: string;
  section: SiteSectionId;
  status: DocumentationStatus;
  version: string;
  updated: string;
  order: number;
  keywords: readonly string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireString(
  record: Record<string, unknown>,
  key: string,
  source: string,
): string {
  const value = record[key];
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${source}: frontmatter.${key} trebuie să fie un text nevid.`);
  }
  return value.trim();
}

export function validateDocumentationFrontmatter(
  value: unknown,
  source: string,
): DocumentationFrontmatter {
  if (!isRecord(value)) throw new Error(`${source}: frontmatter-ul lipsește sau nu este un obiect.`);

  const title = requireString(value, 'title', source);
  const description = requireString(value, 'description', source);
  const section = requireString(value, 'section', source);
  const status = requireString(value, 'status', source);
  const version = requireString(value, 'version', source);
  const updated = requireString(value, 'updated', source);
  const order = value.order;
  const keywords = value.keywords;

  const sections: readonly SiteSectionId[] = [
    'foundations',
    'components',
    'patterns',
    'templates',
    'guides',
    'governance',
  ];
  if (!sections.includes(section as SiteSectionId)) {
    throw new Error(`${source}: frontmatter.section are valoarea necunoscută „${section}”.`);
  }

  const statuses: readonly DocumentationStatus[] = ['alpha', 'planned', 'stable'];
  if (!statuses.includes(status as DocumentationStatus)) {
    throw new Error(`${source}: frontmatter.status trebuie să fie alpha, planned sau stable.`);
  }

  if (typeof order !== 'number' || !Number.isInteger(order) || order < 0) {
    throw new Error(`${source}: frontmatter.order trebuie să fie un număr întreg pozitiv.`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/u.test(updated) || Number.isNaN(Date.parse(`${updated}T00:00:00Z`))) {
    throw new Error(`${source}: frontmatter.updated trebuie să folosească formatul YYYY-MM-DD.`);
  }

  if (!Array.isArray(keywords) || keywords.some((keyword) => typeof keyword !== 'string')) {
    throw new Error(`${source}: frontmatter.keywords trebuie să fie o listă de texte.`);
  }

  return {
    title,
    description,
    section: section as SiteSectionId,
    status: status as DocumentationStatus,
    version,
    updated,
    order,
    keywords: keywords.map((keyword) => keyword.trim()).filter(Boolean),
  };
}

export function createDocumentationMetadata(frontmatter: DocumentationFrontmatter): Metadata {
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: [...frontmatter.keywords],
  };
}
