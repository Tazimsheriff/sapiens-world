import Phaser from 'phaser'
import type { DoorSide } from '../../types/world.ts'
import { interactives, TILE, TILE_COUNT } from '../world/layout.ts'
import { createCanvas, fillRect, registerCanvas, sliceSheet } from './canvas.ts'
import { palette } from './palette.ts'
import { drawText, measureText } from './pixelFont.ts'

type Look = {
  shirt: string
  pants: string
  hair: string
  skin: string
  shoes: string
}

const looks: readonly Look[] = [
  { shirt: '#e0b000', pants: '#2c3340', hair: '#2a211c', skin: '#f0c0a0', shoes: '#1c1916' },
  { shirt: '#2f8fbe', pants: '#3a332c', hair: '#1a1a1a', skin: '#e0a878', shoes: '#2a2420' },
  { shirt: '#3f9a55', pants: '#2c3338', hair: '#6b3e2a', skin: '#f2c8a8', shoes: '#1c1916' },
  { shirt: '#6d5cb5', pants: '#343044', hair: '#111111', skin: '#c6865a', shoes: '#2a211c' },
  { shirt: '#e08a00', pants: '#2a3140', hair: '#3a2418', skin: '#f6d2b4', shoes: '#1c1916' },
]

export function generateTextures(scene: Phaser.Scene): void {
  drawMissing(scene)
  drawTileset(scene)
  drawTree(scene)
  drawBench(scene)
  drawShrub(scene)
  drawBubble(scene)
  const seen = new Set<string>()
  for (const placement of interactives) {
    if (seen.has(placement.texture)) continue
    seen.add(placement.texture)
    if (placement.kind === 'building') {
      drawBuilding(
        scene,
        placement.texture,
        placement.w * TILE,
        placement.h * TILE,
        placement.accent,
        placement.door ?? 'south',
        placement.label,
      )
    } else if (placement.kind === 'sign') {
      drawSign(scene, placement.texture, placement.label ?? '', placement.accent)
    } else if (placement.kind === 'poster') {
      drawPoster(scene, placement.texture, placement.accent)
    } else if (placement.texture === 'fountain') {
      drawFountain(scene)
    } else if (placement.texture === 'monkey') {
      drawMonkey(scene)
    }
  }
  looks.forEach((look, index) => drawCharacter(scene, index, look))
}

function drawMissing(scene: Phaser.Scene): void {
  const ctx = createCanvas(TILE, TILE)
  fillRect(ctx, 0, 0, TILE, TILE, '#2a1028')
  fillRect(ctx, 0, 0, 8, 8, '#e45cff')
  fillRect(ctx, 8, 8, 8, 8, '#e45cff')
  registerCanvas(scene, 'missing', ctx.canvas)
}

function drawTileset(scene: Phaser.Scene): void {
  const ctx = createCanvas(TILE * TILE_COUNT, TILE)
  for (let index = 0; index < TILE_COUNT; index += 1) {
    drawTile(ctx, index * TILE, 0, index)
  }
  registerCanvas(scene, 'world-tiles', ctx.canvas)
}

