#!/bin/bash

# Test HTTPS Redirects Script
# This script tests all 4 URL variants to ensure proper HTTPS redirects

set -e

echo "🔍 Testing HTTPS Redirects..."

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

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Test URLs
URLS=(
    "http://sorochinski.com"
    "http://www.sorochinski.com"
    "https://www.sorochinski.com"
    "https://sorochinski.com"
)

# Function to test a URL
test_url() {
    local url=$1
    local expected_redirect=$2
    
    echo ""
    print_status "Testing: $url"
    
    # Use curl to follow redirects and show the final URL
    response=$(curl -s -w "%{http_code}|%{redirect_url}|%{url_effective}" -o /dev/null "$url" 2>/dev/null || echo "ERROR|ERROR|ERROR")
    
    # Parse the response
    IFS='|' read -r status_code redirect_url final_url <<< "$response"
    
    if [ "$status_code" = "ERROR" ]; then
        print_error "Failed to connect to $url"
        return 1
    fi
    
    echo "   Status Code: $status_code"
    echo "   Redirect URL: $redirect_url"
    echo "   Final URL: $final_url"
    
    # Check if redirect is correct
    if [ "$status_code" = "301" ] || [ "$status_code" = "302" ]; then
        if [ "$redirect_url" = "$expected_redirect" ]; then
            print_success "✅ Redirect working correctly"
            return 0
        else
            print_error "❌ Redirect incorrect. Expected: $expected_redirect, Got: $redirect_url"
            return 1
        fi
    elif [ "$status_code" = "200" ]; then
        if [ "$url" = "$expected_redirect" ]; then
            print_success "✅ Direct access working"
            return 0
        else
            print_error "❌ Should redirect but didn't. Expected: $expected_redirect"
            return 1
        fi
    else
        print_error "❌ Unexpected status code: $status_code"
        return 1
    fi
}

# Test each URL
success_count=0
total_tests=0

for url in "${URLS[@]}"; do
    total_tests=$((total_tests + 1))
    if test_url "$url" "https://sorochinski.com"; then
        success_count=$((success_count + 1))
    fi
done

echo ""
echo "📊 Test Results:"
echo "   Passed: $success_count/$total_tests"

if [ $success_count -eq $total_tests ]; then
    print_success "🎉 All tests passed! HTTPS redirects are working correctly."
else
    print_error "❌ Some tests failed. Please check your configuration."
    exit 1
fi

echo ""
print_status "🔧 Troubleshooting Tips:"
echo "   1. If redirects fail, check Azure Container App logs"
echo "   2. Verify DNS propagation with: dig sorochinski.com"
echo "   3. Check if Azure TLS certificates are properly configured"
echo "   4. Ensure the custom server is running on the frontend" 