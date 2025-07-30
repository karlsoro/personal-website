#!/bin/bash

# Blog Management Script
# This script helps you manage blog posts via the API

API_BASE="https://ks-personal-website-api.grayflower-3fffbb5b.eastus2.azurecontainerapps.io/api/blog"
APIM_BASE="https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Blog Post Management Tool ===${NC}"

# Function to list all posts
list_posts() {
    echo -e "\n${YELLOW}Fetching all blog posts...${NC}"
    curl -s "$API_BASE/all" | jq -r '.data[] | "\(._id) | \(.title) | \(.date) | \(.subtitle)"' 2>/dev/null || {
        echo -e "${RED}Error: Could not fetch posts. Make sure jq is installed.${NC}"
        echo "Install jq with: sudo apt-get install jq"
        return 1
    }
}

# Function to delete a specific post
delete_post() {
    local post_id=$1
    local subscription_key=$2
    
    if [ -z "$post_id" ]; then
        echo -e "${RED}Error: Post ID is required${NC}"
        echo "Usage: $0 delete <post_id> [subscription_key]"
        return 1
    fi
    
    if [ -z "$subscription_key" ]; then
        echo -e "${YELLOW}Deleting post $post_id via direct API...${NC}"
        curl -X DELETE "$API_BASE/$post_id" -H "Content-Type: application/json"
    else
        echo -e "${YELLOW}Deleting post $post_id via APIM...${NC}"
        curl -X DELETE "$APIM_BASE/$post_id" \
            -H "Content-Type: application/json" \
            -H "Ocp-Apim-Subscription-Key: $subscription_key"
    fi
}

# Function to delete test posts
delete_test_posts() {
    local subscription_key=$1
    
    if [ -z "$subscription_key" ]; then
        echo -e "${YELLOW}Deleting test posts via direct API...${NC}"
        curl -X DELETE "$API_BASE/test" -H "Content-Type: application/json"
    else
        echo -e "${YELLOW}Deleting test posts via APIM...${NC}"
        curl -X DELETE "$APIM_BASE/test" \
            -H "Content-Type: application/json" \
            -H "Ocp-Apim-Subscription-Key: $subscription_key"
    fi
}

# Function to show help
show_help() {
    echo -e "\n${BLUE}Usage:${NC}"
    echo "  $0 list                                    - List all blog posts with IDs"
    echo "  $0 delete <post_id> [subscription_key]     - Delete a specific post"
    echo "  $0 delete-test [subscription_key]          - Delete all test posts"
    echo "  $0 help                                     - Show this help"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  $0 list"
    echo "  $0 delete 507f1f77bcf86cd799439011"
    echo "  $0 delete 507f1f77bcf86cd799439011 YOUR_SUBSCRIPTION_KEY"
    echo "  $0 delete-test"
    echo ""
    echo -e "${GREEN}Note:${NC} If you provide a subscription key, the request goes through APIM."
    echo "      Without a subscription key, it goes directly to the backend API."
}

# Main script logic
case "$1" in
    "list")
        list_posts
        ;;
    "delete")
        delete_post "$2" "$3"
        ;;
    "delete-test")
        delete_test_posts "$2"
        ;;
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    *)
        echo -e "${RED}Unknown command: $1${NC}"
        show_help
        exit 1
        ;;
esac 