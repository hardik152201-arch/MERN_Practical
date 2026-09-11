import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// Import Page Components
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * Main App Component
 * Defines the persistent layout (Navbar and Footer) and the dynamic page routes.
 * <Routes> matches the current browser path to the corresponding <Route> element.
 */
function App() {
  return (
    <div className="app-layout">
      {/* Persistent Navigation Bar */}
      <Navbar />

      {/* Main Dynamic Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all route for unhandled paths (404 Page) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  )
}

export default App
