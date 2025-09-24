#!/bin/bash

# Deployment Validation Script
# This script validates that all deployment configuration is correct

echo "🔍 Open Source Economy - Deployment Configuration Validation"
echo "==========================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to print success
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print error
error() {
    echo -e "${RED}❌ $1${NC}"
    ((ERRORS++))
}

# Function to print warning
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS++))
}

echo "Checking deployment configuration files..."
echo ""

# Check GitHub Actions workflow
if [ -f ".github/workflows/deploy.yml" ]; then
    success "GitHub Actions deployment workflow exists"
else
    error "GitHub Actions deployment workflow missing (.github/workflows/deploy.yml)"
fi

# Check Vercel configurations
if [ -f "backend/vercel.json" ]; then
    success "Backend Vercel configuration exists"
    
    # Validate backend vercel.json structure
    if grep -q "src/server.ts" "backend/vercel.json"; then
        success "Backend vercel.json has correct entry point"
    else
        error "Backend vercel.json missing correct entry point (src/server.ts)"
    fi
    
    if grep -q "@vercel/node" "backend/vercel.json"; then
        success "Backend vercel.json configured for Node.js"
    else
        error "Backend vercel.json missing @vercel/node builder"
    fi
else
    error "Backend Vercel configuration missing (backend/vercel.json)"
fi

if [ -f "frontend/vercel.json" ]; then
    success "Frontend Vercel configuration exists"
    
    # Validate frontend vercel.json structure
    if grep -q "dist/\*\*" "frontend/vercel.json"; then
        success "Frontend vercel.json configured for static files"
    else
        error "Frontend vercel.json missing static file configuration"
    fi
    
    if grep -q "index.html" "frontend/vercel.json"; then
        success "Frontend vercel.json has SPA fallback"
    else
        error "Frontend vercel.json missing SPA fallback to index.html"
    fi
else
    error "Frontend Vercel configuration missing (frontend/vercel.json)"
fi

# Check package.json scripts
echo ""
echo "Checking build scripts..."

if [ -f "package.json" ]; then
    if grep -q "\"build\":" "package.json"; then
        success "Root package.json has build script"
    else
        warning "Root package.json missing build script"
    fi
fi

if [ -f "frontend/package.json" ]; then
    if grep -q "\"build\":" "frontend/package.json"; then
        success "Frontend package.json has build script"
    else
        error "Frontend package.json missing build script"
    fi
fi

if [ -f "backend/package.json" ]; then
    if grep -q "\"build\":" "backend/package.json"; then
        success "Backend package.json has build script"
    else
        error "Backend package.json missing build script"
    fi
fi

if [ -f "shared/package.json" ]; then
    if grep -q "\"build\":" "shared/package.json"; then
        success "Shared package.json has build script"
    else
        error "Shared package.json missing build script"
    fi
fi

# Check Prisma configuration
echo ""
echo "Checking Prisma configuration..."

if [ -f "backend/prisma/schema.prisma" ]; then
    success "Prisma schema exists"
    
    if grep -q "@prisma/client" "backend/src/lib/prisma.ts" 2>/dev/null; then
        success "Backend uses standard Prisma client import"
    else
        warning "Backend may not be using standard Prisma client import"
    fi
else
    error "Prisma schema missing (backend/prisma/schema.prisma)"
fi

# Check TypeScript configurations
echo ""
echo "Checking TypeScript configurations..."

for dir in "." "frontend" "backend" "shared"; do
    if [ -f "$dir/tsconfig.json" ]; then
        success "TypeScript config exists in $dir"
    else
        warning "TypeScript config missing in $dir"
    fi
done

# Check setup script
echo ""
echo "Checking setup tools..."

if [ -f "scripts/setup-vercel.sh" ]; then
    success "Setup script exists"
    if [ -x "scripts/setup-vercel.sh" ]; then
        success "Setup script is executable"
    else
        warning "Setup script is not executable (run: chmod +x scripts/setup-vercel.sh)"
    fi
else
    error "Setup script missing (scripts/setup-vercel.sh)"
fi

# Check documentation
if [ -f "DEPLOYMENT.md" ]; then
    success "Deployment documentation exists"
else
    warning "Deployment documentation missing (DEPLOYMENT.md)"
fi

# Summary
echo ""
echo "=========================================="
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    success "All deployment configuration checks passed! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Run: ./scripts/setup-vercel.sh"
    echo "2. Configure GitHub repository secrets"
    echo "3. Set up Vercel environment variables"
    echo "4. Push to main branch to trigger deployment"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Configuration mostly complete with $WARNINGS warnings${NC}"
    echo "   Please review the warnings above"
else
    echo -e "${RED}❌ Found $ERRORS errors and $WARNINGS warnings${NC}"
    echo "   Please fix the errors before deploying"
    exit 1
fi

echo ""