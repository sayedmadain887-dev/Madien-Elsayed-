// Contact.js

// Also contains LinkedIn and GitHub links.

import React, { useState, useRef } from 'react'
import gsap from 'gsap'
import { useEffect } from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import SendIcon from '@mui/icons-material/Send'
import DownloadIcon from '@mui/icons-material/Download'
import styles from './Contact.module.css'

// Web3Forms Access Key — do not share this with anyone
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMs_KEY

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus]     = useState('idle') 
  const contentRef               = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name:       formData.name,
          email:      formData.email,
          message:    formData.message,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className={styles.page}>
      <div ref={contentRef} className={styles.inner}>

        {/* ===== Header ===== */}
        <div className={styles.header}>
          <p className={styles.label}> get in touch</p>
          <h1 className={styles.title}>Contact Me</h1>
          <p className={styles.subtitle}>
            Have a project in mind? Send me a message and I'll get back to you.
          </p>
        </div>

        <div className={styles.layout}>

          {/* ===== Form ===== */}
          <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                rows={5}
                className={styles.textarea}
              />
            </div>

            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : (
                <>Send Message <SendIcon fontSize="small" /></>
              )}
            </button>

            {/* Success message */}
            {status === 'success' && (
              <div className={styles.successMsg}>
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}

            {/* Error message */}
            {status === 'error' && (
              <div className={styles.errorMsg}>
                ❌ Something went wrong. Please try again.
              </div>
            )}

          </form>

          {/* ===== Social Links ===== */}
          <div className={styles.socials}>
            <p className={styles.socialsTitle}>Find me on</p>

            <a
              href="https://www.linkedin.com/in/madien-elsayed-ba8252420?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/sayedmadain887-dev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
            <a href="/assets/CV_FullStack_Developer.pdf" download="Madien_Elsayed_CV.pdf" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <DownloadIcon/>
                        
              <span>Download Cv</span>
            </a>

          </div>

        </div>

      </div>
    </main>
  )
}

export default Contact