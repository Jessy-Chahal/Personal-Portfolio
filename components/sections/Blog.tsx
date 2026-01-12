'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Blog.module.css'
import ShuffledHeading from '@/components/ShuffledHeading'
import { blogPosts } from '@/app/blog/posts'

export default function Blog() {
  const [visiblePosts, setVisiblePosts] = useState<Set<number>>(new Set())
  const postRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    postRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisiblePosts((prev) => new Set([...Array.from(prev), index]))
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
    <section id="blog" className={styles.blog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>04</span>
          <ShuffledHeading text="Blog" className={styles.title} />
        </div>
        
        <div className={styles.postsGrid}>
          {blogPosts.map((post, index) => (
            <article
              key={index}
              ref={(el) => { postRefs.current[index] = el }}
              className={`${styles.postCard} ${visiblePosts.has(index) ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.postHeader}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.date}>{post.date}</span>
              </div>
              
              <h3 className={styles.postTitle}>{post.title}</h3>
              
              <p className={styles.excerpt}>{post.excerpt}</p>
              
              <div className={styles.postFooter}>
                <span className={styles.readTime}>{post.readTime}</span>
                <a href={`/blog/${post.slug}`} className={styles.readMore}>
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
