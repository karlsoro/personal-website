'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { getResumeContent, ResumeContent } from '@/services/resumeService'
import { generatePDFFromMarkdown } from '@/services/pdfService'
import MarkdownRenderer from '@/components/shared/MarkdownRenderer'
import Header from '@/components/layout/Header'

export default function ResumePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getResumeContent()
        setResumeData(data)
      } catch (err) {
        setError('Failed to load resume content')
        // console.error('Error fetching resume:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResume()
  }, [])

  const handleDownloadClick = async () => {
    if (!resumeData) {
      // console.error('No resume data available')
      return
    }

    setIsGenerating(true)
    try {
      await generatePDFFromMarkdown(resumeData.content, {
        title: 'Karl Sorochinski - Resume',
        author: 'Karl Sorochinski',
        subject: 'Professional Resume'
      })
    } catch (error) {
      // console.error('Error generating PDF:', error)
      // You could add a toast notification here for better UX
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <Header />
      <Container maxW="container.lg" py={8}>
        <Flex justify="flex-end" mb={8}>
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

      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="md"
        minH="80vh"
      >
        <VStack align="stretch" spacing={6}>
          <Heading size="lg" textAlign="center">
            Resume
          </Heading>
          
          {isLoading && (
            <Box textAlign="center" py={20}>
              <Spinner size="xl" color="blue.500" />
              <Box mt={4} color="gray.600">Loading resume content...</Box>
            </Box>
          )}
          
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          {resumeData && !isLoading && (
            <Box>
              <MarkdownRenderer content={resumeData.content} />
            </Box>
          )}
        </VStack>
      </Box>
    </Container>
    </>
  )
} 