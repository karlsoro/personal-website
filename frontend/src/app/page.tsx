import MainLayout from '@/components/layout/MainLayout'
import Hero from '@/components/features/Hero'
import About from '@/components/features/About'
import Projects from '@/components/features/Projects'
import HomeBlogSection from '@/components/features/HomeBlogSection'
import Contact from '@/components/features/Contact'

async function getLatestBlogPosts() {
  const res = await fetch('http://localhost:3001/api/blog?limit=2', { cache: 'no-store' });
  const data = await res.json();
  return data.data || [];
}

export default async function Home() {
  const blogPosts = await getLatestBlogPosts();
  return (
    <MainLayout>
      <Hero />
      <About />
      <Projects />
      <HomeBlogSection posts={blogPosts} />
      <Contact />
    </MainLayout>
  )
}
