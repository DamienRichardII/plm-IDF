import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../config/site'

const links = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#gala', label: 'Le Gala des 10 ans' },
  { href: '#adhesion', label: 'Adhésion' },
  { href: '#association', label: 'L’association' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#accueil')
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Focus sur le premier lien à l'ouverture
  useEffect(() => {
    if (open) headerRef.current?.querySelector<HTMLAnchorElement>('#menu-mobile a')?.focus()
  }, [open])

  // Rubrique active (scrollspy léger)
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const onScroll = () => {
      const y = window.scrollY + 120
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) current = id
      }
      setActive(`#${current}`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = (refocus: boolean) => {
    setOpen(false)
    if (refocus) buttonRef.current?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return
    if (e.key === 'Escape') {
      e.preventDefault()
      close(true)
    }
    if (e.key === 'Tab') {
      const f = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>('#menu-btn, #menu-mobile a') ?? [],
      )
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  const linkClass = (href: string) =>
    `inline-flex min-h-11 items-center border-b-2 px-1 text-[15px] transition-colors hover:text-plum ${
      active === href ? 'border-plum font-bold' : 'border-transparent'
    }`

  return (
    <header
      ref={headerRef}
      onKeyDown={onKeyDown}
      className="sticky top-0 z-40 border-b border-plum/10 bg-cream"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <a href="#accueil" aria-label="Parcours le Monde IDF — Accueil" className="shrink-0">
          <img
            src={siteConfig.assets.heroLogo}
            alt="Parcours le Monde IDF — Facilitateur de mobilité, 10 ans"
            width={418}
            height={226}
            className="h-14 w-auto mix-blend-multiply lg:h-16"
          />
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass(l.href)} aria-current={active === l.href ? 'true' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          id="menu-btn"
          ref={buttonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-plum/20 bg-white/70 text-plum lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => (open ? close(false) : setOpen(true))}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu mobile"
          className="border-t border-plum/10 bg-cream px-4 pb-4 pt-2 shadow-soft lg:hidden"
        >
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => close(false)}
                  className="flex min-h-12 items-center border-b border-plum/10 text-lg font-semibold text-plum"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
