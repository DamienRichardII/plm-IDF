import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react'
import { siteConfig } from '../config/site'

function GalaVisual() {
  const lights = [
    [40, 50, 14], [95, 30, 10], [150, 62, 16], [215, 28, 11], [270, 55, 15],
    [330, 34, 12], [60, 110, 9], [300, 105, 10], [180, 20, 8], [120, 90, 7],
  ]
  return (
    <svg aria-hidden="true" viewBox="0 0 360 270" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d1823" />
          <stop offset="1" stopColor="#3d2c38" />
        </linearGradient>
        <filter id="gBlur"><feGaussianBlur stdDeviation="4" /></filter>
        <radialGradient id="gGlow" cx=".5" cy="1" r=".8">
          <stop offset="0" stopColor="#f3d9a8" stopOpacity=".35" />
          <stop offset="1" stopColor="#f3d9a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="360" height="270" fill="url(#gBg)" />
      <rect width="360" height="270" fill="url(#gGlow)" />
      <g filter="url(#gBlur)" fill="#f6d9a0">
        {lights.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity=".55" />
        ))}
      </g>
      {/* tables de gala stylisées */}
      <g fill="#f4ead9" opacity=".9">
        <ellipse cx="70" cy="248" rx="70" ry="14" />
        <ellipse cx="250" cy="254" rx="110" ry="16" />
      </g>
      <g stroke="#f3d9a8" strokeWidth="1.5" fill="none" opacity=".8">
        <path d="M60 236v-26M60 210c-8-4-8-12 0-14 8 2 8 10 0 14zM240 240v-30M240 210c-9-4-9-13 0-15 9 2 9 11 0 15z" />
      </g>
    </svg>
  )
}

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 70" className={`h-14 w-7 text-[#e9d7a8] ${flip ? '-scale-x-100' : ''}`} fill="currentColor">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse key={i} cx={22 - i * 2} cy={60 - i * 10} rx="4" ry="9" transform={`rotate(${-35 + i * 4} ${22 - i * 2} ${60 - i * 10})`} />
      ))}
    </svg>
  )
}

export default function GalaSection() {
  const { date, time, venue, bookingUrl } = siteConfig.gala
  return (
    <section id="gala" aria-labelledby="gala-title" className="scroll-mt-20">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft sm:aspect-[16/10] lg:aspect-[1.35]">
        <GalaVisual />
        <div className="relative flex h-full items-start justify-center gap-1 pt-6 text-center sm:pt-10">
          <Laurel />
          <h2 id="gala-title" className="font-script text-5xl leading-[0.95] text-[#f7efe0] sm:text-6xl">
            Gala des
            <br />
            10 ans
          </h2>
          <Laurel flip />
        </div>
      </div>

      <div className="relative z-10 -mt-6 px-3">
        <div className="mx-auto flex w-fit -rotate-2 items-center gap-3 rounded-2xl border border-sand bg-cream px-5 py-3 shadow-soft">
          <CalendarDays aria-hidden="true" className="h-7 w-7 text-plum" />
          <p className="font-display text-xl font-bold uppercase text-ink">{date ?? 'Date à confirmer'}</p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 rounded-2xl bg-sand/60 p-4 text-base">
        {time && (
          <div className="flex items-start gap-3">
            <dt className="sr-only">Horaires</dt>
            <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-plum" />
            <dd>{time}</dd>
          </div>
        )}
        <div className="flex items-start gap-3">
          <dt className="sr-only">Lieu</dt>
          <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-plum" />
          <dd>{venue ?? 'Lieu à communiquer'}</dd>
        </div>
        <div className="flex items-start gap-3">
          <dt className="sr-only">Réservation</dt>
          <Ticket aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-plum" />
          <dd>
            {bookingUrl ? (
              <a href={bookingUrl} className="font-bold text-plum underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                Réserver ma place
              </a>
            ) : (
              'Réservation bientôt disponible'
            )}
          </dd>
        </div>
      </dl>
    </section>
  )
}
