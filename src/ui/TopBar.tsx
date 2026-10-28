import { useEffect, useId, useState } from 'react'
import { contentService } from '../services/contentService.ts'
import type { SearchResult } from '../types/content.ts'

type TopBarProps = {
  zoneName: string | null
  onSelect: (result: SearchResult) => void
}

export function TopBar({ zoneName, onSelect }: TopBarProps) {
  const inputId = useId()
  const [query, setQuery] = useState('')
  const [searchState, setSearchState] = useState<{ query: string; results: SearchResult[] } | null>(null)
  const [open, setOpen] = useState(false)
  const trimmed = query.trim()

  useEffect(() => {
    if (!trimmed) {
      setSearchState(null)
      return
    }
    let cancelled = false
    void contentService.search(trimmed).then((results) => {
      if (!cancelled) setSearchState({ query: trimmed, results })
    })
    return () => {
      cancelled = true
    }
  }, [trimmed])

  const visibleResults = searchState?.query === trimmed ? searchState.results : []
  const searchReady = searchState?.query === trimmed

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b-2 border-ink bg-sun px-3">
      <div className="flex min-w-0 items-center gap-2">
        <Logo />
        <div className="min-w-0 leading-tight">
          <p className="truncate font-display text-sm font-bold tracking-tight text-ink">CodeSapiens</p>
          <p className="truncate text-[11px] font-semibold text-ink/70">{zoneName ?? 'Home'}</p>
        </div>
      </div>
      <p className="hidden items-center gap-2 lg:flex" aria-hidden="true">
        <span className="border-2 border-ink bg-mint px-1.5 py-0.5 text-xs font-semibold shadow-[2px_2px_0_#0a0a0a]">Explore.</span>
        <span className="border-2 border-ink bg-sky px-1.5 py-0.5 text-xs font-semibold shadow-[2px_2px_0_#0a0a0a]">Evelve.</span>
        <span className="border-2 border-ink bg-sun px-1.5 py-0.5 text-xs font-semibold shadow-[2px_2px_0_#0a0a0a]">Engineer.</span>
      </p>
      <form
        className="relative ml-auto w-full max-w-xs"
        role="search"
        onSubmit={(event) => {
          event.preventDefault()
          const first = visibleResults[0]
          if (!first) return
          onSelect(first)
          setOpen(false)
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          Search the campus
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          placeholder="Search meetups, community, places"
          autoComplete="off"
          className="w-full border-2 border-ink bg-cream px-3 py-1.5 text-sm text-ink shadow-[2px_2px_0_#0a0a0a] outline-none placeholder:text-ink/50"
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false)
          }}
        />
        {open && trimmed && searchReady ? (
          <ul className="absolute top-full z-20 mt-2 max-h-64 w-full overflow-auto border-2 border-ink bg-cream shadow-[4px_4px_0_#0a0a0a]">
            {visibleResults.length === 0 ? (
              <li className="px-3 py-2 text-sm text-ink/70">No matches</li>
            ) : (
              visibleResults.map((result) => (
                <li key={`${result.kind}-${result.id}`}>
                  <button
                    type="button"
                    className="flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-sm text-ink hover:bg-sun focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
                    onMouseDown={(event) => {
                      event.preventDefault()
                      onSelect(result)
                      setOpen(false)
                    }}
                  >
                    <span>{result.title}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-ink/50">{result.kind}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        ) : null}
      </form>
    </header>
  )
}

function Logo() {
  return (
    <img
      src="/mark.png"
      alt=""
      width={28}
      height={28}
      className="border-2 border-ink bg-cream shadow-[2px_2px_0_#0a0a0a]"
    />
  )
}
