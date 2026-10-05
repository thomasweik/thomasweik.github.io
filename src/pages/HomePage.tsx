import { ResponsiveImage } from '../components/ResponsiveImage'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CertificationsList } from '../components/CertificationsList'
import { Chip } from '../components/Chip'
import { ContactRow } from '../components/ContactRow'
import { EducationCard } from '../components/EducationCard'
import { ExperienceStack } from '../components/ExperienceStack'
import { Navbar } from '../components/Navbar'
import { ProjectModelsShowcase } from '../components/ProjectModelsShowcase'
import { ProjectCard } from '../components/ProjectCard'
import { Section } from '../components/Section'
import { useInViewAnimate } from '../hooks/useInViewAnimate'
import leadershipFundraiserPhoto from '../assets/optimized/PrytanisGroupPhotowithSt.JudeCheck-1600.webp'
import awardCeremonyPhoto from '../assets/optimized/TomWeikReceivingAwardfromFloridaTechPresident-1600.webp'
import {
  about,
  awards,
  certifications,
  coursework,
  education,
  experience,
  leadership,
  links,
  person,
  projectCategories,
  projects,
  siteContent,
  skills,
  type ProjectCategory
} from '../data/profile'
import { Card } from '../components/Card'

const navSections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'models', label: '3D Models' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
]

