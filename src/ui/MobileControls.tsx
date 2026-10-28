import { gameBridge } from '../game/bridge.ts'

type MobileControlsProps = {
  panelOpen: boolean
}

export function MobileControls({ panelOpen }: MobileControlsProps) {
  return (
    <div
      className={`pointer-events-auto absolute top-1/2 right-3 flex -translate-y-1/2 flex-col gap-2 ${
        panelOpen ? 'max-md:top-auto max-md:bottom-44 max-md:translate-y-0 md:right-[21.5rem]' : ''
      }`}
    >
      <button
        type="button"
        aria-label="Zoom in"
        className="h-10 w-10 border-2 border-ink bg-cream text-lg font-bold text-ink shadow-[2px_2px_0_#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
        onClick={() => gameBridge.zoomBy(0.5)}
      >
        +
      </button>
      <button
        type="button"
        aria-label="Zoom out"
        className="h-10 w-10 border-2 border-ink bg-cream text-lg font-bold text-ink shadow-[2px_2px_0_#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
        onClick={() => gameBridge.zoomBy(-0.5)}
      >
        −
      </button>
    </div>
  )
}
