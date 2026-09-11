import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} React Router SPA Demo. Built for quick learning & easy explanation.</p>
      </div>
    </footer>
  )
}

export default Footer
