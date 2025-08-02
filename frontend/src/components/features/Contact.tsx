'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Button,
  VStack,
  HStack,
  Icon,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import { useState, useEffect } from 'react'

interface ContactInfo {
  icon: React.ElementType
  title: string
  value: string
  href?: string
}

const contactInfo: ContactInfo[] = [
  {
    icon: FaEnvelope,
    title: 'Email',
    value: 'karl@sorochinski.com',
    href: 'mailto:karl@sorochinski.com',
  },
  {
    icon: FaPhone,
    title: 'Phone',
    value: '(732) 501-7596',
    href: 'tel:+17325017596',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Location',
    value: 'Pike County, PA',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [csrfToken, setCsrfToken] = useState<string>('')
  const toast = useToast()

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
          ? 'http://localhost:3001/api/csrf-token'
          : 'https://ks-personal-website-apim.azure-api.net/personal-website-api/api/csrf-token';
        
        const response = await fetch(apiUrl, {
          credentials: 'include' // Important for CSRF cookies
        })
        if (response.ok) {
          const data = await response.json()
          setCsrfToken(data.csrfToken)
        }
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error)
      }
    }
    fetchCsrfToken()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
        ? 'http://localhost:3001/api/contact'
        : 'https://ks-personal-website-apim.azure-api.net/personal-website-api/api/contact';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        credentials: 'include', // Important for CSRF cookies
        body: JSON.stringify(formData),
      })
      
      const responseData = await response.json()
      
      if (response.ok) {
        toast({
          title: 'Message sent successfully!',
          description: "Thank you for reaching out. I'll get back to you soon.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        // console.error('Contact form error:', responseData)
        const errorMessage = responseData.errors?.[0]?.msg || responseData.message || 'Failed to send message'
        toast({
          title: 'Error sending message',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch {
      // console.error('Contact form network error:', error)
      toast({
        title: 'Error sending message',
        description: 'Please try again later or contact me directly via email.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box py={20} id="contact">
      <Container maxW={'7xl'}>
        <Stack spacing={4} as={Box} textAlign={'center'} mb={16}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Get In{' '}
            <Text as={'span'} color={'brand.500'}>
              Touch
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'} mx={'auto'} fontSize={'lg'}>
            I&apos;m always interested in hearing about new opportunities and exciting projects. 
            Feel free to reach out if you&apos;d like to collaborate or just want to say hello!
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          {/* Contact Information */}
          <Stack spacing={8}>
            <Box>
              <Heading size="lg" mb={6}>
                Contact Information
              </Heading>
              <VStack spacing={4} align="stretch">
                {contactInfo.map((info, index) => (
                  <HStack key={index} spacing={4}>
                    <Box
                      p={3}
                      bg="brand.50"
                      color="brand.700"
                      rounded="full"
                    >
                      <Icon as={info.icon} w={5} h={5} />
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm" color="gray.500">
                        {info.title}
                      </Text>
                      {info.href ? (
                        <Text
                          as="a"
                          href={info.href}
                          color="brand.600"
                          _hover={{ textDecoration: 'underline' }}
                        >
                          {info.value}
                        </Text>
                      ) : (
                        <Text>{info.value}</Text>
                      )}
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Box>
              <Heading size="lg" mb={6}>
                Follow Me
              </Heading>
              <HStack spacing={4}>
                <Button
                  as="a"
                  href="https://www.linkedin.com/in/karl-sorochinski-0893402/"
                  leftIcon={<FaLinkedin />}
                  colorScheme="linkedin"
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Button>
                <Button
                  as="a"
                  href="https://github.com/karlsoro"
                  leftIcon={<FaGithub />}
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Button>
                <Button
                  as="a"
                  href="https://twitter.com/KarlSoro1965"
                  leftIcon={<FaTwitter />}
                  colorScheme="twitter"
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Button>
              </HStack>
            </Box>
          </Stack>

          {/* Contact Form */}
          <Box
            bg="white"
            p={8}
            rounded="xl"
            shadow="lg"
          >
            <Heading size="lg" mb={6}>
              Send Message
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    size="lg"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    size="lg"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.subject}>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What&apos;s this about?"
                    size="lg"
                  />
                  <FormErrorMessage>{errors.subject}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.message}>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me more about your project or inquiry..."
                    size="lg"
                    rows={5}
                    resize="vertical"
                  />
                  <FormErrorMessage>{errors.message}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  w="full"
                  isLoading={isSubmitting}
                  loadingText="Sending..."
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
} 