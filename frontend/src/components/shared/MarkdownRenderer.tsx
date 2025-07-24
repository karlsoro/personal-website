'use client'

import ReactMarkdown from 'react-markdown';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a simple loading state until component is mounted
  if (!mounted) {
    return (
      <Box 
        w="100%" 
        p={4}
        bg="gray.50"
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        minH="200px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box as="pre" whiteSpace="pre-wrap" fontFamily="body" fontSize="sm" color="gray.600">
          Loading content...
        </Box>
      </Box>
    );
  }

  return (
    <Box 
      w="100%" 
      sx={{
        '& h1': {
          fontSize: '2rem',
          fontWeight: 'bold',
          margin: '1.5rem 0 1rem 0',
          color: '#2d3748'
        },
        '& h2': {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          margin: '1.25rem 0 0.75rem 0',
          color: '#2d3748'
        },
        '& h3': {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          margin: '1rem 0 0.5rem 0',
          color: '#2d3748'
        },
        '& h4': {
          fontSize: '1.125rem',
          fontWeight: 'bold',
          margin: '0.75rem 0 0.5rem 0',
          color: '#2d3748'
        },
        '& p': {
          margin: '1rem 0',
          lineHeight: '1.6',
          color: '#4a5568'
        },
        '& strong': {
          fontWeight: 'bold',
          color: '#2d3748'
        },
        '& em': {
          fontStyle: 'italic',
          color: '#4a5568'
        },
        '& ul, & ol': {
          margin: '1rem 0',
          paddingLeft: '2rem'
        },
        '& li': {
          margin: '0.5rem 0',
          lineHeight: '1.6',
          color: '#4a5568'
        },
        '& blockquote': {
          borderLeft: '4px solid #e2e8f0',
          paddingLeft: '1rem',
          margin: '1rem 0',
          fontStyle: 'italic',
          color: '#718096'
        },
        '& code': {
          backgroundColor: '#f7fafc',
          padding: '0.125rem 0.25rem',
          borderRadius: '0.25rem',
          fontFamily: 'Courier New, monospace',
          fontSize: '0.875rem',
          color: '#e53e3e'
        },
        '& pre': {
          backgroundColor: '#f7fafc',
          padding: '1rem',
          borderRadius: '0.5rem',
          overflowX: 'auto',
          margin: '1rem 0'
        },
        '& pre code': {
          backgroundColor: 'transparent',
          padding: '0',
          color: '#2d3748'
        }
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
} 