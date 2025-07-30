# 🚀 Immediate Test Post Cleanup Solution

## ✅ **Current Status:**
- **5 test posts identified** and ready for cleanup
- **Route fixes not working** despite deployment
- **Basic API working** - we can get post IDs

## 🎯 **Test Posts to Delete:**
```
6888099c6b77d5b51f77af8a | test
6888080e04ef46dc1c620eb3 | test  
688807d004ef46dc1c620eb0 | test
688807c404ef46dc1c620eae | test
6887bec3fb8c3df4b919b637 | Test Blog Post
```

## 🔧 **Immediate Solution: Azure Portal Data Explorer**

### Step 1: Access Azure Portal
1. Go to https://portal.azure.com
2. Sign in with your Azure account

### Step 2: Find Cosmos DB
1. Search for "Cosmos DB" in the search bar
2. Click on `ks-personal-website-cosmos`

### Step 3: Open Data Explorer
1. In the left menu, click **"Data Explorer"**
2. Navigate to your database → `blogposts` collection

### Step 4: Delete Test Posts
1. Find each test post by ID or title
2. Click on each post → **Delete** button
3. Confirm deletion

## 🎯 **Alternative: Individual DELETE via API**
Since we have the IDs, you can also delete them individually:

```bash
# Delete each test post by ID
curl -X DELETE "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/6888099c6b77d5b51f77af8a"
curl -X DELETE "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/6888080e04ef46dc1c620eb3"
curl -X DELETE "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/688807d004ef46dc1c620eb0"
curl -X DELETE "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/688807c404ef46dc1c620eae"
curl -X DELETE "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog/6887bec3fb8c3df4b919b637"
```

## 🔍 **Verify Cleanup:**
After cleanup, verify with:
```bash
curl "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog?limit=1000" | jq -r '.data[] | "\(._id) | \(.title)"' | grep -i test
```
Should return no results.

## 📋 **Next Steps:**
1. **Immediate**: Clean up test posts via Azure Portal (5 minutes)
2. **Later**: Investigate why route fixes aren't working in deployment
3. **Future**: Fix the `/all` and `/test` endpoints for future use

---
**Priority**: High - Clean up test posts now
**Time**: 5 minutes via Azure Portal
**Status**: Ready to execute 