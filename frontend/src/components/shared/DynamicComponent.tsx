'use client'

import { useState, useEffect, Suspense } from 'react'
import { Box, Spinner, Text, Alert, AlertIcon } from '@chakra-ui/react'

interface DynamicComponentProps {
  componentName: string
  fallback?: React.ReactNode
  props?: Record<string, unknown>
}

export default function DynamicComponent({ 
  componentName, 
  fallback, 
  props = {} 
}: DynamicComponentProps) {
  const [Component, setComponent] = useState<React.ComponentType<unknown> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Dynamic import based on component name
        const importedModule = await import(`../features/${componentName}`)
        setComponent(() => importedModule.default)
      } catch {
        // console.error(`Failed to load component ${componentName}`)
        setError(`Failed to load component: ${componentName}`)
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [componentName])

  if (loading) {
    return fallback || (
      <Box display="flex" justifyContent="center" alignItems="center" p={8}>
        <Spinner size="lg" color="brand.500" />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <Text>{error}</Text>
      </Alert>
    )
  }

  if (!Component) {
    return (
      <Alert status="warning">
        <AlertIcon />
        <Text>Component not found: {componentName}</Text>
      </Alert>
    )
  }

  return (
    <Suspense fallback={fallback || <Spinner />}>
      <Component {...props} />
    </Suspense>
  )
} 