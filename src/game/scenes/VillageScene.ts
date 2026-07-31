import Phaser from 'phaser';
import { BUILDINGS, BUILDING_HOTKEYS } from '../../data/buildings';
import { RESEARCH, RESEARCH_DEBUG_HOTKEYS } from '../../data/research';
import type { BuildingType, PlacedBuilding } from '../../types/Building';
import { buildingSystem, GRID, gridSystem, researchSystem, resourceSystem } from '../GameState';

export class VillageScene extends Phaser.Scene {
  private selected: BuildingType = 'woodcutter';
  private ghost!: Phaser.GameObjects.Rectangle;
  private message!: Phaser.GameObjects.Text;
  constructor() { super('Village'); }
  create(): void {
    this.drawGroundAndGrid();
    this.add.text(24, 18, 'ARTHURIAN VILLAGE', { fontFamily: 'Georgia', fontSize: '25px', color: '#f1e3b5', fontStyle: 'bold' });
    this.add.text(24, 51, '1 Hall  ·  2 Woodcutter  ·  3 Quarry  ·  4 Monastery  ·  5 Barracks', { fontFamily: 'Georgia', fontSize: '16px', color: '#d5c9a7' });
    this.message = this.add.text(760, 600, '', { fontFamily: 'Georgia', fontSize: '14px', color: '#f0cc72', align: 'right', wordWrap: { width: 180 } }).setOrigin(1, 1);
    this.ghost = this.add.rectangle(0, 0, GRID.cellSize - 4, GRID.cellSize - 4, BUILDINGS[this.selected].color, 0.45).setOrigin(0).setDepth(10);
    const hall = buildingSystem.place('villageHall', { x: 8, y: 5 }, true);
    if (hall.ok) this.drawBuilding(hall.building);
    buildingSystem.buildings.forEach((building) => { if (!this.children.getByName(`building-${building.id}`)) this.drawBuilding(building); });
    Object.entries(BUILDING_HOTKEYS).forEach(([key, type]) => this.input.keyboard?.on(`keydown-${key}`, () => this.select(type)));
    Object.entries(RESEARCH_DEBUG_HOTKEYS).forEach(([key, id]) => this.input.keyboard?.on(`keydown-${key}`, () => {
      const result = researchSystem.unlock(id);
      this.message.setText(result.ok ? `${RESEARCH[id].name} unlocked.` : result.reason);
    }));
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => this.moveGhost(pointer));
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => this.tryPlace(pointer));
    this.scene.launch('UI');
    this.select(this.selected);
  }
  update(_time: number, delta: number): void { buildingSystem.update(delta); }
  private drawGroundAndGrid(): void {
    this.add.rectangle(GRID.origin.x, GRID.origin.y, GRID.columns * GRID.cellSize, GRID.rows * GRID.cellSize, 0x34482f).setOrigin(0);
    const lines = this.add.graphics().lineStyle(1, 0x829174, 0.38);
    for (let x = 0; x <= GRID.columns; x++) lines.lineBetween(GRID.origin.x + x * GRID.cellSize, GRID.origin.y, GRID.origin.x + x * GRID.cellSize, GRID.origin.y + GRID.rows * GRID.cellSize);
    for (let y = 0; y <= GRID.rows; y++) lines.lineBetween(GRID.origin.x, GRID.origin.y + y * GRID.cellSize, GRID.origin.x + GRID.columns * GRID.cellSize, GRID.origin.y + y * GRID.cellSize);
  }
  private select(type: BuildingType): void {
    this.selected = type; const definition = BUILDINGS[type];
    this.ghost.setFillStyle(definition.color, 0.45).setSize(definition.size.width * GRID.cellSize - 4, definition.size.height * GRID.cellSize - 4);
    this.message.setText(`Selected: ${definition.name}`);
  }
  private moveGhost(pointer: Phaser.Input.Pointer): void {
    const cell = gridSystem.worldToGrid(pointer.worldX, pointer.worldY); const world = gridSystem.gridToWorld(cell);
    this.ghost.setPosition(world.x + 2, world.y + 2).setVisible(cell.x >= 0 && cell.y >= 0 && cell.x < GRID.columns && cell.y < GRID.rows);
    this.ghost.setAlpha(gridSystem.canPlace(cell, BUILDINGS[this.selected]) && resourceSystem.canAfford(BUILDINGS[this.selected].cost) ? 0.5 : 0.2);
  }
  private tryPlace(pointer: Phaser.Input.Pointer): void {
    const result = buildingSystem.place(this.selected, gridSystem.worldToGrid(pointer.worldX, pointer.worldY));
    if (!result.ok) { this.message.setText(result.reason); return; }
    this.drawBuilding(result.building); this.message.setText(`${BUILDINGS[result.building.type].name} raised.`);
  }
  private drawBuilding(building: PlacedBuilding): void {
    const definition = BUILDINGS[building.type]; const world = gridSystem.gridToWorld(building.position);
    const container = this.add.container(world.x + 3, world.y + 3).setName(`building-${building.id}`);
    container.add(this.add.rectangle(0, 0, definition.size.width * GRID.cellSize - 6, definition.size.height * GRID.cellSize - 6, definition.color).setOrigin(0).setStrokeStyle(2, 0x241f18));
    container.add(this.add.text((definition.size.width * GRID.cellSize - 6) / 2, (definition.size.height * GRID.cellSize - 6) / 2, definition.name, { fontFamily: 'Georgia', fontSize: definition.size.width > 1 ? '13px' : '10px', color: '#17140f', align: 'center', wordWrap: { width: definition.size.width * GRID.cellSize - 10 } }).setOrigin(0.5));
  }
}
