# HTTPS Redirect Fix for sorochinski.com

## Problem Statement
The website was broken when attempting to correct HTTP to HTTPS redirects. Users were getting "not found" or "not secure" messages on various URL variants.

## Solution Overview
Implemented comprehensive HTTPS redirects for all 4 URL variants:
- `http://sorochinski.com` → `https://sorochinski.com`
- `http://www.sorochinski.com` → `https://sorochinski.com`
- `https://www.sorochinski.com` → `https://sorochinski.com`
- `https://sorochinski.com` (stays as is)

## Changes Made

### 1. Backend (Express.js) Changes

#### New HTTPS Redirect Middleware
**File:** `backend/src/middleware/httpsRedirect.ts`
```typescript
import { Request, Response, NextFunction } from 'express';

export const httpsRedirect = (req: Request, res: Response, next: NextFunction) => {
  // Check if we're behind Azure's default ingress
  const isHttps = req.headers['x-forwarded-proto'] === 'https' || 
                  req.headers['x-forwarded-proto'] === 'https' ||
                  req.secure;
  
  const host = req.headers.host || '';
  const isWww = host.startsWith('www.');
  
  // If it's HTTP or www subdomain, redirect to HTTPS non-www
  if (!isHttps || isWww) {
    const targetHost = 'sorochinski.com';
    const targetUrl = `https://${targetHost}${req.url}`;
    
    console.log(`[HTTPS REDIRECT] ${req.method} ${req.originalUrl} -> ${targetUrl}`);
    return res.redirect(301, targetUrl);
  }
  
  next();
};
```

#### Updated App Configuration
**File:** `backend/src/app.ts`
- Added import for HTTPS redirect middleware
- Added middleware before other middleware (important for proper order)

### 2. Frontend (Next.js) Changes

#### Updated Next.js Configuration
**File:** `frontend/next.config.ts`
- Added HTTP to HTTPS redirect rule
- Enhanced existing www to non-www redirect
- Proper handling of `x-forwarded-proto` headers

#### Custom Server Implementation
**File:** `frontend/server.js`
- Custom Next.js server to handle HTTPS redirects
- Proper Azure ingress header handling
- Robust redirect logic for all URL variants

#### Updated Package Configuration
**File:** `frontend/package.json`
- Changed start script to use custom server: `"start": "node server.js"`

#### Updated Docker Configuration
**File:** `frontend/Dockerfile`
- Updated CMD to use custom server: `CMD ["node", "server.js"]`

## Deployment Instructions

### Option 1: Use the Automated Script
```bash
./deploy-https-fix.sh
```

### Option 2: Manual Deployment

#### Backend Deployment
```bash
cd backend
npm install
npm run build
# Deploy to Azure Container App
```

#### Frontend Deployment
```bash
cd frontend
npm install
npm run build
# Deploy to Azure Container App
```

## Testing

### Automated Testing
```bash
./test-https-redirects.sh
```

### Manual Testing
Test these URLs in your browser:
1. `http://sorochinski.com` → should redirect to `https://sorochinski.com`
2. `http://www.sorochinski.com` → should redirect to `https://sorochinski.com`
3. `https://www.sorochinski.com` → should redirect to `https://sorochinski.com`
4. `https://sorochinski.com` → should work directly

## DNS Configuration (GoDaddy)
Ensure your GoDaddy DNS is configured as follows:
```
@    A      20.10.61.32
www  CNAME  @
```

## Azure Configuration Requirements

### Container Apps
- Ensure TLS/SSL certificates are properly configured
- Verify domain bindings are set up correctly
- Check that `x-forwarded-proto` headers are being forwarded

### Environment Variables
Make sure these environment variables are set in Azure:
- `NODE_ENV=production`
- `CORS_ORIGIN_PROD=https://sorochinski.com`

## Troubleshooting

### Common Issues

1. **Redirects not working**
   - Check Azure Container App logs
   - Verify DNS propagation
   - Ensure custom server is running

2. **SSL Certificate Issues**
   - Verify Azure TLS configuration
   - Check domain binding in Container Apps

3. **CORS Issues**
   - Ensure `CORS_ORIGIN_PROD` is set correctly
   - Check frontend API calls are using HTTPS

### Debug Commands
```bash
# Check DNS propagation
dig sorochinski.com
dig www.sorochinski.com

# Test HTTPS redirects
curl -I http://sorochinski.com
curl -I http://www.sorochinski.com
curl -I https://www.sorochinski.com
curl -I https://sorochinski.com

# Check Azure logs
az containerapp logs show --name <app-name> --resource-group <resource-group>
```

## Expected Behavior

After deployment, all URL variants should:
1. Redirect to `https://sorochinski.com`
2. Return HTTP 301 status codes for redirects
3. Maintain the original path and query parameters
4. Work seamlessly with Azure's ingress

## Rollback Plan

If issues occur, you can rollback by:
1. Reverting the custom server changes
2. Removing the HTTPS redirect middleware
3. Restoring original Next.js configuration
4. Redeploying the applications

## Security Considerations

- All redirects use HTTP 301 (permanent) for SEO benefits
- HSTS headers are configured in Next.js
- CORS is properly configured for production
- Rate limiting is in place on the backend

## Monitoring

After deployment, monitor:
- Azure Container App logs for errors
- Redirect performance and success rates
- SSL certificate expiration dates
- DNS propagation status 