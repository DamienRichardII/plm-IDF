import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Permet d'ouvrir dist/index.html par double-clic (file://) : les scripts « module »
 * et l'attribut crossorigin sont bloqués par les navigateurs sur file://.
 * On sort donc un script classique (IIFE) chargé en `defer`.
 */
const fileProtocolFriendly = (): Plugin => ({
  name: 'file-protocol-friendly',
  apply: 'build',
  enforce: 'post',
  transformIndexHtml(html) {
    const scripts: string[] = []
    const out = html
      .replace(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>\s*/g, (_m, src) => {
        scripts.push(src)
        return ''
      })
      .replace(/ crossorigin(="[^"]*")?/g, '')
    return out.replace('</body>', scripts.map((s) => `<script defer src="${s}"></script>`).join('\n') + '\n</body>')
  },
})

// base './' : le build fonctionne à la racine d'un domaine comme dans un sous-dossier.
export default defineConfig({
  base: './',
  envPrefix: ['VITE_', 'PUBLIC_'],
  plugins: [react(), tailwindcss(), fileProtocolFriendly()],
  build: { cssCodeSplit: false, rollupOptions: { output: { format: 'iife' } } },
})
