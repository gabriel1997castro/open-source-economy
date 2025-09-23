#!/bin/bash

# Auto-Deployment Setup Script for Vercel
# This script helps you set up automatic deployment for your project

echo "🚀 Open Source Economy - Auto-Deployment Setup"
echo "=============================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel@latest
else
    echo "✅ Vercel CLI found"
fi

echo ""
echo "📋 Auto-Deployment Setup Checklist:"
echo "===================================="

echo ""
echo "1. 🔧 VERCEL PROJECTS SETUP:"
echo "   - Backend project created with root directory: backend/"
echo "   - Frontend project created with root directory: frontend/"
echo "   - Both projects linked to this repository"

echo ""
echo "2. 🔑 GITHUB SECRETS (Required for GitHub Actions):"
echo "   Go to: https://github.com/gabriel1997castro/open-source-economy/settings/secrets/actions"
echo ""
echo "   Add these secrets:"
echo "   - VERCEL_TOKEN: Get from https://vercel.com/account/tokens"
echo "   - VERCEL_ORG_ID: Get from Vercel project settings"
echo "   - VERCEL_PROJECT_ID_BACKEND: Backend project ID from Vercel"
echo "   - VERCEL_PROJECT_ID_FRONTEND: Frontend project ID from Vercel"

echo ""
echo "3. 🌐 ENVIRONMENT VARIABLES (Vercel Dashboard Only):"
echo "   Configure in Vercel dashboard - no local .env files needed for production!"
echo ""
echo "   Backend (Vercel Dashboard → Backend Project → Settings → Environment Variables):"
echo "   - DATABASE_URL=your-production-database-url"
echo "   - NODE_ENV=production"
echo "   - FRONTEND_URL=https://your-frontend.vercel.app"
echo ""
echo "   Frontend (Vercel Dashboard → Frontend Project → Settings → Environment Variables):"
echo "   - VITE_API_URL=https://your-backend.vercel.app"
echo ""
echo "   Local development only uses frontend/.env with VITE_API_URL=http://localhost:3001"

echo ""
echo "4. 🗄️  DATABASE SETUP:"
echo "   - Production database created (Vercel Postgres, Supabase, etc.)"
echo "   - Database schema deployed: npm run db:migrate:deploy"

echo ""
echo "🎯 Available Commands:"
echo "====================="
echo ""
echo "Manual Deployment:"
echo "  npm run deploy              # Deploy both backend and frontend"
echo "  npm run deploy:backend      # Deploy only backend"
echo "  npm run deploy:frontend     # Deploy only frontend"
echo ""
echo "Build Commands:"
echo "  npm run build               # Build all packages"
echo "  npm run build:backend       # Build backend (includes shared)"
echo "  npm run build:frontend      # Build frontend (includes shared)"
echo ""
echo "Development:"
echo "  npm run dev                 # Start both backend and frontend"
echo "  npm run dev:backend         # Start only backend"
echo "  npm run dev:frontend        # Start only frontend"
echo ""
echo "Testing:"
echo "  npm run test:e2e            # Run Cypress tests"
echo "  npm run test:e2e:open       # Open Cypress GUI"

echo ""
echo "🔄 Auto-Deployment Flow:"
echo "========================"
echo "1. Push to master branch"
echo "2. GitHub Actions triggers"
echo "3. Backend builds and deploys"
echo "4. Frontend builds and deploys"
echo "5. E2E tests run (on PRs)"
echo "6. Deployment complete!"

echo ""
echo "🔍 Verify Deployment:"
echo "====================="
echo "1. Check build logs in GitHub Actions"
echo "2. Visit your frontend URL"
echo "3. Test API endpoints: /api/health"
echo "4. Verify form submissions work"

echo ""
echo "⚡ Quick Setup Commands:"
echo "======================="

read -p "🤔 Do you want to link this project to Vercel now? (y/n): " link_vercel

if [[ $link_vercel =~ ^[Yy]$ ]]; then
    echo ""
    echo "📡 Linking Backend to Vercel..."
    cd backend
    vercel link
    echo ""
    echo "🎨 Linking Frontend to Vercel..."
    cd ../frontend
    vercel link
    cd ..
    echo "✅ Projects linked!"
fi

echo ""
read -p "🚀 Do you want to deploy both projects now? (y/n): " deploy_now

if [[ $deploy_now =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Deploying both projects..."
    npm run deploy
    echo "✅ Deployment complete!"
fi

echo ""
echo "📚 Next Steps:"
echo "=============="
echo "1. Set up GitHub secrets for automatic deployment"
echo "2. Configure environment variables in Vercel dashboard"
echo "3. Test the deployment by pushing to master branch"
echo "4. Update frontend .env.production with actual backend URL"

echo ""
echo "🎉 Auto-deployment setup complete!"
echo "📊 Monitor deployments: https://vercel.com/dashboard"
echo "🔧 GitHub Actions: https://github.com/gabriel1997castro/open-source-economy/actions"