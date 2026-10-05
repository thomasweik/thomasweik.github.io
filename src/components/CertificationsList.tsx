import type { Award, Credential } from '../data/profile'
import { Card } from './Card'

interface CertificationsListProps {
  certifications: Credential[]
  awards: Award[]
}

export function CertificationsList({ certifications, awards }: CertificationsListProps) {
  return (
    <Card className="h-full space-y-4 p-6 md:p-7">
      <div>
        <h3 className="text-3xl font-bold text-ink">Awards and Certifications</h3>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="space-y-1.5">
          <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-body/75">Certifications</h4>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
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
        </div>

        <div className="space-y-1.5 lg:border-l lg:border-forest-line lg:pl-4">
          <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-body/75">Awards</h4>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
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
        </div>
      </div>
    </Card>
  )
}
