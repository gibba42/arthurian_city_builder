import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() { super('Preload'); }
  preload(): void {
    const label = this.add.text(480, 300, 'Preparing the village…', { color: '#eee5c9', fontFamily: 'Georgia', fontSize: '22px' }).setOrigin(0.5);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => label.destroy());
  }
  create(): void { this.scene.start('Village'); }
}
