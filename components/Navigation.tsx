'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import styles from './Navigation.module.css'
import Logo from './Logo'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Only update active section if we're on the homepage
      if (pathname === '/') {
        const sections = ['about', 'experience', 'projects', 'blog', 'contact']
        const scrollPosition = window.scrollY + 150

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false)
    
    // If we're not on the homepage, navigate there first
    if (pathname !== '/') {
      // Mark that we're navigating client-side to skip loading screen
      sessionStorage.setItem('isClientSideNav', 'true')
      sessionStorage.setItem('scrollToSection', sectionId)
      router.push('/')
    } else {
      // We're on homepage, just scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <>
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContent}>
          <div className={styles.logo} onClick={() => {
            setIsMobileMenuOpen(false)
            if (pathname !== '/') {
              sessionStorage.setItem('isClientSideNav', 'true')
              router.push('/')
            } else {
              scrollToSection('about')
            }
          }}>
            <Logo />
          </div>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={isMobileMenuOpen ? styles.open : ''}></span>
            <span className={isMobileMenuOpen ? styles.open : ''}></span>
            <span className={isMobileMenuOpen ? styles.open : ''}></span>
          </button>
          <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
            <button
              className={activeSection === 'about' ? styles.active : ''}
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
            <button
              className={activeSection === 'experience' ? styles.active : ''}
              onClick={() => scrollToSection('experience')}
            >
              Experience
            </button>
            <button
              className={activeSection === 'projects' ? styles.active : ''}
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>
            <button
              className={activeSection === 'blog' ? styles.active : ''}
              onClick={() => scrollToSection('blog')}
            >
              Blog
            </button>
            <button
              className={activeSection === 'contact' ? styles.active : ''}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileBackdrop}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
