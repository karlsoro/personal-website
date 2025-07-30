import mongoose from 'mongoose'

export const connectDatabase = async (): Promise<void> => {
  try {
    // Use the correct environment variable name that Azure sets
    const mongoUri = process.env.MONGODB_CONNECTION_STRING || process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-website'
    
    console.log('🔍 Attempting to connect to MongoDB...')
    console.log('🔍 Connection string (masked):', mongoUri ? `${mongoUri.substring(0, 20)}...` : 'undefined')
    
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      // Azure Cosmos DB compatibility options
      retryWrites: false,
      w: 'majority',
      // Force older MongoDB wire protocol for Cosmos DB compatibility
      maxIdleTimeMS: 30000,
      // Disable features not supported by Cosmos DB
      bufferCommands: false
    })

    console.log('📦 MongoDB connected successfully')
    console.log('📦 Database name:', mongoose.connection.db.databaseName)
    console.log('📦 Connection state:', mongoose.connection.readyState)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    console.error('❌ Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      code: (error as any)?.code || 'Unknown'
    })
    
    // In development, continue without MongoDB
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      console.log('⚠️  Continuing without MongoDB in development mode')
      console.log('📝 API endpoints will work but data will not persist')
      return
    }
    
    // Only throw error in production
    throw error
  }
}

export const disconnectDatabase = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect()
      console.log('📦 MongoDB disconnected successfully')
    }
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error)
    // Don't throw error on disconnect
  }
} 