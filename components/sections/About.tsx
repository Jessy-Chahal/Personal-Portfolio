'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './About.module.css'
import ShuffledHeading from '@/components/ShuffledHeading'
import GlitchText from '@/components/GlitchText'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    )

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current)
      }
    }
  }, [])

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>01</span>
          <ShuffledHeading text="About Me" className={styles.title} />
        </div>
        
        <div ref={contentRef} className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.textContent}>
            <p className={styles.intro}>
              Hi, I'm Jessy (a.k.a <GlitchText text="Zyxify" />). I am a Masters in Cybersecurity student at Simon Fraser University, passionate 
              about protecting digital infrastructure and understanding the ever-evolving 
              landscape of cyber threats. With a strong foundation in software development, network security, 
              and information assurance, I'm committed to building a safer digital world.
            </p>
            <p className={styles.description}>
              My journey in cybersecurity is driven by curiosity about how systems work 
              and how they can be secured. Whether it's analyzing vulnerabilities, 
              practicing penetration testing, studying cryptography, or exploring 
              incident response strategies, I'm constantly learning and applying new 
              techniques to stay ahead of emerging threats. I use my skills to strengthen defenses rather than exploit them.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
