'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Experience.module.css'
import ShuffledHeading from '@/components/ShuffledHeading'

interface Experience {
  company: string
  role: string
  period: string
  description: string[]
  technologies: string[]
}

const experiences: Experience[] = [
  {
    company: 'Simon Fraser University',
    role: 'Teaching Assistant',
    period: '09/2025 - Present',
    description: [
      'Supported undergradaute students by holding office hours and providing clear assignment feedback',
      'Graded coursework and assisted professors in managing course activities',
      'Helped students develop strong problem-solving and programming skills'
    ],
    technologies: ['Leadership', 'Problem-solving', 'Mentoring', 'Communication']
  },
  {
    company: 'Boeing Inc.', 
    role: 'Software Engineer',
    period: '09/2023 - 12/2024',
    description: [
      'Built security monitoring pipelines using Azure alerts for unauthorized access',
      'Developed secure internal APIs to manage permissions across multi-cloud environments',
      'Created full-stack dashboards to display real-time customer and contract data',
      'Automated CI/CD pipelines and code quality checks to improve deployment reliability'
    ],
    technologies: ['Python', 'React', 'Azure', 'Databricks', 'CI/CD', 'SQL']
  },
  {
    company: 'Intel Corporation',
    role: 'Video Codec Engineer',
    period: '01/2022 - 08/2023',
    description: [
      'Improved video encoder performance by adding new encoding speeds and bitrate controls',
      'Fixed bugs in open-source encoder code and improved error handling in C',
      'Automated performance analysis using Python scripts and data visualizations',
      'Reduced setup time by automating unit tests on Linux servers'
    ],
    technologies: ['C', 'Python', 'FFmpeg', 'GStreamer', 'Linux', 'Git']
  }
]

export default function Experience() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...Array.from(prev), index]))
              observer.unobserve(ref)
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px',
        }
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>02</span>
          <ShuffledHeading text="Work Experience" className={styles.title} />
        </div>
        
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) {
                  itemRefs.current[index] = el
                }
              }}
              className={`${styles.timelineItem} ${visibleItems.has(index) ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={styles.timelineMarker}></div>
              <div className={styles.timelineContent}>
                <div className={styles.roleHeader}>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <h4 className={styles.company}>{exp.company}</h4>
                <ul className={styles.descriptionList}>
                  {exp.description.map((item, i) => (
                    <li key={i} className={styles.descriptionItem}>{item}</li>
                  ))}
                </ul>
                <div className={styles.technologies}>
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
