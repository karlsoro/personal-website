import MainLayout from '@/components/layout/MainLayout'
import Hero from '@/components/features/Hero'
import About from '@/components/features/About'
import Projects from '@/components/features/Projects'
import Contact from '@/components/features/Contact'

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </MainLayout>
  )
}
