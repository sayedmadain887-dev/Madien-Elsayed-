// Projects.js
// Projects page — sidebar filter + project cards.
// On load: shows a modal announcing the latest launched project.
// Clicking a card with links shows Live/GitHub options.
// Clicking a comingSoon card shows a "Coming Soon" modal.

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { projects, LEVELS } from '../../data/projects'
import styles from './Projects.module.css'

const LAUNCHED_PROJECT = 'Educational Center Platform'

function ProjectCard({ project }) {
  const [showModal, setShowModal] = useState(false)
  const [showLinks, setShowLinks] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    if (project.comingSoon) {
      setShowModal(true)
    } else {
      setShowLinks(true)
    }
  }

  return (
    <>
      <div className={styles.card} onClick={handleClick}>

        <div className={styles.imageWrapper}>
          {project.image ? (
            <img src={project.image} alt={project.title} className={styles.image} />
          ) : (
            <div className={styles.placeholder}>
              <span>{project.title[0]}</span>
            </div>
          )}
          {project.comingSoon && (
            <div className={styles.comingSoonBadge}>Coming Soon</div>
          )}
        </div>

        <div className={styles.cardContent}>
          <span className={`${styles.levelTag} ${styles[project.level]}`}>
            {project.level}
          </span>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDesc}>{project.description}</p>
          <div className={styles.tags}>
            {project.stack.map(tech => (
              <span key={tech} className={styles.tag}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Links Modal ===== */}
      {showLinks && (
        <div className={styles.modalOverlay} onClick={() => setShowLinks(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <span className={styles.modalIcon}>🚀</span>
            <h3 className={styles.modalTitle}>{project.title}</h3>
            <p className={styles.modalText}>Where would you like to go?</p>
            <div className={styles.linkBtns}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnLive}
                >
                  🌐 Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnGithub}
                >
                  💻 GitHub
                </a>
              )}
            </div>
            <button className={styles.modalClose} onClick={() => setShowLinks(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===== Coming Soon Modal ===== */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <span className={styles.modalIcon}>🚧</span>
            <h3 className={styles.modalTitle}>Coming Soon</h3>
            <p className={styles.modalText}>
              <strong>{project.title}</strong> will be added here soon.
            </p>
            <button className={styles.modalClose} onClick={() => setShowModal(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function Projects() {
  const [activeLevel, setActiveLevel]         = useState('all')
  const [showLaunchModal, setShowLaunchModal] = useState(true)
  const gridRef                               = useRef(null)

  const filteredProjects =
    activeLevel === 'all'
      ? projects
      : projects.filter(p => p.level === activeLevel)

  useEffect(() => {
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
    )
  }, [activeLevel])

  return (
    <main className={styles.page}>

      {/* ===== Launch Modal ===== */}
      {showLaunchModal && (
        <div className={styles.modalOverlay} onClick={() => setShowLaunchModal(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <span className={styles.modalIcon}>🎉</span>
            <h3 className={styles.modalTitle}>New Project Launched!</h3>
            <p className={styles.modalText}>
              <strong>{LAUNCHED_PROJECT}</strong> is now live and available to view!
            </p>
            <button
              className={styles.modalClose}
              onClick={() => setShowLaunchModal(false)}
            >
              View Projects
            </button>
          </div>
        </div>
      )}

      {/* ===== Header ===== */}
      <div className={styles.header}>
        <p className={styles.label}>{"// my work"}</p>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>
          A collection of projects across different levels of complexity.
        </p>
      </div>

      <div className={styles.layout}>

        {/* ===== Sidebar Filter ===== */}
        <aside className={styles.sidebar}>
          {LEVELS.map(level => (
            <button
              key={level.key}
              onClick={() => setActiveLevel(level.key)}
              className={
                activeLevel === level.key
                  ? `${styles.filterBtn} ${styles.active}`
                  : styles.filterBtn
              }
            >
              {level.label}
            </button>
          ))}
        </aside>

        {/* ===== Projects Grid ===== */}
        <div ref={gridRef} className={styles.grid}>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>

    </main>
  )
}

export default Projects