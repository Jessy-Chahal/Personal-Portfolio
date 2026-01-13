import Navigation from '@/components/Navigation'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <About />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}
