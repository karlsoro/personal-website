import express from 'express'
import { body, validationResult } from 'express-validator'
import BlogPost from '../models/BlogPost'

const router = express.Router()

// FORCE FRESH DEPLOYMENT - Route matching fix applied
// Debug middleware to trace all requests
router.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} ${req.originalUrl} - Params: ${JSON.stringify(req.params)}`);
  next();
});

// Validation middleware for blog post creation
const validateBlogPost = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('date')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Date must be between 1 and 20 characters'),
  body('subtitle')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Subtitle must be between 1 and 200 characters'),
  body('summaryBody')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Summary body is required'),
  body('detail')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Detail content is required'),
  body('updateText')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Update must be less than 2000 characters'),
  body('update2025')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Update2025 must be less than 2000 characters')
]

// Route 1: GET /api/blog - Basic posts with limit
router.get('/', async (req, res) => {
  try {
    console.log('[DEBUG] HIT / (root) endpoint');
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
    console.error('Get blog posts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    })
  }
})

// Route 2: GET /api/blog/all - All posts with IDs (for management)
router.get('/all', async (req, res) => {
  try {
    console.log('[DEBUG] HIT /all endpoint');
    const posts = await BlogPost.find()
      .sort({ date: -1, createdAt: -1 })
      .select('_id title date subtitle createdAt')
      .exec();
    console.log('[DEBUG] Posts fetched:', posts.length, 'posts'); // Debug log as recommended
    if (posts.length === 0) {
      return res.json({
        success: true,
        message: 'No blog posts found',
        data: []
      });
    }
    return res.json({
      success: true,
      message: 'Fetched all blog posts',
      data: posts
    });
  } catch (error) {
    console.error('Get all blog posts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch all blog posts'
    });
  }
});

// Route 3: POST /api/blog - Create new post
router.post('/', validateBlogPost, async (req: express.Request, res: express.Response) => {
  try {
    console.log('[DEBUG] HIT POST / endpoint');
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, date, subtitle, summaryBody, updateText, update2025, detail } = req.body;
    
    const blogPost = new BlogPost({
      title,
      date,
      subtitle,
      summaryBody,
      updateText: updateText || '',
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

// Route 4: DELETE /api/blog/test - Delete test posts
router.delete('/test', async (req, res) => {
  try {
    console.log('[DEBUG] HIT DELETE /test endpoint');
    // Delete all blog posts with "test" in the title (case insensitive)
    const result = await BlogPost.deleteMany({
      title: { $regex: /test/i }
    });
    
    return res.json({
      success: true,
      message: `Deleted ${result.deletedCount} test blog posts`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Delete test posts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete test posts: ' + (error instanceof Error ? error.message : 'Unknown error')
    });
  }
});

// Route 5: GET /api/blog/:id - Get single post (MongoDB ObjectID validation)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[DEBUG] HIT GET /:id endpoint with ID: ${id}`);
    
    // Validate MongoDB ObjectID format as recommended
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog post ID format'
      });
    }
    
    const post = await BlogPost.findById(id).exec();
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
    console.error('Get blog post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
});

// Route 6: DELETE /api/blog/:id - Delete single post (MongoDB ObjectID validation)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[DEBUG] HIT DELETE /:id endpoint with ID: ${id}`);
    
    // Validate MongoDB ObjectID format as recommended
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog post ID format'
      });
    }
    
    // First, get the post to show what we're deleting
    const post = await BlogPost.findById(id).select('title date').exec();
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
        data: null
      });
    }
    
    // Delete the post
    await BlogPost.findByIdAndDelete(id).exec();
    
    return res.json({
      success: true,
      message: `Deleted blog post: "${post.title}" (${post.date})`,
      deletedPost: {
        id: id,
        title: post.title,
        date: post.date
      }
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete blog post: ' + (error instanceof Error ? error.message : 'Unknown error')
    });
  }
});

export default router
