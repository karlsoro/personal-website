#!/bin/bash

# Cleanup Test Posts Script (works with current API)
# This script helps identify and prepare for cleanup of test posts

API_BASE="https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog"

echo "=== Test Post Cleanup Helper ==="
echo ""

echo "📋 Current Blog Posts:"
echo "======================"

# Get all posts and extract relevant info
curl -s "$API_BASE?limit=1000" | grep -o '"_id":"[^"]*"' | while read -r id; do
    # Extract the ID
    post_id=$(echo "$id" | sed 's/"_id":"//' | sed 's/"//')
    
    # Get individual post details
    post_data=$(curl -s "$API_BASE/$post_id")
    
    # Extract title and date
    title=$(echo "$post_data" | grep -o '"title":"[^"]*"' | sed 's/"title":"//' | sed 's/"//')
    date=$(echo "$post_data" | grep -o '"date":"[^"]*"' | sed 's/"date":"//' | sed 's/"//')
    
    echo "ID: $post_id | Title: $title | Date: $date"
done

echo ""
echo "🔍 Test Posts Identified:"
echo "========================"

# Identify test posts
curl -s "$API_BASE?limit=1000" | grep -o '"_id":"[^"]*"' | while read -r id; do
    post_id=$(echo "$id" | sed 's/"_id":"//' | sed 's/"//')
    post_data=$(curl -s "$API_BASE/$post_id")
    title=$(echo "$post_data" | grep -o '"title":"[^"]*"' | sed 's/"title":"//' | sed 's/"//')
    
    # Check if title contains "test" (case insensitive)
    if [[ "${title,,}" == *"test"* ]]; then
        echo "🧹 TEST POST: $post_id | Title: $title"
    fi
done

echo ""
echo "📝 Manual Cleanup Instructions:"
echo "=============================="
echo "1. Use Azure Portal Data Explorer:"
echo "   - Go to: https://portal.azure.com"
echo "   - Find your Cosmos DB account"
echo "   - Click 'Data Explorer'"
echo "   - Navigate to your database and 'blogposts' collection"
echo "   - Find and delete posts with 'test' in the title"
echo ""
echo "2. Or wait for new API endpoints to be deployed"
echo ""
echo "3. Or use MongoDB Compass with connection string:"
echo "   mongodb://ks-personal-website-cosmos:YOUR_KEY@ks-personal-website-cosmos.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ks-personal-website-cosmos@"
echo ""
echo "✅ Current API Status: Working"
echo "❌ Management Endpoints: Not deployed yet" 