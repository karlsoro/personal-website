export interface BlogImage {
  filename: string
  keywords: string[]
  category: string
  alt: string
}

export const BLOG_IMAGES: BlogImage[] = [
  {
    filename: 'blog-ai-ml.svg',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'neural network', 'deep learning', 'algorithm', 'predictive', 'automation'],
    category: 'Technology',
    alt: 'Artificial Intelligence and Machine Learning'
  },
  {
    filename: 'blog-cloud-computing.svg',
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'kubernetes', 'docker', 'microservices', 'serverless', 'infrastructure', 'devops'],
    category: 'Technology',
    alt: 'Cloud Computing and DevOps'
  },
  {
    filename: 'blog-data-analytics.svg',
    keywords: ['data', 'analytics', 'big data', 'database', 'sql', 'nosql', 'mongodb', 'snowflake', 'databricks', 'bi', 'business intelligence'],
    category: 'Data',
    alt: 'Data Analytics and Business Intelligence'
  },
  {
    filename: 'blog-cybersecurity.svg',
    keywords: ['security', 'cybersecurity', 'encryption', 'authentication', 'firewall', 'vulnerability', 'threat', 'compliance', 'gdpr', 'privacy', 'budget', 'risk'],
    category: 'Security',
    alt: 'Cybersecurity and Data Protection'
  },
  {
    filename: 'blog-software-development.svg',
    keywords: ['development', 'programming', 'coding', 'software', 'application', 'api', 'web', 'mobile', 'frontend', 'backend', 'fullstack'],
    category: 'Technology',
    alt: 'Software Development and Programming'
  },
  {
    filename: 'blog-project-management.svg',
    keywords: ['project', 'management', 'agile', 'scrum', 'kanban', 'leadership', 'team', 'collaboration', 'planning', 'strategy', 'service management', 'ways of working', 'standards'],
    category: 'Management',
    alt: 'Project Management and Leadership'
  },
  {
    filename: 'blog-enterprise-architecture.svg',
    keywords: ['architecture', 'enterprise', 'system design', 'integration', 'soa', 'microservices', 'legacy', 'modernization', 'transformation'],
    category: 'Technology',
    alt: 'Enterprise Architecture and System Design'
  },
  {
    filename: 'blog-digital-transformation.svg',
    keywords: ['transformation', 'digital', 'innovation', 'change', 'modernization', 'migration', 'upgrade', 'evolution', 'future'],
    category: 'Business',
    alt: 'Digital Transformation and Innovation'
  },
  {
    filename: 'blog-business-strategy.svg',
    keywords: ['business', 'strategy', 'organization', 'process', 'efficiency', 'optimization', 'cost', 'value', 'roi', 'goals', 'mobile', 'innovation'],
    category: 'Business',
    alt: 'Business Strategy and Optimization'
  },
  {
    filename: 'blog-technology-trends.svg',
    keywords: ['trends', 'technology', 'future', 'emerging', 'innovation', 'disruption', 'next-gen', 'cutting-edge', 'advancement'],
    category: 'Technology',
    alt: 'Technology Trends and Innovation'
  },
  {
    filename: 'blog-team-collaboration.svg',
    keywords: ['team', 'collaboration', 'communication', 'culture', 'workplace', 'remote', 'hybrid', 'productivity', 'engagement'],
    category: 'Business',
    alt: 'Team Collaboration and Communication'
  },
  {
    filename: 'blog-quality-assurance.svg',
    keywords: ['testing', 'qa', 'quality', 'assurance', 'automation', 'ci/cd', 'pipeline', 'deployment', 'monitoring', 'performance'],
    category: 'Quality',
    alt: 'Quality Assurance and Testing'
  },
  {
    filename: 'blog-user-experience.svg',
    keywords: ['ux', 'ui', 'user experience', 'design', 'interface', 'usability', 'accessibility', 'customer', 'user-centered'],
    category: 'UX',
    alt: 'User Experience and Interface Design'
  },
  {
    filename: 'blog-financial-technology.svg',
    keywords: ['fintech', 'financial', 'banking', 'payment', 'blockchain', 'cryptocurrency', 'investment', 'trading', 'risk'],
    category: 'Industry',
    alt: 'Financial Technology and Banking'
  },
  {
    filename: 'blog-healthcare-technology.svg',
    keywords: ['healthcare', 'medical', 'pharma', 'clinical', 'patient', 'health', 'wellness', 'biotech', 'research'],
    category: 'Industry',
    alt: 'Healthcare Technology and Medical Innovation'
  },
  {
    filename: 'blog-supply-chain.svg',
    keywords: ['supply chain', 'logistics', 'inventory', 'warehouse', 'distribution', 'procurement', 'vendor', 'sourcing'],
    category: 'Industry',
    alt: 'Supply Chain and Logistics'
  },
  {
    filename: 'blog-customer-relationship.svg',
    keywords: ['crm', 'customer', 'relationship', 'sales', 'marketing', 'service', 'support', 'engagement', 'loyalty'],
    category: 'Industry',
    alt: 'Customer Relationship Management'
  },
  {
    filename: 'blog-compliance-governance.svg',
    keywords: ['compliance', 'governance', 'regulation', 'policy', 'audit', 'risk', 'legal', 'standards', 'framework'],
    category: 'Industry',
    alt: 'Compliance and Governance'
  },
  {
    filename: 'blog-performance-optimization.svg',
    keywords: ['performance', 'optimization', 'speed', 'efficiency', 'scalability', 'load', 'capacity', 'throughput', 'latency'],
    category: 'Quality',
    alt: 'Performance Optimization and Scalability'
  },
  {
    filename: 'blog-knowledge-management.svg',
    keywords: ['knowledge', 'documentation', 'learning', 'training', 'education', 'content', 'information', 'wisdom', 'expertise'],
    category: 'Industry',
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
  return `/blog-images/${image.filename}`
} 