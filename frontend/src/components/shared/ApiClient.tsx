'use client';

import { useEffect, useState } from 'react';

interface ApiClientProps {
  endpoint: string;
  options?: RequestInit;
}

interface ApiClientReturn {
  data: unknown;
  loading: boolean;
  error: string | null;
}

export function useApiClient({ endpoint, options = {} }: ApiClientProps): ApiClientReturn {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Determine the base URL based on environment
                       const baseUrl = process.env.NODE_ENV === 'production'
                 ? process.env.NEXT_PUBLIC_API_URL || 'https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io'
                 : 'http://localhost:3001';
        
        const url = `${baseUrl}${endpoint}`;
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('API Client Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options]);

  return { data, loading, error };
}

// Legacy component for backward compatibility
export function ApiClient({ endpoint, options = {} }: ApiClientProps) {
  return useApiClient({ endpoint, options });
} 