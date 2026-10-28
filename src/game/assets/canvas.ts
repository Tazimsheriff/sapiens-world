import Phaser from 'phaser'

export function createCanvas(width: number, height: number): CanvasRenderingContext2D {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Could not create a texture canvas')
  context.imageSmoothingEnabled = false
  return context
}

export function fillRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
): void {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

export function registerCanvas(
  scene: Phaser.Scene,
  key: string,
  canvas: HTMLCanvasElement,
): Phaser.Textures.CanvasTexture {
  if (scene.textures.exists(key)) scene.textures.remove(key)
  const texture = scene.textures.addCanvas(key, canvas)
  if (!texture) throw new Error(`Could not register texture ${key}`)
  texture.setFilter(Phaser.Textures.FilterMode.NEAREST)
  return texture
}

export function sliceSheet(
  texture: Phaser.Textures.Texture,
  frameWidth: number,
  frameHeight: number,
): void {
  const source = texture.getSourceImage()
  if (!('width' in source)) throw new Error('Texture source has no pixel size')
  let index = 0
  for (let y = 0; y + frameHeight <= source.height; y += frameHeight) {
    for (let x = 0; x + frameWidth <= source.width; x += frameWidth) {
      texture.add(index, 0, x, y, frameWidth, frameHeight)
      index += 1
    }
  }
}
