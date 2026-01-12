'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Projects.module.css'
import ShuffledHeading from '@/components/ShuffledHeading'

interface Project {
  name: string
  description: string
  github: string
  live?: string
  technologies: string[]
  stars?: number
  forks?: number
  private?: boolean
}

const projects: Project[] = [
  {
    name: 'Jessy-Chahal',
    description: 'My personal portfolio website built with a modern dark theme and interactive loading screen.',
    github: 'https://github.com/Jessy-Chahal/Personal-Portfolio',
    technologies: ['Next.js', 'React', 'TypeScript', 'CSS Modules'],
    stars: 893,
    forks: 57
  },
    {
      name: 'Yankit',
      description: 'AI-powered system that detects phishing sites by analyzing page content, structure, and URLs.',
      github: 'https://github.com/Jessy-Chahal/yankit',
      technologies: ['Python', 'Crawl4AI', 'FastAPI', 'Langchain'],
      stars: 850,
      forks: 180,
      private: true
    },
    {
      name: 'Similarity Search',
      description: 'High-performance ML similarity search database optimized for multi-core CPUs/GPUs',
      github: 'https://github.com/Jessy-Chahal/similarity-search',
      private: true,
    technologies: ['Node.js', 'TypeScript', 'CLI'],
    stars: 650,
    forks: 120
  },
]

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...Array.from(prev), index]))
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
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>03</span>
          <ShuffledHeading text="Open Source Projects" className={styles.title} />
        </div>
        
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el }}
              className={`${styles.projectCard} ${visibleCards.has(index) ? styles.visible : ''}`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.projectHeader}>
                <h3 className={styles.projectName}>{project.name}</h3>
                {(project.stars || project.forks) && (
                  <div className={styles.stats}>
                    {project.stars && (
                      <span className={styles.stat}>
                        <span className={styles.statIcon}>★</span>
                        {project.stars}
                      </span>
                    )}
                    {project.forks && (
                      <span className={styles.stat}>
                        <span className={styles.statIcon}>F</span>
                        {project.forks}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <p className={styles.projectDescription}>{project.description}</p>
              
              <div className={styles.technologies}>
                {project.technologies.map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech}</span>
                ))}
              </div>
              
              <div className={styles.links}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  GitHub {project.private && '(Private)'} →
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Live Demo →
                  </a>
                )}
              </div>
              
              <div className={`${styles.glow} ${hoveredProject === index ? styles.active : ''}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
