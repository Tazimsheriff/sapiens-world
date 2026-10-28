export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-cream/80">
      <p className="border-2 border-ink bg-sun px-3 py-2 text-sm font-semibold text-ink shadow-[4px_4px_0_#0a0a0a]">
        Drawing the grounds…
      </p>
    </div>
  )
}
