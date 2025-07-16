'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  Heading,
  Button,
  Image,
  Flex,
  Icon,
  IconButton,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Hero() {
  return (
    <Box bg="gray.50">
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          {/* Headshot Image */}
          <Flex flex={1} justify={{ base: 'center', md: 'flex-start' }} align="center">
            <Image
              src="/transparent2.png"
              alt="Karl Sorochinski Headshot"
              boxSize={{ base: '180px', md: '240px' }}
              borderRadius="full"
              border="4px solid"
              borderColor="brand.500"
              shadow="lg"
              bg="white"
              objectFit="cover"
            />
          </Flex>
          {/* Intro Text */}
          <Stack flex={2} spacing={{ base: 5, md: 10 }} align={{ base: 'center', md: 'flex-start' }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              <Text as={'span'} color={'brand.500'}>
                Hi, I'm Karl
              </Text>
              <br />
              <Text as={'span'} color={'gray.700'}>
                Transformational IT Leader
              </Text>
            </Heading>
            <Text color={'gray.600'} fontSize={{ base: 'md', sm: 'lg' }} textAlign={{ base: 'center', md: 'left' }}>
              I lead technology transformations and build modern, scalable solutions that drive business growth and innovation.
            </Text>
            {/* Social Buttons and CTA can remain here */}
          </Stack>
        </Stack>
      </Container>
      <Box textAlign="center" pb={8}>
        <IconButton
          aria-label="Scroll down"
          icon={<ChevronDownIcon />}
          size="lg"
          variant="ghost"
          _hover={{ bg: 'brand.500', color: 'white' }}
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      </Box>
    </Box>
  )
} 