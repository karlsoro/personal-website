const mongoose = require('mongoose');
require('dotenv').config();

// Connect to production MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-website';
console.log('Connecting to MongoDB...');

mongoose.connect(MONGODB_URI);

// Define the BlogPost schema
const blogPostSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  summaryBody: String,
  update: String,
  update2025: String,
  detail: String,
  date: String,
  keywords: [String],
  createdAt: Date,
  updatedAt: Date
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Updates to make
const updates = [
  {
    title: "Mobile First, Desktop Later",
    keywords: ["mobile", "strategy", "innovation"]
  },
  {
    title: "BYOD Isn't a Perk—It's a Policy Crisis", 
    keywords: ["security", "budget", "risk"]
  },
  {
    title: "ITIL Is Getting in the Way",
    keywords: ["service management", "ways of working", "standards"]
  }
];

async function updateKeywords() {
  try {
    console.log('🔧 Updating blog post keywords...');
    
    // First, let's see what posts exist
    console.log('\n📋 Current posts in database:');
    const allPosts = await BlogPost.find();
    allPosts.forEach(post => {
      console.log(`- "${post.title}" (keywords: [${post.keywords?.join(', ') || 'none'}])`);
    });
    
    console.log('\n🔧 Applying updates...');
    for (const update of updates) {
      const result = await BlogPost.updateOne(
        { title: update.title },
        { $set: { keywords: update.keywords } }
      );
      
      if (result.matchedCount > 0) {
        console.log(`✅ Updated "${update.title}" with keywords: [${update.keywords.join(', ')}]`);
      } else {
        console.log(`❌ Post not found: "${update.title}"`);
      }
    }
    
    console.log('\n🎉 Keyword updates completed!');
    
    // Verify the updates
    console.log('\n📋 Final posts and their keywords:');
    const posts = await BlogPost.find().sort({ date: -1 });
    posts.forEach(post => {
      console.log(`- "${post.title}": [${post.keywords.join(', ') || 'none'}]`);
    });
    
  } catch (error) {
    console.error('❌ Error updating keywords:', error);
  } finally {
    mongoose.disconnect();
  }
}

updateKeywords(); 