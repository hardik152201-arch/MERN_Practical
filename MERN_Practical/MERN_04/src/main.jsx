import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './App.css'

// The BrowserRouter component enables HTML5 history API routing in React.
// Wrapping App with BrowserRouter makes router features (Link, Routes, Route, etc.) available everywhere.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
