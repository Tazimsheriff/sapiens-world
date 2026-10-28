import Phaser from 'phaser'
import { getDecor, hash } from './layout.ts'
import { addSolid, placeFoot } from './place.ts'

export function spawnDecor(scene: Phaser.Scene, obstacles: Phaser.Physics.Arcade.StaticGroup): void {
  for (const decor of getDecor()) {
    const key = scene.textures.exists(decor.texture) ? decor.texture : 'missing'
    const image = scene.add.image(0, 0, key)
    placeFoot(image, decor.x, decor.y, decor.w, decor.h)
    if (decor.kind === 'tree') image.setFlipX(hash(decor.x, decor.y) % 2 === 0)
    if (decor.solid) addSolid(scene, obstacles, decor.solid.x, decor.solid.y, decor.solid.w, decor.solid.h)
  }
}
