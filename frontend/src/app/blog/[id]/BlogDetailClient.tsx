"use client";

import { Box, Container, Heading, Text, VStack, Flex, Button } from '@chakra-ui/react';
import { ArrowBackIcon, DownloadIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useState } from 'react';
import MarkdownClient from './MarkdownClient';
import { generatePDFFromMarkdown } from '@/services/pdfService';

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

interface BlogDetailClientProps {
  post: BlogPost;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadClick = async () => {
    setIsGenerating(true);
    try {
      // Create a comprehensive markdown content for the PDF
      const markdownContent = `# ${post.title}

${post.subtitle ? `## ${post.subtitle}` : ''}

**Summary:** ${post.summaryBody}

${post.update ? `**Update:** ${post.update}` : ''}

${post.update2025 ? `**Update 2025:** ${post.update2025}` : ''}

---

${post.detail}
`;

      // Create a filename-safe version of the title
      const safeTitle = post.title
        .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase();
      
      // Format the date
      const postDate = new Date(post.date);
      const dateString = postDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      await generatePDFFromMarkdown(markdownContent, {
        title: `${post.title} - Karl Sorochinski`,
        author: 'Karl Sorochinski',
        subject: 'Blog Post',
        filename: `${safeTitle}-${dateString}.pdf`
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box py={0} bg="gray.50" minH="100vh">
      <Container maxW={'4xl'} pt={10}>
        {/* Back to posts navigation and Download button */}
        <Flex justify="space-between" align="center" mb={6}>
          <Link href="/blog">
            <Button variant="outline" colorScheme="blue" leftIcon={<ArrowBackIcon />}>
              Back to Blog Posts
            </Button>
          </Link>
          <Button
            rightIcon={<DownloadIcon />}
            onClick={handleDownloadClick}
            colorScheme="blue"
            isLoading={isGenerating}
            loadingText="Generating PDF..."
          >
            Download
          </Button>
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