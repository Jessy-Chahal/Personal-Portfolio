'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './ShuffledHeading.module.css'

interface ShuffledHeadingProps {
  text: string
  className?: string
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

export default function ShuffledHeading({ text, className = '' }: ShuffledHeadingProps) {
  const [displayText, setDisplayText] = useState(text)
  const shuffleIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const iterationRef = useRef(0)
  const revealedCountRef = useRef(0)

  const getRandomChar = () => {
    return CHARS[Math.floor(Math.random() * CHARS.length)]
  }

  const handleMouseEnter = () => {
    iterationRef.current = 0
    revealedCountRef.current = 0
    
    // Reset to all random characters
    setDisplayText(
      text
        .split('')
        .map(char => char === ' ' ? ' ' : getRandomChar())
        .join('')
    )
    
    shuffleIntervalRef.current = setInterval(() => {
      iterationRef.current++
      
      // Calculate how many characters should be revealed
      // Reveal one character approximately every 3-4 iterations
      const targetRevealed = Math.min(
        Math.floor(iterationRef.current / 3),
        text.length
      )
      
      setDisplayText(prev => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            
            // If this character should be revealed, show correct char
            if (index < targetRevealed) {
              return text[index]
            }
            
            // Otherwise, show random char
            return getRandomChar()
          })
          .join('')
      })
      
      // Stop when all characters are revealed
      if (targetRevealed >= text.length) {
        if (shuffleIntervalRef.current) {
          clearInterval(shuffleIntervalRef.current)
          shuffleIntervalRef.current = null
        }
        setDisplayText(text)
      }
    }, 50)
  }

  const handleMouseLeave = () => {
    if (shuffleIntervalRef.current) {
      clearInterval(shuffleIntervalRef.current)
      shuffleIntervalRef.current = null
    }
    iterationRef.current = 0
    revealedCountRef.current = 0
    setDisplayText(text)
  }

  useEffect(() => {
    return () => {
      if (shuffleIntervalRef.current) {
        clearInterval(shuffleIntervalRef.current)
      }
    }
  }, [])

  return (
    <h2 
      className={`${styles.title} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText.split('').map((char, index) => (
        <span key={index} className={styles.char}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h2>
  )
}
