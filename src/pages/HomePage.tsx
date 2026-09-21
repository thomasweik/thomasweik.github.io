import { useEffect, useMemo, useRef, useState } from 'react'
import { CertificationsList } from '../components/CertificationsList'
import { Chip } from '../components/Chip'
import { ContactRow } from '../components/ContactRow'
import { EducationCard } from '../components/EducationCard'
import { ExperienceStack } from '../components/ExperienceStack'
import { Navbar } from '../components/Navbar'
import { ProjectCard } from '../components/ProjectCard'
import { Section } from '../components/Section'
import { useInViewAnimate } from '../hooks/useInViewAnimate'
import leadershipFundraiserPhoto from '../assets/PrytanisGroupPhotowithSt.JudeCheck.jpeg'
import awardCeremonyPhoto from '../assets/TomWeikReceivingAwardfromFloridaTechPresident.jpeg'
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
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
]

const skillAccentClasses = ['bg-sky-400', 'bg-sky-500', 'bg-[#3f8edb]', 'bg-[#2f6fb8]']
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
  const skillsTriggerRef = useRef<HTMLDivElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const heroShapeLeftRef = useRef<HTMLDivElement | null>(null)
  const heroShapeRightRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)
    updatePreference()

    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
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
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.15, 0.3, 0.6]
      }
    )

    navSections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useInViewAnimate(mainRef, { reducedMotion })

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

      if (!reducedMotion) {
        const heroProgress = clamp(scrollTop / Math.max(viewportHeight, 1), 0, 1)
        // Tweak: decorative parallax travel (keep within 10-20px total).
        if (heroShapeLeftRef.current) {
          heroShapeLeftRef.current.style.transform = `translate3d(0, ${(heroProgress * 14).toFixed(2)}px, 0)`
        }
        if (heroShapeRightRef.current) {
          heroShapeRightRef.current.style.transform = `translate3d(0, ${(-heroProgress * 12).toFixed(2)}px, 0)`
        }
        // Tweak: diagonal-line drift speed (px per viewport scroll).
        if (mainRef.current && skillsTriggerRef.current) {
          const skillsTop = skillsTriggerRef.current.getBoundingClientRect().top + scrollTop
          const fadeStart = skillsTop - viewportHeight * 0.55
          const fadeEnd = skillsTop + viewportHeight * 0.15
          const fadeProgress = clamp((scrollTop - fadeStart) / Math.max(fadeEnd - fadeStart, 1), 0, 1)
          const lineShift = (scrollTop / Math.max(viewportHeight, 1)) * 14
          mainRef.current.style.setProperty('--diag-opacity', fadeProgress.toFixed(3))
          mainRef.current.style.setProperty('--diag-shift', `${lineShift.toFixed(2)}px`)
        }
      } else {
        if (heroShapeLeftRef.current) heroShapeLeftRef.current.style.transform = 'translate3d(0, 0, 0)'
        if (heroShapeRightRef.current) heroShapeRightRef.current.style.transform = 'translate3d(0, 0, 0)'
        if (mainRef.current) {
          mainRef.current.style.setProperty('--diag-shift', '0px')
          mainRef.current.style.setProperty('--diag-opacity', '0')
        }
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
  }, [reducedMotion])

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
    <div ref={mainRef} className="relative min-h-screen bg-gradient-to-b from-[#f3e5cf] via-[#f8f7f3] to-[#e6f1ff] text-ink">
      <div aria-hidden="true" className="diag-lines-page" />
      <div className="pointer-events-none fixed left-0 top-0 z-[70] h-1 w-full bg-white/30">
        <div
          ref={progressBarRef}
          className="h-full origin-left bg-gradient-to-r from-sky-300 to-sky-500"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-16 pt-4 md:px-12 lg:px-16">
        <Navbar
          sections={navSections}
          activeSection={activeSection}
          compact={navCompact}
          linkedinHref={linkedinHref}
          emailHref={emailHref}
        />

        <main>
          <div>
            <section className="relative scroll-mt-32 overflow-hidden py-12 text-center md:py-24" id="hero">
              <div
                ref={heroShapeLeftRef}
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 top-2 hidden h-56 w-56 rounded-full bg-sky-200/45 blur-3xl md:block"
              />
              <div
                ref={heroShapeRightRef}
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 top-24 hidden h-72 w-72 rounded-full bg-[#d7e8ff]/55 blur-3xl md:block"
              />
              <div className="mx-auto flex max-w-5xl flex-col items-center">
                <h1
                  className="reveal reveal--distance-sm text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-8xl"
                  data-animate
                >
                  {person.name}
                </h1>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 md:mt-8 md:gap-3.5">
                  <p
                    className="reveal reveal--delay1 reveal--distance-sm inline-flex rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-semibold text-sky-700 shadow-soft backdrop-blur-sm sm:px-5 sm:text-lg md:px-6 md:text-2xl"
                    data-animate
                  >
                    {person.badge}
                  </p>
                  {person.secondaryBadge ? (
                    <p
                      className="reveal reveal--delay1 reveal--distance-sm inline-flex rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-semibold text-sky-700 shadow-soft backdrop-blur-sm sm:px-5 sm:text-lg md:px-6 md:text-2xl"
                      data-animate
                    >
                      {person.secondaryBadge}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mx-auto mt-10 max-w-4xl md:mt-16">
                <p
                  className="reveal reveal--delay2 text-lg leading-relaxed text-body sm:text-xl md:text-[2.15rem]/[1.4]"
                  data-animate
                >
                  {person.summary}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8 md:gap-4">
                  <a
                    href="#contact"
                    onClick={(event) => {
                      event.preventDefault()
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="pressable reveal reveal--delay2 rounded-full border border-sky-200 bg-sky-500 px-6 py-3 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 md:px-10 md:py-4 md:text-2xl"
                    data-animate
                    aria-label="Go to contact section"
                  >
                    Get in Touch
                  </a>
                  <a
                    href="#projects"
                    onClick={(event) => {
                      event.preventDefault()
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="pressable reveal reveal--delay2 rounded-full border border-white/80 bg-white/75 px-6 py-3 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 md:px-10 md:py-4 md:text-2xl"
                    data-animate
                    aria-label="Go to projects section"
                  >
                    View Projects
                  </a>
                </div>
              </div>
            </section>
          <Section id="about" title="About" description={about.short}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Card className="space-y-4 h-full">
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
                <figure className="h-full overflow-hidden rounded-3xl bg-white shadow-soft">
                  <img
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
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
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

          <div ref={skillsTriggerRef}>
            <Section id="skills" title="Skills" description={siteContent.skillsDescription}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {skills.map((group, index) => (
                  <div
                    key={group.title}
                    className="reveal reveal-card"
                    data-animate
                    style={{ transitionDelay: `${Math.min(index * 70, 280)}ms` }}
                  >
                    <Card className="h-full space-y-3 p-3 hover:-translate-y-1 hover:shadow-lift">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 shadow-inner">
                        <span
                          className={`h-6 w-6 rounded-xl ${skillAccentClasses[index % skillAccentClasses.length]}`}
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="text-2xl font-bold leading-tight text-ink">{group.title}</h3>
                      <div className="flex flex-wrap gap-1">
                        {group.items.map((item) => (
                          <Chip key={item} label={item} />
                        ))}
                      </div>
                    </Card>
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
                      className="rounded-3xl border border-white/60 bg-white p-5 md:flex md:gap-6"
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
                            className="inline-flex text-lg font-semibold text-sky-700 transition-colors hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
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
                          <figure className="mt-4 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-soft">
                            <img
                              src={leadershipFundraiserPhoto}
                              alt="Prytanis group photo with St. Jude fundraising check"
                              className="h-40 w-full object-cover"
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
                    <article key={org.name} className="rounded-3xl border border-white/60 bg-white p-5">
                      {org.href ? (
                        <a
                          href={org.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex text-lg font-semibold text-sky-700 transition-colors hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
                        >
                          {org.name}
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
          className={`pressable fixed bottom-6 right-6 z-50 rounded-full border border-white/80 bg-white/85 px-4 py-3 text-sm font-bold text-ink shadow-soft backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
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
