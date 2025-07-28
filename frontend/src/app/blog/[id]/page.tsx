import { Box, Container, Heading, Text, VStack, Flex, Button } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import MarkdownClient from './MarkdownClient';

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
    const res = await fetch(`https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/${id}`, {
      cache: 'no-store',
      next: { revalidate: 0 },
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
      }
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPost(id);
  
  if (!post) return notFound();

  return (
    <Box py={0} bg="gray.50" minH="100vh">
      <Header />
      <Container maxW={'4xl'} pt={10}>
        {/* Back to posts navigation */}
        <Flex mb={6}>
          <Link href="/blog">
            <Button variant="outline" colorScheme="blue">← Back to Blog Posts</Button>
          </Link>
        </Flex>
        
        <Heading as="h1" size="2xl" mb={4}>{post.title}</Heading>
        
        <VStack align="start" spacing={6}>
          <Box>
            <Text fontWeight="bold">Summary:</Text>
            <Text>{post.summaryBody}</Text>
          </Box>
          
          {post.update && (
            <Box>
              <Text fontWeight="bold">Update:</Text>
              <Text>{post.update}</Text>
            </Box>
          )}
          
          {post.update2025 && (
            <Box>
              <Text fontWeight="bold">Update 2025:</Text>
              <Text>{post.update2025}</Text>
            </Box>
          )}
          
          {/* Render markdown detail using client component */}
          <MarkdownClient content={post.detail} />
        </VStack>
      </Container>
    </Box>
  );
} 