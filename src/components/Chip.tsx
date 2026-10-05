interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
  asButton?: boolean
  compact?: boolean
}

export function Chip({ label, active = false, onClick, asButton = false, compact = false }: ChipProps) {
  const base =
    `inline-flex items-center border border-forest-line/75 ${
      compact ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base'
    } font-semibold text-body transition-colors duration-200`
  const interactive =
    'pressable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 hover:border-forest-accent hover:bg-forest-raised'
  const activeClass = active ? 'bg-forest-accent text-forest-base border-forest-accent' : 'bg-transparent'

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

  return <span className={`mr-3 inline-block ${compact ? 'text-sm' : 'text-base'} font-medium leading-relaxed text-body`}>{label}</span>
}
