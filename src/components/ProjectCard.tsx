import type { ProjectItem } from '../data/profile'
import { Card } from './Card'
import { Chip } from './Chip'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  const coverSizeClass = project.coverFit === 'contain' ? 'h-44 md:h-40' : 'h-36 md:h-32'

  return (
    <Card className="flex h-full flex-col space-y-0.5 p-4 md:p-5 hover:-translate-y-1 hover:shadow-lift">
      {project.coverImage ? (
        <div className={`${coverSizeClass} overflow-hidden rounded-3xl border border-white/70 bg-white`}>
          <img
            src={project.coverImage}
            alt={project.coverAlt ?? `${project.title} cover`}
            className={`h-full w-full ${
              project.coverFit === 'contain' ? 'object-contain' : 'object-cover'
            } ${project.coverPosition ?? 'object-center'}`}
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className={`h-36 rounded-3xl border border-white/70 bg-gradient-to-br md:h-32 ${project.visual}`}
          aria-hidden="true"
        />
      )}
      <div className="mt-3 space-y-2 md:mt-3.5">
        <p className="text-sm font-semibold text-body md:text-base">{project.categories.join(' · ')}</p>
        <h3 className="text-xl font-bold leading-tight text-ink md:text-2xl">{project.title}</h3>
        <p className="text-sm font-semibold text-sky-700 md:text-base">{project.role}</p>
        <p className="text-sm text-body md:text-base">
          {project.organization} · {project.cardDates ?? project.dates}
        </p>
        {project.status ? (
          <p className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-amber-800">
            {project.status}
          </p>
        ) : null}
        <p className="text-sm leading-relaxed text-body md:text-base">{project.description}</p>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1 md:gap-1.5">
        {project.tags.map((tag) => (
          <Chip key={tag} label={tag} compact />
        ))}
      </div>
      <div className="mt-auto pt-4">
        <Link
          to={`/projects/${project.slug}`}
          className="pressable inline-flex rounded-full border border-sky-200 bg-sky-500 px-4 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 md:px-5 md:py-2.5"
          aria-label={`View full project details for ${project.title}`}
        >
          View Full Project
        </Link>
      </div>
    </Card>
  )
}
