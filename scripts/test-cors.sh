#!/bin/bash

# CORS Configuration Test Script
# This script helps test CORS configuration for your Vercel deployment

echo "🔍 CORS Configuration Test"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test CORS
test_cors() {
    local frontend_url=$1
    local backend_url=$2
    
    echo -e "\n${YELLOW}Testing CORS between:${NC}"
    echo "  Frontend: $frontend_url"
    echo "  Backend:  $backend_url"
    
    # Test preflight request
    echo -e "\n🔍 Testing preflight (OPTIONS) request..."
    response=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Origin: $frontend_url" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS "$backend_url/api/health")
    
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✅ Preflight request successful${NC}"
    else
        echo -e "${RED}❌ Preflight request failed (HTTP $response)${NC}"
    fi
    
    # Test actual request
    echo "🔍 Testing actual request..."
    response=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Origin: $frontend_url" \
        -H "Content-Type: application/json" \
        "$backend_url/api/health")
    
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✅ Actual request successful${NC}"
    else
        echo -e "${RED}❌ Actual request failed (HTTP $response)${NC}"
    fi
}

# Test local development
echo -e "\n${YELLOW}=== LOCAL DEVELOPMENT TEST ===${NC}"
test_cors "http://localhost:5173" "http://localhost:3001"

# Test production (if URLs provided)
if [ ! -z "$FRONTEND_URL" ] && [ ! -z "$BACKEND_URL" ]; then
    echo -e "\n${YELLOW}=== PRODUCTION TEST ===${NC}"
    test_cors "$FRONTEND_URL" "$BACKEND_URL"
else
    echo -e "\n${YELLOW}=== PRODUCTION TEST (SKIPPED) ===${NC}"
    echo "To test production, set environment variables:"
    echo "  export FRONTEND_URL=https://your-frontend.vercel.app"
    echo "  export BACKEND_URL=https://your-backend.vercel.app"
    echo "  ./scripts/test-cors.sh"
fi

echo -e "\n${YELLOW}📝 CORS Configuration Checklist:${NC}"
echo "  □ CORS_ORIGIN set in Vercel backend environment"
echo "  □ FRONTEND_URL set in Vercel backend environment"
echo "  □ VITE_API_URL set in Vercel frontend environment"
echo "  □ Both apps deployed to Vercel"
echo ""
echo "Environment variable examples:"
echo "  CORS_ORIGIN=https://your-frontend.vercel.app"
echo "  FRONTEND_URL=https://your-frontend.vercel.app"
echo "  VITE_API_URL=https://your-backend.vercel.app/api"