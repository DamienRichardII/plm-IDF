import type { MembershipFormValues } from '../lib/membershipSchema'

/**
 * Point de raccordement futur (paiement + enregistrement).
 * L'interface ne dépend que de ce contrat : remplacer `demoMembershipService`
 * par une implémentation réelle suffira, sans toucher aux composants.
 */
export interface MembershipService {
  confirm(values: MembershipFormValues): Promise<void>
}

/** Simulation : ne fait rien, n'envoie rien, ne stocke rien. */
export const demoMembershipService: MembershipService = {
  confirm: () => new Promise((resolve) => setTimeout(resolve, 600)),
}
