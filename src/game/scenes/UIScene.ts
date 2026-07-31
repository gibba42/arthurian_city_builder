import Phaser from 'phaser';
import type { ResourceAmounts } from '../../types/Resource';
import { gameEvents, resourceSystem } from '../GameState';

export class UIScene extends Phaser.Scene {
  private hud!: Phaser.GameObjects.Text;
  constructor() { super('UI'); }
  create(): void {
    this.add.rectangle(760, 0, 200, 640, 0x171c16, 0.94).setOrigin(0);
    this.add.text(780, 24, 'Village Stores', { fontFamily: 'Georgia', fontSize: '21px', color: '#f1e3b5', fontStyle: 'bold' });
    this.hud = this.add.text(780, 67, '', { fontFamily: 'monospace', fontSize: '17px', color: '#ded5b9', lineSpacing: 10 });
    this.renderResources(resourceSystem.getAll());
    this.add.text(780, 265, 'Build by pressing a\nnumber, then click\nan open grid square.\n\nProduction arrives\nover time.', { fontFamily: 'Georgia', fontSize: '15px', color: '#aeb99e', lineSpacing: 5 });
    gameEvents.on('resources-changed', this.renderResources, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => gameEvents.off('resources-changed', this.renderResources, this));
  }
  private renderResources(resources: Readonly<ResourceAmounts>): void {
    const icon: Record<keyof ResourceAmounts, string> = { wood: 'WOOD', stone: 'STONE', food: 'FOOD', faith: 'FAITH', renown: 'RENOWN' };
    this.hud.setText(Object.entries(icon).map(([key, label]) => `${label.padEnd(7)} ${Math.floor(resources[key as keyof ResourceAmounts]).toString().padStart(4)}`));
  }
}
