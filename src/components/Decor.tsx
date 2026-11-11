import type { ReactNode } from 'react'
import { Plane } from 'lucide-react'

/** Coup de pinceau bleu derrière un texte (décoratif). */
export function BrushBand({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
      >
        <path
          fill="#91C8E4"
          d="M6 16 C40 6 120 13 200 8 S360 4 394 12 L399 24 L391 36 L398 50 L388 63 C340 73 260 66 190 72 S60 75 8 69 L3 55 L10 42 L2 30 Z"
        />
      </svg>
      <span className="relative block">{children}</span>
    </span>
  )
}

/** Chemin pointillé avec petit avion, entre deux cartes (desktop). */
export function DottedConnector({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden="true" className="relative hidden h-full min-h-24 lg:block">
      <svg viewBox="0 0 72 120" className={`absolute inset-0 h-full w-full ${flip ? '-scale-y-100' : ''}`} fill="none">
        <path
          d="M2 96 C 30 100, 44 70, 24 56 S 40 22, 70 30"
          stroke="#51394E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 7"
        />
      </svg>
      <Plane
        className="drift absolute right-1 top-[18%] h-6 w-6 text-ink"
        style={{ '--r': '-35deg' } as React.CSSProperties}
        strokeWidth={2.2}
      />
    </div>
  )
}

/** Petit générateur pseudo-aléatoire déterministe (arbres identiques à chaque rendu). */
function seeded(seed: number) {
  let t = seed
  return () => {
    t = (t * 16807) % 2147483647
    return (t - 1) / 2147483646
  }
}

function PineRow({ y, count, size, fill, seed }: { y: number; count: number; size: number; fill: string; seed: number }) {
  const rnd = seeded(seed)
  const trees = Array.from({ length: count }, (_, i) => {
    const x = (i + rnd() * 0.8) * (1440 / count)
    const h = size * (0.7 + rnd() * 0.7)
    const w = h * 0.38
    const base = y + rnd() * 14
    return `M${x} ${base - h} L${x + w} ${base - h * 0.45} L${x + w * 0.55} ${base - h * 0.45} L${x + w * 1.1} ${base} L${x - w * 1.1} ${base} L${x - w * 0.55} ${base - h * 0.45} L${x - w} ${base - h * 0.45} Z`
  })
  return <path d={trees.join(' ')} fill={fill} />
}

/** Paysage de montagnes aquarellées (lavande, bleu, vert, forêt) — décoratif. */
export function Mountains({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={className} viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax meet">
      <defs>
        <filter id="wc" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.8" />
        </filter>
        <filter id="wcGrain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.1 0.75" />
        </filter>
        <linearGradient id="lav" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9d0e6" />
          <stop offset="1" stopColor="#b9b4d6" />
        </linearGradient>
        <linearGradient id="blu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#aebdd6" />
          <stop offset="1" stopColor="#8ea5c0" />
        </linearGradient>
        <linearGradient id="teal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#86a9a6" />
          <stop offset="1" stopColor="#6f9390" />
        </linearGradient>
        <linearGradient id="forest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7d9a6a" />
          <stop offset="1" stopColor="#5b7a58" />
        </linearGradient>
        <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8eedf" stopOpacity="0" />
          <stop offset=".6" stopColor="#f8eedf" stopOpacity=".5" />
          <stop offset="1" stopColor="#f8eedf" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* sommets lavande, lointains */}
      <g filter="url(#wc)">
        <path fill="url(#lav)" d="M-40 250 C60 200 120 150 230 120 C300 100 360 130 430 150 C520 175 600 110 700 70 C760 48 820 60 880 95 C960 140 1040 120 1120 100 C1210 78 1300 130 1480 190 V640 H-40Z" />
      </g>
      <rect y="150" width="1440" height="130" fill="url(#mist)" />

      {/* massifs bleu-gris */}
      <g filter="url(#wc)">
        <path fill="url(#blu)" d="M-40 330 C40 290 110 250 190 245 C280 240 330 285 410 280 C500 275 560 215 650 195 C740 178 800 215 880 240 C960 265 1030 235 1110 220 C1200 205 1310 250 1480 300 V640 H-40Z" />
      </g>
      <rect y="250" width="1440" height="110" fill="url(#mist)" />

      {/* collines vert d'eau */}
      <g filter="url(#wc)">
        <path fill="url(#teal)" d="M-40 395 C60 350 160 330 260 345 C350 358 410 400 500 395 C600 388 650 330 760 320 C860 311 930 350 1020 360 C1120 372 1220 330 1320 325 C1380 322 1430 340 1480 360 V640 H-40Z" />
      </g>
      <rect y="330" width="1440" height="100" fill="url(#mist)" />

      <rect y="490" width="1440" height="60" fill="#5b7a58" />
      {/* forêts : arrière-plan puis premier plan */}
      <g filter="url(#wc)">
        <path fill="#6f8f62" d="M-40 440 C80 410 200 400 320 415 C440 430 520 455 640 445 C760 435 860 405 980 410 C1100 415 1200 440 1320 430 C1390 424 1440 415 1480 420 V640 H-40Z" />
        <PineRow y={440} count={46} size={46} fill="#5d7f55" seed={11} />
        <path fill="url(#forest)" d="M-40 478 C100 455 230 450 360 465 C500 482 600 492 740 480 C880 468 980 452 1120 458 C1250 464 1350 484 1480 474 V640 H-40Z" />
        <PineRow y={482} count={34} size={78} fill="#4d6d4b" seed={23} />
      </g>

      {/* grain aquarelle */}
      <rect width="1440" height="520" filter="url(#wcGrain)" opacity=".18" />
    </svg>
  )
}
