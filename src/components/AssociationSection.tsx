import { Compass, HeartHandshake, Route, Users } from 'lucide-react'
import { siteConfig } from '../config/site'
import Reveal from './Reveal'

const pillars = [
  { icon: Route, title: 'Mobilité', text: 'Faciliter la mobilité internationale pour les jeunes de 18 à 30 ans.' },
  { icon: Users, title: 'Engagement', text: 'Une communauté d’adhérents impliquée dans la vie de l’association.' },
  { icon: HeartHandshake, title: 'Solidarité', text: 'Des projets portés avec des valeurs communes.' },
]

export default function AssociationSection() {
  return (
    <section id="association" aria-labelledby="asso-title" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h2 id="asso-title" className="text-center font-display text-3xl font-bold text-plum">
        L’association
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-lg">
        {siteConfig.associationName}, facilitateur de mobilité internationale, fête ses 10 ans.
      </p>

      <Reveal className="mx-auto mt-6 max-w-3xl">
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-plum px-6 py-6 text-center text-cream shadow-soft sm:flex-row sm:text-left">
          <Compass aria-hidden="true" className="h-10 w-10 shrink-0" />
          <div>
            <h3 className="font-display text-xl font-bold uppercase">Notre mission</h3>
            <p className="mt-1 text-lg leading-snug">
              Démocratiser l’accès à la mobilité internationale et favoriser la remobilisation.
            </p>
          </div>
        </div>
      </Reveal>

      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {pillars.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-3xl bg-sand/70 p-5 text-center shadow-soft">
            <Icon aria-hidden="true" className="mx-auto h-8 w-8 text-plum" />
            <h3 className="mt-2 font-display text-xl font-bold text-plum">{title}</h3>
            <p className="mt-1 text-base">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
