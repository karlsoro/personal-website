import express from 'express'
import BlogPost from '../models/BlogPost'

const router = express.Router()

// GET /api/blog - Get all blog posts
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 2;
    const posts = await BlogPost.find()
      .sort({ date: -1, createdAt: -1 })
      .limit(limit)
      .exec();
    return res.json({
      success: true,
      message: 'Fetched blog posts',
      data: posts
    });
  } catch (error) {
    // console.error('Get blog posts error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    })
  }
})

// GET /api/blog/:id - Get single blog post
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).exec();
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
        data: null
      });
    }
    return res.json({
      success: true,
      message: 'Fetched blog post',
      data: post
    });
  } catch (error) {
    // console.error('Get blog post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
});

// POST /api/blog - Create a new blog post
router.post('/', async (req, res) => {
  try {
    console.log('Received blog post data:', req.body);
    const { title, date, subtitle, summaryBody, update, update2025, detail } = req.body;
    
    // Validate required fields
    if (!title || !date || !subtitle || !summaryBody || !detail) {
      console.log('Missing required fields:', { title: !!title, date: !!date, subtitle: !!subtitle, summaryBody: !!summaryBody, detail: !!detail });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, date, subtitle, summaryBody, and detail are required'
      });
    }
    
    const blogPost = new BlogPost({
      title,
      date,
      subtitle,
      summaryBody,
      update: update || '',
      update2025: update2025 || '',
      detail
    });
    
    console.log('Creating blog post with data:', blogPost);
    await blogPost.save();
    return res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blogPost
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create blog post: ' + (error instanceof Error ? error.message : 'Unknown error')
    });
  }
});

export default router 