import { useId } from 'react'
import type { InteractiveContent } from '../types/content.ts'

type InfoPanelProps = {
  content: InteractiveContent | null
  pending: boolean
  onClose: () => void
}

export function InfoPanel({ content, pending, onClose }: InfoPanelProps) {
  const titleId = useId()
  const title = content?.title ?? (pending ? 'Loading' : 'Unknown spot')
  const description = pending
    ? 'Fetching this spot…'
    : (content?.description ?? 'Nothing is written here yet.')

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 max-h-[46%] overflow-auto border-t-2 border-ink bg-cream p-4 md:inset-x-auto md:top-3 md:right-3 md:bottom-auto md:w-80 md:max-h-[calc(100%-1.5rem)] md:border-2 md:shadow-[4px_4px_0_#0a0a0a]"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id={titleId} className="font-display text-base font-bold text-ink">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="shrink-0 border-2 border-ink bg-cream px-2 py-1 text-xs font-semibold text-ink shadow-[2px_2px_0_#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
        >
          Close
        </button>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink">{description}</p>
      {content?.action ? (
        <a
          className="mt-4 inline-flex border-2 border-ink bg-ink px-3 py-1.5 text-sm font-semibold text-cream shadow-[4px_4px_0_#0a0a0a] hover:bg-sun hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
          href={content.action.href}
          target="_blank"
          rel="noreferrer"
        >
          {content.action.label}
        </a>
      ) : null}
    </aside>
  )
}
