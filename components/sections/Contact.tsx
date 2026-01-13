'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Contact.module.css'
import ShuffledHeading from '@/components/ShuffledHeading'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create mailto link with form data
    const recipient = 'jsc48@sfu.ca'
    const subject = encodeURIComponent(`Contact Form: ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\n\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    )
    
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`
    
    // Open mailto link
    window.location.href = mailtoLink
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
    }, 100)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>05</span>
          <ShuffledHeading text="Get In Touch" className={styles.title} />
        </div>
        
        <div ref={contentRef} className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.info}>
            <p className={styles.infoText}>
              I'm always open to discussing new projects, creative ideas, or 
              opportunities to be part of your vision. Feel free to reach out!
            </p>
            
            <div className={styles.contactMethods}>
              <a href="mailto:jsc48@sfu.ca" className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>jsc48@sfu.ca</span>
              </a>
              <a href="https://github.com/Jessy-Chahal" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <span className={styles.contactLabel}>GitHub</span>
                <span className={styles.contactValue}>github.com/Jessy-Chahal</span>
              </a>
              <a href="https://linkedin.com/in/jessy-chahal" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <span className={styles.contactLabel}>LinkedIn</span>
                <span className={styles.contactValue}>linkedin.com/jessy-chahal/</span>
              </a>
            </div>
          </div>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                rows={6}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
