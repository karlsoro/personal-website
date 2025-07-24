'use client'

import { Box, Container, Heading, Text, Link } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function CookiePolicy() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/CookiePolicy.md')
      .then(response => response.text())
      .then(text => {
        setContent(text)
        setLoading(false)
      })
      .catch(() => {
        // console.error('Error loading cookie policy:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Box py={20}>
        <Container maxW="4xl">
          <Text>Loading cookie policy...</Text>
        </Container>
      </Box>
    )
  }

  return (
    <Box py={20}>
      <Container maxW="4xl">
        <Link href="/" color="brand.500" mb={8} display="inline-block">
          ← Back to Home
        </Link>
        <Heading mb={8}>Cookies Policy</Heading>
        <Box 
          fontFamily="body"
          fontSize="md"
          lineHeight="1.6"
          color="gray.700"
          sx={{
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: 'bold',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            'h1': { fontSize: '2xl' },
            'h2': { fontSize: 'xl' },
            'h3': { fontSize: 'lg' },
            'p': {
              marginBottom: '1em',
            },
            'ul, ol': {
              marginLeft: '1.5em',
              marginBottom: '1em',
            },
            'li': {
              marginBottom: '0.5em',
            },
            'strong': {
              fontWeight: 'bold',
            },
            'em': {
              fontStyle: 'italic',
            },
            'code': {
              backgroundColor: 'gray.100',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
              fontFamily: 'mono',
            },
            'blockquote': {
              borderLeft: '4px solid',
              borderColor: 'gray.300',
              paddingLeft: '1em',
              marginLeft: '0',
              fontStyle: 'italic',
            },
          }}
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </Box>
      </Container>
    </Box>
  )
} 