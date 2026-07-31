import type { ResearchDefinition, ResearchId } from '../types/Research';

export const RESEARCH: Record<ResearchId, ResearchDefinition> = {
  monasticRecords: {
    id: 'monasticRecords',
    name: 'Monastic Records',
    cost: { faith: 10 },
    prerequisites: [],
    description: 'The brothers preserve the village\'s accumulated wisdom.',
  },
  sacredSmithing: {
    id: 'sacredSmithing',
    name: 'Sacred Smithing',
    cost: { faith: 20 },
    prerequisites: ['monasticRecords'],
    description: 'Blessed steel grants knights +2 attack.',
  },
  bestiaryStudies: {
    id: 'bestiaryStudies',
    name: 'Bestiary Studies',
    cost: { faith: 15 },
    prerequisites: ['monasticRecords'],
    description: 'Records of the strange beasts that threaten the realm.',
  },
};

export const RESEARCH_DEBUG_HOTKEYS: Record<string, ResearchId> = {
  SEVEN: 'monasticRecords',
  EIGHT: 'sacredSmithing',
  NINE: 'bestiaryStudies',
};
