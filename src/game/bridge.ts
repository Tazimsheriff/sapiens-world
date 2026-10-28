export type CameraView = {
  scrollX: number
  scrollY: number
  width: number
  height: number
  zoom: number
  centerX: number
  centerY: number
}

export type FocusTarget = {
  x: number
  y: number
  zoom?: number
}

export type WorldEventMap = {
  ready: undefined
  error: { message: string }
  objectSelected: { contentId: string }
  selectionCleared: undefined
  cameraMoved: CameraView
  zoneChanged: { zoneId: string }
}

type EventKey = keyof WorldEventMap
type Handler<K extends EventKey> = (payload: WorldEventMap[K]) => void

type Commands = {
  focusOn: (target: FocusTarget) => void
  selectObject: (contentId: string) => void
  clearSelection: () => void
  zoomBy: (delta: number) => void
}

class GameBridge {
  private readonly listeners = new Map<EventKey, Set<(payload: never) => void>>()
  private commands: Commands | null = null

  on<K extends EventKey>(event: K, handler: Handler<K>): () => void {
    let bucket = this.listeners.get(event)
    if (!bucket) {
      bucket = new Set()
      this.listeners.set(event, bucket)
    }
    const wrapped = handler as (payload: never) => void
    bucket.add(wrapped)
    return () => bucket.delete(wrapped)
  }

  emit<K extends EventKey>(event: K, payload: WorldEventMap[K]): void {
    const bucket = this.listeners.get(event)
    if (!bucket) return
    for (const handler of bucket) (handler as Handler<K>)(payload)
  }

  setCommands(commands: Commands | null): void {
    this.commands = commands
  }

  focusOn(target: FocusTarget): void {
    this.commands?.focusOn(target)
  }

  selectObject(contentId: string): void {
    this.commands?.selectObject(contentId)
  }

  clearSelection(): void {
    this.commands?.clearSelection()
  }

  zoomBy(delta: number): void {
    this.commands?.zoomBy(delta)
  }

  reset(): void {
    for (const bucket of this.listeners.values()) bucket.clear()
    this.listeners.clear()
    this.commands = null
  }
}

export const gameBridge = new GameBridge()
