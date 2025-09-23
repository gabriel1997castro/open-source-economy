# Auto-Deployment Setup Guide

## 🚀 Overview

This project is configured for automatic deployment to Vercel with the following setup:

- **Backend**: Node.js/Express API deployed as Vercel Serverless Functions
- **Frontend**: React/Vite SPA deployed as static site
- **Auto-Deploy**: Triggered on every push to `master` branch
- **Testing**: Cypress E2E tests run on pull requests

## 📁 Project Structure

```
├── backend/                 # Express API (deployed separately)
├── frontend/                # React/Vite app (deployed separately)
├── shared/                  # Shared TypeScript types and utilities
├── .github/workflows/       # GitHub Actions for auto-deployment
└── deploy-setup.sh         # Setup helper script
```

## ⚙️ Deployment Configuration

### Package.json Scripts

```bash
# Manual deployment
npm run deploy              # Deploy both backend and frontend
npm run deploy:backend      # Deploy only backend
npm run deploy:frontend     # Deploy only frontend

# Build commands
npm run build               # Build all packages
npm run build:backend       # Build backend (includes shared)
npm run build:frontend      # Build frontend (includes shared)

# Development
npm run dev                 # Start both backend and frontend
npm run dev:backend         # Start only backend
npm run dev:frontend        # Start only frontend
```

### Vercel Configuration

#### Backend (`backend/vercel.json`)

- **Runtime**: Node.js 20.x
- **Build**: Shared package + Prisma generation + TypeScript compilation
- **Routes**: All requests routed to Express server

#### Frontend (`frontend/vercel.json`)

- **Framework**: Vite
- **Build**: Shared package + Vite build
- **Routes**: SPA routing configuration

## 🔄 Auto-Deployment Workflow

### Trigger Events

- **Production Deploy**: Push to `master` branch
- **Preview Deploy**: Pull request to `master` branch

### Deployment Steps

1. **Install Dependencies**: `npm ci`
2. **Build Shared Package**: `npm run build --workspace=shared`
3. **Backend Deployment**:
   - Generate Prisma client
   - Build TypeScript
   - Deploy to Vercel
4. **Frontend Deployment**:
   - Build with Vite
   - Deploy to Vercel
5. **Testing** (PRs only):
   - Run Cypress E2E tests

## 🔧 Setup Instructions

### 1. Initial Setup

Run the setup script:

```bash
./deploy-setup.sh
```

### 2. Vercel Projects

Create two separate Vercel projects:

1. **Backend Project**:
   - Repository: `gabriel1997castro/open-source-economy`
   - Root Directory: `backend`
   - Framework: Node.js
2. **Frontend Project**:
   - Repository: `gabriel1997castro/open-source-economy`
   - Root Directory: `frontend`
   - Framework: Vite

### 3. Environment Variables (Vercel Dashboard Only)

**All production environment variables are configured in Vercel dashboard - no local .env files needed.**

#### Backend Environment Variables

Configure in Vercel Dashboard → Backend Project → Settings → Environment Variables:

```
DATABASE_URL=postgresql://user:pass@host:port/db
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

#### Frontend Environment Variables

Configure in Vercel Dashboard → Frontend Project → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend.vercel.app
```

#### Local Development Only

For local development, use `frontend/.env`:

```
VITE_API_URL=http://localhost:3001
```

**Note**: Production environment variables are automatically injected by Vercel during deployment.

### 4. GitHub Secrets

Add these secrets to your GitHub repository:

- `VERCEL_TOKEN`: Generate at https://vercel.com/account/tokens
- `VERCEL_ORG_ID`: Found in Vercel project settings
- `VERCEL_PROJECT_ID_BACKEND`: Backend project ID
- `VERCEL_PROJECT_ID_FRONTEND`: Frontend project ID

### 5. Database Setup

1. **Create Production Database**:

   - Vercel Postgres (recommended)
   - Or external provider (Supabase, Railway, etc.)

2. **Deploy Schema**:
   ```bash
   DATABASE_URL="production-url" npx prisma migrate deploy
   ```

## 🧪 Testing

### Local Testing

```bash
npm run test:e2e:open       # Open Cypress GUI
npm run test:e2e            # Run tests headlessly
```

### Production Testing

- E2E tests automatically run on pull requests
- Tests run against deployed preview environments

## 🔍 Monitoring

### Deployment Status

- **GitHub Actions**: Monitor build/deploy status
- **Vercel Dashboard**: View deployment logs and metrics

### Health Checks

- **Backend**: `https://your-backend.vercel.app/api/health`
- **Frontend**: `https://your-frontend.vercel.app`

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**:

   - Check GitHub Actions logs
   - Verify environment variables
   - Ensure shared package builds first

2. **Database Connection**:

   - Verify DATABASE_URL in Vercel
   - Check database permissions
   - Run schema migration

3. **CORS Errors**:

   - Update CORS configuration in backend
   - Add frontend URL to allowed origins

4. **Environment Variables**:
   - Ensure all required vars are set
   - Remember VITE\_ prefix for frontend vars
   - Redeploy after adding variables

### Useful Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Pull environment variables locally
vercel env pull

# Link local project to Vercel
vercel link
```

## 🎯 Best Practices

1. **Environment Management**:

   - Use different environments for dev/staging/prod
   - Never commit secrets to git
   - Use Vercel's environment variable management

2. **Deployment Strategy**:

   - Test locally before pushing
   - Use pull requests for code review
   - Monitor deployment status

3. **Database Management**:
   - Always backup before schema changes
   - Use migrations for schema updates
   - Test migrations on staging first

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)

---

🎉 **Auto-deployment is now configured!** Every push to `master` will automatically deploy your application to production.
