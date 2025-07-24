'use client'

import {
  Box,
  Flex,
  Text,
  Stack,
  IconButton,
  Container,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box>
      <Flex
        bg="white"
        color="gray.600"
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor="gray.200"
        align={'center'}
      >
        <Container maxW="container.xl">
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign="left"
              fontFamily={'heading'}
              color="gray.800"
              fontSize="xl"
              fontWeight="bold"
            >
              Karl Sorochinski
            </Text>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <Stack direction={'row'} spacing={4}>
                {NAV_ITEMS.map((navItem) => (
                  <Box key={navItem.label}>
                    <Box
                      as="a"
                      p={2}
                      href={navItem.href}
                      fontSize={'sm'}
                      fontWeight={500}
                      color="gray.600"
                      _hover={{
                        textDecoration: 'none',
                        color: 'gray.800',
                      }}
                    >
                      {navItem.label}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Flex>

      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
        bg="white"
        borderTop={1}
        borderStyle={'solid'}
        borderColor="gray.200"
      >
        <Stack as={'nav'} spacing={0}>
          {NAV_ITEMS.map((navItem) => (
            <Box key={navItem.label}>
              <Box
                as="a"
                p={2}
                href={navItem.href}
                fontSize={'sm'}
                fontWeight={500}
                color="gray.600"
                _hover={{
                  textDecoration: 'none',
                  color: 'gray.800',
                }}
              >
                {navItem.label}
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
} 