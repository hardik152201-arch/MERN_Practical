import React, { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
    }
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p className="subtitle">Send us a message — interactive state inside a React route component.</p>
      </div>

      <div className="form-card">
        {submitted ? (
          <div className="success-message">
            <div className="success-icon">🎉</div>
            <h2>Thank You, {formData.name}!</h2>
            <p>Your message has been received. We will get back to you at <strong>{formData.email}</strong> shortly.</p>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setSubmitted(false)
                setFormData({ name: '', email: '', message: '' })
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Alex Johnson"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="alex@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Contact
