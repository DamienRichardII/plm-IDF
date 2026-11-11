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

/** Reliefs aquarellés en bas de page (décoratif). */
export function Mountains({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="mtA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9bfd2" stopOpacity=".0" />
          <stop offset=".35" stopColor="#a9bfd2" stopOpacity=".75" />
          <stop offset="1" stopColor="#b8cbd6" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id="mtB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fa9b8" stopOpacity=".8" />
          <stop offset="1" stopColor="#9db7a6" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id="mtC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7f9e7c" stopOpacity=".85" />
          <stop offset="1" stopColor="#6e8f6d" stopOpacity=".85" />
        </linearGradient>
      </defs>
      <path fill="url(#mtA)" d="M0 220 L120 140 L220 200 L360 90 L520 210 L640 130 L800 220 L940 110 L1100 200 L1240 120 L1440 210 V360 H0Z" />
      <path fill="url(#mtB)" d="M0 270 L160 190 L290 250 L450 160 L610 262 L760 190 L920 268 L1080 180 L1250 262 L1440 200 V360 H0Z" />
      <path fill="url(#mtC)" d="M0 312 L140 262 L300 310 L470 252 L640 314 L820 270 L1000 316 L1180 266 L1440 318 V360 H0Z" />
    </svg>
  )
}
