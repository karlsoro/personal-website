import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const protocol = request.headers.get('x-forwarded-proto') || 'http'
  const url = request.nextUrl.clone()
  
  // Check if it's www subdomain
  const isWww = hostname.startsWith('www.')
  
  // Check if it's HTTP
  const isHttp = protocol === 'http'
  
  // If it's www or HTTP, redirect to HTTPS non-www
  if (isWww || isHttp) {
    const targetUrl = `https://sorochinski.com${url.pathname}${url.search}`
    console.log(`[MIDDLEWARE REDIRECT] ${request.method} ${request.url} -> ${targetUrl}`)
    return NextResponse.redirect(targetUrl, 301)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 