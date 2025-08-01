export interface ResumeContent {
  content: string
  lastModified: string
}

export const getResumeContent = async (): Promise<ResumeContent> => {
  try {
    const response = await fetch('/api/resume')
    if (!response.ok) {
      throw new Error('Failed to fetch resume content')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching resume content:', error)
    throw error
  }
} 