import { Request, Response, NextFunction } from 'express';

// API key authentication middleware with different permission levels
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  if (!apiKey) {
    res.status(401).json({
      success: false,
      message: 'Authentication required. Please provide API key.'
    });
    return;
  }

  // Check against environment variables
  const publicApiKey = process.env.PUBLIC_API_KEY;
  const adminApiKey = process.env.ADMIN_API_KEY;
  
  if (!publicApiKey || !adminApiKey) {
    console.error('API keys not configured properly');
    res.status(500).json({
      success: false,
      message: 'Server configuration error'
    });
    return;
  }

  if (apiKey === adminApiKey) {
    // Admin access - full permissions
    (req as any).isAdmin = true;
    (req as any).isAuthenticated = true;
    next();
    return;
  }

  if (apiKey === publicApiKey) {
    // Public access - limited permissions
    (req as any).isAdmin = false;
    (req as any).isAuthenticated = true;
    next();
    return;
  }

  // Invalid API key
  res.status(403).json({
    success: false,
    message: 'Invalid API key'
  });
};

// Admin-only middleware
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  if (!apiKey) {
    res.status(401).json({
      success: false,
      message: 'Authentication required. Please provide API key.'
    });
    return;
  }

  const adminApiKey = process.env.ADMIN_API_KEY;
  
  if (!adminApiKey) {
    console.error('ADMIN_API_KEY environment variable not set');
    res.status(500).json({
      success: false,
      message: 'Server configuration error'
    });
    return;
  }

  if (apiKey !== adminApiKey) {
    res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
    return;
  }

  // Admin authentication successful
  (req as any).isAdmin = true;
  (req as any).isAuthenticated = true;
  next();
};

// Optional authentication for endpoints that can work with or without auth
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  if (apiKey) {
    const publicApiKey = process.env.PUBLIC_API_KEY;
    const adminApiKey = process.env.ADMIN_API_KEY;
    
    if (adminApiKey && apiKey === adminApiKey) {
      (req as any).isAdmin = true;
      (req as any).isAuthenticated = true;
    } else if (publicApiKey && apiKey === publicApiKey) {
      (req as any).isAdmin = false;
      (req as any).isAuthenticated = true;
    }
  }
  
  next();
}; 