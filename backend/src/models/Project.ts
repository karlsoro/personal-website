import mongoose, { Document, Schema } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const projectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  technologies: [{
    type: String,
    trim: true,
    maxlength: [50, 'Technology name cannot be more than 50 characters']
  }],
  githubUrl: {
    type: String,
    trim: true,
    match: [
      /^https?:\/\/github\.com\/.+/,
      'Please enter a valid GitHub URL'
    ]
  },
  liveUrl: {
    type: String,
    trim: true,
    match: [
      /^https?:\/\/.+/,
      'Please enter a valid URL'
    ]
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Index for better query performance
projectSchema.index({ featured: 1, order: 1 })
projectSchema.index({ createdAt: -1 })

export default mongoose.model<IProject>('Project', projectSchema) 