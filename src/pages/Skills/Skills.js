// Skills.js 

// Skills page — circular progress bars for each skill.
// Animation: circles fill up when scrolled into view using GSAP + ScrollTrigger.

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

// Skills data — change the level (0-100) to match your real skill level
const SKILLS = [
  { name: 'HTML',       level: 90, color: '#E8A33D' },
  { name: 'CSS',        level: 85, color: '#7C3AED' },
  { name: 'JavaScript', level: 75, color: '#5FB9A3' },
  { name: 'React',      level: 70, color: '#7C3AED' },
  { name: 'Tailwind',   level: 80, color: '#5FB9A3' },
  { name: 'Bootstrap',  level: 85, color: '#E8A33D'
   },
   {name: 'Node.js',    level: 85, color: '#5FB9A3' },
   {name: 'Express.js', level: 70, color: '#7C3AED' },
   {name: 'MongoDB',    level: 80, color: '#5FB9A3' },
   {name: 'GitHub',     level: 80, color: '#E8A33D' },
   
  { name: 'Git',        level: 70, color: '#7C3AED' },
]

// Circle math — radius controls the size of the circle
const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function SkillCircle({ name, level, color }) {
  const circleRef = useRef(null)

  useEffect(() => {
    // Calculate how much of the circle to fill
    const offset = CIRCUMFERENCE - (level / 100) * CIRCUMFERENCE

    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: CIRCUMFERENCE },
      {
        strokeDashoffset: offset,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: circleRef.current,
          start: 'top 85%',
        },
      }
    )
  }, [level])

  return (
    <div className={styles.skillItem}>
      {/* SVG Circle */}
      <div className={styles.circleWrapper}>
        <svg width="130" height="130" className={styles.svg}>
          {/* Background circle — grey track */}
          <circle
            cx="65"
            cy="65"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          {/* Foreground circle — fills up with animation */}
          <circle
            ref={circleRef}
            cx="65"
            cy="65"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            // Start from top instead of right side
            transform="rotate(-90 65 65)"
          />
        </svg>
        {/* Percentage text in the middle */}
        <div className={styles.percentage}>
          <span className={styles.percentValue} style={{ color }}>
            {level}%
          </span>
        </div>
      </div>
      {/* Skill name below circle */}
      <p className={styles.skillName}>{name}</p>
    </div>
  )
}

function Skills() {
  const titleRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <main className={styles.page}>
      <div ref={titleRef} className={styles.header}>
        <p className={styles.label}>{"// what I work with"}</p>
        <h1 className={styles.title}>My Skills</h1>
        <p className={styles.subtitle}>
          Technologies and tools I use to build great web experiences.
        </p>
      </div>

      <div className={styles.grid}>
        {SKILLS.map(skill => (
          <SkillCircle
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={skill.color}
          />
        ))}
      </div>
    </main>
  )
}

export default Skills


