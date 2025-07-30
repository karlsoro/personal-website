# 🚀 Immediate Test Post Cleanup - Azure Portal Method

## ✅ **Status:**
- **Deployment completed successfully** ✅
- **Route fixes not working yet** - still investigating
- **5 test posts ready for cleanup** ✅
- **Azure Portal method available** ✅

## 🎯 **Test Posts to Delete:**
```
6888099c6b77d5b51f77af8a | test
6888080e04ef46dc1c620eb3 | test  
688807d004ef46dc1c620eb0 | test
688807c404ef46dc1c620eae | test
6887bec3fb8c3df4b919b637 | Test Blog Post
```

## 🔧 **Step-by-Step Azure Portal Cleanup:**

### **Step 1: Access Azure Portal**
1. Go to https://portal.azure.com
2. Sign in with your Azure account

### **Step 2: Find Your Cosmos DB**
1. In the search bar, type: `Cosmos DB`
2. Click on `ks-personal-website-cosmos`

### **Step 3: Open Data Explorer**
1. In the left menu, click **"Data Explorer"**
2. You should see your database listed
3. Click on your database name
4. Click on the `blogposts` collection

### **Step 4: Delete Test Posts**
1. **Find each test post** by scrolling or searching for "test"
2. **Click on each test post** to open it
3. **Click the "Delete" button** (trash can icon)
4. **Confirm deletion** when prompted
5. **Repeat for all 5 test posts**

## 🎯 **Alternative: Individual DELETE via API**
Since we have the IDs, you can also delete them individually:

```bash
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
2. **Later**: Continue investigating why route fixes aren't working
3. **Future**: Fix the `/all` and `/test` endpoints for future use

---
**Priority**: High - Clean up test posts now
**Time**: 5 minutes via Azure Portal
**Status**: Ready to execute 