#!/bin/bash

# Exit on error
set -e

echo "Starting deployment..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building the application..."
npm run build

# Copy the standalone output to the web root
echo "Copying files to web root..."
cp -r .next/standalone/* $DEPLOYMENT_TARGET/
cp -r .next/static $DEPLOYMENT_TARGET/.next/static

echo "Deployment completed successfully!" 