import React from 'react'

function About() {
  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>About Our Application</h1>
        <p className="subtitle">Understanding client-side single page architecture.</p>
      </div>

      <div className="content-card">
        <h2>What is an SPA?</h2>
        <p>
          A Single Page Application (SPA) is a web site or web application that fits on a single web page with the goal of providing a user experience similar to that of a desktop application.
        </p>
        <p>
          In a React SPA, <strong>React Router</strong> intercepts browser navigation, dynamically updating the component state and URL path without refreshing the entire page.
        </p>
      </div>

      <h2 className="section-title">Key Advantages</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">0 ms</div>
          <div className="stat-label">Page Reload Delay</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">100%</div>
          <div className="stat-label">Component Reusability</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">SPA</div>
          <div className="stat-label">Modern UX Standard</div>
        </div>
      </div>
    </div>
  )
}

export default About
