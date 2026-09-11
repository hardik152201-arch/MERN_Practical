import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Navbar Component
 * Uses <NavLink> from 'react-router-dom'.
 * NavLink automatically adds an "active" class to the link when its route matches the current URL.
 */
function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand / Logo linking to Home */}
        <NavLink to="/" className="brand-logo">
          ⚡ RouterSPA
        </NavLink>

        {/* Navigation links */}
        <nav className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/about" 
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            About
          </NavLink>

          <NavLink 
            to="/contact" 
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
