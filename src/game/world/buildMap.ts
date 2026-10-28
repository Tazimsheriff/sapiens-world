import Phaser from 'phaser'
import { TILE, hash, paths, Tile, zones, WORLD_COLS, WORLD_ROWS } from './layout.ts'
import type { SolidRect } from '../../types/world.ts'

export function buildGround(scene: Phaser.Scene): Phaser.Tilemaps.TilemapLayer {
  const grid = createGrid()
  const map = scene.make.tilemap({ data: grid, tileWidth: TILE, tileHeight: TILE })
  const tileset = map.addTilesetImage('world-tiles')
  if (!tileset) throw new Error('Missing world tileset')
  const layer = map.createLayer(0, tileset, 0, 0)
  if (!layer) throw new Error('Could not create the ground layer')
  layer.setDepth(0)
  return layer
}

function createGrid(): number[][] {
  const grid: number[][] = []
  for (let y = 0; y < WORLD_ROWS; y += 1) {
    const row: number[] = []
    for (let x = 0; x < WORLD_COLS; x += 1) row.push(grassTile(x, y))
    grid.push(row)
  }
  for (const zone of zones) stampZone(grid, zone.x, zone.y, zone.w, zone.h, zone.floor, zone.id === 'plaza')
  for (const path of paths) stampPath(grid, path)
  return grid
}

function grassTile(x: number, y: number): number {
  const roll = hash(x, y) % 100
  if (roll < 7) return Tile.flower
  if (roll < 24) return Tile.grassDark
  return Tile.grass
}

function stampZone(
  grid: number[][],
  x: number,
  y: number,
  w: number,
  h: number,
  floor: number,
  checker: boolean,
): void {
  for (let iy = y; iy < y + h; iy += 1) {
    const row = grid[iy]
    if (!row) continue
    for (let ix = x; ix < x + w; ix += 1) {
      row[ix] = checker && (ix + iy) % 2 === 0 ? Tile.plazaAlt : floor
    }
  }
}

function stampPath(grid: number[][], rect: SolidRect): void {
  for (let y = rect.y; y < rect.y + rect.h; y += 1) {
    const row = grid[y]
    if (!row) continue
    for (let x = rect.x; x < rect.x + rect.w; x += 1) {
      row[x] = hash(x, y) % 9 === 0 ? Tile.pathDark : Tile.path
    }
  }
}
