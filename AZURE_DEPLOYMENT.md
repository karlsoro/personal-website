# Azure Deployment Guide

## Environment Variables Setup

### Frontend (.env.local)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-app-service-name.azurewebsites.net
```

### Backend (Azure App Service Configuration)
```bash
# Database
MONGODB_CONNECTION_STRING=your_cosmos_db_connection_string
MONGODB_URI=your_cosmos_db_connection_string

# CORS
CORS_ORIGIN_PROD=https://your-static-web-app.azurestaticapps.net
CORS_ORIGIN=https://your-static-web-app.azurestaticapps.net

# Environment
NODE_ENV=production
PORT=8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Deployment Steps

### 1. Frontend (Azure Static Web Apps)
**Option A: GitHub Actions (Recommended)**
1. Push your code to GitHub repository
2. Go to Azure Portal → Static Web Apps → ks-personal-website
3. Click "Manage deployment tokens" and copy the token
4. Go to your GitHub repo → Settings → Secrets and variables → Actions
5. Add secret: `AZURE_STATIC_WEB_APPS_API_TOKEN` with the copied token
6. Push to main branch - GitHub Actions will automatically deploy

**Option B: Manual Deployment**
1. Build the frontend: `cd frontend && npm run build`
2. Use Azure CLI or SWA CLI to deploy (requires additional setup)
3. Set environment variable: `NEXT_PUBLIC_API_URL`

### 2. Backend (Azure App Service)
1. Deploy backend code to Azure App Service
2. Configure environment variables in Azure Portal
3. Set up Azure Cosmos DB connection string

### 3. Database (Azure Cosmos DB)
1. Create Cosmos DB account with MongoDB API
2. Enable free tier (25 GB, 1000 RU/s)
3. Get connection string and add to backend environment variables

## Configuration Changes Made

### Frontend
- ✅ Updated `next.config.ts` for Azure Static Web Apps
- ✅ Created `ApiClient.tsx` for Azure deployment
- ✅ Added environment variable support

### Backend
- ✅ Updated CORS for Azure domains
- ✅ Added Azure Cosmos DB support
- ✅ Updated package.json with postinstall script
- ✅ Enhanced database configuration

## Notes
- Frontend uses `output: 'standalone'` for Azure Static Web Apps
- Images are unoptimized to stay within 250MB limit
- Backend supports both local MongoDB and Azure Cosmos DB
- CORS configured for Azure Static Web Apps domains 