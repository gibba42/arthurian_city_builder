import type { BuildingDefinition, BuildingType } from '../types/Building';

export const BUILDINGS: Record<BuildingType, BuildingDefinition> = {
  villageHall: { type: 'villageHall', name: 'Village Hall', cost: { wood: 100, stone: 50 }, size: { width: 2, height: 2 }, color: 0xb58a55, description: 'The heart and storehouse of the settlement.' },
  woodcutter: { type: 'woodcutter', name: 'Woodcutter', cost: { wood: 30, food: 10 }, size: { width: 1, height: 1 }, color: 0x527a45, production: { resource: 'wood', amount: 4, intervalMs: 3000 }, description: 'Harvests timber from the surrounding wilds.' },
  quarry: { type: 'quarry', name: 'Quarry', cost: { wood: 40, food: 10 }, size: { width: 1, height: 1 }, color: 0x777b7c, production: { resource: 'stone', amount: 3, intervalMs: 4000 }, description: 'Cuts stone for enduring works.' },
  monastery: { type: 'monastery', name: 'Monastery', cost: { wood: 60, stone: 70 }, size: { width: 2, height: 2 }, color: 0xddd2a9, production: { resource: 'faith', amount: 2, intervalMs: 5000 }, description: 'A sacred home for prayer and learning.' },
  barracks: { type: 'barracks', name: 'Barracks', cost: { wood: 70, stone: 40, food: 20 }, size: { width: 2, height: 1 }, color: 0x8e473f, description: 'Quarters for the village guard.' },
};

export const BUILDING_HOTKEYS: Record<string, BuildingType> = {
  ONE: 'villageHall', TWO: 'woodcutter', THREE: 'quarry', FOUR: 'monastery', FIVE: 'barracks',
};
