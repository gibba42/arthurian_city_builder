import type { UnitDefinition, UnitType } from '../types/Unit';

export const UNITS: Record<UnitType, UnitDefinition> = {
  knight: { type: 'knight', name: 'Knight', attack: 5 },
};
