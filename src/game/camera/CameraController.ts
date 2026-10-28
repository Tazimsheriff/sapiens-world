import Phaser from 'phaser'
import { gameBridge, type FocusTarget } from '../bridge.ts'
import { worldPixelHeight, worldPixelWidth, zoneAtPixel } from '../world/layout.ts'

const MIN_ZOOM = 1
const MAX_ZOOM = 4

export class CameraController {
  private readonly scene: Phaser.Scene
  private readonly onClick: (pointer: Phaser.Input.Pointer) => void
  private readonly camera: Phaser.Cameras.Scene2D.Camera
  private readonly pointers = new Map<number, { x: number; y: number }>()
  private keys: PanKeys | null = null
  private dragging = false
  private suppressClick = false
  private dragOrigin = { x: 0, y: 0 }
  private scrollOrigin = { x: 0, y: 0 }
  private pinchStart: { distance: number; zoom: number } | null = null
  private wheelAccum = 0
  private emitTimer = 0
  private lastZone: string | null = null

  constructor(scene: Phaser.Scene, onClick: (pointer: Phaser.Input.Pointer) => void) {
    this.scene = scene
    this.onClick = onClick
    this.camera = scene.cameras.main
  }

  attach(centerX: number, centerY: number): void {
    this.camera.setBounds(0, 0, worldPixelWidth, worldPixelHeight)
    this.camera.roundPixels = true
    this.camera.setZoom(2)
    this.camera.centerOn(centerX, centerY)
    this.bindKeys()
    this.scene.input.on('pointerdown', this.onPointerDown)
    this.scene.input.on('pointermove', this.onPointerMove)
    this.scene.input.on('pointerup', this.onPointerUp)
    this.scene.input.on('pointerupoutside', this.onPointerUp)
    this.scene.input.on('wheel', this.onWheel)
    this.scene.scale.on('resize', this.onResize)
    this.scene.input.keyboard?.on('keydown', this.onKeyDown)
    this.emitNow()
  }

  update(delta: number): void {
    this.panWithKeyboard(delta)
    this.emitTimer += delta
    if (this.emitTimer < 40) return
    this.emitTimer = 0
    this.emitNow()
  }

  focusOn(target: FocusTarget): void {
    if (target.zoom !== undefined) {
      const centerX = this.camera.worldView.centerX
      const centerY = this.camera.worldView.centerY
      this.camera.setZoom(this.snapZoom(target.zoom))
      this.camera.centerOn(centerX, centerY)
    }
    // Phaser 3.90 pans until the viewport center sits on this world point.
    this.camera.pan(target.x, target.y, 450, 'Sine.easeInOut', true)
    this.emitNow()
  }

  zoomBy(delta: number): void {
    const centerX = this.camera.worldView.centerX
    const centerY = this.camera.worldView.centerY
    this.camera.setZoom(this.snapZoom(this.camera.zoom + delta))
    this.camera.centerOn(centerX, centerY)
    this.emitNow()
  }

  emitNow(): void {
    const view = this.camera.worldView
    gameBridge.emit('cameraMoved', {
      scrollX: this.camera.scrollX,
      scrollY: this.camera.scrollY,
      width: view.width,
      height: view.height,
      zoom: this.camera.zoom,
      centerX: view.centerX,
      centerY: view.centerY,
    })
    const zone = zoneAtPixel(view.centerX, view.centerY)
    if (!zone || zone.id === this.lastZone) return
    this.lastZone = zone.id
    gameBridge.emit('zoneChanged', { zoneId: zone.id })
  }

  destroy(): void {
    this.scene.input.off('pointerdown', this.onPointerDown)
    this.scene.input.off('pointermove', this.onPointerMove)
    this.scene.input.off('pointerup', this.onPointerUp)
    this.scene.input.off('pointerupoutside', this.onPointerUp)
    this.scene.input.off('wheel', this.onWheel)
    this.scene.scale.off('resize', this.onResize)
    this.scene.input.keyboard?.off('keydown', this.onKeyDown)
  }

  private bindKeys(): void {
    const keyboard = this.scene.input.keyboard
    if (!keyboard) return
    const code = Phaser.Input.Keyboard.KeyCodes
    this.keys = {
      left: keyboard.addKey(code.LEFT),
      right: keyboard.addKey(code.RIGHT),
      up: keyboard.addKey(code.UP),
      down: keyboard.addKey(code.DOWN),
      w: keyboard.addKey(code.W),
      a: keyboard.addKey(code.A),
      s: keyboard.addKey(code.S),
      d: keyboard.addKey(code.D),
    }
  }

