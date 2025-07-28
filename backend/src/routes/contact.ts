import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import Contact from '../models/Contact'
import { sendContactEmail } from '../services/emailService'
import mongoose from 'mongoose'
import { requireAuth, requireAdmin } from '../middleware/auth'

const router = express.Router()

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
]

// POST /api/contact - Submit contact form
router.post('/', validateContact, async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array()
      })
      return
    }

    const { name, email, subject, message } = req.body

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // In development mode, return success without saving to database
      console.log('📝 Development mode: Contact form submitted (not saved to database)')
      res.status(201).json({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon. (Development mode - not saved)',
        data: {
          id: 'dev-' + Date.now(),
          name,
          email,
          subject,
          createdAt: new Date()
        }
      })
      return
    }

    // Create contact record
    const contact = new Contact({
      name,
      email,
      subject,
      message
    })

    await contact.save()

    // Send email notification (optional)
    try {
      await sendContactEmail({ name, email, subject, message })
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    })
  }
})

// GET /api/contact - Get all contacts (admin only)
router.get('/', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v')

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    })
  }
})

// GET /api/contact/:id - Get single contact (admin only)
router.get('/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id).select('-__v')

    if (!contact) {
      res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
      return
    }

    res.json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Get contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    })
  }
})

// PATCH /api/contact/:id - Update contact status (admin only)
router.patch('/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body

    if (!['pending', 'read', 'replied'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status value'
      })
      return
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select('-__v')

    if (!contact) {
      res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
      return
    }

    res.json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Update contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update contact'
    })
  }
})

export default router 