// About .js 
// About.js
// About page — personal info, stats, timeline, fun fact, download CV.

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DownloadIcon from '@mui/icons-material/Download'
import styles from './About.module.css'
import aboutImg from '../../assets/about.jpg'
gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '1+',  label: 'Years of Experience' },
  { value: '10+', label: 'Projects Completed' },
  { value: '5+',  label: 'Happy Clients' },
  { value: '8+',  label: 'Technologies' },
]

const TIMELINE = [
  {
    year: '2024',
    title: 'Started Frontend Development',
    desc: 'Began learning HTML, CSS, and JavaScript and React seriously.',
  },
  {
    year: '2025',
    title: ' Built Multiple Front-End Projects',
    desc: "Developed real-world projects including  Hospital,Restaurant,Educational Center and Design Agency websites."
  },
    {
    year: '2025',
    title: 'Started Back-end Development',
    desc: 'Building complate web applications with Front-end,Back-End,APIs, authentication systems,and databasses',
  },
]

function About() {
  const heroRef    = useRef(null)
  const statsRef   = useRef(null)
  const timelineRef = useRef(null)
  const factRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hero entrance
      gsap.fromTo(heroRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )

      // Stats — count up on scroll
      gsap.fromTo(statsRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          }
        }
      )

      // Timeline items — slide in on scroll
      gsap.fromTo(timelineRef.current.children,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
          }
        }
      )

      // Fun fact
      gsap.fromTo(factRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: factRef.current,
            start: 'top 85%',
          }
        }
      )

    })

    return () => ctx.revert()
  }, [])

  return (
    <main className={styles.page}>

      {/* ===== Hero ===== */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.label}>{"// About me"}</p>
          <h1 className={styles.title}>
            Madien<span className={styles.accent}> Elsayed</span>
          </h1>
          <p className={styles.bio}>
            Full-Stack Developer passionate about building modern, secure, and scalable web applications. Experienced in developing responsive front-end interfaces and robust back-end systems, including APIs, authentication, authorization, and database integration. Focused on writing clean code, solving real-world problems, and continuously improving my skills through practical projects and hands-on learning.



          </p>
        </div>
        <div className={styles.heroImage}>
          
          <div className={styles.imageBorder} />
           <img src={aboutImg} alt="About Me" className={styles.heroImag} />
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className={styles.statsSection}>
        <div ref={statsRef} className={styles.statsGrid}>
          {STATS.map(stat => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Timeline ===== */}
      <section className={styles.timelineSection}>
        <p className={styles.label}>{"// My journey"}</p>
        <h2 className={styles.sectionTitle}>Timeline</h2>
        <div ref={timelineRef} className={styles.timeline}>
          {TIMELINE.map((item, i) => (
            <div key={i} className={styles.timelineItem}>
              <span className={styles.timelineYear}>{item.year}</span>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>{item.title}</h3>
                <p className={styles.timelineDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Fun Fact ===== */}
      <section ref={factRef} className={styles.factSection}>
        <div className={styles.factCard}>
          <span className={styles.factIcon}>💡</span>
          <p className={styles.factText}>
            "I believe every pixel matters — good design is invisible,
            but bad design is everywhere."
          </p>
        </div>
      </section>

      {/* ===== Download CV ===== */}
      <section className={styles.cvSection}>
        <a href="/asstets/CV_FullStack_Developer-3.docx" download="Madien Elsayed" className={styles.btnCV}>
          <DownloadIcon fontSize="small" />
          Download CV
        </a>
      </section>

    </main>
  )
}

export default About