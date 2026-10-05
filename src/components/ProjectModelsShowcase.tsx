import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects, type ProjectItem } from '../data/profile'
import { StepModelViewer } from './StepModelViewer'

type ModelProject = ProjectItem & { modelPath: string }

const modelProjects = projects.filter((project): project is ModelProject => Boolean(project.modelPath))

export function ProjectModelsShowcase() {
  const [selectedSlug, setSelectedSlug] = useState(modelProjects[0]?.slug ?? '')
  const selectedProject = modelProjects.find((project) => project.slug === selectedSlug) ?? modelProjects[0]

  if (!selectedProject) return null

  return (
    <section id="models" className="scroll-mt-24 border-t border-forest-line/70 py-12 md:py-20">
      <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
        <div className="space-y-5">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-forest-accent">Interactive 3D models</p>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">Explore projects in 3D.</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-body md:text-lg">
              Choose a project to inspect its model. Drag to rotate, or scroll and pinch to zoom. Open a project for its design details, process, and photos.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a project model">
            {modelProjects.map((project) => (
              <button
                key={project.slug}
                type="button"
                aria-pressed={project.slug === selectedProject.slug}
                onClick={() => setSelectedSlug(project.slug)}
                className={`border px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-forest-accent ${project.slug === selectedProject.slug ? 'border-forest-accent bg-forest-accent text-white' : 'border-forest-line text-ink hover:border-forest-accent hover:text-forest-accent'}`}
              >
                {project.title}
              </button>
            ))}
          </div>

          <Link
            to={`/projects/${selectedProject.slug}`}
            className="pressable inline-flex items-center border border-[#4A3326] bg-[#4A3326] px-4 py-3 text-sm font-bold text-[#F4E7D0] shadow-sm transition-colors hover:border-[#37251C] hover:bg-[#37251C] focus-visible:outline-2 focus-visible:outline-forest-accent"
          >
            View {selectedProject.title}
          </Link>
        </div>

        <div className="min-w-0">
          <StepModelViewer
            key={selectedProject.slug}
            modelPath={selectedProject.modelPath}
            projectTitle={selectedProject.title}
            mode="manual"
            rotationOffsetDegrees={selectedProject.modelRotationDegrees}
            rotationXDegrees={selectedProject.modelRotationXDegrees}
            viewAxisRotationDegrees={selectedProject.modelViewAxisRotationDegrees}
            cameraPosition={selectedProject.modelCameraPosition}
            upAxis={selectedProject.modelUpAxis}
          />
        </div>
      </div>
    </section>
  )
}
