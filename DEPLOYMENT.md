# Vercel Deployment Configuration

This document outlines the automatic deployment setup for the Open Source Economy project using GitHub Actions and Vercel.

## Overview

- **Frontend**: React + TypeScript + Vite application deployed as static site
- **Backend**: Express.js + TypeScript API deployed as serverless functions
- **Database**: PostgreSQL (recommended: Neon, PlanetScale, or Vercel Postgres)

## Project Structure for Deployment

```
open-source-economy/
├── .github/workflows/deploy.yml    # GitHub Actions deployment workflow
├── frontend/
│   └── vercel.json                 # Frontend Vercel configuration
├── backend/
│   └── vercel.json                 # Backend Vercel configuration  
└── scripts/
    └── setup-vercel.sh             # Deployment setup helper script
```

## Deployment Workflow

### Triggers
- Push to `main` or `master` branch → Production deployment
- Pull request merge to `main`/`master` → Production deployment
- Pull request updates → Preview deployment

### Build Process
1. **Shared Package**: Built first (contains TypeScript types)
2. **Backend**: Generates Prisma client → TypeScript compilation → Vercel deployment
3. **Frontend**: Builds static assets → Vercel deployment

### Vercel Projects Setup

#### Backend Configuration (`backend/vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/api/index.ts",
      "use": "@vercel/node",
      "config": {
        "runtime": "nodejs20.x"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/src/api/index.ts"
    }
  ],
  "buildCommand": "cd .. && npm run build --workspace=shared && cd backend && npm run build",
  "installCommand": "cd .. && npm install && cd backend && npx prisma generate"
}
```

#### Frontend Configuration (`frontend/vercel.json`)
```json
{
  "version": 2,
  "buildCommand": "cd .. && npm run build --workspace=shared && cd frontend && npm run build",
  "outputDirectory": "dist",
  "installCommand": "cd .. && npm install && cd frontend",
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Required GitHub Secrets

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `VERCEL_TOKEN` | Vercel API token | [Account Settings](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Organization ID | `vercel teams ls` |
| `VERCEL_PROJECT_ID_FRONTEND` | Frontend project ID | `vercel projects ls` |
| `VERCEL_PROJECT_ID_BACKEND` | Backend project ID | `vercel projects ls` |
| `DATABASE_URL` | PostgreSQL connection string | Your database provider |

## Environment Variables

### Backend (Set in Vercel Dashboard)
```env
DATABASE_URL=postgresql://user:pass@host:port/dbname
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Frontend (Set in Vercel Dashboard)
```env
VITE_API_URL=https://your-backend-api.vercel.app/api
```

## Setup Instructions

1. Run the setup script: `./scripts/setup-vercel.sh`
2. Follow the interactive prompts
3. Add secrets to GitHub repository settings
4. Set environment variables in Vercel dashboard
5. Push to main branch to trigger first deployment

## Troubleshooting

### Common Issues

**Build fails with Prisma errors:**
- Ensure `DATABASE_URL` is set in both GitHub secrets and Vercel environment variables
- Check that database is accessible from Vercel's IP ranges

**Frontend can't connect to API:**
- Verify `VITE_API_URL` points to correct backend deployment
- Check CORS settings in backend environment variables

**Deployment workflow doesn't trigger:**
- Ensure workflow file is in `.github/workflows/deploy.yml`
- Check that all required secrets are set in repository settings

### Manual Deployment

If needed, you can deploy manually:

```bash
# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd frontend  
vercel --prod
```

## Monitoring

- Monitor deployments in Vercel dashboard
- Check GitHub Actions tab for workflow status
- Review Vercel function logs for backend issues
- Use browser dev tools to debug frontend API calls