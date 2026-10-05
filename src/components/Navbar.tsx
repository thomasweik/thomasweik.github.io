import { useState, type MouseEvent } from 'react'

interface NavbarProps {
  sections: { id: string; label: string }[]
  activeSection: string
  compact?: boolean
  linkedinHref?: string
  emailHref?: string
}

export function Navbar({ sections, activeSection, compact = false, linkedinHref, emailHref }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    setMenuOpen(false)
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-forest-line bg-forest-base/95 backdrop-blur-sm">
      <nav aria-label="Main navigation" className={`flex items-center justify-between gap-4 ${compact ? 'py-3' : 'py-4 md:py-5'}`}>
        <a href="#hero" onClick={(event) => handleNav(event, 'hero')} className="text-lg font-extrabold uppercase tracking-[0.16em] text-ink focus-visible:outline-2 focus-visible:outline-forest-accent md:text-xl">
          Thomas Weik
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(event) => handleNav(event, section.id)}
              aria-current={activeSection === section.id ? 'location' : undefined}
              className={`pressable border px-3 py-2 text-sm font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-forest-accent ${activeSection === section.id ? 'border-forest-accent bg-forest-accent text-forest-base' : 'border-transparent text-body hover:border-forest-line hover:text-ink'}`}
            >
              {section.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {linkedinHref && <a href={linkedinHref} target="_blank" rel="noreferrer" className="text-sm font-semibold text-body underline-offset-4 hover:text-ink hover:underline">LinkedIn ↗</a>}
          {emailHref && <a href={emailHref} className="border border-forest-line px-3 py-2 text-sm font-semibold text-ink hover:border-forest-accent">Email ↗</a>}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-menu"
          onClick={() => setMenuOpen((value) => !value)}
          className="pressable flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 border border-forest-line text-ink focus-visible:outline-2 focus-visible:outline-forest-accent lg:hidden"
        >
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
        </button>
      </nav>

      {menuOpen && (
        <nav id="mobile-site-menu" aria-label="Mobile navigation" className="grid border-t border-forest-line pb-3 lg:hidden">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(event) => handleNav(event, section.id)}
              aria-current={activeSection === section.id ? 'location' : undefined}
              className={`border-b border-forest-line/50 px-3 py-3 text-sm font-semibold uppercase tracking-[0.08em] ${activeSection === section.id ? 'bg-forest-accent text-forest-base' : 'text-ink'}`}
            >
              {section.label}
            </a>
          ))}
          <div className="flex gap-4 px-3 pt-4 text-sm font-semibold text-ink">
            {linkedinHref && <a href={linkedinHref} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
            {emailHref && <a href={emailHref}>Email ↗</a>}
          </div>
        </nav>
      )}
    </header>
  )
}
