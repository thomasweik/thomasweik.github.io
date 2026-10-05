interface ContactRowProps {
  label: string
  value: string
  href: string
}

function ContactIcon({ label }: { label: string }) {
  if (label === 'LinkedIn') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" role="img">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#0A66C2" />
        <path fill="#fff" d="M7 9h2.4v8H7zm1.2-1.1a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8M11 9h2.3v1.1h.03a2.55 2.55 0 0 1 2.3-1.27c2.46 0 2.92 1.62 2.92 3.73V17h-2.4v-3.94c0-.94-.02-2.15-1.31-2.15-1.31 0-1.51 1.02-1.51 2.08V17H11z" />
      </svg>
    )
  }

  if (label === 'Phone') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3.8h2.6l1.2 4-1.8 1.6a14.2 14.2 0 0 0 5.6 5.6l1.6-1.8 4 1.2V17c0 1.3-1 2.3-2.3 2.3A14.9 14.9 0 0 1 4.7 6.1C4.7 4.8 5.7 3.8 7 3.8Z" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export function ContactRow({ label, value, href }: ContactRowProps) {
  return (
    <a
      href={href}
      target={label === 'LinkedIn' ? '_blank' : undefined}
      rel={label === 'LinkedIn' ? 'noreferrer' : undefined}
      className="pressable group flex flex-col gap-1 border-b border-forest-line/60 py-4 transition-colors hover:text-forest-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:flex-row md:items-baseline md:gap-8"
      aria-label={`${label}: ${value}`}
    >
      <span className="inline-flex w-auto min-w-24 shrink-0 items-center gap-2 whitespace-nowrap text-xs font-bold uppercase tracking-[0.16em] text-forest-accent">
        <ContactIcon label={label} />
        {label}{label === 'Phone' ? <span aria-hidden="true" className="text-[0.9em] opacity-70">↗</span> : null}
      </span>
      <span className="min-w-0 break-words text-base font-bold text-ink group-hover:text-forest-accent md:text-2xl">{value}</span>
    </a>
  )
}
