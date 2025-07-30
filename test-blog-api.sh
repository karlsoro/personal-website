#!/bin/bash

# Simple Blog API Test Script (no jq required)

API_BASE="https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog"

echo "=== Blog API Test Script ==="
echo ""

echo "1. Testing health endpoint..."
curl -s "https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/health"
echo ""
echo ""

echo "2. Testing regular blog endpoint (should work)..."
curl -s "$API_BASE?limit=3" | head -c 300
echo "..."
echo ""

echo "3. Testing /all endpoint (new - may not be deployed yet)..."
curl -s "$API_BASE/all"
echo ""
echo ""

echo "4. Testing DELETE /test endpoint (new - may not be deployed yet)..."
curl -X DELETE "$API_BASE/test"
echo ""
echo ""

echo "5. Testing DELETE specific post (new - may not be deployed yet)..."
curl -X DELETE "$API_BASE/6888099c6b77d5b51f77af8a"
echo ""
echo ""

echo "=== Test Complete ==="
echo ""
echo "If endpoints 3-5 return empty responses, the new endpoints are not deployed yet."
echo "Check GitHub Actions for deployment status." 