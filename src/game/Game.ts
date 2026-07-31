import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { UIScene } from './scenes/UIScene';
import { VillageScene } from './scenes/VillageScene';

export const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 640,
  backgroundColor: '#263322',
  pixelArt: true,
  scene: [BootScene, PreloadScene, VillageScene, UIScene],
});
