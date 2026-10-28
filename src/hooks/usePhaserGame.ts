import { useEffect, useState, type RefObject } from 'react'
import Phaser from 'phaser'
import { gameBridge } from '../game/bridge.ts'
import { createGameConfig } from '../game/config.ts'

type GameStatus = 'loading' | 'ready' | 'error'

export function usePhaserGame(hostRef: RefObject<HTMLDivElement | null>): {
  status: GameStatus
  error: string | null
} {
  const [status, setStatus] = useState<GameStatus>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const unsubscribe = [
      gameBridge.on('ready', () => setStatus('ready')),
      gameBridge.on('error', (event) => {
        setStatus('error')
        setError(event.message)
      }),
    ]

    // Strict Mode mounts twice in development. Create the game after the
    // listeners exist, and destroy it synchronously so the remount starts clean.
    const game = new Phaser.Game(createGameConfig(host))

    return () => {
      for (const off of unsubscribe) off()
      game.destroy(true)
      gameBridge.reset()
    }
  }, [hostRef])

  return { status, error }
}
