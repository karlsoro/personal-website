# Personal Website Deployment Guide

This guide documents the working build and deployment process for the personal website, including both frontend and backend deployment to Azure Container Apps.

## Prerequisites

- Azure CLI installed and authenticated
- Docker installed
- Node.js 20+ and npm 11.5.1+ installed
- Access to Azure Container Registry (ACR): `kspersonalwebsite.azurecr.io`

## Azure Resources

- **Resource Group**: `KS_resource_group`
- **Container Registry**: `kspersonalwebsite.azurecr.io`
- **Container Environment**: `ks-personal-website-env`
- **Frontend Container App**: `ks-personal-website-frontend`
- **Backend Container App**: `ks-personal-website-api`
- **Database**: Azure Cosmos DB (MongoDB API)

## Frontend Deployment

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Build Docker Image
```bash
# Build the image
docker build -t kspersonalwebsite.azurecr.io/frontend:latest .

# Verify the image was created
docker images | grep frontend
```

### 3. Push to Azure Container Registry
```bash
# Login to ACR
az acr login --name kspersonalwebsite

# Push the image
az acr push --name kspersonalwebsite --image frontend:latest
```

### 4. Deploy to Azure Container App
```bash
# Update the container app with new image
az containerapp update \
  --name ks-personal-website-frontend \
  --resource-group KS_resource_group \
  --image kspersonalwebsite.azurecr.io/frontend:latest \
  --set-env-vars "FORCE_UPDATE=$(date +%s)"
```

### 5. Verify Deployment
```bash
# Check revision status
az containerapp revision list \
  --name ks-personal-website-frontend \
  --resource-group KS_resource_group \
  --output table

# Test the site
curl -I "https://ks-personal-website-frontend.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/"
```

## Backend Deployment

### 1. Navigate to Backend Directory
```bash
cd ../backend
```

### 2. Build Docker Image
```bash
# Build the image
docker build -t kspersonalwebsite.azurecr.io/backend:latest .

# Verify the image was created
docker images | grep backend
```

### 3. Push to Azure Container Registry
```bash
# Login to ACR (if not already logged in)
az acr login --name kspersonalwebsite

# Push the image
az acr push --name kspersonalwebsite --image backend:latest
```

### 4. Deploy to Azure Container App
```bash
# Update the container app with new image
az containerapp update \
  --name ks-personal-website-api \
  --resource-group KS_resource_group \
  --image kspersonalwebsite.azurecr.io/backend:latest \
  --set-env-vars "FORCE_UPDATE=$(date +%s)"
```

### 5. Verify Deployment
```bash
# Check revision status
az containerapp revision list \
  --name ks-personal-website-api \
  --resource-group KS_resource_group \
  --output table

# Test the API
curl -I "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog"
```

## Full Deployment Script

Create a script to automate the entire process:

```bash
#!/bin/bash
# deploy.sh - Full deployment script

set -e  # Exit on any error

echo "Starting full deployment..."

# Frontend deployment
echo "Deploying frontend..."
cd frontend
docker build -t kspersonalwebsite.azurecr.io/frontend:latest .
az acr login --name kspersonalwebsite
az acr push --name kspersonalwebsite --image frontend:latest
az containerapp update \
  --name ks-personal-website-frontend \
  --resource-group KS_resource_group \
  --image kspersonalwebsite.azurecr.io/frontend:latest \
  --set-env-vars "FORCE_UPDATE=$(date +%s)"

# Backend deployment
echo "Deploying backend..."
cd ../backend
docker build -t kspersonalwebsite.azurecr.io/backend:latest .
az acr push --name kspersonalwebsite --image backend:latest
az containerapp update \
  --name ks-personal-website-api \
  --resource-group KS_resource_group \
  --image kspersonalwebsite.azurecr.io/backend:latest \
  --set-env-vars "FORCE_UPDATE=$(date +%s)"

echo "Deployment completed successfully!"
echo "Frontend: https://ks-personal-website-frontend.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/"
echo "Backend: https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/"
```

## Environment Variables

### Frontend Environment Variables
- `FORCE_UPDATE`: Timestamp to force container app updates

### Backend Environment Variables
- `MONGODB_CONNECTION_STRING`: Azure Cosmos DB connection string
- `PORT`: 3001 (default)
- `FORCE_UPDATE`: Timestamp to force container app updates

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure Node.js 20+ and npm 11.5.1+ are installed
   - Check that all dependencies are properly installed
   - Verify Docker is running

2. **ACR Push Failures**
   - Ensure you're logged into ACR: `az acr login --name kspersonalwebsite`
   - Check ACR permissions

3. **Container App Update Failures**
   - Verify the image exists in ACR
   - Check resource group and container app names
   - Ensure you have proper permissions

4. **DNS/Forwarding Issues**
   - Domain forwarding should point to: `https://ks-personal-website-frontend.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/`
   - Use "Forward with masking" in GoDaddy
   - Enable SSL in forwarding settings

### Useful Commands

```bash
# Check container app logs
az containerapp logs show \
  --name ks-personal-website-frontend \
  --resource-group KS_resource_group

# Check container app status
az containerapp show \
  --name ks-personal-website-frontend \
  --resource-group KS_resource_group \
  --query "properties.runningStatus"

# List all revisions
az containerapp revision list \
  --name ks-personal-website-frontend \
  --resource-group KS_resource_group \
  --output table
```

## URLs

- **Frontend**: `https://ks-personal-website-frontend.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/`
- **Backend API**: `https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/`
- **Custom Domain**: `https://sorochinski.com/` (when forwarding is working)

## Notes

- Always use the `FORCE_UPDATE` environment variable to ensure new revisions are created
- The `$(date +%s)` command generates a timestamp to force updates
- Container Apps automatically handle HTTPS and SSL certificates
- DNS propagation can take up to 48 hours, but usually much faster
- Keep the old test records cleaned up in GoDaddy DNS settings

## Quick Deploy Commands

For quick deployments, you can run these commands from the project root:

```bash
# Frontend only
cd frontend && docker build -t kspersonalwebsite.azurecr.io/frontend:latest . && az acr push --name kspersonalwebsite --image frontend:latest && az containerapp update --name ks-personal-website-frontend --resource-group KS_resource_group --image kspersonalwebsite.azurecr.io/frontend:latest --set-env-vars "FORCE_UPDATE=$(date +%s)"

# Backend only
cd backend && docker build -t kspersonalwebsite.azurecr.io/backend:latest . && az acr push --name kspersonalwebsite --image backend:latest && az containerapp update --name ks-personal-website-api --resource-group KS_resource_group --image kspersonalwebsite.azurecr.io/backend:latest --set-env-vars "FORCE_UPDATE=$(date +%s)"
``` 