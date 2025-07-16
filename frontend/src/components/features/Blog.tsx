'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Badge,
  Image,
  Button,
  Flex,
  Icon,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { FaCalendar, FaUser, FaTag, FaArrowRight } from 'react-icons/fa'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  tags: string[]
  image: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Web Applications with Next.js',
    excerpt: 'Learn how to build modern, scalable web applications using Next.js and best practices for performance and SEO.',
    content: 'Full article content would go here...',
    author: 'Karl Sorochinski',
    publishedAt: '2024-01-15',
    tags: ['Next.js', 'React', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'The Future of Full-Stack Development',
    excerpt: 'Exploring emerging trends and technologies that are shaping the future of full-stack development.',
    content: 'Full article content would go here...',
    author: 'Karl Sorochinski',
    publishedAt: '2024-01-10',
    tags: ['Full-Stack', 'Technology', 'Trends'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    readTime: '8 min read',
  },
  {
    id: '3',
    title: 'Optimizing Database Performance for Web Apps',
    excerpt: 'Practical tips and strategies for optimizing database performance in web applications.',
    content: 'Full article content would go here...',
    author: 'Karl Sorochinski',
    publishedAt: '2024-01-05',
    tags: ['Database', 'Performance', 'Optimization'],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    readTime: '6 min read',
  },
  {
    id: '4',
    title: 'Modern CSS Techniques for Better UX',
    excerpt: 'Discover modern CSS techniques that can significantly improve user experience and design.',
    content: 'Full article content would go here...',
    author: 'Karl Sorochinski',
    publishedAt: '2024-01-01',
    tags: ['CSS', 'UX', 'Design'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    readTime: '4 min read',
  },
]

export default function Blog() {
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
            Thoughts, insights, and tutorials about web development, technology, and the industry.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {blogPosts.map((post) => (
            <Box
              key={post.id}
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
                src={post.image}
                objectFit={'cover'}
                alt={post.title}
                fallbackSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
              />
              <Box p={6}>
                <VStack align="start" spacing={3} mb={4}>
                  <HStack spacing={4} fontSize="sm" color="gray.500">
                    <HStack spacing={1}>
                      <Icon as={FaCalendar} />
                      <Text>{new Date(post.publishedAt).toLocaleDateString()}</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <Icon as={FaUser} />
                      <Text>{post.author}</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <Icon as={FaTag} />
                      <Text>{post.readTime}</Text>
                    </HStack>
                  </HStack>
                </VStack>

                <Heading size="md" mb={3}>
                  {post.title}
                </Heading>
                <Text color={'gray.600'} mb={4}>
                  {post.excerpt}
                </Text>

                <Flex wrap="wrap" gap={2} mb={4}>
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      px={2}
                      py={1}
                      bg="brand.50"
                      color="brand.700"
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </Flex>

                <Button
                  rightIcon={<Icon as={FaArrowRight} />}
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
            as="a"
            href="/blog"
          >
            View All Posts
          </Button>
        </Box>
      </Container>
    </Box>
  )
} 