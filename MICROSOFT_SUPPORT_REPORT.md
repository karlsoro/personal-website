# Microsoft Support Report: Express Route Matching Issue

## 🎯 **Issue Summary**
Express.js route matching is not working correctly in Azure Container Apps. Specific routes (`/all`, `/test`) are being caught by parameterized routes (`/:id`) despite proper route ordering and regex validation.

## 🔧 **Technical Details**

### **Environment:**
- **Platform**: Azure Container Apps
- **Runtime**: Node.js 20 (Alpine)
- **Framework**: Express.js 4.x
- **Deployment**: GitHub Actions → Azure Container Registry → Azure Container Apps

### **Current Route Configuration:**

```javascript
// backend/src/routes/blog.ts
import express from 'express'
const router = express.Router()

// Route 1: GET /api/blog - Basic posts with limit
router.get('/', async (req, res) => {
  // ... implementation
})

// Route 2: GET /api/blog/all - All posts with IDs (for management)
router.get('/all', async (req, res) => {
  console.log('HIT /all endpoint');
  // ... implementation
})

// Route 3: POST /api/blog - Create new post
router.post('/', validateBlogPost, async (req, res) => {
  // ... implementation
})

// Route 4: DELETE /api/blog/test - Delete test posts
router.delete('/test', async (req, res) => {
  console.log('HIT /test DELETE endpoint');
  // ... implementation
})

// Route 5: GET /api/blog/:id - Get single post (regex validation)
router.get('/:id([a-fA-F0-9]{24})', async (req, res) => {
  console.log('HIT /:id GET endpoint with ID:', req.params.id);
  // ... implementation
})

// Route 6: DELETE /api/blog/:id - Delete single post (regex validation)
router.delete('/:id([a-fA-F0-9]{24})', async (req, res) => {
  console.log('HIT /:id DELETE endpoint with ID:', req.params.id);
  // ... implementation
})

export default router
```

### **Route Registration in App:**
```javascript
// backend/src/app.ts
import blogRoutes from './routes/blog'

// API routes
app.use('/api/blog', blogRoutes)
```

## 🚨 **Problem Description**

### **Expected Behavior:**
- `GET /api/blog/all` should hit Route 2 (console.log: "HIT /all endpoint")
- `DELETE /api/blog/test` should hit Route 4 (console.log: "HIT /test DELETE endpoint")
- `GET /api/blog/:id` should only match valid ObjectIDs (24 hex chars)

### **Actual Behavior:**
- `GET /api/blog/all` returns: `{"success":false,"message":"Failed to fetch blog post"}`
- `DELETE /api/blog/test` returns: `{"success":false,"error":"Not Found - /api/blog/test"}`
- Both requests are being caught by the `/:id` route handlers

### **Error Messages:**
- The error message "Failed to fetch blog post" comes from the `/:id` GET handler
- The error message "Not Found - /api/blog/test" suggests the route isn't being registered

## 🔍 **Troubleshooting Steps Taken**

### **1. Route Ordering:**
- ✅ Confirmed `/all` and `/test` routes are defined before `/:id` routes
- ✅ Routes are in correct order in the file

### **2. Regex Validation:**
- ✅ Added `([a-fA-F0-9]{24})` regex to `/:id` routes
- ✅ This should prevent `/all` and `/test` from matching

### **3. Debug Logging:**
- ✅ Added console.log statements to track which handlers are hit
- ❌ No debug logs appear in Azure Container Apps logs

### **4. Deployment Verification:**
- ✅ GitHub Actions deployment completes successfully
- ✅ Code changes are confirmed in the deployed version
- ✅ Basic API endpoints (`GET /api/blog`) work correctly

## 🧪 **Test Results**

### **Working Endpoints:**
```bash
# Basic endpoint works
curl "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog"
# Returns: {"success":true,"message":"Fetched blog posts","data":[...]}

# API info works
curl "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api"
# Returns: {"message":"Personal Website API","version":"1.0.0",...}
```

### **Failing Endpoints:**
```bash
# Should hit /all route but doesn't
curl "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/all"
# Returns: {"success":false,"message":"Failed to fetch blog post"}

# Should hit /test route but doesn't
curl -X DELETE "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/test"
# Returns: {"success":false,"error":"Not Found - /api/blog/test"}
```

## 🤔 **Potential Root Causes**

### **1. Express Route Registration Issue:**
- Routes might not be registering in the expected order
- Possible issue with `express.Router()` in Azure Container Apps environment

### **2. Azure Container Apps Specific Issue:**
- Container Apps might have different Express.js behavior
- Possible middleware interference or routing conflicts

### **3. Build/Deployment Issue:**
- TypeScript compilation might be affecting route registration
- Possible caching issue in Azure Container Apps

### **4. Express.js Version Compatibility:**
- Possible issue with Express.js version in the container
- Azure Container Apps might be using a different Express.js version

## 📋 **Questions for Microsoft Support**

1. **Is this a known issue with Express.js routing in Azure Container Apps?**
2. **Are there any specific Express.js configuration requirements for Container Apps?**
3. **Could there be middleware or routing conflicts in the Container Apps environment?**
4. **Are there any Azure-specific Express.js best practices we should follow?**
5. **Could this be related to the Node.js Alpine image or Express.js version?**
6. **Are there any debugging tools or logs we can enable to trace route matching?**

## 🔧 **Requested Solutions**

1. **Azure Container Apps Express.js routing documentation**
2. **Debugging tools for route matching in Container Apps**
3. **Alternative route configuration approaches**
4. **Best practices for Express.js in Azure Container Apps**

## 📊 **Environment Information**

- **Azure Container Apps Region**: East US 2
- **Node.js Version**: 20-alpine
- **Express.js Version**: Latest (from package.json)
- **Deployment Method**: GitHub Actions → ACR → Container Apps
- **Container Apps Scaling**: Manual (1 replica)

---
**Report Date**: July 30, 2025
**Issue Status**: Active - Routes not working as expected
**Priority**: Medium - Basic functionality works, management endpoints failing 