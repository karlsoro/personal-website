import mongoose from 'mongoose'
import { connectDatabase } from '../config/database'
import Contact from '../models/Contact'
import Project from '../models/Project'

async function initializeDatabase() {
  try {
    // Connect to database
    await connectDatabase()
    console.log('📦 Connected to MongoDB')

    // Clear existing data
    await Contact.deleteMany({})
    await Project.deleteMany({})
    console.log('🧹 Cleared existing data')

    // Create sample contacts
    const sampleContacts = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Website Feedback',
        message: 'Great website! I love the design and functionality.',
        createdAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        subject: 'Collaboration Opportunity',
        message: 'Interested in collaborating on a project. Let\'s connect!',
        createdAt: new Date()
      },
      {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        subject: 'Portfolio Review',
        message: 'Your portfolio is impressive. Looking forward to seeing more projects.',
        createdAt: new Date()
      }
    ]

    await Contact.insertMany(sampleContacts)
    console.log('✅ Created sample contacts')

    // Create sample projects
    const sampleProjects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        githubUrl: 'https://github.com/yourusername/ecommerce-platform',
        liveUrl: 'https://ecommerce-demo.vercel.app',
        featured: true,
        createdAt: new Date()
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        githubUrl: 'https://github.com/yourusername/task-manager',
        liveUrl: 'https://task-manager-demo.vercel.app',
        featured: true,
        createdAt: new Date()
      },
      {
        title: 'Weather Dashboard',
        description: 'A beautiful weather dashboard that displays current weather conditions, forecasts, and historical data with interactive charts.',
        technologies: ['Vue.js', 'Chart.js', 'OpenWeather API'],
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        githubUrl: 'https://github.com/yourusername/weather-dashboard',
        liveUrl: 'https://weather-dashboard-demo.vercel.app',
        featured: false,
        createdAt: new Date()
      }
    ]

    await Project.insertMany(sampleProjects)
    console.log('✅ Created sample projects')

    console.log('🎉 Database initialization completed successfully!')
    console.log('📊 Sample data created:')
    console.log(`   - ${sampleContacts.length} contacts`)
    console.log(`   - ${sampleProjects.length} projects`)

  } catch (error) {
    console.error('❌ Database initialization failed:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB')
    process.exit(0)
  }
}

initializeDatabase() 