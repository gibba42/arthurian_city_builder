import { STARTING_RESOURCES } from '../data/resources';
import { BuildingSystem } from '../systems/BuildingSystem';
import { GridSystem } from '../systems/GridSystem';
import { ResourceSystem } from '../systems/ResourceSystem';
import { ResearchSystem } from '../systems/ResearchSystem';
import { UnitSystem } from '../systems/UnitSystem';

export const GRID = { columns: 18, rows: 12, cellSize: 40, origin: { x: 24, y: 92 } } as const;
export const resourceSystem = new ResourceSystem(STARTING_RESOURCES);
export const gridSystem = new GridSystem(GRID.columns, GRID.rows, GRID.cellSize, GRID.origin);
export const buildingSystem = new BuildingSystem(gridSystem, resourceSystem);
export const researchSystem = new ResearchSystem(resourceSystem);
export const unitSystem = new UnitSystem(researchSystem);
