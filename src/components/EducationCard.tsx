import type { EducationItem } from '../data/profile'
import { Card } from './Card'
import { Chip } from './Chip'
import { useState } from 'react'

interface EducationCardProps {
  education: EducationItem
  coursework: string[]
}

export function EducationCard({ education, coursework }: EducationCardProps) {
  const [courseworkOpen, setCourseworkOpen] = useState(false)
  const extraCourseworkId = 'extra-coursework'
  return (
    <Card className="h-full space-y-4 md:space-y-5">
      <h3 className="text-2xl font-bold text-ink md:text-4xl">{education.degree}</h3>
      <div className="space-y-1">
        <p className="text-xl font-semibold text-sky-700 md:text-3xl">{education.school}</p>
        <p className="text-base text-body md:text-xl">{education.location}</p>
        <p className="text-base font-semibold text-body md:text-xl">{education.dates}</p>
        <p className="text-base text-body md:text-xl">Minor: {education.minor}</p>
      </div>

      <div>
        <h4 className="text-sm font-bold uppercase tracking-[0.24em] text-body/70">Highlights</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-body md:text-lg">
          {education.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-bold uppercase tracking-[0.24em] text-body/70">Activities</h4>
        <div className="mt-3 flex flex-wrap gap-1.5 md:gap-2">
          {education.activities.map((item) => (
            <Chip key={item} label={item} />
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <h4 className="text-sm font-bold uppercase tracking-[0.24em] text-body/70">Relevant Coursework</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {coursework.map((course) => (
            <Chip key={course} label={course} />
          ))}
        </div>
      </div>
      <div className="border-t border-forest-line/60 pt-3 md:hidden">
        <button
          type="button"
          aria-expanded={courseworkOpen}
          aria-controls={extraCourseworkId}
          onClick={() => setCourseworkOpen((open) => !open)}
          className="flex min-h-11 w-full items-center justify-between gap-3 text-left text-sm font-bold text-ink focus-visible:outline-2 focus-visible:outline-forest-accent"
        >
          <span>Relevant Coursework</span>
          <span className="shrink-0 text-xs font-semibold text-forest-accent">
            {courseworkOpen ? 'Hide courses' : `See all ${coursework.length}`}
          </span>
        </button>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {coursework.slice(0, 2).map((course) => <Chip key={course} label={course} compact />)}
        </div>
        <div
          id={extraCourseworkId}
          aria-hidden={!courseworkOpen}
          className={`relative mt-1 overflow-hidden transition-[max-height] duration-500 ease-in-out ${courseworkOpen ? 'max-h-[40rem]' : 'max-h-16'}`}
        >
          <div className="flex flex-wrap gap-1.5 py-1">
            {coursework.slice(2).map((course) => <Chip key={course} label={course} compact />)}
          </div>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-forest-base transition-opacity duration-300 ${courseworkOpen ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>
      </div>
    </Card>
  )
}
