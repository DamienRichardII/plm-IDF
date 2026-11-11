import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' : le build fonctionne à la racine d'un domaine comme dans un sous-dossier.
export default defineConfig({
  base: './',
  envPrefix: ['VITE_', 'PUBLIC_'],
  plugins: [react(), tailwindcss()],
})
