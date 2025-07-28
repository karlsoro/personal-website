'use client'

import { useEffect, useState } from 'react'

export default function TestApiPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function testApi() {
      try {
        console.log('Testing API call...')
        const response = await fetch('https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog')
        console.log('Response:', response)
        console.log('Status:', response.status)
        console.log('Headers:', response.headers)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Result:', result)
        setData(result)
      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    testApi()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Test Page</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div style={{ color: 'red', margin: '20px 0' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
      
      {data && (
        <div style={{ margin: '20px 0' }}>
          <h3>API Response:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
      
      <div style={{ margin: '20px 0' }}>
        <h3>Check browser console for detailed logs</h3>
      </div>
    </div>
  )
} 