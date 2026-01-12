'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import LoadingScreen from '@/components/LoadingScreen'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hasInitialized = useRef(false)
  const [mounted, setMounted] = useState(false)
  // Always start with false to match server render
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Mark as mounted and check loading immediately
    setMounted(true)
    
    // Only run on client side
    if (typeof window === 'undefined') return
    
    // Only initialize once per pathname change
    if (hasInitialized.current) {
      // Reset for new pathname
      hasInitialized.current = false
    }
    hasInitialized.current = true
    
    // Only show loading screen on the homepage (/)
    if (pathname === '/') {
      // Check if we're navigating to a specific section (skip loading screen)
      const scrollToSectionId = sessionStorage.getItem('scrollToSection')
      if (scrollToSectionId) {
        sessionStorage.removeItem('scrollToSection')
        setIsLoading(false)
        setTimeout(() => {
          const targetSection = document.getElementById(scrollToSectionId)
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
        return
      }
      
      // Check if we're navigating from a blog post (skip loading screen)
      const fromBlog = sessionStorage.getItem('fromBlog')
      if (fromBlog === 'true') {
        sessionStorage.removeItem('fromBlog')
        setIsLoading(false)
        // Scroll to blog section after a brief delay
        setTimeout(() => {
          const blogSection = document.getElementById('blog')
          if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
        return
      }
      
      // Check navigation type and session state
      try {
        const navEntry = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const navigationType = navEntry?.type
        const isClientSideNav = sessionStorage.getItem('isClientSideNav') === 'true'
        
        // Show loading screen if:
        // 1. It's a page reload/refresh, OR
        // 2. It's an initial visit (navigate type) and NOT a client-side navigation
        const shouldShowLoading = 
          navigationType === 'reload' || 
          (navigationType === 'navigate' && !isClientSideNav)
        
        if (shouldShowLoading) {
          // Set loading to true - it will stay until user completes the hold
          setIsLoading(true)
          // Clear the client-side nav flag for next time
          sessionStorage.removeItem('isClientSideNav')
        } else {
          // Don't show loading for client-side navigation
          setIsLoading(false)
        }
      } catch (e) {
        // Fallback: show loading (assume it's an initial visit if we can't determine)
        const isClientSideNav = sessionStorage.getItem('isClientSideNav') === 'true'
        if (!isClientSideNav) {
          setIsLoading(true)
          sessionStorage.removeItem('isClientSideNav')
        } else {
          setIsLoading(false)
        }
      }
    } else {
      // Don't show loading screen for any other routes
      setIsLoading(false)
      // Mark that we've navigated client-side (so homepage won't show loading on client-side navigation)
      sessionStorage.setItem('isClientSideNav', 'true')
    }
  }, [pathname]) // Only depend on pathname

  return (
    <>
      {isLoading && (
        <LoadingScreen 
          onComplete={() => setIsLoading(false)}
        />
      )}
      <div style={{ 
        opacity: (isLoading || (pathname === '/' && !mounted)) ? 0 : 1,
        transition: 'opacity 0.5s ease-in',
        pointerEvents: (isLoading || (pathname === '/' && !mounted)) ? 'none' : 'auto',
        visibility: (isLoading || (pathname === '/' && !mounted)) ? 'hidden' : 'visible'
      }}>
        {children}
      </div>
    </>
  )
}
