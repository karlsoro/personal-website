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
    
  } catch (error) {
    console.error('❌ Error updating keywords:', error);
  } finally {
    mongoose.disconnect();
  }
}

updateKeywords(); 