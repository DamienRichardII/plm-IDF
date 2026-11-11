#!/usr/bin/env node
// Usage : npm run qr -- https://votre-domaine.fr/   [--out dossier]
// Sans argument, lit PUBLIC_SITE_URL (variable d'environnement ou fichier .env).
import { mkdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import QRCode from 'qrcode'

const args = process.argv.slice(2)
const outIdx = args.indexOf('--out')
const outDir = resolve(outIdx >= 0 ? args[outIdx + 1] : 'qr')
const positional = args.filter((a, i) => !a.startsWith('--') && (outIdx < 0 || i !== outIdx + 1))

function fromDotEnv() {
  if (!existsSync('.env')) return ''
  const m = readFileSync('.env', 'utf8').match(/^PUBLIC_SITE_URL=(.*)$/m)
  return m ? m[1].trim() : ''
}

const raw = positional[0] || process.env.PUBLIC_SITE_URL || fromDotEnv()
if (!raw) {
  console.error('URL manquante. Exemple : npm run qr -- https://exemple.fr/')
  process.exit(1)
}

let url
try {
  url = new URL(raw)
} catch {
  console.error(`URL invalide : ${raw}`)
  process.exit(1)
}
const host = url.hostname
if (
  url.protocol !== 'https:' ||
  host === 'localhost' ||
  host.endsWith('.local') ||
  /^(127\.|10\.|192\.168\.|0\.)/.test(host)
) {
  console.error('Refusé : une URL publique en HTTPS est requise (pas de localhost ni d’adresse locale).')
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })
const opts = { errorCorrectionLevel: 'M', margin: 4 }
writeFileSync(join(outDir, 'qr-landing.svg'), await QRCode.toString(url.href, { ...opts, type: 'svg' }))
await QRCode.toFile(join(outDir, 'qr-landing.png'), url.href, { ...opts, width: 1024 })
console.log(`QR code généré pour ${url.href}\n  ${join(outDir, 'qr-landing.svg')}\n  ${join(outDir, 'qr-landing.png')}`)
