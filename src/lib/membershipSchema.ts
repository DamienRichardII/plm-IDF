import { z } from 'zod'

export const MOTIVATION_MAX = 500

const text = (label: string, max = 100) =>
  z
    .string()
    .trim()
    .min(1, `Veuillez renseigner ${label}.`)
    .max(max, `${label.charAt(0).toUpperCase() + label.slice(1)} est trop long (${max} caractères maximum).`)

export const membershipSchema = z.object({
  fullName: text('votre nom et prénom', 150),
  postalAddress: text('votre adresse postale', 250),
  email: z
    .string()
    .trim()
    .min(1, 'Veuillez renseigner votre adresse mail.')
    .pipe(z.email('Adresse mail invalide (exemple : prenom@exemple.fr).')),
  source: z
    .string()
    .trim()
    .min(1, 'Dites-nous comment vous avez connu Parcours le Monde IDF.')
    .max(MOTIVATION_MAX, `Votre réponse dépasse ${MOTIVATION_MAX} caractères.`),
})

export type MembershipFormValues = z.infer<typeof membershipSchema>
