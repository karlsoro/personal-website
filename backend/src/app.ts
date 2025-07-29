import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

// Import routes
import contactRoutes from './routes/contact'
import projectRoutes from './routes/projects'
import blogRoutes from './routes/blog'

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
// import { csrfProtectionMiddleware, csrfErrorHandler, getCsrfToken } from './middleware/csrf'

const app = express()

// Security middleware
app.use(helmet())

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN_PROD 
    : process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime()
  })
})

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
})
app.use('/api/contact', limiter)
app.use('/api/projects', limiter)
app.use('/api/blog', limiter)

// Logging middleware
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// } else {
//   app.use(morgan('combined'))
// }

// API routes with CSRF protection
app.use('/api/contact', contactRoutes) // Temporarily disabled CSRF for testing
app.use('/api/projects', projectRoutes)
app.use('/api/blog', blogRoutes)

// CSRF token endpoint (after API routes)
app.get('/api/csrf-token', (req, res) => {
  res.json({
    success: true,
    message: 'CSRF token endpoint test - middleware import working'
  });
})

// Test endpoint to verify routing
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Test endpoint working'
  });
})

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Personal Website API',
    version: '1.0.0',
    endpoints: {
      contact: '/api/contact',
      projects: '/api/projects',
      blog: '/api/blog',
      auth: '/api/auth',
      health: '/health'
    }
  })
})

// Error handling middleware
// app.use(csrfErrorHandler) // Temporarily disabled for testing
app.use(notFound)
app.use(errorHandler)

export default app
