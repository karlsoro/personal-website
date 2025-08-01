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
    keywords: ['security', 'cybersecurity', 'encryption', 'authentication', 'firewall', 'vulnerability', 'threat', 'compliance', 'gdpr', 'privacy'],
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
    keywords: ['project', 'management', 'agile', 'scrum', 'kanban', 'leadership', 'team', 'collaboration', 'planning', 'strategy'],
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
    keywords: ['business', 'strategy', 'organization', 'process', 'efficiency', 'optimization', 'cost', 'value', 'roi', 'goals'],
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

export const getBlogImage = (postContent: string, postTitle: string = ''): BlogImage => {
  const searchText = `${postTitle} ${postContent}`.toLowerCase()
  
  // Find images that match the content
  const matchingImages = BLOG_IMAGES.filter(image => 
    image.keywords.some(keyword => searchText.includes(keyword.toLowerCase()))
  )
  
  // If we have matches, return a random one
  if (matchingImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchingImages.length)
    return matchingImages[randomIndex]
  }
  
  // If no matches, return a random image based on content length (for variety)
  const randomIndex = Math.floor(Math.random() * BLOG_IMAGES.length)
  return BLOG_IMAGES[randomIndex]
}

export const getBlogImageUrl = (image: BlogImage): string => {
  // For now, use colored SVG placeholders based on category
  const category = image.category.toLowerCase()
  
  if (category.includes('ai') || category.includes('ml')) {
    return '/blog-images/placeholder-blue.svg'
  } else if (category.includes('cloud') || category.includes('devops')) {
    return '/blog-images/placeholder-green.svg'
  } else if (category.includes('data') || category.includes('analytics')) {
    return '/blog-images/placeholder-purple.svg'
  } else if (category.includes('security') || category.includes('cyber')) {
    return '/blog-images/placeholder-orange.svg'
  } else {
    // Default to blue for other categories
    return '/blog-images/placeholder-blue.svg'
  }
} 