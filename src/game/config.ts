import Phaser from 'phaser'
import { BootScene } from './scenes/BootScene.ts'
import { WorldScene } from './scenes/WorldScene.ts'

export function createGameConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.CANVAS,
    parent,
    backgroundColor: '#1a241c',
    banner: false,
    pixelArt: true,
    antialias: false,
    roundPixels: true,
    audio: { noAudio: true },
    scale: {
      mode: Phaser.Scale.RESIZE,
      width: Math.max(parent.clientWidth, 1),
      height: Math.max(parent.clientHeight, 1),
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    input: { activePointers: 3 },
    scene: [BootScene, WorldScene],
  }
}
