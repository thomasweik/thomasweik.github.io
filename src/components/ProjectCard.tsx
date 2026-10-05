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
    <article className="grid gap-3 border-b border-forest-line/70 py-4 md:grid-cols-[minmax(180px,28%)_1fr] md:gap-8 md:py-6 lg:grid-cols-[minmax(220px,25%)_1fr_auto] lg:items-start">
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
        <div className="h-40 overflow-hidden border border-forest-line bg-forest-surface md:h-52">
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
      <div className="space-y-1.5 md:space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-forest-accent md:text-xs md:tracking-[0.15em]">{project.categories.join(' / ')}</p>
        <h3 className="text-xl font-bold leading-tight text-ink md:text-3xl">
          <Link
            to={`/projects/${project.slug}`}
            className="decoration-forest-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-forest-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-xs font-semibold text-forest-accent md:text-base">{project.role}</p>
        <p className="text-xs text-body md:text-base">{project.organization} · {project.cardDates ?? project.dates}</p>
        {project.status && (
          <p className="inline-flex w-fit items-center gap-2 border border-amber-700 bg-amber-200 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-amber-950">
            <span className="h-2 w-2 bg-amber-800" aria-hidden="true" />
            {project.status}
          </p>
        )}
        <p className="max-w-2xl text-[13px] leading-relaxed text-body md:text-base">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => <Chip key={tag} label={tag} compact />)}
        </div>
      </div>
      <Link
        to={`/projects/${project.slug}`}
        className="pressable inline-flex w-fit items-center border border-forest-accent px-4 py-3 text-sm font-bold text-forest-accent transition-colors hover:bg-forest-accent hover:text-forest-base focus-visible:outline-2 focus-visible:outline-forest-accent"
        aria-label={`View full project details for ${project.title}`}
      >
        View project
      </Link>
    </article>
  )
}

export function CompactProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      aria-label={`View ${project.title} project`}
      className="flex min-w-0 flex-col gap-1.5 border-b border-forest-line/70 py-2.5 pr-2 focus-visible:outline-2 focus-visible:outline-forest-accent"
    >
      {project.modelPath ? (
        <StepModelViewer
          modelPath={project.modelPath}
          projectTitle={project.title}
          mode="scroll"
          compact
          rotationOffsetDegrees={project.modelRotationDegrees}
          rotationXDegrees={project.modelRotationXDegrees}
          viewAxisRotationDegrees={project.modelViewAxisRotationDegrees}
          cameraPosition={project.modelCameraPosition}
          upAxis={project.modelUpAxis}
        />
      ) : (
        <div className="h-28 overflow-hidden border border-forest-line bg-forest-surface">
          {project.coverImage ? (
            <ResponsiveImage
              src={project.coverImage}
              alt=""
              className={`h-full w-full ${project.coverFit === 'contain' ? 'object-contain' : 'object-cover'} ${project.coverPosition ?? 'object-center'}`}
              loading="lazy"
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${project.visual}`} aria-hidden="true" />
          )}
        </div>
      )}
      <div className="min-w-0 px-1">
        <p className="line-clamp-2 text-[13px] font-bold leading-snug text-ink">{project.title}</p>
        <p className="mt-1 truncate text-[9px] font-bold uppercase tracking-[0.1em] text-forest-accent">
          {project.categories[0]}
        </p>
      </div>
    </Link>
  )
}
