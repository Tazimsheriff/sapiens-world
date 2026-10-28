import { useEffect, useRef, useState } from 'react'
import { gameBridge } from '../game/bridge.ts'
import { zones } from '../game/world/layout.ts'
import { usePhaserGame } from '../hooks/usePhaserGame.ts'
import { contentService } from '../services/contentService.ts'
import type { InteractiveContent, SearchResult } from '../types/content.ts'
import { ErrorBanner } from './ErrorBanner.tsx'
import { InfoPanel } from './InfoPanel.tsx'
import { LoadingOverlay } from './LoadingOverlay.tsx'
import { Minimap } from './Minimap.tsx'
import { MobileControls } from './MobileControls.tsx'
import { TopBar } from './TopBar.tsx'

type PanelState = {
  id: string
  content: InteractiveContent | null
  pending: boolean
}

export function WorldExplorer() {
  const hostRef = useRef<HTMLDivElement>(null)
  const { status, error } = usePhaserGame(hostRef)
  const [zoneId, setZoneId] = useState<string | null>('plaza')
  const [panel, setPanel] = useState<PanelState | null>(null)

  useEffect(() => gameBridge.on('zoneChanged', (event) => setZoneId(event.zoneId)), [])
  useEffect(() => gameBridge.on('objectSelected', (event) => showContent(event.contentId)), [])
  useEffect(() => gameBridge.on('selectionCleared', () => setPanel(null)), [])

  useEffect(() => {
    if (!panel) return
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      if (typingInField()) return
      setPanel(null)
      gameBridge.clearSelection()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [panel])

  function showContent(id: string) {
    setPanel({ id, content: null, pending: true })
    void contentService.getById(id).then((content) => {
      setPanel((current) => (current?.id === id ? { id, content, pending: false } : current))
    })
  }

  function selectSearchResult(result: SearchResult) {
    gameBridge.focusOn({ x: result.x, y: result.y })
    if (result.contentId) {
      showContent(result.contentId)
      gameBridge.selectObject(result.contentId)
      return
    }
    setPanel(null)
    gameBridge.clearSelection()
  }

  function closePanel() {
    setPanel(null)
    gameBridge.clearSelection()
  }

  const zoneName = zones.find((zone) => zone.id === zoneId)?.name ?? null

  return (
    <div className="flex h-full min-h-0 flex-col">
      <TopBar zoneName={zoneName} onSelect={selectSearchResult} />
      <div className="relative min-h-0 flex-1">
        <div ref={hostRef} className="world-host absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 z-10">
          <Minimap zoneId={zoneId} onFocus={(x, y) => gameBridge.focusOn({ x, y })} />
          <MobileControls panelOpen={panel !== null} />
          {panel ? <InfoPanel content={panel.content} pending={panel.pending} onClose={closePanel} /> : null}
        </div>
        {status === 'loading' ? <LoadingOverlay /> : null}
        {status === 'error' ? <ErrorBanner message={error ?? 'The world failed to start'} /> : null}
      </div>
    </div>
  )
}

function typingInField(): boolean {
  const active = document.activeElement
  if (!(active instanceof HTMLElement)) return false
  return active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable
}