const projectTileOrder = [
  'inverted-payload-system',
  'cad-handoff',
  'sae-aero-design',
  'robotic-arm-vision-pick',
  '3-axis-camera-tracking-gimbal',
  'fpv-drone-build',
  'ares-muav-endurance-uav',
  'cubesat-development',
  'loc-iris-model-rocket',
  'portfolio-website',
  'menzi-muck-m220x-reverse-engineering'
]

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function HomePage() {
  const [activeSection, setActiveSection] = useState('about')
  const [filter, setFilter] = useState<'All' | ProjectCategory>('All')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [navCompact, setNavCompact] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const mainRef = useRef<HTMLDivElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)
    updatePreference()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePreference)
      return () => mediaQuery.removeEventListener('change', updatePreference)
    }
    // Older iOS Safari exposes only the legacy media-query listener API.
    mediaQuery.addListener(updatePreference)
    return () => mediaQuery.removeListener(updatePreference)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: `-${Math.round(window.innerHeight * 0.2)}px 0px -${Math.round(window.innerHeight * 0.45)}px 0px`,
        threshold: 0
      }
    )

    navSections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Reconnect when filtering mounts new project cards.
  useInViewAnimate(mainRef, { reducedMotion, refreshKey: filter })

  useEffect(() => {
    let rafId = 0
    let ticking = false
    let isCompact = false
    let hasTopButton = false

    const updateFrame = () => {
      const scrollTop = window.scrollY
      const viewportHeight = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - viewportHeight

      if (progressBarRef.current) {
        const pageProgress = maxScroll > 0 ? scrollTop / maxScroll : 0
        progressBarRef.current.style.transform = `scaleX(${clamp(pageProgress, 0, 1).toFixed(4)})`
      }

      // Tweak: navbar compact threshold in pixels.
      const shouldCompact = scrollTop > 72
      if (shouldCompact !== isCompact) {
        isCompact = shouldCompact
        setNavCompact(shouldCompact)
      }

      // Tweak: scroll-to-top visibility threshold (page progress 0..1).
      const shouldShowTopButton = maxScroll > 0 ? scrollTop / maxScroll > 0.4 : false
      if (shouldShowTopButton !== hasTopButton) {
        hasTopButton = shouldShowTopButton
        setShowScrollTop(shouldShowTopButton)
      }

      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        ticking = true
        rafId = window.requestAnimationFrame(updateFrame)
      }
    }

    requestTick()
    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', requestTick)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', requestTick)
    }
  }, [])

  const filteredProjects = useMemo(() => {
    const orderedProjects = [...projects].sort(
      (left, right) =>
        projectTileOrder.indexOf(left.slug) - projectTileOrder.indexOf(right.slug)
    )

    if (filter === 'All') return orderedProjects
    return orderedProjects.filter((project) => project.categories.includes(filter))
  }, [filter])

  const availableProjectCategories = useMemo(() => {
    const used = new Set<ProjectCategory>()
    projects.forEach((project) => {
      project.categories.forEach((category) => used.add(category))
    })
    return projectCategories.filter((category) => category === 'All' || used.has(category))
  }, [])

  const linkedinHref = links.find((item) => item.label === 'LinkedIn')?.href
  const emailHref = links.find((item) => item.label === 'Email')?.href
  const leadershipRoles = leadership.filter((item) => item.role !== 'Member' && item.type !== 'Membership')
  const organizations = Array.from(
    new Map(
      leadership
        .filter((item) => item.role === 'Member' || item.type === 'Membership')
        .map((item) => [item.company, { name: item.company, href: item.companyUrl }])
    ).values()
  )
  const experienceGroups = [
    {
      id: 'sayville-ferry-service',
      label: 'Sayville Ferry Service',
      items: experience.filter((item) => item.company === 'Sayville Ferry Service Inc')
    },
    {
      id: 'coastline-freight',
      label: 'Coastline Freight',
      items: experience.filter(
        (item) =>
          item.company === 'Coastline Freight' || item.company === 'Coastline Freight (Fire Island Seahorse)'
      )
    },
    {
      id: 'call-of-doody',
      label: 'Call of Doody',
      items: experience.filter((item) => item.company === 'Call of Doody')
    }
  ]

  return (
    <div ref={mainRef} className="site-theme min-h-screen bg-forest-base text-ink">
      <div className="pointer-events-none fixed left-0 top-0 z-[70] h-0.5 w-full bg-forest-line/30">
        <div
          ref={progressBarRef}
          className="h-full origin-left bg-forest-accent"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-16 md:px-12 lg:px-16">
        <Navbar
          sections={navSections}
          activeSection={activeSection}
          compact={navCompact}
          linkedinHref={linkedinHref}
          emailHref={emailHref}
        />

        <main>
          <div>
            <section className="relative scroll-mt-24 py-20 md:py-28" id="hero">
              <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-forest-accent">Portfolio / Engineering & design</p>
              <div className="flex max-w-5xl flex-col items-start">
                <h1
                  className="reveal reveal--distance-sm text-5xl font-bold tracking-tight text-ink sm:text-6xl md:text-8xl"
                  data-animate
                >
                  {person.name}
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-2.5 md:mt-8 md:gap-3.5">
                  <p
                    className="reveal reveal--delay1 reveal--distance-sm inline-flex border-l-2 border-forest-accent pl-4 text-sm font-semibold uppercase tracking-[0.14em] text-forest-accent sm:text-base md:text-lg"
                    data-animate
                  >
                    {person.badge}
                  </p>
                  {person.secondaryBadge ? (
                    <p
                      className="reveal reveal--delay1 reveal--distance-sm inline-flex border-l-2 border-forest-accent pl-4 text-sm font-semibold uppercase tracking-[0.14em] text-forest-accent sm:text-base md:text-lg"
                      data-animate
                    >
                      {person.secondaryBadge}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-10 max-w-4xl md:mt-14">
                <p
                  className="reveal reveal--delay2 text-lg leading-relaxed text-body sm:text-xl md:text-[2.15rem]/[1.4]"
                  data-animate
                >
                  {person.summary}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4">
                  <a
                    href="#contact"
                    onClick={(event) => {
                      event.preventDefault()
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="pressable reveal reveal--delay2 border border-forest-accent bg-forest-accent px-6 py-3 text-base font-bold text-forest-base transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-forest-accent md:px-10 md:py-4 md:text-xl"
                    data-animate
                    aria-label="Go to contact section"
                  >
                    Get in Touch <span aria-hidden="true" className="ml-1 text-[0.75em] opacity-75">↗</span>
                  </a>
                  <a
                    href="#projects"
                    onClick={(event) => {
                      event.preventDefault()
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="pressable reveal reveal--delay2 border border-forest-line bg-transparent px-6 py-3 text-base font-bold text-ink transition-colors hover:border-forest-accent hover:text-forest-accent focus-visible:outline-2 focus-visible:outline-forest-accent md:px-10 md:py-4 md:text-xl"
                    data-animate
                    aria-label="Go to projects section"
                  >
                    View Projects <span aria-hidden="true" className="ml-1 text-[0.75em] opacity-75">↗</span>
                  </a>
                </div>
              </div>
            </section>
          <Section id="about" title="About" description={about.short}>
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
              <Card className="h-full space-y-4">
                <p className="text-xl leading-relaxed text-body">{about.long[0]}</p>
                <p className="text-xl leading-relaxed text-body">{about.long[1]}</p>
                <p className="text-xl leading-relaxed text-body">{about.long[2]}</p>
              </Card>
              <Card className="h-full space-y-5">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-body/70">Citizenship</p>
                  <p className="mt-1 text-2xl font-bold text-ink">{person.citizenship}</p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-body/70">Location</p>
                  <p className="mt-1 text-2xl font-semibold text-body">{person.location}</p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-body/70">Focus Areas</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {siteContent.focusAreas.map((focus) => (
                      <Chip key={focus} label={focus} />
                    ))}
                  </div>
                </div>
              </Card>
              <Card className="h-full">
                <figure className="h-full overflow-hidden bg-forest-surface">
                  <ResponsiveImage
                    src={awardCeremonyPhoto}
                    alt="Receiving an award from the Florida Tech President"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </Card>
            </div>
          </Section>

          <Section id="projects" title="Projects" description={siteContent.projectsDescription}>
            <div className="-mx-1 mb-8 flex gap-3 overflow-x-auto px-1 pb-2">
              {availableProjectCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  active={filter === category}
                  asButton
                  onClick={() => setFilter(category)}
                />
              ))}
            </div>

            {filteredProjects.length > 0 ? (
              <div className="border-t border-forest-line">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.slug}
                    className="reveal reveal-card"
                    data-animate
                    style={{ transitionDelay: `${Math.min(index * 70, 280)}ms` }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <p className="text-xl text-body">No projects in this category yet.</p>
              </Card>
            )}
          </Section>

          <ProjectModelsShowcase />

          <div>
            <Section id="skills" title="Skills" description={siteContent.skillsDescription}>
              <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
                {skills.map((group, index) => (
                  <div
                    key={group.title}
                    className="reveal reveal-card"
                    data-animate
                    style={{ transitionDelay: `${Math.min(index * 70, 280)}ms` }}
                  >
                    <div className="h-full border-t border-forest-line/70 py-5">
                      <h3 className="text-2xl font-bold leading-tight text-ink">{group.title}</h3>
                      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                        {group.items.map((item) => (
                          <Chip key={item} label={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <Section id="education" title="Education" description={siteContent.educationDescription}>
            <div className="grid grid-cols-1 gap-8">
              <EducationCard education={education[0]} coursework={coursework} />
              <CertificationsList certifications={certifications} awards={awards} />
            </div>
          </Section>

          <Section id="experience" title="Experience" description={siteContent.experienceDescription}>
            <ExperienceStack groups={experienceGroups} />

            <div className="mt-8 grid grid-cols-1 gap-8">
              <Card className="space-y-5">
                <h3 className="text-3xl font-bold text-ink">Leadership</h3>
                <div className="space-y-4">
                  {leadershipRoles.map((item) => (
                    <article
                      key={`${item.company}-${item.role}-${item.dates}`}
                      className="border-t border-forest-line/60 py-5 md:flex md:gap-6"
                    >
                      <div className="md:w-[320px] md:flex-none">
                        <div className="flex flex-col gap-2">
                          <p className="text-2xl font-bold text-ink">{item.role}</p>
                          <p className="text-lg font-semibold text-body">{item.dates}</p>
                        </div>
                        {item.companyUrl ? (
                          <a
                            href={item.companyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex text-lg font-semibold text-sky-700 transition-colors hover:text-forest-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
                          >
                            {item.company}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold text-sky-700">{item.company}</p>
                        )}
                        <p className="text-base text-body">
                          {item.location} · {item.type}
                        </p>
                        {item.role === 'Prytanis (President)' ? (
                          <figure className="group relative z-0 mt-4 border border-forest-line/70 bg-forest-surface transition-[z-index] hover:z-20">
                            <ResponsiveImage
                              src={leadershipFundraiserPhoto}
                              alt="Prytanis group photo with St. Jude fundraising check"
                              className="h-40 w-full origin-top-left object-cover transition-transform duration-300 ease-out motion-reduce:transition-none md:group-hover:scale-[2.5]"
                              loading="lazy"
                            />
                            <figcaption className="px-3 py-2 text-sm font-semibold text-body">
                              St. Jude fundraising milestone with the chapter
                            </figcaption>
                          </figure>
                        ) : null}
                      </div>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-base text-body md:mt-0">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </Card>

              <Card className="space-y-5">
                <h3 className="text-3xl font-bold text-ink">Organizations</h3>
                <div className="space-y-3">
                  {organizations.map((org) => (
                    <article key={org.name} className="border-t border-forest-line/60 py-4">
                      {org.href ? (
                        <a
                          href={org.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex text-lg font-semibold text-sky-700 transition-colors hover:text-forest-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
                        >
                          {org.name}
                          {!leadershipRoles.some((item) => item.companyUrl === org.href) ? (
                            <span aria-hidden="true" className="ml-1 text-sm">↗</span>
                          ) : null}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-sky-700">{org.name}</p>
                      )}
                      <p className="mt-1 text-base text-body">Member</p>
                    </article>
                  ))}
                </div>
              </Card>
            </div>
          </Section>

          <Section id="contact" title="Contact" description={siteContent.contactDescription}>
            <Card className="space-y-5">
              {links.map((link) => (
                <ContactRow key={link.label} label={link.label} value={link.value} href={link.href} />
              ))}
              <p className="pt-2 text-xl text-body">{siteContent.contactAvailability}</p>
            </Card>
          </Section>
          </div>
        </main>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`pressable fixed bottom-6 right-6 z-50 border border-forest-line bg-forest-surface px-4 py-3 text-sm font-bold text-ink transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
            showScrollTop ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-2'
          }`}
          aria-label="Scroll to top"
        >
          Top
        </button>
      </div>
    </div>
  )
}
