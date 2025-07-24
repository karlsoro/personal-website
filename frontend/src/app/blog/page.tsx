import MainLayout from '@/components/layout/MainLayout'
import Blog from '@/components/features/Blog'

async function getAllBlogPosts() {
  const res = await fetch('http://localhost:3001/api/blog?limit=1000', { cache: 'no-store' });
  const data = await res.json();
  return data.data || [];
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return (
    <MainLayout>
      <Blog posts={posts} />
    </MainLayout>
  )
} 