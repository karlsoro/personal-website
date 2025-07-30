import MainLayout from '@/components/layout/MainLayout'
import Hero from '@/components/features/Hero'
import About from '@/components/features/About'
import Projects from '@/components/features/Projects'
import HomeBlogSection from '@/components/features/HomeBlogSection'
import Contact from '@/components/features/Contact'

async function getLatestBlogPosts() {
  // Use direct backend URL for public blog access
  const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/blog/home'
    : 'https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/home';
    
  const res = await fetch(apiUrl, { 
    cache: 'no-store'
  });
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
