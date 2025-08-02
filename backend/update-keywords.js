const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

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

// Updates to make with specific IDs
const updates = [
  {
    id: "6881776e433921628f0c6710",
    title: "Mobile First, Desktop Later",
    keywords: ["mobile", "strategy", "innovation"]
  },
  {
    id: "68814f0a10ef638d205f3eae",
    title: "BYOD Isn't a Perk—It's a Policy Crisis", 
    keywords: ["security", "budget", "risk"]
  },
  {
    id: "68817752433921628f0c670e",
    title: "ITIL Is Getting in the Way",
    keywords: ["service management", "ways of working", "standards"]
  }
];

async function updateKeywords() {
  try {
    console.log('🔧 Updating blog post keywords...');
    
    for (const update of updates) {
      const result = await BlogPost.findByIdAndUpdate(
        update.id,
        { $set: { keywords: update.keywords } },
        { new: true }
      );
      
      if (result) {
        console.log(`✅ Updated "${update.title}" with keywords: [${update.keywords.join(', ')}]`);
      } else {
        console.log(`❌ Post not found: "${update.title}" (ID: ${update.id})`);
      }
    }
    
    console.log('\n🎉 Keyword updates completed!');
    
    // Verify the updates
    console.log('\n📋 Current posts and their keywords:');
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