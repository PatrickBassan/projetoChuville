import React from 'react'
import ReactDOM from 'react-dom/client'
import ConsultPage from './ConsultPage.js'
import ManagerPage from './ManagerPage.js'
import reportWebVitals from './reportWebVitals'
import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import Navbar from './components/NavBar.js'
import './styles/index.css'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ConsultPage />} />
            <Route path="/manage" element={<ManagerPage />} />
          </Routes>
        </div>
      </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
