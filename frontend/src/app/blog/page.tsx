import MainLayout from '@/components/layout/MainLayout'
import Blog from '@/components/features/Blog'

async function getAllBlogPosts() {
  const res = await fetch('https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog?limit=1000', { 
    cache: 'no-store',
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_API_KEY || ''
    }
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