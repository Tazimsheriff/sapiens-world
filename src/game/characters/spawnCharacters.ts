import Phaser from 'phaser'
import type { CharacterSpawn } from '../../types/world.ts'
import { characterSpawns, tileCenterPx } from '../world/layout.ts'
import { registerCharacterAnimations } from './animations.ts'
import { BehaviorController } from './BehaviorController.ts'
import { Character } from './Character.ts'

export function spawnCharacters(scene: Phaser.Scene): BehaviorController[] {
  registerCharacterAnimations(scene)
  return characterSpawns.map((spawn, index) => createCharacter(scene, spawn, index + 1))
}

function createCharacter(scene: Phaser.Scene, spawn: CharacterSpawn, seed: number): BehaviorController {
  const start = spawn.waypoints[0]
  if (!start) throw new Error(`Character ${spawn.id} has no waypoints`)
  const position = tileCenterPx(start.x, start.y)
  const texture = scene.textures.exists(`char-${spawn.variant}`) ? `char-${spawn.variant}` : 'missing'
  const character = new Character(scene, position.x, position.y, spawn)
  if (texture === 'missing') character.setTexture('missing')
  scene.add.existing(character)
  scene.physics.add.existing(character)
  const body = arcadeBody(character.body, spawn.id)
  body.setSize(10, 8)
  body.setOffset(3, 14)
  body.setCollideWorldBounds(true)
  const bubbleKey = scene.textures.exists('chat-bubble') ? 'chat-bubble' : 'missing'
  const bubble = scene.add.image(position.x, position.y - 28, bubbleKey).setVisible(false)
  const controller = new BehaviorController(character, spawn, seed, bubble)
  controller.start(scene.time.now)
  return controller
}

function arcadeBody(
  body: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | null,
  id: string,
): Phaser.Physics.Arcade.Body {
  if (!body || !('setCollideWorldBounds' in body)) {
    throw new Error(`Character ${id} is missing a physics body`)
  }
  return body
}
