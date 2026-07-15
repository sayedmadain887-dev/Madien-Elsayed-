// Sidebar.js
// Fixed navigation panel on the left side of the screen.
// Contains: Logo at top, nav links in middle.
// On mobile: hidden and replaced by a drawer that opens on button click.

import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import gsap from 'gsap'
import Logo from '../Logo/Logo'
import styles from './Sidebar.module.css'

// Nav links — to add a new page, add it here only
const NAV_LINKS = [
  { to: '/',         label: 'Home',  hash:"home" },
  { to: '/about',    label: 'About', hash:"about" },
  {to:"./skills", label:"Skills", hash:"skills"},
  { to: '/projects', label: 'Projects', hash:"projects" },
  { to: '/contact',  label: 'Contact', hash:"contact" },
  
  
]

function Sidebar() {
  const sidebarRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  // Entrance animation — slides in from left on first load
  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current,
      { x: -72, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <>
      {/* Desktop Sidebar */}
      <aside ref={sidebarRef} className={styles.sidebar}>

        {/* Logo at top */}
        <div className={styles.top}>
          <Logo />
        </div>

        {/* Nav links in middle */}
        <nav className={styles.nav}>
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

      </aside>

      {/* Mobile burger button */}
      <button
        className={styles.burger}
        onClick={() => setIsOpen(v => !v)}
        aria-label="Open menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      {isOpen && (
        <div className={styles.drawer}>
          <Logo onClick={() => setIsOpen(false)} />
          <nav className={styles.drawerNav}>
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}

export default Sidebar;