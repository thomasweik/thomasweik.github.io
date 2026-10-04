import type { MouseEvent } from 'react'

interface NavbarProps {
  sections: { id: string; label: string }[]
  activeSection: string
  compact?: boolean
  linkedinHref?: string
  emailHref?: string
}

export function Navbar({
  sections,
  activeSection,
  compact = false,
  linkedinHref,
  emailHref
}: NavbarProps) {
  const handleNav = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const target = document.getElementById(id)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="sticky top-3 z-50 xl:top-5">
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 rounded-full border border-white/70 transition-all duration-500 ease-out xl:gap-6 ${
          compact
            ? 'bg-white/95 px-4 py-3 shadow-lift xl:bg-white/85 xl:backdrop-blur-xl xl:px-8'
            : 'bg-white/95 px-4 py-3 shadow-soft xl:bg-white/75 xl:backdrop-blur-md xl:px-12 xl:py-5'
        }`}
      >
        <span className={`text-xl font-bold text-ink transition-all duration-500 ease-out ${compact ? 'xl:text-3xl' : 'xl:text-4xl'}`}>
          Portfolio
        </span>
        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 xl:flex">
            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleNav(event, section.id)}
                    className={`pressable rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 ${
                      compact ? 'px-3 py-1.5 text-xl' : 'px-4 py-2 text-2xl'
                    } ${
                      isActive ? 'bg-sky-100/80 text-sky-700' : 'text-body hover:bg-white/60 hover:text-ink'
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {linkedinHref ? (
            <a
              href={linkedinHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Open LinkedIn profile"
              className="pressable inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/70 text-body transition-all hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A1.96 1.96 0 1 0 5.3 6.92 1.96 1.96 0 0 0 5.25 3zM20.43 13.4c0-3.35-1.78-4.9-4.15-4.9-1.91 0-2.76 1.05-3.24 1.79V8.5H9.66V20h3.38v-5.69c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.71 1.86 3.05V20h3.39v-6.6z" />
              </svg>
            </a>
          ) : null}

          {emailHref ? (
            <a
              href={emailHref}
              aria-label="Send email"
              className="pressable inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/70 text-body transition-all hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75zm2.09-.25L12 11.23 18.91 6.5H5.09zM19 8.21l-6.44 4.4a1 1 0 0 1-1.12 0L5 8.21v9.04c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75V8.21z" />
              </svg>
            </a>
          ) : null}
        </div>
      </nav>
      <nav aria-label="Mobile section navigation" className="mt-2 xl:hidden">
        <div className="flex gap-2 overflow-x-auto rounded-3xl border border-white/70 bg-white/95 p-2 shadow-soft">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) => handleNav(event, section.id)}
                className={`pressable inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 ${
                  isActive ? 'bg-sky-100 text-sky-700' : 'bg-white/60 text-body'
                }`}
              >
                {section.label}
              </a>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
