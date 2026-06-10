import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import setupQueryPersistence from './lib/queryPersistence'

const queryClient = new QueryClient()

setupQueryPersistence(queryClient)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}> 
        <App />
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
)
