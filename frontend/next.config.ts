import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://ks-personal-website-backend.azurewebsites.net/api/:path*'
          : 'http://localhost:3001/api/:path*',
      },
    ];
  },
  async redirects() {
    return [
      // Redirect www to non-www (both HTTP and HTTPS)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sorochinski.com' }],
        destination: 'https://sorochinski.com/:path*',
        permanent: true,
      },
      // Redirect HTTP to HTTPS (for non-www)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sorochinski.com' }],
        missing: [{ type: 'header', key: 'x-forwarded-proto', value: 'https' }],
        destination: 'https://sorochinski.com/:path*',
        permanent: true,
      },
      // Additional redirect for HTTP www to HTTPS non-www
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'www.sorochinski.com' },
          { type: 'header', key: 'x-forwarded-proto', value: 'http' }
        ],
        destination: 'https://sorochinski.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';"
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
