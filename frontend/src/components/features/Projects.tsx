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
} from '@chakra-ui/react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
}

const projects: Project[] = [
  {
    title: 'SOA to Microservices Transformation',
    description: 'A comprehensive case study documenting the design and implementation of a large-scale transformation from Service-Oriented Architecture to Microservices. This project showcases enterprise architecture planning, organizational change management, and technical migration strategies.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    technologies: ['Enterprise Architecture', 'Microservices', 'Organizational Transformation', 'System Design'],
    githubUrl: '#',
    liveUrl: '/Soa To Microservices Case.pdf',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Weather Consensus',
    description: 'The weather consensus app is working code that is part of a tutorial series for various engineering roles. It includes a sample outline for three roles/levels.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    technologies: ['React', 'TypeScript', 'Next.js', 'Express', 'APIs'],
    githubUrl: 'https://github.com/karlsoro/weather-consensus-app',
    liveUrl: '',
  },
  {
    title: 'Blog Platform',
    description: 'A modern blog platform with markdown support, SEO optimization, and a content management system.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
    githubUrl: '#',
    liveUrl: '#',
  },
]

export default function Projects() {
  return (
    <Box py={20} bg="gray.50">
      <Container maxW={'7xl'}>
        <Stack spacing={4} as={Box} textAlign={'center'} mb={16}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Featured{' '}
            <Text as={'span'} color={'brand.500'}>
              Projects
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'} mx={'auto'} fontSize={'lg'}>
            Here are some of the projects I&apos;ve worked on. Each one represents a unique 
            challenge and learning experience in my journey as a developer.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {projects.map((project, index) => (
            <Box
              key={index}
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
                src={project.image}
                objectFit={'cover'}
                alt={project.title}
              />
              <Box p={6}>
                <Heading size="md" mb={2}>
                  {project.title}
                </Heading>
                <Text color={'gray.600'} mb={4}>
                  {project.description}
                </Text>
                <Flex wrap="wrap" gap={2} mb={4}>
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      px={2}
                      py={1}
                      bg="brand.50"
                      color="brand.700"
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </Flex>
                <Flex gap={3}>
                  {project.githubUrl !== '#' && (
                    <Button
                      leftIcon={<Icon as={FaGithub} />}
                      size="sm"
                      variant="outline"
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code
                    </Button>
                  )}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <Button
                      leftIcon={<Icon as={FaExternalLinkAlt} />}
                      size="sm"
                      colorScheme="brand"
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.liveUrl.endsWith('.pdf') ? 'View PDF' : 'Live Demo'}
                    </Button>
                  )}
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        <Box textAlign="center" mt={12}>
          <Button
            size="lg"
            colorScheme="brand"
            as="a"
            href="/projects"
          >
            View All Projects
          </Button>
        </Box>
      </Container>
    </Box>
  )
} 