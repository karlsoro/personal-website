import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import BlogDetailClient from './BlogDetailClient';

interface BlogPost {
  _id: string;
  title: string;
  subtitle: string;
  summaryBody: string;
  update?: string;
  update2025?: string;
  detail: string;
  date: string;
  createdAt: string;
  image?: string;
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    // Use direct backend URL for public blog access
    const apiUrl = process.env.NODE_ENV === 'development'
      ? `http://localhost:3001/api/blog/${id}`
      : `https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/${id}`;
      
    const res = await fetch(apiUrl, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.data || null;
  } catch {
    // console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPost(id);
  
  if (!post) return notFound();

  return (
    <>
      <Header />
      <BlogDetailClient post={post} />
    </>
  );
} 