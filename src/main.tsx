import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/kalam/700.css'
import '@fontsource/oswald/300.css'
import '@fontsource/nunito-sans/400.css'
import '@fontsource/nunito-sans/400-italic.css'
import '@fontsource/nunito-sans/700.css'
import '@fontsource/great-vibes/400.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
