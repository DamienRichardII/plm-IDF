import { Fragment } from 'react'
import { priceShort } from '../config/site'
import Reveal from './Reveal'
import { DottedConnector } from './Decor'

const steps = [
  {
    title: 'Fais le choix de nous soutenir',
    text: 'Décide de rejoindre notre cercle d’adhérents et de soutenir nos actions et nos valeurs.',
  },
  {
    title: 'Remplis le formulaire',
    text: 'Une adhésion rapide et facile avec tes informations personnelles.',
  },
  {
    title: `Contribue à hauteur de ${priceShort} par an`,
    text: `Ton adhésion annuelle ne te coûtera que ${priceShort}.`,
  },
]

export default function MembershipSteps() {
  return (
    <section aria-labelledby="steps-title" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 id="steps-title" className="sr-only">
        Adhérer en trois étapes
      </h2>
      <ol className="grid items-center gap-3 lg:grid-cols-[1fr_72px_1fr_72px_1fr] lg:gap-0">
        {steps.map((s, i) => (
          <Fragment key={s.title}>
            <li className="h-full">
              <Reveal delay={i * 90} className="h-full">
                <div className="flex h-full items-start gap-4 rounded-3xl bg-sand/80 p-4 shadow-soft lg:flex-col lg:items-center lg:px-6 lg:py-7 lg:text-center">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-plum font-display text-lg font-bold text-cream"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase leading-tight text-plum lg:text-xl">
                      <span className="sr-only">Étape {i + 1} : </span>
                      {s.title}
                    </h3>
                    <span aria-hidden="true" className="my-2 hidden h-0.5 w-20 bg-plum lg:mx-auto lg:block" />
                    <p className="mt-1 text-base italic leading-snug text-ink/85 lg:mt-0">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden="true" className="hidden lg:block">
                <DottedConnector flip={i === 1} />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </section>
  )
}
