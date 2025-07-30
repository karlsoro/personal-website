#!/bin/bash

# Test Current API Functionality

API_BASE="https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog"

echo "=== Current API Status Test ==="
echo ""

echo "✅ Working Endpoints:"
echo "1. Health check:"
curl -s "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/health"
echo ""
echo ""

echo "2. Get blog posts (working):"
curl -s "$API_BASE?limit=3" | grep -o '"_id":"[^"]*"' | head -3
echo ""
echo ""

echo "❌ New Endpoints (not deployed yet):"
echo "3. GET /all endpoint:"
curl -s "$API_BASE/all"
echo ""
echo ""

echo "4. DELETE /test endpoint:"
curl -X DELETE "$API_BASE/test"
echo ""
echo ""

echo "=== Current Blog Posts ==="
echo "Available post IDs:"
curl -s "$API_BASE?limit=1000" | grep -o '"_id":"[^"]*"' | head -10
echo ""
echo ""

echo "=== What You Can Do Right Now ==="
echo "1. ✅ View all blog posts via regular endpoint"
echo "2. ✅ See post IDs for future deletion"
echo "3. ⏳ Wait for deployment to complete for new endpoints"
echo "4. ⏳ Use Azure Portal Data Explorer as alternative"
echo ""
echo "=== Next Steps ==="
echo "1. Wait for GitHub Actions deployment to complete"
echo "2. Then test: ./blog-management.sh list"
echo "3. Or use Azure Portal Data Explorer for immediate cleanup" 