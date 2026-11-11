import { Globe, Rocket, Users } from 'lucide-react'
import type { ComponentType } from 'react'

const benefits: { icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>; text: string }[] = [
  { icon: Users, text: 'Participe à la vie de l’association' },
  { icon: Rocket, text: 'Soutiens nos projets de mobilité' },
  { icon: Globe, text: 'Rejoins une communauté engagée et solidaire' },
]

export default function MembershipBenefits() {
  return (
    <section aria-label="Pourquoi adhérer">
      <ul className="mt-6 space-y-3">
        {benefits.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-4">
            <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sand/80 text-ink shadow-soft">
              <Icon aria-hidden={true} className="h-7 w-7" />
            </span>
            <span className="text-lg leading-snug">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
