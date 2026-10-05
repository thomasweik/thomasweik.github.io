import { Link } from 'react-router-dom'
import type { ProjectItem } from '../data/profile'
import { Chip } from './Chip'
import { ResponsiveImage } from './ResponsiveImage'
import { StepModelPlaceholder } from './StepModelPlaceholder'
import { StepModelViewer } from './StepModelViewer'

interface ProjectCardProps {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="grid gap-5 border-b border-forest-line/70 py-6 md:grid-cols-[minmax(180px,28%)_1fr] md:gap-8 lg:grid-cols-[minmax(220px,25%)_1fr_auto] lg:items-start">
      {project.modelPath ? (
        <StepModelViewer
          modelPath={project.modelPath}
          projectTitle={project.title}
          mode="scroll"
          rotationOffsetDegrees={project.modelRotationDegrees}
          rotationXDegrees={project.modelRotationXDegrees}
          viewAxisRotationDegrees={project.modelViewAxisRotationDegrees}
          cameraPosition={project.modelCameraPosition}
          upAxis={project.modelUpAxis}
        />
      ) : project.stepPreviewPlaceholder ? (
        <StepModelPlaceholder projectTitle={project.title} variant="cover" />
      ) : (
        <div className="h-48 overflow-hidden border border-forest-line bg-forest-surface md:h-52">
          {project.coverImage ? (
          <ResponsiveImage
            src={project.coverImage}
            alt={project.coverAlt ?? `${project.title} cover`}
            className={`h-full w-full ${project.coverFit === 'contain' ? 'object-contain' : 'object-cover'} ${project.coverPosition ?? 'object-center'}`}
            loading="lazy"
          />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${project.visual}`} aria-hidden="true" />
          )}
        </div>
      )}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-forest-accent">{project.categories.join(' / ')}</p>
        <h3 className="text-2xl font-bold leading-tight text-ink md:text-3xl">
          <Link
            to={`/projects/${project.slug}`}
            className="decoration-forest-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-forest-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-sm font-semibold text-forest-accent md:text-base">{project.role}</p>
        <p className="text-sm text-body md:text-base">{project.organization} · {project.cardDates ?? project.dates}</p>
        {project.status && (
          <p className="inline-flex w-fit items-center gap-2 border border-amber-700 bg-amber-200 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-amber-950">
            <span className="h-2 w-2 bg-amber-800" aria-hidden="true" />
            {project.status}
          </p>
        )}
        <p className="max-w-2xl text-sm leading-relaxed text-body md:text-base">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => <Chip key={tag} label={tag} compact />)}
        </div>
      </div>
      <Link
        to={`/projects/${project.slug}`}
        className="pressable inline-flex w-fit items-center border border-forest-accent px-4 py-3 text-sm font-bold text-forest-accent transition-colors hover:bg-forest-accent hover:text-forest-base focus-visible:outline-2 focus-visible:outline-forest-accent"
        aria-label={`View full project details for ${project.title}`}
      >
        View project ↗
      </Link>
    </article>
  )
}
