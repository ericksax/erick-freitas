import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './contexts/auth'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './app'

import './index.css';
import { queryClient } from './lib/query-client'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="w-full max-w-[1440px] mx-auto">
          <App />
        </div>
        <Toaster />
      </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}


