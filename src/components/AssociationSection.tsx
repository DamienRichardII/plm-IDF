import { HeartHandshake, Route, Users } from 'lucide-react'
import { siteConfig } from '../config/site'

const pillars = [
  { icon: Route, title: 'Mobilité', text: 'Faciliter la mobilité en Île-de-France.' },
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
        {siteConfig.associationName}, facilitateur de mobilité, fête ses 10 ans.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
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
