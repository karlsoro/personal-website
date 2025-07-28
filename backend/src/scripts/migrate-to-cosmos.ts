import mongoose from 'mongoose';

// Load environment variables from .env file if it exists
if (process.env.NODE_ENV !== 'production') {
  try {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(__dirname, '../../.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach((line: string) => {
        const [key, value] = line.split('=');
        if (key && value && !process.env[key]) {
          process.env[key] = value.trim();
        }
      });
    }
  } catch (error) {
    console.log('No .env file found, using existing environment variables');
  }
}

// Import the BlogPost model
import BlogPost from '../models/BlogPost';

async function migrateToCosmos() {
  console.log('🚀 Starting migration from local MongoDB to Azure Cosmos DB...');
  
  try {
    // Connect to local MongoDB
    console.log('📦 Connecting to local MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/personal-website');
    console.log('✅ Connected to local MongoDB');
    
    // Fetch all blog posts from local database
    console.log('📖 Fetching blog posts from local database...');
    const localBlogPosts = await BlogPost.find({}).lean();
    console.log(`✅ Found ${localBlogPosts.length} blog posts`);
    
    if (localBlogPosts.length === 0) {
      console.log('⚠️  No blog posts found in local database');
      return;
    }
    
    // Disconnect from local MongoDB
    await mongoose.disconnect();
    console.log('📦 Disconnected from local MongoDB');
    
    // Connect to Azure Cosmos DB
    console.log('☁️  Connecting to Azure Cosmos DB...');
    const cosmosUri = process.env.MONGODB_CONNECTION_STRING;
    if (!cosmosUri) {
      throw new Error('MONGODB_CONNECTION_STRING environment variable not set');
    }
    
    await mongoose.connect(cosmosUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: false,
      w: 'majority',
    });
    console.log('✅ Connected to Azure Cosmos DB');
    
    // Clear existing blog posts in Cosmos DB (optional - comment out if you want to keep existing)
    console.log('🧹 Clearing existing blog posts in Cosmos DB...');
    await BlogPost.deleteMany({});
    console.log('✅ Cleared existing blog posts');
    
    // Insert blog posts into Cosmos DB
    console.log('📝 Inserting blog posts into Cosmos DB...');
    const insertedPosts = await BlogPost.insertMany(localBlogPosts);
    console.log(`✅ Successfully inserted ${insertedPosts.length} blog posts`);
    
    // Verify the migration
    console.log('🔍 Verifying migration...');
    const cosmosBlogPosts = await BlogPost.find({});
    console.log(`✅ Verified ${cosmosBlogPosts.length} blog posts in Cosmos DB`);
    
    console.log('🎉 Migration completed successfully!');
    console.log('\n📊 Migration Summary:');
    console.log(`   - Local posts: ${localBlogPosts.length}`);
    console.log(`   - Migrated posts: ${insertedPosts.length}`);
    console.log(`   - Verified posts: ${cosmosBlogPosts.length}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('📦 Disconnected from Cosmos DB');
  }
}

// Run the migration
migrateToCosmos(); 