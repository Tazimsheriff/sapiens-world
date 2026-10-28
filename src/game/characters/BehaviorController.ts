import Phaser from 'phaser'
import type { CharacterSpawn, TilePoint } from '../../types/world.ts'
import { tileCenterPx } from '../world/layout.ts'
import type { Direction } from './animations.ts'
import { characterAnimKey } from './animations.ts'
import type { Character } from './Character.ts'

const WALK_SPEED = 54

type Motion = 'idle' | 'walk' | 'pause' | 'chat' | 'sit'

export class BehaviorController {
  readonly character: Character
  private readonly spawn: CharacterSpawn
  private readonly bubble: Phaser.GameObjects.Image
  private readonly random: () => number
  private state: Motion = 'idle'
  private waypointIndex = 0
  private stateUntil = 0
  private walkDeadline = 0
  private shownAnim = ''

  constructor(character: Character, spawn: CharacterSpawn, seed: number, bubble: Phaser.GameObjects.Image) {
    this.character = character
    this.spawn = spawn
    this.bubble = bubble
    this.random = mulberry32(seed)
  }

  start(now: number): void {
    this.state = 'idle'
    this.stateUntil = now + this.random() * 1200
    this.faceToward(this.spawn.waypoints[1] ?? this.spawn.waypoints[0])
    this.syncAnimation(true)
  }

  update(time: number, camera: Phaser.Cameras.Scene2D.Camera): void {
    this.advance(time)
    const near = this.isNearCamera(camera)
    this.character.setDepth(this.character.y)
    this.syncAnimation(near)
  }

  private advance(time: number): void {
    const body = this.arcadeBody()
    if (this.state === 'walk') {
      const targetTile = this.currentWaypoint()
      const target = tileCenterPx(targetTile.x, targetTile.y)
      const dx = target.x - this.character.x
      const dy = target.y - this.character.y
      const distance = Math.hypot(dx, dy)
      this.faceToward(targetTile)
      if (distance < 4 || time > this.walkDeadline) {
        if (distance < 4) body.reset(target.x, target.y)
        else body.setVelocity(0, 0)
        this.chooseHold(time)
        return
      }
      body.setVelocity((dx / distance) * WALK_SPEED, (dy / distance) * WALK_SPEED)
      return
    }

    body.setVelocity(0, 0)
    if (time >= this.stateUntil) this.beginWalk(time)
  }

  private beginWalk(now: number): void {
    this.waypointIndex = (this.waypointIndex + 1) % this.spawn.waypoints.length
    const targetTile = this.currentWaypoint()
    const target = tileCenterPx(targetTile.x, targetTile.y)
    const distance = Math.hypot(target.x - this.character.x, target.y - this.character.y)
    this.walkDeadline = now + (distance / WALK_SPEED) * 1000 * 2 + 700
    this.state = 'walk'
    this.faceToward(targetTile)
  }

  private chooseHold(now: number): void {
    const atSitPoint = this.spawn.canSit && this.waypointIndex === this.spawn.sitWaypoint
    if (atSitPoint && this.random() < 0.7) {
      this.state = 'sit'
      this.stateUntil = now + 2600
      return
    }
    if (this.spawn.canChat && this.random() < 0.45) {
      this.state = 'chat'
      this.stateUntil = now + 1600
      return
    }
    this.state = this.random() < 0.5 ? 'idle' : 'pause'
    this.stateUntil = now + 700 + this.random() * 1400
  }

  private currentWaypoint(): TilePoint {
    const point = this.spawn.waypoints[this.waypointIndex]
    if (!point) throw new Error(`${this.spawn.id} is missing a waypoint`)
    return point
  }

  private faceToward(tile: TilePoint | undefined): void {
    if (!tile) return
    const target = tileCenterPx(tile.x, tile.y)
    const dx = target.x - this.character.x
    const dy = target.y - this.character.y
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return
    const facing: Direction = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up'
    this.character.facing = facing
  }

  private arcadeBody(): Phaser.Physics.Arcade.Body {
    const body = this.character.body
    if (!body || !('setVelocity' in body)) {
      throw new Error(`Character ${this.character.spawnId} is missing a physics body`)
    }
    return body
  }

  private isNearCamera(camera: Phaser.Cameras.Scene2D.Camera): boolean {
    const view = camera.worldView
    const margin = 96
    return (
      this.character.x > view.x - margin &&
      this.character.x < view.right + margin &&
      this.character.y > view.y - margin &&
      this.character.y < view.bottom + margin
    )
  }

  private syncAnimation(nearCamera: boolean): void {
    if (!nearCamera) {
      if (this.character.anims.isPlaying) this.character.anims.pause()
      this.bubble.setVisible(false)
      return
    }

    const chatting = this.state === 'chat'
    this.bubble.setVisible(chatting)
    if (chatting) {
      this.bubble.setPosition(this.character.x, this.character.y - 28)
      this.bubble.setDepth(this.character.y + 1)
    }

    const motion = this.state === 'walk' ? 'walk' : this.state === 'sit' ? 'sit' : 'idle'
    const key = characterAnimKey(this.character.variant, motion, this.character.facing)
    if (!this.character.scene.anims.exists(key)) return
    if (key !== this.shownAnim) {
      this.character.play(key)
      this.shownAnim = key
      return
    }
    if (this.character.anims.isPaused) this.character.anims.resume()
  }
}

function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
