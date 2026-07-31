import type { BuildingDefinition } from '../types/Building';
import type { GridPosition } from '../types/Grid';

export class GridSystem {
  private readonly occupied = new Set<string>();
  constructor(readonly columns: number, readonly rows: number, readonly cellSize: number, readonly origin: GridPosition) {}
  worldToGrid(worldX: number, worldY: number): GridPosition {
    return { x: Math.floor((worldX - this.origin.x) / this.cellSize), y: Math.floor((worldY - this.origin.y) / this.cellSize) };
  }
  gridToWorld(position: GridPosition): GridPosition {
    return { x: this.origin.x + position.x * this.cellSize, y: this.origin.y + position.y * this.cellSize };
  }
  canPlace(position: GridPosition, definition: BuildingDefinition): boolean {
    if (position.x < 0 || position.y < 0 || position.x + definition.size.width > this.columns || position.y + definition.size.height > this.rows) return false;
    for (let y = position.y; y < position.y + definition.size.height; y++) for (let x = position.x; x < position.x + definition.size.width; x++) if (this.occupied.has(`${x},${y}`)) return false;
    return true;
  }
  occupy(position: GridPosition, definition: BuildingDefinition): void {
    for (let y = position.y; y < position.y + definition.size.height; y++) for (let x = position.x; x < position.x + definition.size.width; x++) this.occupied.add(`${x},${y}`);
  }
}
