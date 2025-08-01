const fs = require('fs');
const path = require('path');
const https = require('https');

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // You'll need to get this from unsplash.com
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Image specifications
const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 800;
const IMAGE_QUALITY = 80;

// Blog images with their keywords and search terms
const BLOG_IMAGES = [
  {
    filename: 'blog-ai-ml.jpg',
    searchTerm: 'artificial intelligence machine learning technology',
    keywords: ['ai', 'ml', 'artificial intelligence', 'machine learning'],
    category: 'Technology'
  },
  {
    filename: 'blog-cloud-computing.jpg',
    searchTerm: 'cloud computing infrastructure technology',
    keywords: ['cloud', 'aws', 'azure', 'gcp', 'kubernetes', 'docker', 'devops'],
    category: 'Technology'
  },
  {
    filename: 'blog-software-development.jpg',
    searchTerm: 'software development programming code',
    keywords: ['development', 'programming', 'coding', 'software'],
    category: 'Technology'
  },
  {
    filename: 'blog-cybersecurity.jpg',
    searchTerm: 'cybersecurity data protection security',
    keywords: ['security', 'cybersecurity', 'encryption', 'authentication', 'firewall', 'vulnerability', 'threat', 'compliance', 'gdpr', 'privacy', 'budget', 'risk'],
    category: 'Security'
  },
  {
    filename: 'blog-data-analytics.jpg',
    searchTerm: 'data analytics business intelligence dashboard',
    keywords: ['data', 'analytics', 'big data', 'database', 'sql', 'nosql', 'bi', 'business intelligence', 'snowflake', 'databricks'],
    category: 'Data'
  },
  {
    filename: 'blog-enterprise-architecture.jpg',
    searchTerm: 'enterprise architecture system design',
    keywords: ['enterprise', 'architecture', 'system', 'design'],
    category: 'Technology'
  },
  {
    filename: 'blog-project-management.jpg',
    searchTerm: 'project management leadership team',
    keywords: ['project', 'management', 'agile', 'scrum', 'kanban', 'leadership', 'team', 'collaboration', 'planning', 'strategy', 'service management', 'ways of working', 'standards'],
    category: 'Management'
  },
  {
    filename: 'blog-business-strategy.jpg',
    searchTerm: 'business strategy optimization organization',
    keywords: ['business', 'strategy', 'organization', 'process', 'efficiency', 'optimization', 'cost', 'value', 'roi', 'goals', 'mobile', 'innovation'],
    category: 'Business'
  },
  {
    filename: 'blog-team-collaboration.jpg',
    searchTerm: 'team collaboration communication workplace',
    keywords: ['team', 'collaboration', 'communication'],
    category: 'Business'
  },
  {
    filename: 'blog-digital-transformation.jpg',
    searchTerm: 'digital transformation innovation change',
    keywords: ['transformation', 'digital', 'innovation', 'change'],
    category: 'Business'
  },
  {
    filename: 'blog-quality-assurance.jpg',
    searchTerm: 'quality assurance testing software',
    keywords: ['testing', 'qa', 'quality', 'assurance'],
    category: 'Quality'
  },
  {
    filename: 'blog-performance-optimization.jpg',
    searchTerm: 'performance optimization speed efficiency',
    keywords: ['performance', 'optimization', 'speed', 'efficiency'],
    category: 'Quality'
  },
  {
    filename: 'blog-user-experience.jpg',
    searchTerm: 'user experience interface design',
    keywords: ['ux', 'ui', 'user experience', 'design'],
    category: 'UX'
  },
  {
    filename: 'blog-technology-trends.jpg',
    searchTerm: 'technology trends future innovation',
    keywords: ['trends', 'technology', 'future', 'emerging'],
    category: 'Technology'
  },
  {
    filename: 'blog-financial-technology.jpg',
    searchTerm: 'financial technology banking payment',
    keywords: ['fintech', 'financial', 'banking', 'payment'],
    category: 'Industry'
  },
  {
    filename: 'blog-healthcare-technology.jpg',
    searchTerm: 'healthcare technology medical innovation',
    keywords: ['healthcare', 'medical', 'pharma', 'clinical'],
    category: 'Industry'
  },
  {
    filename: 'blog-supply-chain.jpg',
    searchTerm: 'supply chain logistics inventory',
    keywords: ['supply chain', 'logistics', 'inventory'],
    category: 'Industry'
  },
  {
    filename: 'blog-customer-relationship.jpg',
    searchTerm: 'customer relationship management sales',
    keywords: ['crm', 'customer', 'relationship', 'sales'],
    category: 'Industry'
  },
  {
    filename: 'blog-compliance-governance.jpg',
    searchTerm: 'compliance governance regulation',
    keywords: ['compliance', 'governance', 'regulation'],
    category: 'Industry'
  },
  {
    filename: 'blog-knowledge-management.jpg',
    searchTerm: 'knowledge management documentation learning',
    keywords: ['knowledge', 'documentation', 'learning'],
    category: 'Industry'
  }
];

// Function to download image from Unsplash
async function downloadImage(searchTerm, filename) {
  return new Promise((resolve, reject) => {
    const url = `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(searchTerm)}&w=${IMAGE_WIDTH}&h=${IMAGE_HEIGHT}&q=${IMAGE_QUALITY}&orientation=landscape`;
    
    const options = {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        'Accept-Version': 'v1'
      }
    };

    https.get(url, options, (res) => {
      if (res.statusCode === 200) {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const data = JSON.parse(Buffer.concat(chunks).toString());
          if (data.urls && data.urls.regular) {
            downloadFile(data.urls.regular, filename, resolve, reject);
          } else {
            reject(new Error('No image URL found'));
          }
        });
      } else {
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Function to download file
function downloadFile(url, filename, resolve, reject) {
  const filePath = path.join(__dirname, '../public/blog-images', filename);
  
  https.get(url, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve();
      });
      fileStream.on('error', reject);
    } else {
      reject(new Error(`HTTP ${res.statusCode}`));
    }
  }).on('error', reject);
}

// Main function
async function downloadAllImages() {
  console.log('🚀 Starting blog image download...');
  console.log('📝 Note: You need to set your Unsplash API key in the script');
  console.log('🔗 Get your free API key at: https://unsplash.com/developers');
  
  if (UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
    console.log('❌ Please set your Unsplash API key in the script');
    return;
  }

  const imagesDir = path.join(__dirname, '../public/blog-images');
  
  // Ensure directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Download images
  for (const image of BLOG_IMAGES) {
    try {
      await downloadImage(image.searchTerm, image.filename);
      // Add delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Failed to download ${image.filename}:`, error.message);
    }
  }

  console.log('🎉 Image download complete!');
  console.log('📋 Summary:');
  BLOG_IMAGES.forEach(image => {
    console.log(`   - ${image.filename}: ${image.category} (${image.keywords.join(', ')})`);
  });
}

// Run the script
downloadAllImages().catch(console.error); 