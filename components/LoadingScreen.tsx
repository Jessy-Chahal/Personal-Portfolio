'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './LoadingScreen.module.css'

interface LoadingScreenProps {
  onComplete?: () => void
  holdDuration?: number
}

const TEXT_ZYXIFY = 'ZYXIFY'
const HOLD_DURATION = 5000 // 5 seconds

const BLEND_MODES = [
  'multiply',
  // 'normal',
  // 'screen',
  // 'overlay',
  // 'soft-light',
  // 'hard-light',
  // 'color-dodge',
  // 'color-burn',
  // 'difference',
  // 'exclusion',
  // 'hue',
  // 'saturation',
  // 'color',
  // 'luminosity'
]

export default function LoadingScreen({ 
  onComplete, 
  holdDuration = HOLD_DURATION
}: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)
  const [revealedChars, setRevealedChars] = useState(0)
  const [displayText, setDisplayText] = useState(TEXT_ZYXIFY)
  const [blendModeIndex] = useState(0) // Always use multiply (index 0)
  // const [isSpaceHeld, setIsSpaceHeld] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isMouseHeld, setIsMouseHeld] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    // Character reveal animation for "ZYXIFY"
    setRevealedChars(0)
    const revealInterval = setInterval(() => {
      setRevealedChars(prev => {
        if (prev < TEXT_ZYXIFY.length) {
          return prev + 1
        }
        return prev
      })
    }, 150) // Reveal each character every 150ms

    return () => {
      clearInterval(revealInterval)
    }
  }, [])

  // Handle mouse hold progress - dismiss only when hold is complete
  useEffect(() => {
    if (isMouseHeld && startTimeRef.current !== null) {
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current!
        const progress = Math.min((elapsed / holdDuration) * 100, 100)
        setHoldProgress(progress)

        if (elapsed >= holdDuration) {
          // Complete loading - rectangle is finished
          setHoldProgress(100)
          setOpacity(0)
          setTimeout(() => {
            setIsVisible(false)
            onComplete?.()
          }, 800)
        }
      }, 16) // Update every ~16ms for smooth animation
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isMouseHeld, holdDuration, onComplete])

  // Handle mouse/touch movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setMousePosition({
          x: (e.touches[0].clientX / window.innerWidth) * 100,
          y: (e.touches[0].clientY / window.innerHeight) * 100,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // Handle mouse down (start holding)
  const handleMouseDown = () => {
    setIsMouseHeld(true)
    startTimeRef.current = Date.now()
    setHoldProgress(0)
  }

  // Handle mouse up (stop holding)
  const handleMouseUp = () => {
    setIsMouseHeld(false)
    startTimeRef.current = null
    setHoldProgress(0)
  }

  // Handle touch events
  const handleTouchStart = () => {
    handleMouseDown()
  }

  const handleTouchEnd = () => {
    handleMouseUp()
  }

  // Handle spacebar to cycle blend modes - COMMENTED OUT
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.code === 'Space') {
  //       e.preventDefault()
  //       setIsSpaceHeld(true)
  //       setBlendModeIndex((prev) => (prev + 1) % BLEND_MODES.length)
  //     }
  //   }

  //   const handleKeyUp = (e: KeyboardEvent) => {
  //     if (e.code === 'Space') {
  //       setIsSpaceHeld(false)
  //     }
  //   }

  //   window.addEventListener('keydown', handleKeyDown)
  //   window.addEventListener('keyup', handleKeyUp)

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown)
  //     window.removeEventListener('keyup', handleKeyUp)
  //   }
  // }, [])

  // Auto-cycle blend modes when spacebar is held - COMMENTED OUT
  // useEffect(() => {
  //   if (!isSpaceHeld) return

  //   const interval = setInterval(() => {
  //     setBlendModeIndex((prev) => (prev + 1) % BLEND_MODES.length)
  //   }, 200)

  //   return () => clearInterval(interval)
  // }, [isSpaceHeld])

  if (!isVisible) return null

  const currentBlendMode = BLEND_MODES[blendModeIndex]
  const securityStatus =
    !isMouseHeld || holdProgress === 0
      ? 'IDLE'
      : holdProgress < 25
        ? 'INITIALIZING'
        : holdProgress < 50
          ? 'SCANNING'
          : holdProgress < 75
            ? 'ENCRYPTING'
            : holdProgress < 100
              ? 'HARDENING'
              : 'ACCESS GRANTED'

  return (
    <div 
      className={styles.loadingScreen}
      style={{ opacity }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dark overlay */}
      <div className={styles.darkOverlay}></div>

      {/* Scanlines overlay */}
      <div className={styles.scanlines}></div>

      {/* Glitch overlay */}
      <div className={styles.glitchOverlay}></div>

      {/* Noise texture */}
      <div className={styles.noise}></div>

      {/* Interactive blend mode layers */}
      <div 
        className={styles.blendLayer1}
        style={{ 
          mixBlendMode: currentBlendMode as any,
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1), transparent 50%)`
        }}
      ></div>
      <div 
        className={styles.blendLayer2}
        style={{ 
          mixBlendMode: currentBlendMode as any,
          background: `radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(0, 255, 255, 0.15), transparent 50%)`
        }}
      ></div>
      <div 
        className={styles.blendLayer3}
        style={{ 
          mixBlendMode: currentBlendMode as any,
          background: `radial-gradient(circle at ${mousePosition.x}% ${100 - mousePosition.y}%, rgba(255, 0, 255, 0.1), transparent 50%)`
        }}
      ></div>

      {/* Security status indicator */}
      <div className={styles.blendIndicator}>
        <span className={styles.blendLabel}>Security Protocol:</span>
        <span className={styles.blendValue}>{securityStatus}</span>
      </div>

      {/* Instructions */}
      <div className={styles.instructions}>
        <p className={styles.mainInstruction}>
          {isMouseHeld && startTimeRef.current 
            ? `Hold for ${Math.max(0, (holdDuration - (Date.now() - startTimeRef.current)) / 1000).toFixed(1)}s` 
            : 'Hold for 5 seconds to enter'}
        </p>
      </div>

      {/* Text reveal with rectangle */}
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <div className={styles.textContainer}>
            {displayText.split('').map((char, index) => (
              <span
                key={`${displayText}-${index}`}
                className={`${styles.char} ${index < revealedChars ? styles.revealed : ''} ${styles.glitchText}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          {/* Animated rectangle border */}
          <div className={styles.rectangleBorder}>
            <svg className={styles.rectangleSVG} viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect
                x="2"
                y="2"
                width="96"
                height="96"
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="1"
                strokeDasharray="400"
                strokeDashoffset={400 - (holdProgress * 4)}
                style={{ 
                  transition: 'stroke-dashoffset 0.05s linear',
                  opacity: isMouseHeld ? 1 : 0
                }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