function drawTile(ctx: CanvasRenderingContext2D, x: number, y: number, index: number): void {
  const colors = [
    palette.grass,
    palette.grassDark,
    palette.grass,
    palette.path,
    palette.pathDark,
    palette.plaza,
    palette.plazaAlt,
    palette.eventsFloor,
    palette.labFloor,
    palette.hubFloor,
    palette.questFloor,
  ]
  fillRect(ctx, x, y, TILE, TILE, colors[index] ?? palette.grass)
  if (index === 0 || index === 1) {
    fillRect(ctx, x + 3, y + 11, 2, 2, palette.grassLight)
    fillRect(ctx, x + 10, y + 4, 2, 2, palette.grassDark)
  }
  if (index === 2) {
    fillRect(ctx, x + 7, y + 6, 2, 2, palette.flowerPink)
    fillRect(ctx, x + 10, y + 8, 2, 2, palette.flowerYellow)
    fillRect(ctx, x + 8, y + 10, 1, 3, palette.grassDark)
  }
  if (index === 3 || index === 4) {
    fillRect(ctx, x + 2, y + 5, 1, 1, palette.pathDark)
    fillRect(ctx, x + 11, y + 9, 2, 1, palette.plaza)
    fillRect(ctx, x + 6, y + 13, 1, 1, palette.pathDark)
  }
  if (index === 5 || index === 6) {
    fillRect(ctx, x, y + TILE - 1, TILE, 1, palette.stone)
    fillRect(ctx, x + TILE - 1, y, 1, TILE, palette.stone)
  }
  if (index >= 7) {
    fillRect(ctx, x + 4, y + 4, 2, 2, 'rgba(255,255,255,0.18)')
    fillRect(ctx, x + 11, y + 10, 2, 2, 'rgba(0,0,0,0.08)')
  }
}

function drawTree(scene: Phaser.Scene): void {
  const ctx = createCanvas(32, 48)
  fillRect(ctx, 10, 4, 12, 8, palette.leavesDark)
  fillRect(ctx, 6, 10, 20, 12, palette.leaves)
  fillRect(ctx, 4, 16, 24, 10, palette.leaves)
  fillRect(ctx, 8, 24, 16, 8, palette.leavesDark)
  fillRect(ctx, 12, 8, 4, 3, palette.leavesLight)
  fillRect(ctx, 18, 18, 3, 3, palette.leavesLight)
  fillRect(ctx, 14, 28, 4, 16, palette.trunk)
  fillRect(ctx, 13, 40, 6, 4, palette.trunkDark)
  registerCanvas(scene, 'tree', ctx.canvas)
}

function drawBench(scene: Phaser.Scene): void {
  const ctx = createCanvas(32, 16)
  fillRect(ctx, 2, 4, 28, 8, palette.bench)
  fillRect(ctx, 2, 4, 28, 2, palette.benchDark)
  fillRect(ctx, 3, 12, 3, 3, palette.benchDark)
  fillRect(ctx, 26, 12, 3, 3, palette.benchDark)
  fillRect(ctx, 4, 7, 24, 1, 'rgba(255,255,255,0.2)')
  registerCanvas(scene, 'bench', ctx.canvas)
}

function drawShrub(scene: Phaser.Scene): void {
  const ctx = createCanvas(16, 16)
  fillRect(ctx, 4, 8, 8, 5, palette.shrub)
  fillRect(ctx, 3, 6, 10, 4, palette.shrubLight)
  fillRect(ctx, 6, 4, 4, 3, palette.shrub)
  registerCanvas(scene, 'shrub', ctx.canvas)
}

function drawBubble(scene: Phaser.Scene): void {
  const ctx = createCanvas(16, 10)
  fillRect(ctx, 1, 0, 14, 8, palette.paper)
  fillRect(ctx, 0, 1, 1, 6, palette.outline)
  fillRect(ctx, 15, 1, 1, 6, palette.outline)
  fillRect(ctx, 1, 0, 14, 1, palette.outline)
  fillRect(ctx, 1, 7, 14, 1, palette.outline)
  fillRect(ctx, 6, 8, 2, 2, palette.paper)
  fillRect(ctx, 4, 3, 2, 2, palette.ink)
  fillRect(ctx, 7, 3, 2, 2, palette.ink)
  fillRect(ctx, 10, 3, 2, 2, palette.ink)
  registerCanvas(scene, 'chat-bubble', ctx.canvas)
}

