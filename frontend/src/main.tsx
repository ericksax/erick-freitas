import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './contexts/auth'
import App from './App'

import './index.css';

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </StrictMode>,
  )
}


