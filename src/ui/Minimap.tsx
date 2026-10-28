import { useEffect, useRef, useState } from 'react'
import { gameBridge, type CameraView } from '../game/bridge.ts'
import { rectCenterPx, TILE, worldPixelHeight, worldPixelWidth, zones } from '../game/world/layout.ts'
import type { ZoneId } from '../types/world.ts'

const shortNames: Record<ZoneId, string> = {
  plaza: 'Home',
  events: 'Meetups',
  lab: 'College',
  hub: 'Community',
  quest: 'Engineer',
}

type MinimapProps = {
  zoneId: string | null
  onFocus: (x: number, y: number) => void
}

export function Minimap({ zoneId, onFocus }: MinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [camera, setCamera] = useState<CameraView | null>(null)

  useEffect(() => gameBridge.on('cameraMoved', setCamera), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    paintMinimap(context, canvas.width, canvas.height, camera, zoneId)
  }, [camera, zoneId])

  return (
    <div className="pointer-events-auto absolute bottom-3 left-3">
      <canvas
        ref={canvasRef}
        width={200}
        height={150}
        aria-label="World minimap"
        className="h-auto w-[140px] cursor-crosshair border-2 border-ink bg-cream shadow-[3px_3px_0_#0a0a0a] sm:w-[200px]"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          const x = ((event.clientX - rect.left) / rect.width) * worldPixelWidth
          const y = ((event.clientY - rect.top) / rect.height) * worldPixelHeight
          onFocus(x, y)
        }}
      />
      <nav aria-label="Zones" className="mt-1 grid w-[140px] grid-cols-3 gap-1 sm:w-[200px]">
        {zones.map((zone) => {
          const current = zone.id === zoneId
          return (
            <button
              key={zone.id}
              type="button"
              aria-current={current ? 'location' : undefined}
              className={`border-2 border-ink px-0.5 py-1 text-[10px] leading-tight font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink ${
                current ? 'bg-ink text-cream shadow-[2px_2px_0_#0a0a0a]' : 'bg-cream text-ink'
              }`}
              onClick={() => {
                const center = rectCenterPx(zone.x, zone.y, zone.w, zone.h)
                onFocus(center.x, center.y)
              }}
            >
              {shortNames[zone.id]}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

function paintMinimap(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  camera: CameraView | null,
  zoneId: string | null,
): void {
  const scaleX = width / worldPixelWidth
  const scaleY = height / worldPixelHeight
  context.imageSmoothingEnabled = false
  context.fillStyle = '#f3e2a4'
  context.fillRect(0, 0, width, height)
  for (const zone of zones) {
    context.fillStyle = zone.id === zoneId ? zone.accent : '#feeed3'
    context.fillRect(zone.x * TILE * scaleX, zone.y * TILE * scaleY, zone.w * TILE * scaleX, zone.h * TILE * scaleY)
  }
  if (!camera) return
  // scrollX is the camera's internal offset. The visible world rect is centered on centerX.
  const viewX = camera.centerX - camera.width / 2
  const viewY = camera.centerY - camera.height / 2
  context.strokeStyle = '#0a0a0a'
  context.lineWidth = 1
  context.strokeRect(viewX * scaleX, viewY * scaleY, camera.width * scaleX, camera.height * scaleY)
}
