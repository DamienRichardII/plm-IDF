import { Mail, Phone } from 'lucide-react'
import { siteConfig } from '../config/site'
import { Mountains } from './Decor'

export default function Footer() {
  const { email, phone } = siteConfig.contact
  return (
    <footer id="contact" className="relative mt-10 overflow-hidden px-4 pb-10 pt-16 sm:px-6">
      <Mountains className="pointer-events-none absolute inset-x-0 bottom-0 h-72 w-full" />
      <div className="relative mx-auto max-w-4xl rounded-3xl bg-sand/90 px-5 py-6 text-center shadow-soft sm:px-10">
        <h2 className="font-display text-2xl font-bold uppercase text-plum sm:text-3xl">N’hésitez plus, on vous attend !</h2>
        <p className="mt-2 text-lg italic">Participez davantage à la vie de l’association et contribuez à nos projets !</p>
        <p className="mt-2 text-lg">
          RDV sur notre site :<br className="sm:hidden" />{' '}
          <a href={siteConfig.links.website} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-plum underline underline-offset-4 break-words">
            {siteConfig.links.website}
          </a>
        </p>
        {(email || phone) && (
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            {email && (
              <a className="inline-flex min-h-11 items-center gap-2 font-semibold underline" href={`mailto:${email}`}>
                <Mail aria-hidden="true" className="h-5 w-5" />
                {email}
              </a>
            )}
            {phone && (
              <a className="inline-flex min-h-11 items-center gap-2 font-semibold underline" href={`tel:${phone.replace(/\s/g, '')}`}>
                <Phone aria-hidden="true" className="h-5 w-5" />
                {phone}
              </a>
            )}
          </p>
        )}
      </div>
    </footer>
  )
}
