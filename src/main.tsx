import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/Context/AuthProvider.tsx'
import './index.css'
import App from './App.tsx'
import { ItemsContextProvider } from './components/Context/ItemsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <ItemsContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ItemsContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
