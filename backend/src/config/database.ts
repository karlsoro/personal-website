import mongoose from 'mongoose'

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-website'
    
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
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    
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