function drawMonkey(scene: Phaser.Scene): void {
  const ctx = createCanvas(64, 64)
  fillRect(ctx, 12, 58, 40, 4, 'rgba(20,16,12,0.35)')
  fillRect(ctx, 4, 22, 12, 16, palette.outline)
  fillRect(ctx, 48, 22, 12, 16, palette.outline)
  fillRect(ctx, 6, 26, 6, 8, palette.paper)
  fillRect(ctx, 52, 26, 6, 8, palette.paper)
  fillRect(ctx, 14, 12, 36, 38, palette.outline)
  fillRect(ctx, 28, 4, 8, 10, palette.outline)
  fillRect(ctx, 18, 32, 28, 14, palette.paper)
  fillRect(ctx, 14, 22, 36, 12, palette.outline)
  fillRect(ctx, 16, 24, 14, 8, palette.paper)
  fillRect(ctx, 34, 24, 14, 8, palette.paper)
  fillRect(ctx, 18, 26, 10, 4, palette.outline)
  fillRect(ctx, 36, 26, 10, 4, palette.outline)
  fillRect(ctx, 30, 36, 2, 2, palette.outline)
  fillRect(ctx, 34, 36, 2, 2, palette.outline)
  fillRect(ctx, 24, 38, 2, 2, palette.outline)
  fillRect(ctx, 38, 38, 2, 2, palette.outline)
  fillRect(ctx, 26, 40, 12, 2, palette.outline)
  registerCanvas(scene, 'monkey', ctx.canvas)
}

function drawFountain(scene: Phaser.Scene): void {
  const ctx = createCanvas(64, 64)
  fillRect(ctx, 8, 8, 48, 48, palette.stoneDark)
  fillRect(ctx, 12, 12, 40, 40, palette.stone)
  fillRect(ctx, 18, 18, 28, 28, palette.water)
  fillRect(ctx, 22, 22, 16, 8, palette.waterLite)
  fillRect(ctx, 30, 34, 6, 6, 'rgba(255,255,255,0.45)')
  registerCanvas(scene, 'fountain', ctx.canvas)
}

function drawBuilding(
  scene: Phaser.Scene,
  key: string,
  width: number,
  height: number,
  accent: string,
  door: DoorSide,
  label?: string,
): void {
  const ctx = createCanvas(width, height)
  fillRect(ctx, 2, 3, width - 2, height - 3, 'rgba(20,16,12,0.28)')
  fillRect(ctx, 0, 0, width, height, palette.wall)
  const roofH = Math.max(14, Math.floor(height * 0.36))
  fillRect(ctx, 0, 0, width, roofH, accent)
  fillRect(ctx, 0, roofH - 2, width, 2, 'rgba(0,0,0,0.28)')
  fillRect(ctx, 2, 2, width - 4, 2, 'rgba(255,255,255,0.28)')
  if (label) {
    const textWidth = measureText(label)
    drawText(ctx, label, Math.max(2, Math.floor((width - textWidth) / 2)), 4, palette.ink)
  }
  const wallTop = roofH + 4
  for (let y = wallTop; y < height - 10; y += 12) {
    for (let x = 6; x < width - 10; x += 14) {
      fillRect(ctx, x, y, 6, 5, palette.window)
      fillRect(ctx, x + 1, y + 1, 2, 2, palette.windowLite)
    }
  }
  drawDoor(ctx, width, height, door)
  fillRect(ctx, 0, 0, width, 1, palette.outline)
  fillRect(ctx, 0, height - 1, width, 1, palette.outline)
  fillRect(ctx, 0, 0, 1, height, palette.outline)
  fillRect(ctx, width - 1, 0, 1, height, palette.outline)
  registerCanvas(scene, key, ctx.canvas)
}

function drawDoor(ctx: CanvasRenderingContext2D, width: number, height: number, door: DoorSide): void {
  if (door === 'south' || door === 'north') {
    const doorW = 12
    const doorH = Math.min(16, Math.floor(height * 0.28))
    const x = Math.floor((width - doorW) / 2)
    const y = door === 'south' ? height - doorH - 1 : 1
    fillRect(ctx, x, y, doorW, doorH, palette.door)
    fillRect(ctx, x + doorW - 4, y + Math.floor(doorH / 2), 2, 2, palette.doorLight)
    return
  }
  const doorW = Math.min(16, Math.floor(width * 0.2))
  const doorH = 12
  const y = Math.floor((height - doorH) / 2)
  const x = door === 'east' ? width - doorW - 1 : 1
  fillRect(ctx, x, y, doorW, doorH, palette.door)
  fillRect(ctx, x + Math.floor(doorW / 2), y + doorH - 4, 2, 2, palette.doorLight)
}

