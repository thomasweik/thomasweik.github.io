interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
  asButton?: boolean
  compact?: boolean
}

export function Chip({ label, active = false, onClick, asButton = false, compact = false }: ChipProps) {
  const base =
    `inline-flex items-center rounded-full border border-white/70 ${
      compact ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base'
    } font-semibold text-body shadow-[inset_0_1px_0_rgba(255,255,255,.7)] transition-all duration-200`
  const interactive =
    'pressable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 hover:-translate-y-0.5 hover:shadow-md hover:bg-sky-50'
  const activeClass = active ? 'bg-[#12233a] text-white border-transparent shadow-none' : 'bg-white/45'

  if (asButton) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${base} ${interactive} ${activeClass} shrink-0 whitespace-nowrap`}
      >
        {label}
      </button>
    )
  }

  return <span className={`${base} ${activeClass}`}>{label}</span>
}
