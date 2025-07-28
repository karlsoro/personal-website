#!/bin/bash

# Navigate to the app directory
cd /home/site/wwwroot

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install --production
fi

# Build the application
echo "Building application..."
npm run build

# Start the application
echo "Starting application..."
npm start 