'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  IconButton,
} from '@chakra-ui/react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <Box
      bg="gray.50"
      color="gray.700"
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor="gray.200"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={6}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ md: 'space-between' }}
        align={{ md: 'center' }}
      >
        <Text>© 2024 Karl Sorochinski. All rights reserved</Text>
        
        <Stack direction={'row'} spacing={6} align="center">
          <Link href="/privacy" _hover={{ textDecoration: 'underline' }}>
            Privacy
          </Link>
          <Link href="/terms" _hover={{ textDecoration: 'underline' }}>
            Terms
          </Link>
          <Link href="/cookies" _hover={{ textDecoration: 'underline' }}>
            Cookies Policy
          </Link>
          
          <Stack direction={'row'} spacing={2} ml={4}>
            <IconButton
              as={Link}
              href="https://twitter.com/KarlSoro1965"
              aria-label="Twitter"
              icon={<FaTwitter />}
              size="sm"
              variant="ghost"
              _hover={{ bg: 'brand.500', color: 'white' }}
              target="_blank"
              rel="noopener noreferrer"
            />
            <IconButton
              as={Link}
              href="https://www.linkedin.com/in/karl-sorochinski-0893402/"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              size="sm"
              variant="ghost"
              _hover={{ bg: 'brand.500', color: 'white' }}
              target="_blank"
              rel="noopener noreferrer"
            />
            <IconButton
              as={Link}
              href="https://github.com/karlsoro"
              aria-label="GitHub"
              icon={<FaGithub />}
              size="sm"
              variant="ghost"
              _hover={{ bg: 'brand.500', color: 'white' }}
              target="_blank"
              rel="noopener noreferrer"
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
} 