import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'

// Import routes
import contactRoutes from './routes/contact'
import projectRoutes from './routes/projects'
import blogRoutes from './routes/blog'
import resumeRoutes from './routes/resume'

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import { httpsRedirect } from './middleware/httpsRedirect'

const app = express()

// Debug middleware to trace all incoming requests
app.use((req, res, next) => {
  console.log(`[APP DEBUG] ${req.method} ${req.originalUrl} - Headers: ${JSON.stringify(req.headers)}`);
  next();
});

// HTTPS redirect middleware (must come before other middleware)
app.use(httpsRedirect)

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

// Enhanced health check endpoint
app.get('/health', (req, res) => {
  const healthStatus = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: {
      connected: mongoose.connection.readyState === 1,
      state: mongoose.connection.readyState,
      databaseName: mongoose.connection.db?.databaseName || 'unknown'
    },
    version: process.version,
    platform: process.platform
  }
  
  // Return 503 if database is not connected in production
  const statusCode = (process.env.NODE_ENV === 'production' && !healthStatus.database.connected) ? 503 : 200
  
  res.status(statusCode).json(healthStatus)
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

// API routes
app.use('/api/contact', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/resume', resumeRoutes)

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Personal Website API',
    version: '1.0.0',
    endpoints: {
      contact: '/api/contact',
      projects: '/api/projects',
      blog: '/api/blog',
      resume: '/api/resume',
      auth: '/api/auth',
      health: '/health'
    }
  })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

export default app
