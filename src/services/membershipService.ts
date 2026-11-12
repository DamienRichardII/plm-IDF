import type { MembershipFormValues } from '../lib/membershipSchema'

/**
 * Point de raccordement futur (enregistrement de l'adhésion côté serveur).
 * Aujourd'hui rien n'est transmis : `register` ne fait rien. Remplacer cette
 * implémentation (API, Supabase…) suffira, sans toucher aux composants.
 */
export interface MembershipService {
  register(values: MembershipFormValues): Promise<void>
}

export const membershipService: MembershipService = {
  register: () => Promise.resolve(),
}
