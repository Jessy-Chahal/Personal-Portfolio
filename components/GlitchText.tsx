'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './GlitchText.module.css'

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [isHovering, setIsHovering] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    setIsHovering(true)
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Stop glitch effect after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false)
    }, 1000)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    
    // Clear timeout if mouse leaves before 3 seconds
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <span 
      className={`${styles.glitchText} ${isHovering ? styles.active : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.text} data-text={text}>{text}</span>
      <span className={styles.text} aria-hidden="true" data-text={text}>{text}</span>
      <span className={styles.text} aria-hidden="true" data-text={text}>{text}</span>
    </span>
  )
}
