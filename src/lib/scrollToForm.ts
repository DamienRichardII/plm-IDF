/**
 * Amène l'utilisateur sur le formulaire de façon fiable (JS + ancre en secours)
 * et place le focus sur la section, sans ouvrir le clavier mobile.
 */
export function scrollToForm(e: { preventDefault: () => void }) {
  const el = document.getElementById('formulaire')
  if (!el) return // l'ancre native #formulaire prend le relais
  e.preventDefault()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - 76
  window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' })
  el.focus({ preventScroll: true })
  try {
    history.replaceState(null, '', '#formulaire')
  } catch {
    /* certains navigateurs intégrés refusent replaceState : sans conséquence */
  }
}
