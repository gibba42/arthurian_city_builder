import type { ResourceCost, ResourceType } from './Resource';
import type { GridPosition } from './Grid';

export type BuildingType = 'villageHall' | 'woodcutter' | 'quarry' | 'monastery' | 'barracks';

export interface BuildingDefinition {
  type: BuildingType;
  name: string;
  cost: ResourceCost;
  size: { width: number; height: number };
  color: number;
  production?: { resource: ResourceType; amount: number; intervalMs: number };
  description: string;
}

export interface PlacedBuilding { id: number; type: BuildingType; position: GridPosition }
