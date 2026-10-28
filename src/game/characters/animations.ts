import Phaser from 'phaser'

export const CHARACTER_DIRECTIONS = ['down', 'left', 'right', 'up'] as const
export type Direction = (typeof CHARACTER_DIRECTIONS)[number]

const COLUMNS = 7

export function characterTextureKey(variant: number): string {
  return `char-${variant}`
}

export function characterAnimKey(
  variant: number,
  motion: 'idle' | 'walk' | 'sit',
  facing: Direction,
): string {
  if (motion === 'sit') return `${characterTextureKey(variant)}-sit`
  return `${characterTextureKey(variant)}-${motion}-${facing}`
}

export function registerCharacterAnimations(scene: Phaser.Scene): void {
  for (let variant = 0; variant < 5; variant += 1) {
    const texture = characterTextureKey(variant)
    if (!scene.textures.exists(texture)) continue
    CHARACTER_DIRECTIONS.forEach((direction, row) => {
      createLoop(scene, characterAnimKey(variant, 'idle', direction), texture, row * COLUMNS, row * COLUMNS + 1, 2)
      createLoop(scene, characterAnimKey(variant, 'walk', direction), texture, row * COLUMNS + 2, row * COLUMNS + 5, 8)
    })
    const sitKey = characterAnimKey(variant, 'sit', 'down')
    if (!scene.anims.exists(sitKey)) {
      scene.anims.create({
        key: sitKey,
        frames: [{ key: texture, frame: 6 }],
        frameRate: 1,
        repeat: -1,
      })
    }
  }
}

function createLoop(
  scene: Phaser.Scene,
  key: string,
  texture: string,
  start: number,
  end: number,
  frameRate: number,
): void {
  if (scene.anims.exists(key)) return
  scene.anims.create({
    key,
    frames: scene.anims.generateFrameNumbers(texture, { start, end }),
    frameRate,
    repeat: -1,
  })
}
