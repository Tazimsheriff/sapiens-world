import Phaser from 'phaser'
import { TILE } from './layout.ts'

export function placeFoot(
  image: Phaser.GameObjects.Image,
  tileX: number,
  tileY: number,
  tileW: number,
  tileH: number,
): void {
  const footX = (tileX + tileW / 2) * TILE
  const footY = (tileY + tileH) * TILE
  image.setOrigin(0.5, 1)
  image.setPosition(footX, footY)
  image.setDepth(footY)
}

export function addSolid(
  scene: Phaser.Scene,
  group: Phaser.Physics.Arcade.StaticGroup,
  tileX: number,
  tileY: number,
  tileW: number,
  tileH: number,
): void {
  const pixelW = tileW * TILE
  const pixelH = tileH * TILE
  const rect = scene.add.rectangle(tileX * TILE + pixelW / 2, tileY * TILE + pixelH / 2, pixelW, pixelH)
  rect.setVisible(false)
  group.add(rect)
  const body = rect.body as Phaser.Physics.Arcade.StaticBody | null
  body?.updateFromGameObject()
}
