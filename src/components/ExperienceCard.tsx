import { ResponsiveImage } from './ResponsiveImage'
import { useEffect, useRef, useState } from 'react'
import type { ExperienceItem } from '../data/profile'
import { Card } from './Card'

interface ExperienceCardProps {
  item: ExperienceItem
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [canExpand, setCanExpand] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return
    const checkOverflow = () => setCanExpand(content.scrollHeight > 190)
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [])

  return (
    <Card className="reveal reveal-card space-y-4  hover:shadow-lift" data-animate>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-2xl font-bold leading-tight text-ink">{item.role}</h3>
        </div>
        <div className="flex items-center md:pt-1">
          {item.image ? (
            <ResponsiveImage
              src={item.image}
              alt={item.imageAlt ?? `${item.company} logo`}
              className="h-16 w-16 rounded-2xl border border-forest-line object-cover shadow-sm"
              loading="lazy"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-forest-line bg-forest-surface text-[11px] font-semibold uppercase tracking-wide text-body">
              Image
            </div>
          )}
        </div>
      </div>
      <div
        ref={contentRef}
        className={`relative overflow-hidden transition-[max-height] duration-300 ease-out ${
          expanded ? 'max-h-[1000px]' : 'max-h-[190px]'
        }`}
      >
        <div>
          {item.companyUrl ? (
            <a
              href={item.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex text-xl font-semibold text-sky-700 transition-colors hover:text-forest-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
            >
              {item.company}
            </a>
          ) : (
            <p className="mt-1 text-xl font-semibold text-sky-700">{item.company}</p>
          )}
          <p className="text-base text-body">
            {item.location} · {item.type}
          </p>
          <p className="text-base font-semibold text-body">{item.dates}</p>
        </div>
        <ul className="mt-2.5 list-disc space-y-1.5 pl-6 text-base leading-relaxed text-body">
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        {item.gallery && item.gallery.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {item.gallery.map((photo) => (
              <div
                key={photo.src}
                className="h-24 overflow-hidden rounded-2xl border border-forest-line/70 bg-forest-raised"
              >
                <ResponsiveImage
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : null}
        {!expanded && canExpand ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-forest-surface to-transparent"
          />
        ) : null}
      </div>
      {canExpand ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="pressable inline-flex rounded-full border border-sky-200 bg-forest-surface px-4 py-2 text-sm font-bold text-sky-700 transition-all hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          aria-expanded={expanded}
        >
          {expanded ? 'View Less' : 'View More'}
        </button>
      ) : null}
    </Card>
  )
}
