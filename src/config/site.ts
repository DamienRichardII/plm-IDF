/**
 * Configuration centrale. Les valeurs à `null` sont "à fournir" :
 * l'interface affiche alors un état neutre (rien n'est inventé).
 */
const base = import.meta.env.BASE_URL

export const siteConfig = {
  associationName: 'Parcours le Monde IDF',
  membership: {
    amount: 10, // € par an
    currency: 'EUR',
  },
  gala: {
    // Source : affiche officielle du Gala fournie par l'association.
    date: 'Vendredi 13 novembre' as string | null,
    time: 'De 18h à 21h' as string | null,
    venue: 'Salle des fêtes Mairie du 20e — 6 place Gambetta, 75020 Paris' as string | null,
    bookingUrl: null as string | null, // lien de réservation https://… (à fournir)
  },
  /** Paiement de la cotisation : virement bancaire uniquement (RIB fourni par l'association). */
  payment: {
    beneficiary: 'PARCOURS LE MONDE IDF',
    iban: 'FR76 1751 5900 0008 0091 6005 881',
    bic: 'CEPAFRPP751',
  },
  contact: {
    email: null as string | null,
    phone: null as string | null,
  },
  links: {
    website: 'https://www.parcourslemonde.org/',
  },
  /** URL publique finale (QR code). Définie via PUBLIC_SITE_URL, jamais en dur. */
  publicSiteUrl: import.meta.env.PUBLIC_SITE_URL ?? '',
  assets: {
    heroLogo: `${base}assets/hero-logo-10ans.png`,
  },
} as const

const eur = (digits: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: siteConfig.membership.currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(siteConfig.membership.amount)

/** « 10,00 € » */
export const priceLong = eur(2)
/** « 10 € » */
export const priceShort = eur(0)
