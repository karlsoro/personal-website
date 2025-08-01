#!/bin/bash

# HTTPS Fix Deployment Script
# This script deploys both frontend and backend with proper HTTPS redirects

set -e

echo "🚀 Starting HTTPS Fix Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the root directory of the project"
    exit 1
fi

print_status "Deploying Backend with HTTPS redirects..."

# Deploy backend
cd backend
if [ -f "deploy.sh" ]; then
    print_status "Running backend deployment script..."
    chmod +x deploy.sh
    ./deploy.sh
else
    print_warning "No backend deploy.sh found, using npm commands..."
    npm install
    npm run build
fi
cd ..

print_status "Deploying Frontend with HTTPS redirects..."

# Deploy frontend
cd frontend
if [ -f "deploy.sh" ]; then
    print_status "Running frontend deployment script..."
    chmod +x deploy.sh
    ./deploy.sh
else
    print_warning "No frontend deploy.sh found, using npm commands..."
    npm install
    npm run build
fi
cd ..

print_status "✅ Deployment completed!"

echo ""
print_status "🔍 Testing URLs (these should all redirect to https://sorochinski.com):"
echo "   - http://sorochinski.com"
echo "   - http://www.sorochinski.com"
echo "   - https://www.sorochinski.com"
echo "   - https://sorochinski.com (should work directly)"

echo ""
print_warning "⚠️  Important Notes:"
echo "   1. DNS propagation may take up to 48 hours"
echo "   2. Azure Container Apps may take a few minutes to restart"
echo "   3. Test all 4 URL variants after deployment"

echo ""
print_status "🔧 If you encounter issues:"
echo "   1. Check Azure Container App logs"
echo "   2. Verify DNS settings in GoDaddy"
echo "   3. Ensure Azure TLS/SSL certificates are properly configured"

echo ""
print_status "🎯 Next Steps:"
echo "   1. Wait for DNS propagation"
echo "   2. Test all 4 URL variants"
echo "   3. Monitor Azure logs for any errors" 