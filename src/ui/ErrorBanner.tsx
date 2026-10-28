type ErrorBannerProps = {
  message: string
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div role="alert" className="absolute top-3 right-3 left-3 z-40 border-2 border-ink bg-sun p-3 text-sm text-ink shadow-[4px_4px_0_#0a0a0a]">
      <p>{message}</p>
      <button
        type="button"
        className="mt-2 font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    </div>
  )
}
