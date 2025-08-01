# Blog Import Format

## Overview

The blog importer now supports a `Keywords` field to enable precise image selection for blog posts. This allows you to specify exactly which type of image should be displayed for each post.

## New Format

Your summary markdown file should now include a `Keywords` section. Here's the complete format:

```markdown
Title:
## Your Blog Post Title

### Date:
2024 January

### Sub-Title:
Your Subtitle Here

### Summary Body:
Your summary content here...

### Keywords:
keyword1, keyword2, keyword3

### UPDATE:
Optional update content...

### 2025 UPDATE:
Optional 2025 update content...
```

## Keywords Guidelines

### Available Image Categories

The system supports the following keyword categories that map to specific images:

#### Technology & Development
- `ai`, `ml`, `artificial intelligence`, `machine learning` → AI/ML Technology (Blue)
- `cloud`, `aws`, `azure`, `gcp`, `kubernetes`, `docker`, `devops` → Cloud Computing (Green)
- `development`, `programming`, `coding`, `software` → Software Development (Blue)
- `security`, `cybersecurity`, `encryption`, `authentication` → Security (Orange)

#### Data & Analytics
- `data`, `analytics`, `big data`, `database`, `sql`, `nosql` → Data Analytics (Purple)
- `bi`, `business intelligence`, `snowflake`, `databricks` → Data Analytics (Purple)

#### Business & Management
- `project`, `management`, `agile`, `scrum`, `kanban` → Project Management (Blue)
- `business`, `strategy`, `organization`, `process` → Business Strategy (Blue)
- `team`, `collaboration`, `communication` → Team Collaboration (Blue)
- `transformation`, `digital`, `innovation`, `change` → Digital Transformation (Blue)

#### Quality & Performance
- `testing`, `qa`, `quality`, `assurance` → Quality Assurance (Blue)
- `performance`, `optimization`, `speed`, `efficiency` → Performance Optimization (Blue)

#### User Experience
- `ux`, `ui`, `user experience`, `design` → User Experience (Blue)
- `trends`, `technology`, `future`, `emerging` → Technology Trends (Blue)

#### Industry-Specific
- `fintech`, `financial`, `banking`, `payment` → Financial Technology (Blue)
- `healthcare`, `medical`, `pharma`, `clinical` → Healthcare Technology (Blue)
- `supply chain`, `logistics`, `inventory` → Supply Chain (Blue)
- `crm`, `customer`, `relationship`, `sales` → Customer Relationship (Blue)
- `compliance`, `governance`, `regulation` → Compliance (Blue)
- `knowledge`, `documentation`, `learning` → Knowledge Management (Blue)

## Examples

### Example 1: AI/ML Post
```markdown
Title:
## Implementing Machine Learning in Production

### Date:
2024 January

### Sub-Title:
A practical guide to deploying ML models

### Summary Body:
This post explores the challenges and best practices...

### Keywords:
ai, machine learning, production, deployment
```

### Example 2: Security Post
```markdown
Title:
## Cybersecurity Best Practices for 2024

### Date:
2024 January

### Sub-Title:
Protecting your organization in the digital age

### Summary Body:
Learn about the latest security threats and how to defend against them...

### Keywords:
security, cybersecurity, threats, protection
```

### Example 3: Cloud Computing Post
```markdown
Title:
## Migrating to AWS: Lessons Learned

### Date:
2024 January

### Sub-Title:
Real-world experiences from a cloud migration

### Summary Body:
Our journey from on-premises to AWS and the challenges we faced...

### Keywords:
cloud, aws, migration, infrastructure
```

## Image Selection Logic

1. **Primary**: If keywords are provided, the system matches them against image categories
2. **Fallback**: If no keywords match or no keywords provided, it analyzes the post title and content
3. **Random**: If no matches found, it selects a random image for variety

## Benefits

- **Precise Control**: You decide exactly which image category fits your post
- **Consistent Branding**: Images align with your content themes
- **Visual Variety**: Different posts get different colored images
- **Future-Proof**: Easy to add new image categories and keywords

## Migration

Existing posts have been updated with appropriate keywords based on their content. New posts should include the Keywords field for optimal image selection. 