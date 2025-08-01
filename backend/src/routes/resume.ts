import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const resumePath = path.join(process.cwd(), '..', 'Karl Sorochinski - Resume.md')
    
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ error: 'Resume file not found' })
    }

    const content = fs.readFileSync(resumePath, 'utf-8')
    const stats = fs.statSync(resumePath)
    
    return res.json({
      content,
      lastModified: stats.mtime.toISOString()
    })
  } catch (error) {
    console.error('Error reading resume file:', error)
    return res.status(500).json({ error: 'Failed to read resume content' })
  }
})

export default router 