'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Badge,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { FaNodeJs, FaDatabase, FaCloud, FaCode, FaTools, FaUsers } from 'react-icons/fa'

interface FeatureProps {
  title: string
  text: string
  icon: React.ElementType
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack
      align={'center'}
      textAlign={'center'}
      bg="white"
      p={6}
      rounded={'xl'}
      shadow={'md'}
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.3s"
    >
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'brand.500'}
        mb={1}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Text fontWeight={600} fontSize="lg">{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  )
}

const skills = [
  'IT Strategy', 'Software Solution Architecture', 'Organizational Transformation',
  'IT Transformation', 'Data Governance', 'Product Management',
  'Cross-functional Team Leadership', 'Systems Design', 'Security and Compliance',
  'Product/Software Rationalization', 'Process Simplification', 'Architectural Patterns'
]

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
  'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST APIs',
  'SNOWFLAKE', 'DATABRICKS', 'RUST', 'MCP', 'R', 'MICROSERVICES',
  'ARCHI', 'SAP', 'WORKDAY', 'SERVICENOW', 'JENKINS', 'PLAYWRIGHT',
  'RASA', 'WSM', 'AZURE'
]

export default function About() {
  return (
    <Box py={20} id="about">
      <Container maxW={'7xl'}>
        <Stack spacing={4} as={Box} textAlign={'center'} mb={16}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            About{' '}
            <Text as={'span'} color={'brand.500'}>
              Me
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'} mx={'auto'} fontSize={'lg'}>
          As a seasoned IT executive with over four decades of experience, I have spearhead enterprise-wide technology transformations that empower Fortune 500 organizations to achieve strategic objectives through value-driven data. My leadership focuses on architecting and implementing modern, scalable, and resilient solutions that integrate advanced analytics, AI, and cloud-native technologies to accelerate business growth, optimize operational efficiency, and foster innovation. By aligning cutting-edge technical capabilities, organizational priorities, and skilled staff, I drive measurable business outcomes, cultivate cross-functional collaboration, and position companies to thrive in dynamic, competitive business environments.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mb={16}>
          <Feature
            icon={FaUsers}
            title={'Organizational Transformation'}
            text={
              'Leading enterprise-wide technology transformations, modernizing legacy systems, and driving platform consolidation across large organizations.'
            }
          />
          <Feature
            icon={FaNodeJs}
            title={'End to End System Design'}
            text={
              'Architecting comprehensive solutions from data flows to user interfaces, ensuring seamless integration across all system components.'
            }
          />
          <Feature
            icon={FaDatabase}
            title={'Data, Analytics and AI'}
            text={
              'Designing real-time data flows, implementing advanced analytics solutions, and integrating AI capabilities to drive business insights.'
            }
          />
          <Feature
            icon={FaCloud}
            title={'Cloud & DevOps'}
            text={
              'Deploying and managing applications on cloud platforms with CI/CD pipelines.'
            }
          />
          <Feature
            icon={FaCode}
            title={'Connecting Delivery to Value'}
            text={
              'Bridging technology delivery with business outcomes, ensuring every solution directly contributes to organizational success and measurable value.'
            }
          />
          <Feature
            icon={FaTools}
            title={'Automating Testing and Compliance'}
            text={
              'Implementing automated testing frameworks and ensuring regulatory compliance across enterprise systems and data governance.'
            }
          />
        </SimpleGrid>

        <Box mb={12}>
          <Heading size="lg" mb={6} textAlign="center">
            Skills
          </Heading>
          <Flex wrap="wrap" justify="center" gap={3}>
            {skills.map((skill) => (
              <Badge
                key={skill}
                px={3}
                py={1}
                bg="brand.50"
                color="brand.700"
                borderRadius="full"
                fontSize="sm"
                fontWeight="medium"
                _hover={{
                  bg: 'brand.100',
                  transform: 'scale(1.05)',
                }}
                transition="all 0.2s"
              >
                {skill}
              </Badge>
            ))}
          </Flex>
        </Box>

        <Box>
          <Heading size="lg" mb={6} textAlign="center">
            Technologies
          </Heading>
          <Flex wrap="wrap" justify="center" gap={3}>
            {technologies.map((tech) => (
              <Badge
                key={tech}
                px={3}
                py={1}
                bg="brand.50"
                color="brand.700"
                borderRadius="full"
                fontSize="sm"
                fontWeight="medium"
                _hover={{
                  bg: 'brand.100',
                  transform: 'scale(1.05)',
                }}
                transition="all 0.2s"
              >
                {tech}
              </Badge>
            ))}
          </Flex>
        </Box>
      </Container>
    </Box>
  )
} 