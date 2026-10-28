import Phaser from 'phaser'
import type { CharacterSpawn } from '../../types/world.ts'
import type { Direction } from './animations.ts'
import { characterTextureKey } from './animations.ts'

export class Character extends Phaser.Physics.Arcade.Sprite {
  readonly spawnId: string
  readonly variant: number
  facing: Direction = 'down'

  constructor(scene: Phaser.Scene, x: number, y: number, spawn: CharacterSpawn) {
    super(scene, x, y, characterTextureKey(spawn.variant), 0)
    this.spawnId = spawn.id
    this.variant = spawn.variant
    this.setOrigin(0.5, 0.92)
  }
}
