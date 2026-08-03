export interface RawMaturityTransition {
  from: string;
  to: string;
  date: string;
  approvedBy: string;
  reason: string;
}

export interface RawComponentMaturityMetadata {
  id: string;
  state: 'proposal' | 'experimental' | 'candidate' | 'stable' | 'deprecated' | 'retired';
  owner: string;
  since: string;
  lastReviewed: string;
  evidence: readonly string[];
  deprecationReason?: string;
  replacedBy?: string;
  transitions: readonly RawMaturityTransition[];
}

export const componentMaturity: readonly RawComponentMaturityMetadata[];
