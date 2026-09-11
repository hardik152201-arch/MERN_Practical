import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="page-container not-found-container fade-in">
      <div className="error-code">404</div>
      <h1>Page Not Found</h1>
      <p>Oops! The page path you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        &larr; Return to Home Page
      </Link>
    </div>
  )
}

export default NotFound
