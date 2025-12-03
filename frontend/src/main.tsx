import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './contexts/auth'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App'

import './index.css';
import { queryClient } from './lib/query-client'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}


