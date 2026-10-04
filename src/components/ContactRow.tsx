interface ContactRowProps {
  label: string
  value: string
  href: string
}

const colorMap: Record<string, string> = {
  Email: 'bg-sky-500',
  Phone: 'bg-[#12233a]',
  LinkedIn: 'bg-sky-700'
}

export function ContactRow({ label, value, href }: ContactRowProps) {
  return (
    <a
      href={href}
      target={label === 'LinkedIn' ? '_blank' : undefined}
      rel={label === 'LinkedIn' ? 'noreferrer' : undefined}
      className="pressable group flex items-center gap-3 rounded-3xl border border-white/60 bg-white px-4 py-4 transition-all hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 md:gap-5"
      aria-label={`${label}: ${value}`}
    >
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/90 shadow-inner md:h-14 md:w-14">
        <span className={`h-7 w-7 rounded-lg ${colorMap[label]}`} aria-hidden="true" />
      </span>
      <span className="min-w-0 break-words text-base font-bold text-ink group-hover:text-sky-700 md:text-2xl">{value}</span>
    </a>
  )
}
