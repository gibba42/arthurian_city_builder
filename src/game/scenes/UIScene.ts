import Phaser from 'phaser';
import type { ResourceAmounts } from '../../types/Resource';
import { RESEARCH } from '../../data/research';
import type { ResearchId } from '../../types/Research';
import { researchSystem, resourceSystem, unitSystem } from '../GameState';

export class UIScene extends Phaser.Scene {
  private hud!: Phaser.GameObjects.Text;
  private researchHud!: Phaser.GameObjects.Text;
  constructor() { super('UI'); }
  create(): void {
    this.add.rectangle(760, 0, 200, 640, 0x171c16, 0.94).setOrigin(0);
    this.add.text(780, 24, 'Village Stores', { fontFamily: 'Georgia', fontSize: '21px', color: '#f1e3b5', fontStyle: 'bold' });
    this.hud = this.add.text(780, 67, '', { fontFamily: 'monospace', fontSize: '17px', color: '#ded5b9', lineSpacing: 10 });
    this.renderResources(resourceSystem.getAll());
    this.add.text(780, 245, 'Research (debug)', { fontFamily: 'Georgia', fontSize: '18px', color: '#f1e3b5', fontStyle: 'bold' });
    this.researchHud = this.add.text(780, 276, '', { fontFamily: 'Georgia', fontSize: '14px', color: '#aeb99e', lineSpacing: 5 });
    this.renderResearch(researchSystem.getUnlocked());
    this.add.text(780, 440, 'Build: keys 1–5\nResearch: keys 7–9\nthen click an open\ngrid square.', { fontFamily: 'Georgia', fontSize: '14px', color: '#aeb99e', lineSpacing: 5 });
    const stopListening = resourceSystem.onChange((resources) => this.renderResources(resources));
    const stopResearchListening = researchSystem.onChange((unlocked) => this.renderResearch(unlocked));
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, stopListening);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, stopResearchListening);
  }
  private renderResources(resources: Readonly<ResourceAmounts>): void {
    const icon: Record<keyof ResourceAmounts, string> = { wood: 'WOOD', stone: 'STONE', food: 'FOOD', faith: 'FAITH', renown: 'RENOWN' };
    this.hud.setText(Object.entries(icon).map(([key, label]) => `${label.padEnd(7)} ${Math.floor(resources[key as keyof ResourceAmounts]).toString().padStart(4)}`));
  }
  private renderResearch(unlocked: ReadonlySet<ResearchId>): void {
    const lines = (Object.keys(RESEARCH) as ResearchId[]).map((id, index) => {
      const definition = RESEARCH[id];
      return `${index + 7} ${unlocked.has(id) ? '✓' : '·'} ${definition.name} (${definition.cost.faith} faith)`;
    });
    lines.push('', `Knight attack: ${unitSystem.getAttack('knight')}`);
    this.researchHud.setText(lines);
  }
}
