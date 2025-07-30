# Security Architecture Documentation

## Overview
This document outlines the security architecture for the personal website, including authentication, authorization, and data protection measures.

## Security Model

### Public Access (Read-Only)
- **Endpoints**: GET `/api/blog`, GET `/api/blog/:id`
- **Authentication**: None required
- **Use Case**: Frontend displaying blog posts to visitors
- **Security**: Rate limiting, CORS protection, input validation

### Authenticated Access (Write Operations)
- **Endpoints**: POST `/api/blog`, PUT `/api/blog/:id`, DELETE `/api/blog/:id`
- **Authentication**: Azure API Management (APIM) subscription key
- **Use Case**: Blog-importer tool for creating new posts
- **Security**: APIM gateway, subscription key validation, rate limiting

## Security Layers

### 1. Azure API Management (APIM)
- **Purpose**: API gateway with authentication and rate limiting
- **Authentication**: Subscription key required (`Ocp-Apim-Subscription-Key` header)
- **URL**: `https://ks-personal-website-apim.azure-api.net/personal-website-api/`
- **Security Features**:
  - Subscription key validation
  - Rate limiting at gateway level
  - Request/response logging
  - SSL/TLS encryption

### 2. Backend API (Express.js)
- **Purpose**: Business logic and data access
- **Security Features**:
  - Helmet.js for security headers
  - CORS configuration
  - Rate limiting (100 requests per 15 minutes)
  - Input validation and sanitization
  - Error handling without information disclosure

### 3. Frontend (Next.js)
- **Purpose**: User interface
- **Security Features**:
  - Security headers (CSP, HSTS, X-Frame-Options, etc.)
  - HTTPS enforcement
  - Content Security Policy
  - No sensitive data exposure

## Authentication Flow

### Public Blog Access
```
User Browser → Frontend → Backend API (Direct)
                ↓
         No authentication required
         Rate limiting applies
```

### Blog-Importer Access
```
Blog-Importer → APIM Gateway → Backend API
      ↓              ↓              ↓
   API Key    Subscription Key   Rate Limiting
   Required    Validation        + CORS
```

## Security Headers

### Frontend Security Headers
- **Strict-Transport-Security**: `max-age=31536000; includeSubDomains; preload`
- **Content-Security-Policy**: Comprehensive CSP with proper directives
- **X-Frame-Options**: `ALLOWALL` (allows framing from Azure domains)
- **X-Content-Type-Options**: `nosniff`
- **X-XSS-Protection**: `1; mode=block`
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Permissions-Policy**: `camera=(), microphone=(), geolocation=()`
- **Cross-Origin-Opener-Policy**: `same-origin`
- **Cross-Origin-Resource-Policy**: `same-origin`
- **Cross-Origin-Embedder-Policy**: `require-corp`

## Rate Limiting

### Backend Rate Limiting
- **Window**: 15 minutes
- **Limit**: 100 requests per IP address
- **Applied to**: All API endpoints
- **Response**: 429 Too Many Requests with JSON error message

### APIM Rate Limiting
- **Additional layer**: Gateway-level rate limiting
- **Configuration**: Managed through Azure APIM policies

## Data Protection

### Blog Posts
- **Storage**: Azure Cosmos DB (MongoDB API)
- **Encryption**: At rest and in transit
- **Access**: Read-only for public, authenticated for write operations
- **Content**: Public by design, no sensitive information

### API Keys
- **Storage**: Azure APIM subscription management
- **Rotation**: Manual process through Azure portal
- **Access**: Limited to blog-importer tool

## Security Testing

### Recommended Security Tests
1. **OWASP ZAP Scan**: Automated security testing
2. **Manual Testing**:
   - Verify subscription key requirement for write operations
   - Test rate limiting behavior
   - Validate CORS configuration
   - Check security headers presence
3. **API Testing**:
   - Test with missing subscription key
   - Test with invalid subscription key
   - Test with valid subscription key

## Compliance

### OWASP ZAP Compliance
- ✅ Security headers properly configured
- ✅ HTTPS enforcement
- ✅ Content Security Policy
- ✅ Frame protection
- ✅ XSS protection
- ✅ Content type sniffing protection
- ✅ Rate limiting
- ✅ Authentication for sensitive operations

## Monitoring and Logging

### Azure APIM
- Request/response logging
- Subscription key usage tracking
- Error rate monitoring

### Backend API
- Application logs
- Error tracking
- Rate limit violation monitoring

## Incident Response

### Security Incident Process
1. **Detection**: Monitor logs for unusual patterns
2. **Assessment**: Evaluate impact and scope
3. **Response**: Implement immediate mitigations
4. **Recovery**: Restore normal operations
5. **Post-Incident**: Review and improve security measures

## Best Practices

### API Key Management
- Rotate keys regularly
- Use different keys for different environments
- Monitor key usage patterns
- Implement key expiration policies

### Code Security
- Regular dependency updates
- Security header maintenance
- Input validation
- Error handling without information disclosure

### Infrastructure Security
- Regular security updates
- Network security monitoring
- Access control reviews
- Backup and recovery testing

## Contact Information

For security issues or questions:
- **Email**: karl@sorochinski.com
- **Security Policy**: See `/privacy` and `/terms` pages
- **Responsible Disclosure**: Please report security issues privately 