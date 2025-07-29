import { doubleCsrf } from 'csrf-csrf';
import { Request, Response, NextFunction } from 'express';

// CSRF protection configuration
const csrfProtection = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || 'your-secret-key-change-in-production',
  getSessionIdentifier: (req: Request) => req.ip || 'unknown',
  cookieName: 'x-csrf-token',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600 // 1 hour
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getCsrfTokenFromRequest: (req: Request) => req.headers['x-csrf-token'] as string,
});

// CSRF middleware for protecting routes
export const csrfProtectionMiddleware = csrfProtection.doubleCsrfProtection;

// CSRF token generation middleware
export const generateCsrfToken = csrfProtection.generateCsrfToken;

// CSRF error handler
export const csrfErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.code === 'EBADCSRFTOKEN') {
    res.status(403).json({
      success: false,
      message: 'CSRF token validation failed. Please refresh the page and try again.',
      error: 'CSRF_TOKEN_INVALID'
    });
    return;
  }
  next(error);
};

// CSRF token endpoint for frontend to get tokens
export const getCsrfToken = (req: Request, res: Response): void => {
  try {
    const token = generateCsrfToken(req, res);
    res.json({
      success: true,
      csrfToken: token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate CSRF token'
    });
  }
}; 