function drawSign(scene: Phaser.Scene, key: string, label: string, accent: string): void {
  const ctx = createCanvas(48, 32)
  fillRect(ctx, 22, 16, 4, 16, palette.trunk)
  fillRect(ctx, 2, 2, 44, 16, palette.sign)
  fillRect(ctx, 2, 2, 44, 3, accent)
  fillRect(ctx, 2, 2, 44, 1, palette.outline)
  fillRect(ctx, 2, 17, 44, 1, palette.outline)
  fillRect(ctx, 2, 2, 1, 16, palette.outline)
  fillRect(ctx, 45, 2, 1, 16, palette.outline)
  const textWidth = measureText(label)
  drawText(ctx, label, Math.max(4, Math.floor((48 - textWidth) / 2)), 7, palette.paper)
  registerCanvas(scene, key, ctx.canvas)
}

function drawPoster(scene: Phaser.Scene, key: string, accent: string): void {
  const ctx = createCanvas(16, 32)
  fillRect(ctx, 7, 20, 2, 12, palette.trunkDark)
  fillRect(ctx, 2, 1, 12, 20, palette.paper)
  fillRect(ctx, 2, 1, 12, 4, accent)
  fillRect(ctx, 4, 8, 8, 1, palette.ink)
  fillRect(ctx, 4, 11, 7, 1, palette.stoneDark)
  fillRect(ctx, 4, 14, 8, 1, palette.stoneDark)
  fillRect(ctx, 2, 1, 12, 1, palette.outline)
  fillRect(ctx, 2, 20, 12, 1, palette.outline)
  fillRect(ctx, 2, 1, 1, 20, palette.outline)
  fillRect(ctx, 13, 1, 1, 20, palette.outline)
  registerCanvas(scene, key, ctx.canvas)
}

function drawCharacter(scene: Phaser.Scene, variant: number, look: Look): void {
  const ctx = createCanvas(112, 96)
  const directions = ['down', 'left', 'right', 'up'] as const
  for (let row = 0; row < directions.length; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      const mode = col < 2 ? 'idle' : col < 6 ? 'walk' : 'sit'
      const frame = col < 2 ? col : col < 6 ? col - 2 : 0
      drawPerson(ctx, col * 16, row * 24, directions[row] ?? 'down', mode, frame, look)
    }
  }
  const texture = registerCanvas(scene, `char-${variant}`, ctx.canvas)
  sliceSheet(texture, 16, 24)
}

function drawPerson(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: 'down' | 'left' | 'right' | 'up',
  mode: 'idle' | 'walk' | 'sit',
  frame: number,
  look: Look,
): void {
  const bob = mode === 'idle' ? frame : 0
  const step = mode === 'walk' ? frame % 4 : 0
  const sitting = mode === 'sit'
  if (direction === 'right') {
    ctx.save()
    ctx.translate(x + 16, y)
    ctx.scale(-1, 1)
    drawSide(ctx, 0, 0, step, bob, sitting, look)
    ctx.restore()
    return
  }
  if (direction === 'left') {
    drawSide(ctx, x, y, step, bob, sitting, look)
    return
  }
  if (direction === 'up') {
    drawUp(ctx, x, y, step, bob, sitting, look)
    return
  }
  drawDown(ctx, x, y, step, bob, sitting, look)
}

