import { ArrowRight, CalendarDays } from 'lucide-react'
import { siteConfig } from '../config/site'
import { BrushBand } from './Decor'

export default function Hero() {
  return (
    <section id="accueil" aria-labelledby="hero-title" className="relative px-4 pb-8 pt-5 text-center sm:px-6 lg:pt-8">
      <img
        src={siteConfig.assets.heroLogo}
        alt="Parcours le Monde, facilitateur de mobilité Île-de-France — 10 ans"
        width={418}
        height={226}
        fetchPriority="high"
        className="mx-auto h-auto w-full max-w-[300px] mix-blend-multiply sm:max-w-[420px] lg:max-w-[460px]"
      />

      <h1 id="hero-title" className="mx-auto mt-3 max-w-4xl font-display text-[2rem] font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
        <BrushBand className="px-6 py-2 sm:px-12 sm:py-3">
          <span className="text-balance">ON FÊTE NOS 10 ANS !</span>
        </BrushBand>
      </h1>

      <p className="mx-auto mt-5 max-w-3xl rounded-xl bg-sand/70 px-4 py-3 font-condensed text-lg font-light uppercase leading-snug tracking-wide text-ink sm:text-2xl lg:text-[1.65rem]">
        Alors on vous propose un tout nouveau processus d’adhésion
      </p>

      <div id="hero-actions" className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href="#formulaire"
          className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-3 rounded-full bg-plum px-7 text-lg font-bold text-cream shadow-soft transition hover:-translate-y-0.5 hover:bg-plum/90 active:translate-y-0"
        >
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
          Adhérer maintenant
        </a>
        <a
          href="#gala"
          className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-3 rounded-full border-2 border-plum bg-transparent px-7 text-lg font-semibold text-plum transition hover:-translate-y-0.5 hover:bg-plum/5 active:translate-y-0"
        >
          <CalendarDays aria-hidden="true" className="h-5 w-5" />
          Participer au Gala
        </a>
      </div>
    </section>
  )
}
