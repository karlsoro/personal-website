'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  subtitle: string;
  summaryBody: string;
  detail: string;
  date: string;
  createdAt: string;
}

export default function HomeBlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <Box py={20} bg="gray.50">
      <Container maxW={'7xl'}>
        <Stack spacing={4} as={Box} textAlign={'center'} mb={16}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Latest{' '}
            <Text as={'span'} color={'brand.500'}>
              Blog Posts
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'} mx={'auto'} fontSize={'lg'}>
            Read my latest thoughts and insights on software, tech, and more.
          </Text>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {posts.map((post) => (
            <Box
              key={post._id}
              bg="white"
              rounded={'xl'}
              shadow={'lg'}
              overflow={'hidden'}
              _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
              transition="all 0.3s"
            >
              <Image
                h={'200px'}
                w={'full'}
                src={
                  // Use a default image or a field if available
                  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                }
                objectFit={'cover'}
                alt={post.title}
              />
              <Box p={6}>
                <Heading size="md" mb={2}>
                  {post.title}
                </Heading>
                <Text color={'gray.600'} mb={4}>
                  {post.summaryBody.length > 200 ? post.summaryBody.slice(0, 200) + '...' : post.summaryBody}
                </Text>
                <Button
                  as={Link}
                  href={`/blog/${post._id}`}
                  size="sm"
                  colorScheme="brand"
                  variant="ghost"
                  _hover={{ bg: 'brand.50' }}
                >
                  Read More
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <Box textAlign="center" mt={12}>
          <Button
            size="lg"
            colorScheme="brand"
            as={Link}
            href="/blog"
          >
            View All Blog Posts
          </Button>
        </Box>
      </Container>
    </Box>
  );
} 