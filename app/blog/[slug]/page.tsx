'use client'

import { useParams, useRouter } from 'next/navigation'
import styles from './page.module.css'
import Navigation from '@/components/Navigation'
import { blogPosts } from '../posts'

export default function BlogPost() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const post = blogPosts.find(p => p.slug === slug)

  const handleBackToBlog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Mark that we're navigating from blog to skip loading screen
    sessionStorage.setItem('fromBlog', 'true')
    sessionStorage.setItem('isClientSideNav', 'true')
    router.push('/')
  }

  if (!post) {
    return (
      <>
        <Navigation />
        <div className={styles.blogPost}>
          <div className={styles.container}>
            <h1>Post Not Found</h1>
            <a href="/" onClick={handleBackToBlog} className={styles.backLink}>← Back to Blog</a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <article className={styles.blogPost}>
        <div className={styles.container}>
          <a href="/" onClick={handleBackToBlog} className={styles.backLink}>← Back to Blog</a>
          
          <div className={styles.header}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}>{post.date}</span>
            <span className={styles.readTime}>{post.readTime}</span>
          </div>
          
          <h1 className={styles.title}>{post.title}</h1>
          
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  )
}
