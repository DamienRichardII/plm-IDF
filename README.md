# Parcours le Monde IDF — Landing page des 10 ans (front-end)

Landing page responsive (mobile-first, pensée pour l'arrivée par QR code) : campagne d'adhésion, Gala des 10 ans, formulaire validé côté client et **simulation** du paiement.

**Paiement : virement bancaire ou espèces.** Après validation du formulaire, le clic sur « Payer 10,00 € par virement » ouvre une fenêtre qui affiche le bénéficiaire, l'IBAN et le BIC (config : `payment` dans `src/config/site.ts`), avec boutons « Copier » et une référence de virement « Adhésion Nom Prénom ». Avant validation, ces informations ne sont pas affichées dans la page.

**Aucun backend pour l'instant** : les informations saisies dans le formulaire ne sont ni envoyées, ni enregistrées, ni conservées (pas de localStorage). Le rapprochement se fait donc uniquement via la référence du virement. L'IBAN reste présent dans le code JavaScript public (inévitable pour un site statique).

## Stack
React 19 + TypeScript (strict) · Vite · Tailwind CSS 4 · React Hook Form + Zod · Lucide React · polices auto-hébergées (@fontsource). Le fichier `package-lock.json` est conservé.

## Commandes
```bash
npm install
npm run dev        # développement (http://localhost:5173)
npm run typecheck  # vérification TypeScript
npm run build      # typecheck + export statique dans dist/
npm run preview    # prévisualise dist/ (http://localhost:4173)
```

## Hébergement statique
Le build est aussi compatible `file://` : `dist/index.html` s'ouvre par double-clic dans un navigateur (script classique, pas de module). Sans cela, le navigateur bloque le script et la page reste blanche.

`npm run build` produit `dist/` : fichiers 100 % statiques, chemins relatifs (`base: './'`). Déposer le contenu de `dist/` chez n'importe quel hébergeur statique (Vercel, Netlify, GitHub Pages, OVH…), en HTTPS. Aucun serveur ni variable d'environnement n'est nécessaire pour l'affichage.

## QR code
Le QR doit pointer vers l'URL publique **finale** (HTTPS). Elle n'est pas connue : aucun QR n'est donc fourni.
```bash
npm run qr -- https://votre-domaine.fr/            # écrit qr/qr-landing.svg et qr/qr-landing.png
npm run qr -- https://votre-domaine.fr/ --out dossier
```
Sans argument, le script lit `PUBLIC_SITE_URL` (variable d'environnement ou `.env`, voir `.env.example`). Il refuse localhost, les adresses locales et le HTTP. Le QR ne figure pas dans la page : il sert aux supports imprimés. Le scan arrive en haut de page ; le CTA fixe mène au formulaire.

## Configuration
Tout est centralisé dans `src/config/site.ts` : montant (10 €), infos du Gala, coordonnées, liens, URL publique, chemins d'assets. Validation : `src/lib/membershipSchema.ts`. Contrat de raccordement futur : `src/services/membershipService.ts` (remplacer `demoMembershipService`, l'interface ne change pas).

## Organisation
`src/components/` : Header, Hero, MembershipSteps, GalaSection, MembershipBenefits, MembershipForm, PaymentPreviewDialog, AssociationSection, Footer, MobileAdhesionCTA (+ Decor, Reveal).

## À fournir avant publication
- Logos et illustrations définitifs en haute définition (le logo fourni fait 418 px de large ; idéalement SVG ou PNG transparent, avec une version compacte pour l'en-tête) et image de partage (Open Graph).
- Lien de réservation du Gala (`gala.bookingUrl`), s'il existe ; vérifier date, horaires et adresse repris de l'affiche.
- Coordonnées de contact (`contact.email` / `contact.phone`) : sinon seul le lien vers le site s'affiche.
- URL publique finale (`PUBLIC_SITE_URL`) puis génération du QR.
- Section « L'association » : mission et cible 18–30 ans reprises des retours de l'association ; les textes « Engagement » et « Solidarité » restent à valider ou à remplacer.
- Mentions légales / politique de confidentialité (aucune page n'est créée ici) avant toute collecte réelle.
- Raccordements futurs : enregistrement des adhésions (liste des adhérents), carte de membre, email de confirmation, consentement RGPD.
- Visuel du Gala : décor SVG provisoire, à remplacer par l'affiche ou une photo.
