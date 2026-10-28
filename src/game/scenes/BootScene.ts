import Phaser from 'phaser'
import { generateTextures } from '../assets/generateTextures.ts'
import { gameBridge } from '../bridge.ts'

export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot')
  }

  create(): void {
    try {
      generateTextures(this)
      this.scene.start('world')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not generate the world'
      gameBridge.emit('error', { message })
    }
  }
}
