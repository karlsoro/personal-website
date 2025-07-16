import dotenv from 'dotenv'
import app from './app'
import { connectDatabase } from './config/database'

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 3001

async function startServer() {
  try {
    // Try to connect to database
    await connectDatabase()
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    
    // In development, continue without database
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      console.log('⚠️  Continuing without database in development mode')
      console.log('📝 API endpoints will work but data will not persist')
    } else {
      console.error('❌ Failed to start server:', error)
      process.exit(1)
    }
  }

  // Start server regardless of database connection status
  try {
    app.listen(PORT, () => {
      console.log('🚀 Server running on port', PORT)
      console.log('📱 Environment:', process.env.NODE_ENV || 'development')
      console.log('🔗 API URL:', `http://localhost:${PORT}/api`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
