import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { priceShort } from '../config/site'

/** Cibles qui rendent le CTA inutile ou gênant quand elles sont à l'écran. */
const WATCHED = ['formulaire', 'hero-actions', 'contact']

export default function MobileAdhesionCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const on = new Set<string>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) on.add(e.target.id)
        else on.delete(e.target.id)
      }
      setVisible(on.size === 0)
    })
    WATCHED.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 px-4 pt-3 transition duration-300 lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'invisible translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href="#formulaire"
        className="flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-plum px-6 text-lg font-bold text-cream shadow-[0_8px_24px_-6px_rgb(81_57_78/0.6)]"
      >
        Adhérer — {priceShort}/an
        <ArrowRight aria-hidden="true" className="h-5 w-5" />
      </a>
    </div>
  )
}
