import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { Chip } from '../components/Chip'
import { projects, type ProjectItem } from '../data/profile'

type ProjectStory = NonNullable<ProjectItem['story']>
type EngineeringCaseStudy = NonNullable<ProjectItem['engineeringCaseStudy']>
type TechnicalCaseStudy = NonNullable<ProjectItem['technicalCaseStudy']>

const workflowToneClasses: Record<ProjectStory['workflow'][number]['tone'], string> = {
  primary: 'border-blue-200 bg-blue-50 text-blue-900',
  active: 'border-amber-200 bg-amber-50 text-amber-950',
  merged: 'border-emerald-200 bg-emerald-50 text-emerald-950'
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-sm leading-relaxed text-body md:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ProjectStorySections({ story }: { story: ProjectStory }) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <Card className="space-y-3 border-t-4 border-t-amber-400">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">Engineering problem</p>
          <h2 className="text-2xl font-bold text-ink md:text-3xl">CAD history becomes ambiguous</h2>
          <p className="text-base leading-relaxed text-body md:text-lg">{story.problem}</p>
        </Card>
        <Card className="space-y-3 border-t-4 border-t-sky-500">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">My solution</p>
          <h2 className="text-2xl font-bold text-ink md:text-3xl">Make every handoff traceable</h2>
          <p className="text-base leading-relaxed text-body md:text-lg">{story.solution}</p>
        </Card>
      </div>

      <Card className="space-y-5 md:space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-body/70">Visual workflow</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">From approved model to reviewed revision</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {story.workflow.map((step, index) => (
            <div key={step.title} className="relative flex">
              <div className={`w-full rounded-3xl border p-4 md:p-5 ${workflowToneClasses[step.tone]}`}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{step.description}</p>
              </div>
              {index < story.workflow.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-xl font-bold text-slate-400 md:-right-3 md:bottom-auto md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2"
                >
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-[0.16em] text-body">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" />Primary path</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" />Active branch</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Merged branch</span>
        </div>
      </Card>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-body/70">Key features</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Built for engineering handoffs</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {story.featureGroups.map((group) => (
            <div key={group.title} className="rounded-3xl border border-slate-200 bg-white/80 p-5">
              <h3 className="mb-3 text-lg font-bold text-ink md:text-xl">{group.title}</h3>
              <DetailList items={group.items} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-5 overflow-hidden">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-body/70">System architecture</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Static interface, managed backend</h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-2">
          {story.architecture.map((node, index) => (
            <div key={node.title}>
              <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-white to-sky-50 p-4 text-center shadow-soft md:p-5">
                <h3 className="text-base font-bold text-ink md:text-lg">{node.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-body md:text-base">{node.description}</p>
              </div>
              {index < story.architecture.length - 1 ? (
                <div aria-hidden="true" className="py-1 text-center text-xl font-bold text-sky-500">↓</div>
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">Database & storage design</h2>
          <DetailList items={story.dataAndStorage} />
        </Card>
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">Security & permissions</h2>
          <DetailList items={story.security} />
        </Card>
      </div>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-body/70">Technical challenges</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Design decisions and tradeoffs</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {story.challenges.map((item) => (
            <div key={item.challenge} className="rounded-3xl border border-slate-200 bg-white/80 p-5">
              <h3 className="text-base font-bold text-ink md:text-lg">{item.challenge}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body md:text-base">{item.solution}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">What I learned</h2>
          <DetailList items={story.lessons} />
        </Card>
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">Potential improvements</h2>
          <DetailList items={story.futureImprovements} />
        </Card>
      </div>
    </>
  )
}

function EngineeringCaseStudySections({ caseStudy }: { caseStudy: EngineeringCaseStudy }) {
  const projectFacts = [
    { label: 'Sponsor', value: caseStudy.sponsor },
    { label: 'Team', value: caseStudy.teamSize },
    { label: 'Budget', value: caseStudy.budget },
    { label: 'Current phase', value: caseStudy.phase }
  ]

  return (
    <>
      <Card className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">Project overview</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">A controlled way to work overhead</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {projectFacts.map((fact) => (
            <div key={fact.label} className="rounded-3xl border border-slate-200 bg-white/80 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-body/70">{fact.label}</p>
              <p className="mt-2 text-base font-bold leading-snug text-ink">{fact.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-3 border-t-4 border-t-amber-400">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">Engineering challenge</p>
        <h2 className="text-2xl font-bold text-ink md:text-3xl">Control a heavy payload in a constrained envelope</h2>
        <p className="text-base leading-relaxed text-body md:text-lg">{caseStudy.challenge}</p>
      </Card>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-body/70">Key requirements</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Design boundaries that shape every concept</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {caseStudy.requirements.map((requirement) => (
            <div key={requirement.title} className="rounded-3xl border border-slate-200 bg-white/80 p-5">
              <h3 className="text-base font-bold text-ink md:text-lg">{requirement.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body md:text-base">{requirement.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">My contributions</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Concept research, requirements, and CAD support</h2>
        </div>
        <DetailList items={caseStudy.contributions} />
      </Card>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-body/70">Engineering process</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">From customer need to verified prototype</h2>
        </div>
        <ol className="space-y-3">
          {caseStudy.process.map((step, index) => (
            <li key={step.title} className="grid gap-3 rounded-3xl border border-slate-200 bg-white/80 p-4 sm:grid-cols-[3rem_1fr] md:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sky-500 text-sm font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-body md:text-base">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="space-y-5 border-t-4 border-t-amber-400">
        <div>
          <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
            Preliminary concept under evaluation
          </div>
          <h2 className="mt-3 text-2xl font-bold text-ink md:text-3xl">Current mechanism direction</h2>
          <p className="mt-3 text-base leading-relaxed text-body md:text-lg">{caseStudy.concept.summary}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          {caseStudy.concept.elements.map((element, index) => (
            <div key={element.title} className="relative flex">
              <div className="w-full rounded-3xl border border-sky-200 bg-gradient-to-b from-white to-sky-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Element {index + 1}</p>
                <h3 className="mt-2 text-base font-bold text-ink">{element.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{element.description}</p>
              </div>
              {index < caseStudy.concept.elements.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-xl font-bold text-sky-500 md:-right-3 md:bottom-auto md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2"
                >
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-5">
          <h3 className="text-lg font-bold text-amber-950">Open engineering questions</h3>
          <div className="mt-3 columns-1 gap-8 md:columns-2">
            <DetailList items={caseStudy.concept.unresolved} />
          </div>
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">Engineering tools & methods</h2>
        <div className="flex flex-wrap gap-2">
          {caseStudy.tools.map((tool) => (
            <Chip key={tool} label={tool} />
          ))}
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <Card className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">Current status</p>
          <h2 className="text-2xl font-bold text-ink md:text-3xl">Conceptual design</h2>
          <p className="text-base leading-relaxed text-body md:text-lg">{caseStudy.currentStatus}</p>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">Next steps</h2>
          <DetailList items={caseStudy.nextSteps} />
        </Card>
      </div>

      <Card className="space-y-4">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">Planned final deliverables</h2>
        <DetailList items={caseStudy.finalDeliverables} />
      </Card>

      <div className="rounded-3xl border border-slate-300 bg-slate-100/80 px-5 py-4 text-sm leading-relaxed text-body md:px-6 md:text-base">
        <span className="font-bold text-ink">Project information notice: </span>
        {caseStudy.disclaimer}
      </div>
    </>
  )
}

function StandardProjectSections({ project }: { project: ProjectItem }) {
  const projectFacts = [
    { label: 'Role', value: project.role },
    { label: 'Context', value: project.organization },
    { label: 'Timeline', value: project.dates },
    { label: 'Focus', value: project.categories.join(' · ') }
  ]

  return (
    <>
      <Card className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">Project overview</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Project at a glance</h2>
          <p className="mt-3 max-w-4xl text-base leading-relaxed text-body md:text-lg">{project.description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {projectFacts.map((fact) => (
            <div key={fact.label} className="rounded-3xl border border-slate-200 bg-white/80 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-body/70">{fact.label}</p>
              <p className="mt-2 text-sm font-bold leading-snug text-ink md:text-base">{fact.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <Card className="space-y-4 border-t-4 border-t-sky-500">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">My work</p>
            <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Key contributions</h2>
          </div>
          <DetailList items={project.bullets} />
        </Card>

        <Card className="space-y-4 border-t-4 border-t-amber-400">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">Engineering approach</p>
            <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Design and implementation</h2>
          </div>
          <DetailList items={project.fullDetails} />
        </Card>
      </div>

      <Card className="space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-body/70">Tools & methods</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Technical toolkit</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </div>
      </Card>
    </>
  )
}

function TechnicalCaseStudySections({ caseStudy }: { caseStudy: TechnicalCaseStudy }) {
  return (
    <>
      <Card className="space-y-4 border-t-4 border-t-sky-500">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">Project objective</p>
        <h2 className="text-2xl font-bold text-ink md:text-3xl">Engineering goal</h2>
        <p className="text-base leading-relaxed text-body md:text-lg">{caseStudy.objective}</p>
        {caseStudy.currentStatus ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-4 md:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Current status</p>
            <p className="mt-2 text-sm leading-relaxed text-amber-950 md:text-base">{caseStudy.currentStatus}</p>
          </div>
        ) : null}
      </Card>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-body/70">System specifications</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Platform at a glance</h2>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudy.specifications.map((specification) => (
            <div key={specification.label} className="rounded-3xl border border-slate-200 bg-white/80 p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-body/70">{specification.label}</dt>
              <dd className="mt-2 text-sm font-bold leading-relaxed text-ink md:text-base">{specification.value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-body/70">System architecture</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">How the subsystems work together</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {caseStudy.architecture.map((subsystem, index) => (
            <div key={subsystem.title} className="relative flex">
              <div className="w-full rounded-3xl border border-sky-200 bg-gradient-to-b from-white to-sky-50 p-4 md:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Subsystem {index + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-ink">{subsystem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{subsystem.description}</p>
              </div>
              {index < caseStudy.architecture.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-xl font-bold text-sky-500 md:-right-3 md:bottom-auto md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2"
                >
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {caseStudy.designSections.map((section, index) => (
          <Card
            key={section.title}
            className={`space-y-4 border-t-4 ${index % 2 === 0 ? 'border-t-sky-500' : 'border-t-amber-400'}`}
          >
            <h2 className="text-xl font-bold text-ink md:text-2xl">{section.title}</h2>
            <DetailList items={section.items} />
          </Card>
        ))}
      </div>

      <Card className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-body/70">Design iterations & challenges</p>
          <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Problems investigated and responses</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {caseStudy.challenges.map((item) => (
            <div key={item.challenge} className="rounded-3xl border border-slate-200 bg-white/80 p-5">
              <h3 className="text-base font-bold text-ink md:text-lg">{item.challenge}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body md:text-base">{item.response}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-[1.35fr_0.65fr] md:gap-6">
        <Card className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Testing & results</p>
            <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Demonstrated outcomes</h2>
          </div>
          <DetailList items={caseStudy.results} />
        </Card>
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">Skills & tools</h2>
          <div className="flex flex-wrap gap-2">
            {caseStudy.tools.map((tool) => (
              <Chip key={tool} label={tool} />
            ))}
          </div>
        </Card>
      </div>

    </>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  const projectMedia = project?.media ?? []
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeMediaIndex === null) return
    if (projectMedia.length === 0) return

    const mediaCount = projectMedia.length

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMediaIndex(null)
      } else if (event.key === 'ArrowLeft') {
        setActiveMediaIndex((value) => {
          if (value === null) return 0
          return (value - 1 + mediaCount) % mediaCount
        })
      } else if (event.key === 'ArrowRight') {
        setActiveMediaIndex((value) => {
          if (value === null) return 0
          return (value + 1) % mediaCount
        })
      }
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeMediaIndex, projectMedia.length])

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f3e5cf] via-[#f8f7f3] to-[#e6f1ff] px-6 py-10 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <Card className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-ink">Project Not Found</h1>
            <p className="text-xl text-body">The requested project page does not exist yet.</p>
            <div>
              <Link
                to="/"
                className="pressable inline-flex rounded-full border border-sky-200 bg-sky-500 px-6 py-3 text-lg font-bold text-white transition-all hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
              >
                Back to Portfolio
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3e5cf] via-[#f8f7f3] to-[#e6f1ff] px-6 py-10 md:px-12 lg:px-16">
      <div className="mx-auto max-w-5xl space-y-5 md:space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="pressable inline-flex rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-bold text-ink transition-all hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 md:px-5 md:text-base"
          >
            Back to Portfolio
          </Link>
        </div>

        <Card className="space-y-4 md:space-y-5">
          {project.coverImage ? (
            <div className="h-48 overflow-hidden rounded-3xl border border-white/70 bg-white md:h-64">
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
            <div className={`h-48 rounded-3xl border border-white/70 bg-gradient-to-br md:h-64 ${project.visual}`} />
          )}
          <div className="space-y-2.5 md:space-y-3">
            <p className="text-sm font-semibold text-body md:text-lg">{project.categories.join(' · ')}</p>
            <h1 className="text-3xl font-bold text-ink md:text-5xl">{project.title}</h1>
            {project.subtitle ? (
              <p className="max-w-4xl text-xl font-bold leading-snug text-ink/90 md:text-3xl">{project.subtitle}</p>
            ) : null}
            <p className="text-lg font-semibold text-sky-700 md:text-2xl">{project.role}</p>
            <p className="text-sm text-body md:text-lg">
              {project.organization} · {project.dates}
            </p>
            {project.status ? (
              <p className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
                {project.status}
              </p>
            ) : null}
            <p className="text-base leading-relaxed text-body md:text-xl">{project.overview}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </div>
          {project.links ? (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`pressable inline-flex rounded-full border px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 md:text-base ${
                    link.variant === 'secondary'
                      ? 'border-slate-300 bg-white text-ink hover:border-sky-300 hover:text-sky-700'
                      : 'border-sky-500 bg-sky-500 text-white hover:bg-sky-700'
                  }`}
                >
                  {link.label}
                  <span aria-hidden="true" className="ml-2">↗</span>
                </a>
              ))}
            </div>
          ) : null}
        </Card>

        {project.story ? <ProjectStorySections story={project.story} /> : null}
        {project.engineeringCaseStudy ? (
          <EngineeringCaseStudySections caseStudy={project.engineeringCaseStudy} />
        ) : null}
        {project.technicalCaseStudy ? (
          <TechnicalCaseStudySections caseStudy={project.technicalCaseStudy} />
        ) : null}
        {!project.story && !project.engineeringCaseStudy && !project.technicalCaseStudy ? (
          <StandardProjectSections project={project} />
        ) : null}

        {project.media?.length || project.mediaPlaceholders?.length ? <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">Project Gallery</h2>
          {project.media && project.media.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {project.media.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveMediaIndex(index)}
                  className="pressable group flex h-full w-full flex-col rounded-3xl border border-white/70 bg-white p-3 text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:p-4"
                >
                  <div
                    className={`overflow-hidden rounded-2xl bg-slate-100 transition-transform duration-300 group-hover:scale-[1.01] ${
                      item.layout === 'portrait' ? 'h-64 sm:h-72 md:h-[30rem]' : 'h-36 sm:h-40'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`h-full w-full ${
                        item.layout === 'portrait' || project.story ? 'object-contain' : 'object-cover'
                      }`}
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-semibold text-body md:text-base">{item.caption}</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-700 md:text-sm">
                      Click to expand
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : null}
          {project.mediaPlaceholders && project.mediaPlaceholders.length > 0 ? (
            <>
              <p className="text-lg text-body">Planned project visuals. Add only approved, publicly shareable images.</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {project.mediaPlaceholders?.map((placeholder) => (
                  <div
                    key={placeholder}
                    className="rounded-3xl border border-white/70 bg-white p-3 shadow-soft md:p-4"
                  >
                    <div className="h-32 rounded-2xl bg-gradient-to-br from-sky-100 to-[#dbeafe] md:h-40" />
                    <p className="mt-3 text-sm font-semibold text-body md:text-base">{placeholder}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </Card> : null}
      </div>

      {projectMedia.length > 0 && activeMediaIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 px-3 py-4 backdrop-blur-sm md:px-4 md:py-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectMedia[activeMediaIndex].caption} full screen view`}
          onClick={() => setActiveMediaIndex(null)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 md:gap-4 md:px-5 md:py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-body/60 md:text-sm">
                  Full Screen View
                </p>
                <p className="text-base font-semibold text-ink md:text-lg">
                  {projectMedia[activeMediaIndex].caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveMediaIndex(null)}
                className="pressable inline-flex rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-ink transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:px-4 md:text-sm"
              >
                Close
              </button>
            </div>
            <div className="relative grid min-h-0 flex-1 place-items-center bg-slate-100 p-3 md:p-6">
              {projectMedia.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMediaIndex(
                        (value) => (value === null ? 0 : (value - 1 + projectMedia.length) % projectMedia.length)
                      )
                    }
                    aria-label="Previous image"
                    className="pressable absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/90 p-2.5 text-xl font-bold text-ink shadow-lg transition-all hover:-translate-x-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:left-3 md:p-3 md:text-2xl"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMediaIndex((value) => (value === null ? 0 : (value + 1) % projectMedia.length))
                    }
                    aria-label="Next image"
                    className="pressable absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/90 p-2.5 text-xl font-bold text-ink shadow-lg transition-all hover:translate-x-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:right-3 md:p-3 md:text-2xl"
                  >
                    ›
                  </button>
                </>
              ) : null}
              <img
                src={projectMedia[activeMediaIndex].src}
                alt={projectMedia[activeMediaIndex].alt}
                className="max-h-[72vh] max-w-full rounded-2xl object-contain shadow-xl md:max-h-[78vh]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
