import { ResponsiveImage } from './ResponsiveImage'
import { useState } from 'react'
import type { ExperienceItem } from '../data/profile'
import { Card } from './Card'

export interface ExperienceGroup {
  id: string
  label: string
  items: ExperienceItem[]
}

interface ExperienceStackProps {
  groups: ExperienceGroup[]
}

function ExperienceRole({ item, isLast }: { item: ExperienceItem; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const hasDetails = item.bullets.length > 0 || Boolean(item.gallery?.length)

  return (
    <article className="relative pl-0 md:pl-8">
      <div
        aria-hidden="true"
        className={`absolute left-[10px] top-2 h-full w-px bg-sky-100 ${isLast ? 'hidden' : ''} hidden md:block`}
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 hidden h-5 w-5 rounded-full border-4 border-white bg-sky-500 shadow-sm md:inline-flex"
      />
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-soft">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="pressable flex w-full flex-col gap-3 p-4 text-left transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:gap-4 md:p-5"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
            <div className="space-y-1">
              <h4 className="text-xl font-bold leading-tight text-ink md:text-2xl">{item.role}</h4>
              <p className="text-lg font-semibold text-sky-700 md:text-xl">{item.company}</p>
              <p className="text-sm text-body md:text-base">
                {item.location} · {item.type}
              </p>
              <p className="text-sm font-semibold text-body md:text-base">{item.dates}</p>
            </div>

            <div
              className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm transition-all duration-300 ${
                expanded ? 'h-32 w-full md:h-44 md:w-52' : 'h-24 w-full md:h-16 md:w-16'
              }`}
            >
              {item.image ? (
                <ResponsiveImage
                  src={item.image}
                  alt={item.imageAlt ?? `${item.company} logo`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Image
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-body/70 md:text-sm">
                {expanded ? 'Click to collapse' : 'Click to expand'}
              </p>
              <span
                aria-hidden="true"
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-700 transition-transform duration-300 ${
                  expanded ? 'rotate-180' : ''
                }`}
                >
                  ▾
                </span>
          </div>
          </button>

          <div
            className={`grid transition-all duration-300 ease-out ${
              expanded ? 'grid-rows-[1fr] px-4 pb-4 md:px-5 md:pb-5' : 'grid-rows-[0fr] px-4 pb-0 md:px-5'
            }`}
          >
            <div className="overflow-hidden">
              {hasDetails ? (
                <div className="space-y-4 pt-4">
                  {item.bullets.length > 0 ? (
                    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-body md:pl-6 md:text-base">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
      </div>
    </article>
  )
}

export function ExperienceStack({ groups }: ExperienceStackProps) {
  return (
    <div className="space-y-6 md:space-y-8">
      {groups.map((group) => {
        const firstItem = group.items[0]
        return (
          <Card key={group.id} className="space-y-4 md:space-y-5">
            <div className="flex flex-col gap-3 border-b border-line/70 pb-4 md:flex-row md:items-start md:justify-between md:gap-4 md:pb-5">
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-body/70 md:text-sm">
                  Company
                </p>
                <h3 className="text-2xl font-bold text-ink md:text-3xl">{group.label}</h3>
                {firstItem?.companyUrl ? (
                  <a
                    href={firstItem.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm font-semibold text-sky-700 transition-colors hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 md:text-base"
                  >
                    Visit company site
                  </a>
                ) : null}
              </div>
            </div>

            <div className="space-y-4">
              {group.items.map((item, index) => (
                <ExperienceRole
                  key={`${item.company}-${item.role}-${item.dates}`}
                  item={item}
                  isLast={index === group.items.length - 1}
                />
              ))}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
