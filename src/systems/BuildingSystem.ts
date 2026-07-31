import { BUILDINGS } from '../data/buildings';
import type { BuildingType, PlacedBuilding } from '../types/Building';
import type { GridPosition } from '../types/Grid';
import { GridSystem } from './GridSystem';
import { ResourceSystem } from './ResourceSystem';

export type PlacementResult = { ok: true; building: PlacedBuilding } | { ok: false; reason: string };

export class BuildingSystem {
  readonly buildings: PlacedBuilding[] = [];
  private nextId = 1;
  private productionElapsed = new Map<number, number>();
  constructor(private readonly grid: GridSystem, private readonly resources: ResourceSystem) {}
  place(type: BuildingType, position: GridPosition, free = false): PlacementResult {
    const definition = BUILDINGS[type];
    if (!this.grid.canPlace(position, definition)) return { ok: false, reason: 'That ground is unavailable.' };
    if (!free && !this.resources.spend(definition.cost)) return { ok: false, reason: `Not enough resources for ${definition.name}.` };
    const building = { id: this.nextId++, type, position: { ...position } };
    this.grid.occupy(position, definition); this.buildings.push(building); this.productionElapsed.set(building.id, 0);
    return { ok: true, building };
  }
  update(deltaMs: number): void {
    for (const building of this.buildings) {
      const production = BUILDINGS[building.type].production;
      if (!production) continue;
      let elapsed = (this.productionElapsed.get(building.id) ?? 0) + deltaMs;
      while (elapsed >= production.intervalMs) { this.resources.add(production.resource, production.amount); elapsed -= production.intervalMs; }
      this.productionElapsed.set(building.id, elapsed);
    }
  }
}
