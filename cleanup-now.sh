#!/bin/bash

# Immediate Test Post Cleanup (works with current API)
# This script uses the working endpoints to help clean up test posts

API_BASE="https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog"

echo "=== Immediate Test Post Cleanup ==="
echo ""

echo "📋 Current Blog Posts:"
echo "======================"

# Get all post IDs
post_ids=$(curl -s "$API_BASE?limit=1000" | jq -r '.data[]._id' 2>/dev/null)

if [ -z "$post_ids" ]; then
    echo "❌ Could not fetch posts. The API might be down."
    exit 1
fi

# Process each post
for post_id in $post_ids; do
    # Get individual post details
    post_data=$(curl -s "$API_BASE/$post_id")
    
    # Extract title and date
    title=$(echo "$post_data" | jq -r '.data.title' 2>/dev/null)
    date=$(echo "$post_data" | jq -r '.data.date' 2>/dev/null)
    
    echo "ID: $post_id | Title: $title | Date: $date"
done

echo ""
echo "🔍 Test Posts Identified:"
echo "========================"

# Identify test posts
for post_id in $post_ids; do
    post_data=$(curl -s "$API_BASE/$post_id")
    title=$(echo "$post_data" | jq -r '.data.title' 2>/dev/null)
    
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
echo "   - Search for 'Cosmos DB' → find 'ks-personal-website-cosmos'"
echo "   - Click 'Data Explorer' in left menu"
echo "   - Navigate to database → 'blogposts' collection"
echo "   - Delete these posts by ID:"
echo ""

# List test post IDs for easy copying
for post_id in $post_ids; do
    post_data=$(curl -s "$API_BASE/$post_id")
    title=$(echo "$post_data" | jq -r '.data.title' 2>/dev/null)
    
    if [[ "${title,,}" == *"test"* ]]; then
        echo "     $post_id"
    fi
done

echo ""
echo "2. Or wait for new API endpoints to be deployed (route fix pushed)"
echo ""
echo "✅ Current API Status: Working"
echo "⏳ New Endpoints: Deploying..." 