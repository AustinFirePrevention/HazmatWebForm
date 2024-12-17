import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './scss/styles.scss'
import App from './App.tsx'
import { MaterialsProvider } from './helpers/MaterialsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MaterialsProvider>
      <App />
    </MaterialsProvider>
  </StrictMode>,
)
