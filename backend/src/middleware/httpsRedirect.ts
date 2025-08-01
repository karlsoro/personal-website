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