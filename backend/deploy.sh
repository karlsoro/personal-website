#!/bin/bash

# Custom deployment script for Azure App Service
# This addresses the npm install issues in Azure 2025

echo "Starting custom deployment script..."

# Navigate to the app directory
cd /home/site/wwwroot

# Check if we're in the right directory
echo "Current directory: $(pwd)"
echo "Contents: $(ls -la)"

# Force npm install with specific flags to avoid Azure issues
echo "Installing dependencies..."
npm install --production --no-optional --no-audit --no-fund

# Check if npm install succeeded
if [ $? -eq 0 ]; then
    echo "npm install completed successfully"
    
    # Build the application
    echo "Building application..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "Build completed successfully"
        echo "Deployment completed successfully"
        exit 0
    else
        echo "Build failed"
        exit 1
    fi
else
    echo "npm install failed"
    exit 1
fi 