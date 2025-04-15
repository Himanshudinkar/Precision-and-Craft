import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/topnav.css"
import "./css/topheader.css"
import "./css/home.css"
import "./css/cartdata.css"
import "./css/registration.css"
import "./css/footer.css"
import "./css/chackout.css"
import "./css/shopping.css"
import "./css/customerorder.css"

import store from './store.jsx'
import {Provider} from "react-redux"

import LoginContext from './LoginContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <LoginContext>
    <App />
    </LoginContext>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
