# MongoDB Compass Setup for Azure Cosmos DB

## Connection String Format

Your Azure Cosmos DB connection string:
```
mongodb://ks-personal-website-cosmos:YOUR_PRIMARY_KEY@ks-personal-website-cosmos.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ks-personal-website-cosmos@
```

## Alternative Connection Methods

### Method 1: Simplified Connection String
Try this simplified version in MongoDB Compass:
```
mongodb://ks-personal-website-cosmos:YOUR_PRIMARY_KEY@ks-personal-website-cosmos.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false
```

### Method 2: Advanced Connection Options
In MongoDB Compass, use the "Advanced Connection Options" tab:

**Connection String:**
```
mongodb://ks-personal-website-cosmos:YOUR_PRIMARY_KEY@ks-personal-website-cosmos.mongo.cosmos.azure.com:10255
```

**Additional Options:**
- `ssl=true`
- `replicaSet=globaldb`
- `retrywrites=false`
- `maxIdleTimeMS=120000`

### Method 3: Manual Connection Fields
Fill in these fields manually in Compass:

- **Hostname:** `ks-personal-website-cosmos.mongo.cosmos.azure.com`
- **Port:** `10255`
- **Authentication:** Username/Password
- **Username:** `ks-personal-website-cosmos`
- **Password:** `YOUR_PRIMARY_KEY`
- **Authentication Database:** `admin`
- **SSL:** Enabled
- **Replica Set Name:** `globaldb`

## Getting Your Connection String

### Method 1: Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Search for "Cosmos DB" and find your account
3. Click on your Cosmos DB account
4. In the left menu, click **"Keys"**
5. Copy the **"Primary Connection String"**

### Method 2: Azure CLI
```bash
az cosmosdb keys list --name ks-personal-website-cosmos --resource-group KS_resource_group --type connection-strings --query "connectionStrings[0].connectionString" --output tsv
```

## Troubleshooting

### If Connection Times Out:
1. **Check Firewall:** Ensure port 10255 is not blocked
2. **Try Different Network:** Test from a different network/location
3. **Use Azure Portal:** Try connecting via Azure Portal's Data Explorer instead

### If Wire Version Error Persists:
1. **Update MongoDB Compass:** Use the latest version
2. **Try Studio 3T:** Alternative MongoDB client
3. **Use Azure Data Explorer:** Built into Azure Portal

## Alternative: Azure Portal Data Explorer

If MongoDB Compass continues to have issues:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Cosmos DB account
3. Click **"Data Explorer"** in the left menu
4. Browse and manage your collections directly in the browser

## Database Cleanup via API

Since the website is working, you can also clean up test records via the API:

```bash
# Get all blog posts
curl "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog?limit=1000"

# Delete specific post (if you have admin access)
# Note: This would require implementing a DELETE endpoint
```

## Current Status
- ✅ Website API calls work correctly
- ✅ Backend connects to Cosmos DB successfully
- ⚠️ MongoDB Compass has compatibility issues
- ✅ Azure Portal Data Explorer is available as alternative 