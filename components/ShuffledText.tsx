'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './ShuffledText.module.css'

interface ShuffledTextProps {
  text: string
  className?: string
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

export default function ShuffledText({ text, className = '' }: ShuffledTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const shuffleIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const completeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const iterationRef = useRef(0)
  const isHoveringRef = useRef(false)
  const targetTextRef = useRef<string>(text)

  const getRandomChar = () => {
    return CHARS[Math.floor(Math.random() * CHARS.length)]
  }

  const completeShuffle = (targetText: string) => {
    // Clear any existing intervals
    if (shuffleIntervalRef.current) {
      clearInterval(shuffleIntervalRef.current)
      shuffleIntervalRef.current = null
    }
    
    if (completeIntervalRef.current) {
      clearInterval(completeIntervalRef.current)
      completeIntervalRef.current = null
    }
    
    // Complete the animation by quickly revealing all remaining characters
    let revealIndex = 0
    completeIntervalRef.current = setInterval(() => {
      setDisplayText(prev => {
        const newText = targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            
            // If this character should be revealed, show correct char
            if (index <= revealIndex) {
              return targetText[index]
            }
            
            // Otherwise, show random char
            return getRandomChar()
          })
          .join('')
        
        revealIndex++
        
        // Stop when all characters are revealed
        if (revealIndex >= targetText.length) {
          if (completeIntervalRef.current) {
            clearInterval(completeIntervalRef.current)
            completeIntervalRef.current = null
          }
          setDisplayText(targetText)
          return targetText
        }
        
        return newText
      })
    }, 40)
  }

  const handleMouseEnter = () => {
    if (isHoveringRef.current) return // Already hovering
    isHoveringRef.current = true
    iterationRef.current = 0
    
    // Clear any completion animation
    if (completeIntervalRef.current) {
      clearInterval(completeIntervalRef.current)
      completeIntervalRef.current = null
    }
    
    // Determine target text (toggle to the other one)
    const targetText = text
    targetTextRef.current = targetText
    
    // Reset to all random characters
    setDisplayText(
      targetText
        .split('')
        .map(char => char === ' ' ? ' ' : getRandomChar())
        .join('')
    )
    
    shuffleIntervalRef.current = setInterval(() => {
      iterationRef.current++
      
      // Calculate how many characters should be revealed
      const targetRevealed = Math.min(
        Math.floor(iterationRef.current / 3),
        targetText.length
      )
      
      setDisplayText(prev => {
        return targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            
            // If this character should be revealed, show correct char
            if (index < targetRevealed) {
              return targetText[index]
            }
            
            // Otherwise, show random char
            return getRandomChar()
          })
          .join('')
      })
      
      // Stop when all characters are revealed
      if (targetRevealed >= targetText.length) {
        if (shuffleIntervalRef.current) {
          clearInterval(shuffleIntervalRef.current)
          shuffleIntervalRef.current = null
        }
        setDisplayText(targetText)
        targetTextRef.current = targetText
      }
    }, 50)
  }

  const handleMouseLeave = () => {
    isHoveringRef.current = false
    
    // Complete the shuffle animation to the target word we were animating to
    completeShuffle(targetTextRef.current)
    iterationRef.current = 0
  }

  useEffect(() => {
    return () => {
      if (shuffleIntervalRef.current) {
        clearInterval(shuffleIntervalRef.current)
      }
      if (completeIntervalRef.current) {
        clearInterval(completeIntervalRef.current)
      }
    }
  }, [])

  return (
    <span 
      className={`${styles.shuffledText} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText.split('').map((char, index) => (
        <span key={index} className={styles.char}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
