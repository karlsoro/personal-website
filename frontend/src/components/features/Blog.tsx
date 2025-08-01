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
  VStack,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { getBlogImage, getBlogImageUrl } from '@/services/blogImageService';

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
  keywords?: string[];
}

interface GroupedPosts {
  [year: string]: BlogPost[];
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
  // Group posts by year
  const groupedPosts: GroupedPosts = posts.reduce((groups, post) => {
    // Extract year from the date field (format: "YYYY Month" or "YYYY-MM-DD")
    let year: string;
    
    try {
      if (post.date && post.date.includes(' ')) {
        // Format: "2012 March" - extract the year
        year = post.date.split(' ')[0];
      } else if (post.date) {
        // Format: "YYYY-MM-DD" or other ISO format
        year = new Date(post.date).getFullYear().toString();
      } else {
        // Fallback to current year if no date
        year = new Date().getFullYear().toString();
      }
    } catch {
      // Fallback to current year if date parsing fails
      year = new Date().getFullYear().toString();
    }
    
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(post);
    return groups;
  }, {} as GroupedPosts);

  // Sort years in descending order (newest first)
  const sortedYears = Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <Box py={20} bg="gray.50">
      <Container maxW={'7xl'}>
        <Stack spacing={4} as={Box} textAlign={'center'} mb={16}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            All{' '}
            <Text as={'span'} color={'brand.500'}>
              Blog Posts
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'} mx={'auto'} fontSize={'lg'}>
            Browse all my blog posts, sorted from newest to oldest.
          </Text>
        </Stack>
        
        <Stack spacing={8}>
          {sortedYears.map((year) => (
            <Box key={year}>
              {/* Year Label */}
              <HStack mb={6} justify="flex-start">
                <Heading
                  size="lg"
                  color="brand.500"
                  fontWeight="bold"
                  borderBottom="3px solid"
                  borderColor="brand.500"
                  pb={2}
                >
                  {year}
                </Heading>
              </HStack>
              
              {/* Posts for this year */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                {groupedPosts[year].map((post) => (
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
                      src={getBlogImageUrl(getBlogImage(post.summaryBody, post.title, post.keywords))}
                      objectFit={'cover'}
                      alt={getBlogImage(post.summaryBody, post.title, post.keywords).alt}
                      fallbackSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    />
                    <Box p={6}>
                      <Heading size="md" mb={2}>
                        {post.title}
                      </Heading>
                      <VStack align="start" spacing={2} mb={4}>
                        <Box>
                          <Text as="span" fontWeight="bold">Summary: </Text>
                          <Text as="span">{post.summaryBody}</Text>
                        </Box>
                        {post.update && (
                          <Box>
                            <Text as="span" fontWeight="bold">Update: </Text>
                            <Text as="span">{post.update}</Text>
                          </Box>
                        )}
                        {post.update2025 && (
                          <Box>
                            <Text as="span" fontWeight="bold">Update 2025: </Text>
                            <Text as="span">{post.update2025}</Text>
                          </Box>
                        )}
                      </VStack>
                      <Button
                        as={Link}
                        href={`/blog/${post._id}`}
                        size="sm"
                        colorScheme="brand"
                        variant="solid"
                        _hover={{ bg: 'brand.50' }}
                      >
                        View Detail
                      </Button>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
} 