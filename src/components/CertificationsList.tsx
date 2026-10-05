import type { Award, Credential } from '../data/profile'
import { Card } from './Card'

interface CertificationsListProps {
  certifications: Credential[]
  awards: Award[]
}

export function CertificationsList({ certifications, awards }: CertificationsListProps) {
  return (
    <Card className="h-full space-y-4 p-0 md:p-7">
      <div>
        <h3 className="text-xl font-bold text-ink md:text-3xl">Awards and Certifications</h3>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-body/75">Certifications</h4>
          <div className="hidden grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid">
            {certifications.map((cert) => (
              <article
                key={cert.title}
                className="border-b border-forest-line/60 py-3"
              >
                <p className="text-lg font-bold text-ink">{cert.title}</p>
                <p className="text-base text-body">
                  {cert.issuer} · Issued {cert.issued}
                </p>
                {cert.expires ? <p className="text-sm text-body">Expires {cert.expires}</p> : null}
                {cert.credentialId ? <p className="text-sm text-body">Credential ID {cert.credentialId}</p> : null}
              </article>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 md:hidden">
            {certifications.map((cert) => (
              <article key={cert.title} className="min-w-0 border-l-2 border-forest-accent/60 py-1 pl-2">
                <p className="break-words text-sm font-bold leading-snug text-ink">{cert.title}</p>
                <p className="mt-1 text-xs leading-snug text-body/80">Issued {cert.issued}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 md:border-l md:border-forest-line md:pl-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-body/75">Awards</h4>
          <div className="hidden grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid">
            {awards.map((award) => (
              <article
                key={award.title}
                className="border-b border-forest-line/60 py-3"
              >
                <p className="text-xl font-bold text-ink">{award.title}</p>
                <p className="text-lg text-body">
                  {award.issuer} · {award.date}
                </p>
              </article>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 md:hidden">
            {awards.map((award) => (
              <article key={award.title} className="min-w-0 border-l-2 border-forest-accent/60 py-1 pl-2">
                <p className="break-words text-sm font-bold leading-snug text-ink">{award.title}</p>
                <p className="mt-1 text-xs leading-snug text-body/80">{award.date}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
