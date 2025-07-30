# MongoDB Compass Setup for Azure Cosmos DB

## Connection String Format

Your Azure Cosmos DB connection string should look like this:
```
mongodb://ks-personal-website-cosmos:YOUR_PRIMARY_KEY@ks-personal-website-cosmos.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ks-personal-website-cosmos@
```

## Getting Your Connection String

### Method 1: Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Search for "Cosmos DB" and find your account
3. Click on your Cosmos DB account
4. In the left menu, click **"Keys"**
5. Copy the **"Primary Connection String"**

### Method 2: Azure CLI
```bash
az cosmosdb keys list --name ks-personal-website-cosmos --resource-group KS_resource_group --type connection-strings
```

## MongoDB Compass Settings

### Connection Settings
- **Connection String**: Use the full connection string from Azure
- **Authentication**: Username/Password (included in connection string)
- **SSL**: Enabled (required for Azure Cosmos DB)

### Advanced Options
- **Server Selection Timeout**: 5000ms
- **Socket Timeout**: 45000ms
- **Max Pool Size**: 10
- **Retry Writes**: Disabled
- **Write Concern**: majority

### Compatibility Settings
- **Use Legacy Connection String Format**: Enabled
- **Use New URL Parser**: Enabled
- **Use Unified Topology**: Enabled

## Troubleshooting

### Common Issues

#### 1. Wire Version Error
**Error**: "Server reports maximum wire version 6, but this version requires at least 8"

**Solution**: 
- Use Mongoose 7.x instead of 8.x
- Add compatibility options to connection string
- Use the updated database configuration

#### 2. Connection Timeout
**Error**: Connection times out

**Solution**:
- Check firewall settings
- Verify connection string format
- Increase timeout values
- Ensure SSL is enabled

#### 3. Authentication Failed
**Error**: Authentication failed

**Solution**:
- Verify username/password in connection string
- Check if the key is still valid
- Ensure the database name is correct

### Connection String Parameters

Add these parameters to your connection string for better compatibility:

```
?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ks-personal-website-cosmos@&bufferCommands=false&bufferMaxEntries=0
```

## Database Structure

Your Cosmos DB should contain:
- **Database**: `personal-website` (or similar)
- **Collections**: 
  - `blogposts` - Blog post documents
  - `contacts` - Contact form submissions
  - `projects` - Project information

## Cleanup Operations

Once connected, you can:
1. **View Collections**: Navigate to your database and collections
2. **Query Documents**: Use the query interface to find specific records
3. **Delete Test Records**: 
   - Find documents with `title: "test"`
   - Select and delete unwanted records
4. **Export Data**: Export collections for backup

## Security Notes

- Keep your connection string secure
- Don't share connection strings in public repositories
- Rotate keys regularly
- Use read-only access when possible for viewing data

## Alternative: Azure Data Explorer

If MongoDB Compass continues to have issues, you can also use:
- **Azure Data Explorer** (Kusto)
- **Azure Cosmos DB Data Explorer** (built into Azure Portal)
- **MongoDB Shell** (mongosh) with connection string 