import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  description?: string
  children: ReactNode
  reveal?: boolean
  aside?: ReactNode
}

export function Section({ id, title, description, children, reveal = true, aside }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-44 py-10 md:py-16 xl:scroll-mt-32">
      <div
        className={
          aside ? 'flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between' : 'space-y-5'
        }
      >
        <div className="space-y-5">
          <h2
            className={`${reveal ? 'reveal reveal--distance-sm' : ''} text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl`}
            data-animate={reveal ? true : undefined}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={`${reveal ? 'reveal reveal--delay1 reveal--distance-sm' : ''} max-w-4xl text-base leading-relaxed text-body sm:text-lg md:text-[1.8rem]/[1.35]`}
              data-animate={reveal ? true : undefined}
            >
              {description}
            </p>
          ) : null}
        </div>
        {aside ? <div className="w-full lg:w-[420px]">{aside}</div> : null}
      </div>
      <div
        className={`${reveal ? 'reveal reveal--delay2' : ''} mt-7 md:mt-11`}
        data-animate={reveal ? true : undefined}
      >
        {children}
      </div>
    </section>
  )
}
