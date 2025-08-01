export interface BlogImage {
  filename: string
  keywords: string[]
  category: string
  alt: string
}

export const BLOG_IMAGES: BlogImage[] = [
  {
    filename: 'blog-ai-ml.jpg',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'neural network', 'deep learning', 'algorithm', 'predictive', 'automation'],
    category: 'AI/ML',
    alt: 'Artificial Intelligence and Machine Learning'
  },
  {
    filename: 'blog-cloud-computing.jpg',
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'kubernetes', 'docker', 'microservices', 'serverless', 'infrastructure', 'devops'],
    category: 'Cloud/DevOps',
    alt: 'Cloud Computing and DevOps'
  },
  {
    filename: 'blog-data-analytics.jpg',
    keywords: ['data', 'analytics', 'big data', 'database', 'sql', 'nosql', 'mongodb', 'snowflake', 'databricks', 'bi', 'business intelligence'],
    category: 'Data/Analytics',
    alt: 'Data Analytics and Business Intelligence'
  },
  {
    filename: 'blog-cybersecurity.jpg',
    keywords: ['security', 'cybersecurity', 'encryption', 'authentication', 'firewall', 'vulnerability', 'threat', 'compliance', 'gdpr', 'privacy', 'budget', 'risk'],
    category: 'Security',
    alt: 'Cybersecurity and Data Protection'
  },
  {
    filename: 'blog-software-development.jpg',
    keywords: ['development', 'programming', 'coding', 'software', 'application', 'api', 'web', 'mobile', 'frontend', 'backend', 'fullstack'],
    category: 'Development',
    alt: 'Software Development and Programming'
  },
  {
    filename: 'blog-project-management.jpg',
    keywords: ['project', 'management', 'agile', 'scrum', 'kanban', 'leadership', 'team', 'collaboration', 'planning', 'strategy', 'service management', 'ways of working', 'standards'],
    category: 'Management',
    alt: 'Project Management and Leadership'
  },
  {
    filename: 'blog-enterprise-architecture.jpg',
    keywords: ['architecture', 'enterprise', 'system design', 'integration', 'soa', 'microservices', 'legacy', 'modernization', 'transformation'],
    category: 'Architecture',
    alt: 'Enterprise Architecture and System Design'
  },
  {
    filename: 'blog-digital-transformation.jpg',
    keywords: ['transformation', 'digital', 'innovation', 'change', 'modernization', 'migration', 'upgrade', 'evolution', 'future'],
    category: 'Transformation',
    alt: 'Digital Transformation and Innovation'
  },
  {
    filename: 'blog-business-strategy.jpg',
    keywords: ['business', 'strategy', 'organization', 'process', 'efficiency', 'optimization', 'cost', 'value', 'roi', 'goals', 'mobile', 'innovation'],
    category: 'Business',
    alt: 'Business Strategy and Optimization'
  },
  {
    filename: 'blog-technology-trends.jpg',
    keywords: ['trends', 'technology', 'future', 'emerging', 'innovation', 'disruption', 'next-gen', 'cutting-edge', 'advancement'],
    category: 'Trends',
    alt: 'Technology Trends and Innovation'
  },
  {
    filename: 'blog-team-collaboration.jpg',
    keywords: ['team', 'collaboration', 'communication', 'culture', 'workplace', 'remote', 'hybrid', 'productivity', 'engagement'],
    category: 'Collaboration',
    alt: 'Team Collaboration and Communication'
  },
  {
    filename: 'blog-quality-assurance.jpg',
    keywords: ['testing', 'qa', 'quality', 'assurance', 'automation', 'ci/cd', 'pipeline', 'deployment', 'monitoring', 'performance'],
    category: 'Quality',
    alt: 'Quality Assurance and Testing'
  },
  {
    filename: 'blog-user-experience.jpg',
    keywords: ['ux', 'ui', 'user experience', 'design', 'interface', 'usability', 'accessibility', 'customer', 'user-centered'],
    category: 'UX/UI',
    alt: 'User Experience and Interface Design'
  },
  {
    filename: 'blog-financial-technology.jpg',
    keywords: ['fintech', 'financial', 'banking', 'payment', 'blockchain', 'cryptocurrency', 'investment', 'trading', 'risk'],
    category: 'FinTech',
    alt: 'Financial Technology and Banking'
  },
  {
    filename: 'blog-healthcare-technology.jpg',
    keywords: ['healthcare', 'medical', 'pharma', 'clinical', 'patient', 'health', 'wellness', 'biotech', 'research'],
    category: 'Healthcare',
    alt: 'Healthcare Technology and Medical Innovation'
  },
  {
    filename: 'blog-supply-chain.jpg',
    keywords: ['supply chain', 'logistics', 'inventory', 'warehouse', 'distribution', 'procurement', 'vendor', 'sourcing'],
    category: 'Supply Chain',
    alt: 'Supply Chain and Logistics'
  },
  {
    filename: 'blog-customer-relationship.jpg',
    keywords: ['crm', 'customer', 'relationship', 'sales', 'marketing', 'service', 'support', 'engagement', 'loyalty'],
    category: 'CRM',
    alt: 'Customer Relationship Management'
  },
  {
    filename: 'blog-compliance-governance.jpg',
    keywords: ['compliance', 'governance', 'regulation', 'policy', 'audit', 'risk', 'legal', 'standards', 'framework'],
    category: 'Compliance',
    alt: 'Compliance and Governance'
  },
  {
    filename: 'blog-performance-optimization.jpg',
    keywords: ['performance', 'optimization', 'speed', 'efficiency', 'scalability', 'load', 'capacity', 'throughput', 'latency'],
    category: 'Performance',
    alt: 'Performance Optimization and Scalability'
  },
  {
    filename: 'blog-knowledge-management.jpg',
    keywords: ['knowledge', 'documentation', 'learning', 'training', 'education', 'content', 'information', 'wisdom', 'expertise'],
    category: 'Knowledge',
    alt: 'Knowledge Management and Learning'
  }
]

export const getBlogImage = (postContent: string, postTitle: string = '', postKeywords: string[] = []): BlogImage => {
  // If we have keywords from the database, use those for matching
  if (postKeywords && postKeywords.length > 0) {
    const searchText = postKeywords.join(' ').toLowerCase()
    
    // Find images that match the keywords
    const matchingImages = BLOG_IMAGES.filter(image => 
      image.keywords.some(keyword => searchText.includes(keyword.toLowerCase()))
    )
    
    // If we have matches, return the first one (deterministic)
    if (matchingImages.length > 0) {
      return matchingImages[0]
    }
  }
  
  // Fallback to content analysis if no keywords or no matches
  const searchText = `${postTitle} ${postContent}`.toLowerCase()
  
  // Find images that match the content
  const matchingImages = BLOG_IMAGES.filter(image => 
    image.keywords.some(keyword => searchText.includes(keyword.toLowerCase()))
  )
  
  // If we have matches, return the first one (deterministic)
  if (matchingImages.length > 0) {
    return matchingImages[0]
  }
  
  // If no matches, use a deterministic approach based on post title hash
  const titleHash = postTitle.split('').reduce((hash, char) => {
    return ((hash << 5) - hash + char.charCodeAt(0)) & 0xffffffff
  }, 0)
  const index = Math.abs(titleHash) % BLOG_IMAGES.length
  return BLOG_IMAGES[index]
}

export const getBlogImageUrl = (image: BlogImage): string => {
  // Use the actual SVG image files
  return `/blog-images/${image.filename.replace('.jpg', '.svg')}`
} 