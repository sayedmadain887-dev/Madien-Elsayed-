// Home.js
// Hero page — fullscreen background image with animated overlay.
// Animations: typing effect, floating particles, cursor follower, scroll indicator.

import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import styles from "./home.module.css"
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import DownloadIcon from '@mui/icons-material/Download'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'


// Roles for typing effect
const ROLES = [
  'Frontend Developer',
  'Backend Developer ',
  'UI Developer',
  
]

function Home() {
  const containerRef  = useRef(null)
  const contentRef    = useRef(null)
  const cursorRef     = useRef(null)
  const particlesRef  = useRef(null)
  const scrollCueRef  = useRef(null)

  // Typing effect state
  const [typedText, setTypedText]   = useState('')
  const [roleIndex, setRoleIndex]   = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // ---- Typing effect ----
  useEffect(() => {
    const current = ROLES[roleIndex % ROLES.length]
    let timer

    if (!isDeleting && typedText.length < current.length) {
      timer = setTimeout(() => setTypedText(current.slice(0, typedText.length + 1)), 90)
    } else if (!isDeleting && typedText.length === current.length) {
      timer = setTimeout(() => setIsDeleting(true), 1400)
    } else if (isDeleting && typedText.length > 0) {
      timer = setTimeout(() => setTypedText(current.slice(0, typedText.length - 1)), 45)
    } else {
      setIsDeleting(false)
      setRoleIndex(i => i + 1)
    }

    return () => clearTimeout(timer)
  }, [typedText, isDeleting, roleIndex])

  // ---- GSAP Animations ----
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Content entrance — slides up on load
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      )

      // Scroll indicator — bounces forever
      gsap.to(scrollCueRef.current, {
        y: 10,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Floating particles — each moves randomly forever
      Array.from(particlesRef.current.children).forEach(dot => {
        gsap.to(dot, {
          y: 'random(-30, 30)',
          x: 'random(-20, 20)',
          opacity: 'random(0.2, 0.7)',
          duration: gsap.utils.random(3, 8),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 3),
        })
      })

    })

    return () => ctx.revert()
  }, [])

  // ---- Cursor follower ----
  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <main ref={containerRef} className={styles.page}>

      {/* Cursor follower */}
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />

      {/* Background image */}
      <div className={styles.bgImage} aria-hidden="true" />

      {/* Dark overlay on top of image */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Floating particles */}
      <div ref={particlesRef} className={styles.particles} aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className={styles.dot}
            style={{
              top:  `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div ref={contentRef} className={styles.content}>

        {/* Greeting */}
        <p className={styles.greeting}>
          <span>👋</span> Hello, I'm
        </p>

        {/* Name */}
        <h1 className={styles.name}>
          Madien <span className={styles.nameAccent}>Elsayed</span>
        </h1>

        {/* Typing role */}
        <h2 className={styles.role}>
          {typedText}
          <span className={styles.typingCursor}>|</span>
        </h2>

        {/* Description */}
        <p className={styles.description}>
          I build fast, animated web interfaces with clean code
          and great user experiences.
        </p>

        {/* Buttons */}
        <div className={styles.buttons}>
          <Link to="/projects" className={styles.btnPrimary}>
            View My Work <ArrowForwardIcon fontSize="small"></ArrowForwardIcon>
          </Link>
          <Link to="/contact" className={styles.btnSecondary}>
            Contact Me < ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon>
          </Link>
          <a href="/cv.pdf" download className={styles.btnCV}>
            
          </a>
        </div>

        {/* Social icons */}
        <div className={styles.socials}>
          <a href="https://github.com/sayedmadain887-dev" target="_blank" rel="noopener noreferrer" className={styles.socialLink}> <GitHubIcon fontSize="small"></GitHubIcon></a>
          <a href="https://www.linkedin.com/in/madien-elsayed-ba8252420?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <LinkedInIcon fontSize="small"></LinkedInIcon>
          </a>
          <a href="madien.alsayed.dev@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <EmailIcon fontSize="small"></EmailIcon>
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <div ref={scrollCueRef} className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollText}></span>
        <span className={styles.scrollLine} />
      </div>
      
       
    </main>
  )
}
    

  
  


export default Home