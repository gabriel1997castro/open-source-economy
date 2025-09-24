#!/bin/bash

# Vercel Deployment Setup Script
# This script helps set up the Vercel deployment configuration

echo "🚀 Open Source Economy - Vercel Deployment Setup"
echo "================================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing..."
    npm install -g vercel@latest
    echo "✅ Vercel CLI installed successfully!"
fi

echo ""
echo "📋 Setup Instructions:"
echo ""
echo "1. First, login to Vercel:"
echo "   vercel login"
echo ""
echo "2. Create and link your backend project:"
echo "   cd backend"
echo "   vercel"
echo "   Follow the prompts to create a new project or link existing"
echo ""
echo "3. Create and link your frontend project:"
echo "   cd ../frontend" 
echo "   vercel"
echo "   Follow the prompts to create a new project or link existing"
echo ""
echo "4. Get your Vercel organization ID:"
echo "   vercel teams ls"
echo ""
echo "5. Get your project IDs:"
echo "   vercel projects ls"
echo ""
echo "6. Add the following secrets to your GitHub repository:"
echo "   - VERCEL_TOKEN (get from: https://vercel.com/account/tokens)"
echo "   - VERCEL_ORG_ID (from step 4)"
echo "   - VERCEL_PROJECT_ID_FRONTEND (from step 5)"
echo "   - VERCEL_PROJECT_ID_BACKEND (from step 5)"
echo "   - DATABASE_URL (your PostgreSQL connection string)"
echo ""
echo "7. Set environment variables in Vercel dashboard:"
echo ""
echo "   Backend Project Environment Variables:"
echo "   - DATABASE_URL: your_postgresql_connection_string"
echo "   - NODE_ENV: production"
echo "   - CORS_ORIGIN: https://your-frontend-domain.vercel.app"
echo ""
echo "   Frontend Project Environment Variables:"  
echo "   - VITE_API_URL: https://your-backend-api.vercel.app/api"
echo ""
echo "✅ Setup complete! Push to main branch to trigger deployment."
echo ""