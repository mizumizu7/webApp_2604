import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'

import { UserProvider } from './contexts/UserContext.jsx'
import { FavoriteProvider } from './contexts/FavoriteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FavoriteProvider>
          <App />
        </FavoriteProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