  private panWithKeyboard(delta: number): void {
    if (!this.keys || typingInField()) return
    let x = 0
    let y = 0
    if (this.keys.left.isDown || this.keys.a.isDown) x -= 1
    if (this.keys.right.isDown || this.keys.d.isDown) x += 1
    if (this.keys.up.isDown || this.keys.w.isDown) y -= 1
    if (this.keys.down.isDown || this.keys.s.isDown) y += 1
    if (x === 0 && y === 0) return
    const step = (720 / this.camera.zoom) * (delta / 1000)
    this.camera.scrollX += x * step
    this.camera.scrollY += y * step
  }

  private readonly onPointerDown = (pointer: Phaser.Input.Pointer): void => {
    if (pointer.button !== 0) return
    this.pointers.set(pointer.id, { x: pointer.x, y: pointer.y })
    if (this.pointers.size >= 2) {
      this.dragging = false
      this.suppressClick = true
      this.pinchStart = { distance: this.pointerDistance(), zoom: this.camera.zoom }
      return
    }
    this.dragging = true
    this.suppressClick = false
    this.dragOrigin = { x: pointer.x, y: pointer.y }
    this.scrollOrigin = { x: this.camera.scrollX, y: this.camera.scrollY }
  }

  private readonly onPointerMove = (pointer: Phaser.Input.Pointer): void => {
    if (!this.pointers.has(pointer.id) || !pointer.isDown) {
      if (!pointer.isDown) this.dragging = false
      return
    }
    this.pointers.set(pointer.id, { x: pointer.x, y: pointer.y })
    if (this.pointers.size >= 2 && this.pinchStart && this.pinchStart.distance > 0) {
      const zoom = this.snapZoom(this.pinchStart.zoom * (this.pointerDistance() / this.pinchStart.distance))
      this.applyZoom(zoom)
      return
    }
    if (!this.dragging) return
    const dx = pointer.x - this.dragOrigin.x
    const dy = pointer.y - this.dragOrigin.y
    if (Math.hypot(dx, dy) > 5) this.suppressClick = true
    this.camera.scrollX = this.scrollOrigin.x - dx / this.camera.zoom
    this.camera.scrollY = this.scrollOrigin.y - dy / this.camera.zoom
  }

  private readonly onPointerUp = (pointer: Phaser.Input.Pointer): void => {
    this.pointers.delete(pointer.id)
    if (this.pointers.size < 2) this.pinchStart = null
    if (this.pointers.size > 0) return
    const shouldClick = this.dragging && !this.suppressClick
    this.dragging = false
    this.suppressClick = false
    this.emitNow()
    if (shouldClick) this.onClick(pointer)
  }

  private readonly onWheel = (
    pointer: Phaser.Input.Pointer,
    gameObjects: Phaser.GameObjects.GameObject[],
    deltaX: number,
    deltaY: number,
  ): void => {
    void gameObjects
    void deltaX
    pointer.event.preventDefault()
    this.wheelAccum += deltaY
    if (Math.abs(this.wheelAccum) < 40) return
    const direction = this.wheelAccum > 0 ? -0.5 : 0.5
    this.wheelAccum = 0
    const beforeX = this.camera.getWorldPoint(pointer.x, pointer.y).x
    const beforeY = this.camera.getWorldPoint(pointer.x, pointer.y).y
    this.camera.setZoom(this.snapZoom(this.camera.zoom + direction))
    const after = this.camera.getWorldPoint(pointer.x, pointer.y)
    this.camera.scrollX += beforeX - after.x
    this.camera.scrollY += beforeY - after.y
    this.emitNow()
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (typingInField()) return
    if (event.code.startsWith('Arrow')) event.preventDefault()
  }

  private readonly onResize = (): void => {
    this.emitNow()
  }

  private applyZoom(zoom: number): void {
    const next = this.snapZoom(zoom)
    if (next === this.camera.zoom) return
    const centerX = this.camera.worldView.centerX
    const centerY = this.camera.worldView.centerY
    this.camera.setZoom(next)
    this.camera.centerOn(centerX, centerY)
    this.emitNow()
  }

  private pointerDistance(): number {
    const points = [...this.pointers.values()]
    const first = points[0]
    const second = points[1]
    if (!first || !second) return 0
    return Math.hypot(first.x - second.x, first.y - second.y)
  }

  private snapZoom(zoom: number): number {
    return Phaser.Math.Clamp(Math.round(zoom * 2) / 2, MIN_ZOOM, MAX_ZOOM)
  }
}

type PanKeys = {
  left: Phaser.Input.Keyboard.Key
  right: Phaser.Input.Keyboard.Key
  up: Phaser.Input.Keyboard.Key
  down: Phaser.Input.Keyboard.Key
  w: Phaser.Input.Keyboard.Key
  a: Phaser.Input.Keyboard.Key
  s: Phaser.Input.Keyboard.Key
  d: Phaser.Input.Keyboard.Key
}

function typingInField(): boolean {
  const active = document.activeElement
  if (!(active instanceof HTMLElement)) return false
  return active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable
}
