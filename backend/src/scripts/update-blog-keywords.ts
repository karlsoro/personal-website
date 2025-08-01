import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlogPost from '../models/BlogPost';

dotenv.config();

// Keywords mapping for existing posts
const existingPostKeywords: { [title: string]: string[] } = {
  'Mobile First Desktop Later': ['mobile', 'strategy', 'innovation'],
  'BYOD Isn\'t a Perk—It\'s a Policy Crisis': ['security', 'budget', 'risk'],
  'ITIL Is Getting in the Way': ['service management', 'ways of working', 'standards']
};

async function updateBlogKeywords() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-website';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Get all blog posts
    const posts = await BlogPost.find({});
    console.log(`Found ${posts.length} blog posts`);

    let updatedCount = 0;

    for (const post of posts) {
      const keywords = existingPostKeywords[post.title];
      
      if (keywords) {
        post.keywords = keywords;
        await post.save();
        console.log(`Updated "${post.title}" with keywords: ${keywords.join(', ')}`);
        updatedCount++;
      } else {
        console.log(`No keywords found for "${post.title}"`);
      }
    }

    console.log(`\nUpdate complete! Updated ${updatedCount} posts with keywords.`);
    
  } catch (error) {
    console.error('Error updating blog keywords:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
updateBlogKeywords(); 