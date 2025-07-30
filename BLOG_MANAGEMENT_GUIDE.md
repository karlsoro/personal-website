# Blog Post Management Guide

## Overview
This guide provides instructions for managing blog posts on your personal website using the API endpoints and management script.

## Prerequisites

### Install Required Tools
```bash
# Install jq for JSON parsing (required for the management script)
sudo apt-get install jq

# Verify installation
jq --version
```

## API Endpoints

### Available Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `GET` | `/api/blog` | Get limited blog posts (for website display) | None |
| `GET` | `/api/blog/all` | Get all blog posts with IDs (for management) | None |
| `GET` | `/api/blog/:id` | Get specific blog post by ID | None |
| `POST` | `/api/blog` | Create new blog post | APIM Subscription Key |
| `DELETE` | `/api/blog/:id` | Delete specific blog post | APIM Subscription Key |
| `DELETE` | `/api/blog/test` | Delete all test posts | APIM Subscription Key |

### Base URLs
- **Direct API**: `https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog`
- **APIM Gateway**: `https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog`

## Management Script Usage

### Basic Commands

```bash
# Show help
./blog-management.sh help

# List all blog posts with IDs
./blog-management.sh list

# Delete a specific post by ID
./blog-management.sh delete <post_id>

# Delete all test posts
./blog-management.sh delete-test
```

### Examples

```bash
# List all posts
./blog-management.sh list

# Delete post with ID 507f1f77bcf86cd799439011
./blog-management.sh delete 507f1f77bcf86cd799439011

# Delete all test posts
./blog-management.sh delete-test
```

## Manual API Usage

### List All Posts
```bash
# Get all posts with IDs (for management)
curl "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/all"

# Get limited posts (for website display)
curl "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog?limit=1000"
```

### Delete Specific Post
```bash
# Via direct API (no authentication required)
curl -X DELETE "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/507f1f77bcf86cd799439011"

# Via APIM (requires subscription key)
curl -X DELETE "https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog/507f1f77bcf86cd799439011" \
  -H "Ocp-Apim-Subscription-Key: YOUR_SUBSCRIPTION_KEY"
```

### Delete All Test Posts
```bash
# Via direct API
curl -X DELETE "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/test"

# Via APIM
curl -X DELETE "https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog/test" \
  -H "Ocp-Apim-Subscription-Key: YOUR_SUBSCRIPTION_KEY"
```

## Step-by-Step Cleanup Process

### 1. List All Posts
```bash
./blog-management.sh list
```

**Expected Output:**
```
=== Blog Post Management Tool ===

Fetching all blog posts...
507f1f77bcf86cd799439011 | Test Blog Post | 2024/01/15 | This is a test post
507f1f77bcf86cd799439012 | Another Test | 2024/01/16 | Another test post
507f1f77bcf86cd799439013 | Real Blog Post | 2024/01/17 | This is a real post
```

### 2. Identify Test Posts
Look for posts with:
- "test" in the title (case insensitive)
- Obvious test content
- Duplicate or placeholder content

### 3. Delete Individual Test Posts
```bash
# Delete specific test post
./blog-management.sh delete 507f1f77bcf86cd799439011

# Expected response:
# {"success":true,"message":"Deleted blog post: \"Test Blog Post\" (2024/01/15)","deletedPost":{"id":"507f1f77bcf86cd799439011","title":"Test Blog Post","date":"2024/01/15"}}
```

### 4. Or Bulk Delete All Test Posts
```bash
# Delete all posts with "test" in the title
./blog-management.sh delete-test

# Expected response:
# {"success":true,"message":"Deleted 2 test blog posts","deletedCount":2}
```

### 5. Verify Cleanup
```bash
# List posts again to confirm deletion
./blog-management.sh list
```

## MongoDB Compass Connection (Alternative)

If you prefer using MongoDB Compass for visual management:

### Connection String
```
mongodb://ks-personal-website-cosmos:YOUR_PRIMARY_KEY@ks-personal-website-cosmos.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ks-personal-website-cosmos@
```

### Get Your Connection String
```bash
# Via Azure CLI
az cosmosdb keys list --name ks-personal-website-cosmos --resource-group KS_resource_group --type connection-strings --query "connectionStrings[0].connectionString" --output tsv
```

### Connection Settings
- **Hostname**: `ks-personal-website-cosmos.mongo.cosmos.azure.com`
- **Port**: `10255`
- **Authentication**: Username/Password
- **Username**: `ks-personal-website-cosmos`
- **Password**: `YOUR_PRIMARY_KEY`
- **SSL**: Enabled
- **Replica Set**: `globaldb`

## Azure Portal Data Explorer (Recommended Alternative)

If MongoDB Compass has compatibility issues:

1. Go to [Azure Portal](https://portal.azure.com)
2. Search for "Cosmos DB" and find your account
3. Click **"Data Explorer"** in the left menu
4. Navigate to your database and collections
5. Browse and manage posts directly in the browser

## Troubleshooting

### Script Issues
```bash
# Check if jq is installed
jq --version

# Install jq if missing
sudo apt-get install jq

# Make script executable
chmod +x blog-management.sh
```

### API Issues
```bash
# Test API connectivity
curl "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/health"

# Check if endpoints are working
curl "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/all"
```

### Authentication Issues
- **Direct API**: No authentication required for read operations
- **APIM**: Requires valid subscription key for write operations
- **Subscription Key**: Get from Azure Portal → API Management → Subscriptions

## Security Notes

- **Read Operations**: No authentication required (public access)
- **Write Operations**: Require APIM subscription key
- **Connection Strings**: Keep secure, don't commit to repository
- **API Keys**: Rotate regularly for security

## File Structure

```
personal-website/
├── blog-management.sh          # Management script
├── BLOG_MANAGEMENT_GUIDE.md   # This guide
├── MONGODB_COMPASS_SETUP.md   # Compass setup guide
└── backend/src/routes/blog.ts # API endpoints
```

## Quick Reference

### Common Commands
```bash
# List all posts
./blog-management.sh list

# Delete test posts
./blog-management.sh delete-test

# Delete specific post
./blog-management.sh delete <id>

# Get help
./blog-management.sh help
```

### API URLs
- **List Posts**: `GET /api/blog/all`
- **Delete Post**: `DELETE /api/blog/:id`
- **Delete Tests**: `DELETE /api/blog/test`

### Response Format
```json
{
  "success": true,
  "message": "Operation completed",
  "data": [...],
  "deletedCount": 2
}
```

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify API endpoints are accessible
3. Ensure jq is installed for script functionality
4. Use Azure Portal Data Explorer as backup option 