const fs = require('fs');
const path = require('path');

// Blog images with their titles and categories
const BLOG_IMAGES = [
  {
    filename: 'blog-ai-ml.jpg',
    title: 'AI & Machine Learning',
    subtitle: 'Artificial Intelligence',
    category: 'Technology',
    keywords: ['ai', 'ml', 'artificial intelligence', 'machine learning']
  },
  {
    filename: 'blog-cloud-computing.jpg',
    title: 'Cloud Computing',
    subtitle: 'Infrastructure & DevOps',
    category: 'Technology',
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'kubernetes', 'docker', 'devops']
  },
  {
    filename: 'blog-software-development.jpg',
    title: 'Software Development',
    subtitle: 'Programming & Code',
    category: 'Technology',
    keywords: ['development', 'programming', 'coding', 'software']
  },
  {
    filename: 'blog-cybersecurity.jpg',
    title: 'Cybersecurity',
    subtitle: 'Data Protection & Security',
    category: 'Security',
    keywords: ['security', 'cybersecurity', 'encryption', 'authentication', 'firewall', 'vulnerability', 'threat', 'compliance', 'gdpr', 'privacy', 'budget', 'risk']
  },
  {
    filename: 'blog-data-analytics.jpg',
    title: 'Data Analytics',
    subtitle: 'Business Intelligence',
    category: 'Data',
    keywords: ['data', 'analytics', 'big data', 'database', 'sql', 'nosql', 'bi', 'business intelligence', 'snowflake', 'databricks']
  },
  {
    filename: 'blog-enterprise-architecture.jpg',
    title: 'Enterprise Architecture',
    subtitle: 'System Design',
    category: 'Technology',
    keywords: ['enterprise', 'architecture', 'system', 'design']
  },
  {
    filename: 'blog-project-management.jpg',
    title: 'Project Management',
    subtitle: 'Leadership & Strategy',
    category: 'Management',
    keywords: ['project', 'management', 'agile', 'scrum', 'kanban', 'leadership', 'team', 'collaboration', 'planning', 'strategy', 'service management', 'ways of working', 'standards']
  },
  {
    filename: 'blog-business-strategy.jpg',
    title: 'Business Strategy',
    subtitle: 'Optimization & Innovation',
    category: 'Business',
    keywords: ['business', 'strategy', 'organization', 'process', 'efficiency', 'optimization', 'cost', 'value', 'roi', 'goals', 'mobile', 'innovation']
  },
  {
    filename: 'blog-team-collaboration.jpg',
    title: 'Team Collaboration',
    subtitle: 'Communication & Workplace',
    category: 'Business',
    keywords: ['team', 'collaboration', 'communication']
  },
  {
    filename: 'blog-digital-transformation.jpg',
    title: 'Digital Transformation',
    subtitle: 'Innovation & Change',
    category: 'Business',
    keywords: ['transformation', 'digital', 'innovation', 'change']
  },
  {
    filename: 'blog-quality-assurance.jpg',
    title: 'Quality Assurance',
    subtitle: 'Testing & Software',
    category: 'Quality',
    keywords: ['testing', 'qa', 'quality', 'assurance']
  },
  {
    filename: 'blog-performance-optimization.jpg',
    title: 'Performance Optimization',
    subtitle: 'Speed & Efficiency',
    category: 'Quality',
    keywords: ['performance', 'optimization', 'speed', 'efficiency']
  },
  {
    filename: 'blog-user-experience.jpg',
    title: 'User Experience',
    subtitle: 'Interface & Design',
    category: 'UX',
    keywords: ['ux', 'ui', 'user experience', 'design']
  },
  {
    filename: 'blog-technology-trends.jpg',
    title: 'Technology Trends',
    subtitle: 'Future & Innovation',
    category: 'Technology',
    keywords: ['trends', 'technology', 'future', 'emerging']
  },
  {
    filename: 'blog-financial-technology.jpg',
    title: 'Financial Technology',
    subtitle: 'Banking & Payment',
    category: 'Industry',
    keywords: ['fintech', 'financial', 'banking', 'payment']
  },
  {
    filename: 'blog-healthcare-technology.jpg',
    title: 'Healthcare Technology',
    subtitle: 'Medical Innovation',
    category: 'Industry',
    keywords: ['healthcare', 'medical', 'pharma', 'clinical']
  },
  {
    filename: 'blog-supply-chain.jpg',
    title: 'Supply Chain',
    subtitle: 'Logistics & Inventory',
    category: 'Industry',
    keywords: ['supply chain', 'logistics', 'inventory']
  },
  {
    filename: 'blog-customer-relationship.jpg',
    title: 'Customer Relationship',
    subtitle: 'Management & Sales',
    category: 'Industry',
    keywords: ['crm', 'customer', 'relationship', 'sales']
  },
  {
    filename: 'blog-compliance-governance.jpg',
    title: 'Compliance & Governance',
    subtitle: 'Regulation & Policy',
    category: 'Industry',
    keywords: ['compliance', 'governance', 'regulation']
  },
  {
    filename: 'blog-knowledge-management.jpg',
    title: 'Knowledge Management',
    subtitle: 'Documentation & Learning',
    category: 'Industry',
    keywords: ['knowledge', 'documentation', 'learning']
  }
];