function drawDown(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  step: number,
  bob: number,
  sitting: boolean,
  look: Look,
): void {
  const oy = y + bob
  fillRect(ctx, x + 4, oy + 21, 8, 2, 'rgba(0,0,0,0.3)')
  fillRect(ctx, x + 4, oy + 2, 8, 4, look.hair)
  fillRect(ctx, x + 4, oy + 5, 8, 4, look.skin)
  fillRect(ctx, x + 5, oy + 7, 2, 1, palette.outline)
  fillRect(ctx, x + 9, oy + 7, 2, 1, palette.outline)
  fillRect(ctx, x + 4, oy + 9, 8, 6, look.shirt)
  fillRect(ctx, x + 2, oy + 10, 2, 4, look.skin)
  fillRect(ctx, x + 12, oy + 10, 2, 4, look.skin)
  if (sitting) {
    fillRect(ctx, x + 2, oy + 15, 4, 3, look.pants)
    fillRect(ctx, x + 10, oy + 15, 4, 3, look.pants)
    fillRect(ctx, x + 1, oy + 17, 4, 2, look.shoes)
    fillRect(ctx, x + 11, oy + 17, 4, 2, look.shoes)
    return
  }
  const liftLeft = step === 1 ? 1 : 0
  const liftRight = step === 3 ? 1 : 0
  fillRect(ctx, x + 4, oy + 15 - liftLeft, 3, 5, look.pants)
  fillRect(ctx, x + 9, oy + 15 - liftRight, 3, 5, look.pants)
  fillRect(ctx, x + 4, oy + 19 - liftLeft, 3, 2, look.shoes)
  fillRect(ctx, x + 9, oy + 19 - liftRight, 3, 2, look.shoes)
}

function drawUp(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  step: number,
  bob: number,
  sitting: boolean,
  look: Look,
): void {
  const oy = y + bob
  fillRect(ctx, x + 4, oy + 21, 8, 2, 'rgba(0,0,0,0.3)')
  fillRect(ctx, x + 4, oy + 2, 8, 7, look.hair)
  fillRect(ctx, x + 4, oy + 9, 8, 6, look.shirt)
  fillRect(ctx, x + 2, oy + 10, 2, 4, look.skin)
  fillRect(ctx, x + 12, oy + 10, 2, 4, look.skin)
  if (sitting) {
    fillRect(ctx, x + 2, oy + 15, 4, 3, look.pants)
    fillRect(ctx, x + 10, oy + 15, 4, 3, look.pants)
    return
  }
  const liftLeft = step === 1 ? 1 : 0
  const liftRight = step === 3 ? 1 : 0
  fillRect(ctx, x + 4, oy + 15 - liftLeft, 3, 5, look.pants)
  fillRect(ctx, x + 9, oy + 15 - liftRight, 3, 5, look.pants)
  fillRect(ctx, x + 4, oy + 19 - liftLeft, 3, 2, look.shoes)
  fillRect(ctx, x + 9, oy + 19 - liftRight, 3, 2, look.shoes)
}

function drawSide(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  step: number,
  bob: number,
  sitting: boolean,
  look: Look,
): void {
  const oy = y + bob
  fillRect(ctx, x + 5, oy + 21, 6, 2, 'rgba(0,0,0,0.3)')
  fillRect(ctx, x + 5, oy + 3, 6, 3, look.hair)
  fillRect(ctx, x + 5, oy + 6, 6, 3, look.skin)
  fillRect(ctx, x + 6, oy + 7, 2, 1, palette.outline)
  fillRect(ctx, x + 5, oy + 9, 6, 6, look.shirt)
  fillRect(ctx, x + 4, oy + 10, 2, 4, look.skin)
  if (sitting) {
    fillRect(ctx, x + 4, oy + 15, 7, 3, look.pants)
    fillRect(ctx, x + 3, oy + 17, 3, 2, look.shoes)
    return
  }
  const stride = step === 1 || step === 2 ? 1 : 0
  fillRect(ctx, x + 5, oy + 15, 3, 5 - stride, look.pants)
  fillRect(ctx, x + 8, oy + 15 + stride, 3, 4, look.pants)
  fillRect(ctx, x + 5, oy + 19 - stride, 3, 2, look.shoes)
  fillRect(ctx, x + 8, oy + 20, 3, 2, look.shoes)
}
