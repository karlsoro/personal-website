import MainLayout from '@/components/layout/MainLayout'
import Blog from '@/components/features/Blog'

async function getAllBlogPosts() {
  // Use direct backend URL for public blog access
  const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/blog'
    : 'https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog';
    
  const res = await fetch(apiUrl, { 
    cache: 'no-store'
  });
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