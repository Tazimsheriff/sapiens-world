import Phaser from 'phaser'
import { interactives } from '../world/layout.ts'
import { addSolid, placeFoot } from '../world/place.ts'

export function spawnInteractives(
  scene: Phaser.Scene,
  obstacles: Phaser.Physics.Arcade.StaticGroup,
  imagesByContent: Map<string, Phaser.GameObjects.Image>,
): void {
  for (const placement of interactives) {
    const key = scene.textures.exists(placement.texture) ? placement.texture : 'missing'
    const image = scene.add.image(0, 0, key)
    placeFoot(image, placement.x, placement.y, placement.w, placement.h)
    image.setData('contentId', placement.contentId)
    image.setInteractive({ useHandCursor: true })
    image.on('pointerover', () => image.setTint(0xfff6ea))
    image.on('pointerout', () => image.clearTint())
    imagesByContent.set(placement.contentId, image)
    if (placement.solid) addSolid(scene, obstacles, placement.x, placement.y, placement.w, placement.h)
  }
}
