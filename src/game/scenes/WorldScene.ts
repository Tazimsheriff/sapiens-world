import Phaser from 'phaser'
import { gameBridge } from '../bridge.ts'
import { CameraController } from '../camera/CameraController.ts'
import type { BehaviorController } from '../characters/BehaviorController.ts'
import { spawnCharacters } from '../characters/spawnCharacters.ts'
import { spawnInteractives } from '../objects/spawnInteractives.ts'
import { buildGround } from '../world/buildMap.ts'
import { rectCenterPx, worldPixelHeight, worldPixelWidth, zoneById } from '../world/layout.ts'
import { spawnDecor } from '../world/spawnDecor.ts'
import { validateWorld } from '../world/validateWorld.ts'

export class WorldScene extends Phaser.Scene {
  private cameraController: CameraController | null = null
  private controllers: BehaviorController[] = []
  private marker: Phaser.GameObjects.Graphics | null = null
  private readonly imagesByContent = new Map<string, Phaser.GameObjects.Image>()

  constructor() {
    super('world')
  }

  create(): void {
    try {
      this.build()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not build the world'
      gameBridge.emit('error', { message })
    }
  }

  update(time: number, delta: number): void {
    for (const controller of this.controllers) controller.update(time, this.cameras.main)
    this.cameraController?.update(delta)
    const context = this.game.canvas.getContext('2d')
    if (context) context.imageSmoothingEnabled = false
  }

  private build(): void {
    validateWorld()
    const ground = buildGround(this)
    ground.setDepth(0)
    const obstacles = this.physics.add.staticGroup()
    spawnDecor(this, obstacles)
    spawnInteractives(this, obstacles, this.imagesByContent)
    this.controllers = spawnCharacters(this)
    this.physics.add.collider(
      this.controllers.map((controller) => controller.character),
      obstacles,
    )
    this.physics.world.setBounds(0, 0, worldPixelWidth, worldPixelHeight)
    this.marker = this.add.graphics().setDepth(20000)
    const plaza = zoneById('plaza')
    if (!plaza) throw new Error('Central Plaza is missing')
    const center = rectCenterPx(plaza.x, plaza.y, plaza.w, plaza.h)
    const camera = new CameraController(this, (pointer) => this.handleClick(pointer))
    this.cameraController = camera
    camera.attach(center.x, center.y)
    gameBridge.setCommands({
      focusOn: (target) => camera.focusOn(target),
      selectObject: (contentId) => this.selectContent(contentId, false),
      clearSelection: () => this.clearSelection(false),
      zoomBy: (delta) => camera.zoomBy(delta),
    })
    this.events.once('shutdown', () => {
      camera.destroy()
      gameBridge.setCommands(null)
    })
    gameBridge.emit('ready', undefined)
  }

  private handleClick(pointer: Phaser.Input.Pointer): void {
    const hits = this.input.hitTestPointer(pointer)
    for (const hit of hits) {
      const contentId = hit.getData('contentId')
      if (typeof contentId === 'string') {
        this.selectContent(contentId, true)
        return
      }
    }
    this.clearSelection(true)
  }

  private selectContent(contentId: string, emit: boolean): void {
    const image = this.imagesByContent.get(contentId)
    if (!image) return
    this.showMarker(image)
    if (emit) gameBridge.emit('objectSelected', { contentId })
  }

  private clearSelection(emit: boolean): void {
    this.marker?.clear()
    this.marker?.setVisible(false)
    if (emit) gameBridge.emit('selectionCleared', undefined)
  }

  private showMarker(image: Phaser.GameObjects.Image): void {
    const marker = this.marker
    if (!marker) return
    const bounds = image.getBounds()
    marker.clear()
    marker.lineStyle(2, 0xf3efe4, 1)
    marker.strokeRect(bounds.x - 3, bounds.y - 3, bounds.width + 6, bounds.height + 6)
    marker.setVisible(true)
  }
}
