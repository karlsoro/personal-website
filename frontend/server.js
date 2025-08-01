const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Prepare the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // HTTPS redirect logic
      const isHttps = req.headers['x-forwarded-proto'] === 'https' || 
                      req.headers['x-forwarded-proto'] === 'https' ||
                      req.connection.encrypted;
      
      const host = req.headers.host || '';
      const isWww = host.startsWith('www.');
      
      // If it's HTTP or www subdomain, redirect to HTTPS non-www
      if (!isHttps || isWww) {
        const targetHost = 'sorochinski.com';
        const targetUrl = `https://${targetHost}${req.url}`;
        
        console.log(`[HTTPS REDIRECT] ${req.method} ${req.url} -> ${targetUrl}`);
        res.writeHead(301, { Location: targetUrl });
        res.end();
        return;
      }

      // Handle the request with Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
}); 