import express, { Request, Response } from 'express'
import Project from '../models/Project'

const router = express.Router()

// GET /api/projects - Get all projects
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { featured, limit = 10, page = 1 } = req.query

    const query: any = {}
    if (featured === 'true') {
      query.featured = true
    }

    const limitNum = parseInt(limit as string)
    const pageNum = parseInt(page as string)
    const skip = (pageNum - 1) * limitNum

    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limitNum)
      .skip(skip)
      .select('-__v')

    const total = await Project.countDocuments(query)

    res.json({
      success: true,
      count: projects.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: projects
    })
  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    })
  }
})

// GET /api/projects/:id - Get single project
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id).select('-__v')

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      })
      return
    }

    res.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Get project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    })
  }
})

// POST /api/projects - Create new project (admin only)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const project = new Project(req.body)
    await project.save()

    res.status(201).json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Create project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    })
  }
})

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-__v')

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      })
      return
    }

    res.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Update project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    })
  }
})

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      })
      return
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    })
  }
})

export default router 