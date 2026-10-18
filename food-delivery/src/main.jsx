import { createRoot } from 'react-dom/client'
import './assets/CSS/style.css'
import './assets/CSS/tailwind.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { TokenContext } from './assets/Components/Contexts/TokenContext.jsx'
import { LoginContext } from './assets/Components/Contexts/LoginContext.jsx'
import { CookieContext } from './assets/Components/Contexts/CookieContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CookieContext>
      <LoginContext>
        <TokenContext>
          <App/>
        </TokenContext>
      </LoginContext>
    </CookieContext>
  </BrowserRouter>,
)