// Generate SVG placeholder with text
function generateSVGPlaceholder(image) {
  const colors = {
    Technology: '#3182CE', // Blue
    Security: '#E53E3E',   // Red
    Data: '#805AD5',       // Purple
    Management: '#38A169', // Green
    Business: '#D69E2E',   // Yellow
    Quality: '#DD6B20',    // Orange
    UX: '#319795',         // Teal
    Industry: '#2B6CB0'    // Dark Blue
  };

  const bgColor = colors[image.category] || '#3182CE';
  const textColor = '#FFFFFF';
  const accentColor = '#E2E8F0';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${bgColor};stop-opacity:0.8" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Background rectangle -->
  <rect width="1200" height="800" fill="url(#grad1)"/>
  
  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="50" fill="${accentColor}" opacity="0.1"/>
  <circle cx="1100" cy="700" r="80" fill="${accentColor}" opacity="0.1"/>
  <rect x="1000" y="50" width="150" height="150" fill="${accentColor}" opacity="0.1" rx="10"/>
  
  <!-- Main title -->
  <text x="600" y="320" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
        text-anchor="middle" fill="${textColor}" filter="url(#shadow)">
    ${image.title}
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="24" 
        text-anchor="middle" fill="${textColor}" opacity="0.9">
    ${image.subtitle}
  </text>
  
  <!-- Category badge -->
  <rect x="500" y="420" width="200" height="40" fill="${accentColor}" opacity="0.2" rx="20"/>
  <text x="600" y="445" font-family="Arial, sans-serif" font-size="16" font-weight="bold"
        text-anchor="middle" fill="${textColor}">
    ${image.category}
  </text>
  
  <!-- Decorative lines -->
  <line x1="200" y1="500" x2="400" y2="500" stroke="${accentColor}" stroke-width="2" opacity="0.3"/>
  <line x1="800" y1="500" x2="1000" y2="500" stroke="${accentColor}" stroke-width="2" opacity="0.3"/>
  
  <!-- Corner accent -->
  <polygon points="0,0 100,0 0,100" fill="${accentColor}" opacity="0.2"/>
</svg>`;
}

// Main function
function generateAllImages() {
  console.log('🎨 Generating blog images...');
  
  const imagesDir = path.join(__dirname, '../public/blog-images');
  
  // Ensure directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Generate images
  BLOG_IMAGES.forEach(image => {
    const svgContent = generateSVGPlaceholder(image);
    const filePath = path.join(imagesDir, image.filename.replace('.jpg', '.svg'));
    
    fs.writeFileSync(filePath, svgContent);
    console.log(`✅ Generated: ${image.filename.replace('.jpg', '.svg')} - ${image.category}`);
  });

  console.log('🎉 Image generation complete!');
  console.log('📋 Summary:');
  BLOG_IMAGES.forEach(image => {
    console.log(`   - ${image.filename.replace('.jpg', '.svg')}: ${image.category} (${image.keywords.join(', ')})`);
  });
  
  console.log('\n📝 Next steps:');
  console.log('1. Update the blogImageService.ts to use .svg files instead of .jpg');
  console.log('2. Or convert these SVGs to JPG/PNG if you prefer raster images');
}

// Run the script
generateAllImages(); 