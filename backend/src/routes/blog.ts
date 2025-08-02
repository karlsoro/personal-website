import express from 'express'
import BlogPost from '../models/BlogPost'

const router = express.Router()

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 })
    res.json({ data: posts })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    res.status(500).json({ error: 'Failed to fetch blog posts' })
  }
})

// Get latest blog posts for home page
router.get('/home', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 }).limit(4)
    res.json({ data: posts })
  } catch (error) {
    console.error('Error fetching home blog posts:', error)
    res.status(500).json({ error: 'Failed to fetch home blog posts' })
  }
})

// Get single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' })
    }
    res.json({ data: post })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    res.status(500).json({ error: 'Failed to fetch blog post' })
  }
})

// Create new blog post
router.post('/', async (req, res) => {
  try {
    const post = new BlogPost(req.body)
    await post.save()
    res.status(201).json({ data: post })
  } catch (error) {
    console.error('Error creating blog post:', error)
    res.status(500).json({ error: 'Failed to create blog post' })
  }
})

// Temporary endpoint to update keywords
router.post('/update-keywords', async (req, res) => {
  try {
    console.log('🔧 Updating blog post keywords...')
    
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
    ]
    
    const results: string[] = []
    
    for (const update of updates) {
      const result = await BlogPost.updateOne(
        { title: update.title },
        { $set: { keywords: update.keywords } }
      )
      
      if (result.matchedCount > 0) {
        results.push(`✅ Updated "${update.title}" with keywords: [${update.keywords.join(', ')}]`)
      } else {
        results.push(`❌ Post not found: "${update.title}"`)
      }
    }
    
    console.log('🎉 Keyword updates completed!')
    res.json({ 
      message: 'Keyword updates completed',
      results: results
    })
    
  } catch (error) {
    console.error('❌ Error updating keywords:', error)
    res.status(500).json({ error: 'Failed to update keywords' })
  }
})

export default router
