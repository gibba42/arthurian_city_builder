import type { ResourceCost } from './Resource';

export type ResearchId = 'monasticRecords' | 'sacredSmithing' | 'bestiaryStudies';

export interface ResearchDefinition {
  id: ResearchId;
  name: string;
  cost: ResourceCost;
  prerequisites: ResearchId[];
  description: string;
}
