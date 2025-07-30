import express from 'express'
import { body, validationResult } from 'express-validator'
import BlogPost from '../models/BlogPost'

const router = express.Router()

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

// POST /api/blog - Create a new blog post (protected by APIM)
router.post('/', validateBlogPost, async (req: express.Request, res: express.Response) => {
  try {
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

export default router 