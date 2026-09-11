import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page-container fade-in">
      <section className="hero">
        <span className="badge">React Router SPA</span>
        <h1>Welcome to Our Single Page Application</h1>
        <p className="hero-description">
          Experience seamless, instant client-side navigation without full browser reloads using <strong>React Router v6</strong>.
        </p>
        <div className="hero-buttons">
          <Link to="/about" className="btn btn-primary">
            Learn About Us &rarr;
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Get in Touch
          </Link>
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Fast Navigation</h3>
          <p>Routes transition instantly in the client browser without requesting new HTML documents from a server.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📂</div>
          <h3>Clean Structure</h3>
          <p>Organized into pages, components, and clear routing logic for effortless maintainability.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Declarative Routing</h3>
          <p>Using <code>&lt;Routes&gt;</code> and <code>&lt;Route&gt;</code> makes route definitions clean and self-documenting.</p>
        </div>
      </section>
    </div>
  )
}

export default Home
