import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  date: string; // Accepts dd/mm/yyyy, mm/yyyy, or yyyy
  subtitle: string;
  summaryBody: string;
  update?: string;
  update2025?: string;
  detail: string; // Markdown content
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
    trim: true,
    maxlength: [20, 'Date cannot be more than 20 characters']
  },
  subtitle: {
    type: String,
    required: [true, 'Sub-Title is required'],
    trim: true,
    maxlength: [200, 'Sub-Title cannot be more than 200 characters']
  },
  summaryBody: {
    type: String,
    required: [true, 'Summary Body is required'],
    trim: true
  },
  update: {
    type: String,
    trim: true,
    default: ''
  },
  update2025: {
    type: String,
    trim: true,
    default: ''
  },
  detail: {
    type: String,
    required: [true, 'Detail markdown is required']
  }
}, {
  timestamps: true
});

blogPostSchema.index({ date: -1, createdAt: -1 });

export default mongoose.model<IBlogPost>('BlogPost', blogPostSchema); 