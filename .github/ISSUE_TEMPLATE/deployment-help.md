---
name: Deployment Setup Help
about: Get help setting up automatic deployment to Vercel
title: '[DEPLOYMENT] Need help setting up automatic deployment'
labels: deployment, help wanted
assignees: ''

---

## Deployment Setup Checklist

**Before opening this issue, please ensure you have:**

- [ ] Run `./scripts/setup-vercel.sh`
- [ ] Created Vercel projects for frontend and backend
- [ ] Set up database (PostgreSQL)

## Configuration Status

### GitHub Secrets (check what you've configured)
- [ ] `VERCEL_TOKEN` - Vercel API token
- [ ] `VERCEL_ORG_ID` - Organization ID
- [ ] `VERCEL_PROJECT_ID_FRONTEND` - Frontend project ID  
- [ ] `VERCEL_PROJECT_ID_BACKEND` - Backend project ID
- [ ] `DATABASE_URL` - PostgreSQL connection string

### Vercel Environment Variables

**Backend project environment variables:**
- [ ] `DATABASE_URL` 
- [ ] `NODE_ENV=production`
- [ ] `CORS_ORIGIN` (your frontend domain)

**Frontend project environment variables:**
- [ ] `VITE_API_URL` (your backend API domain)

## Issue Description

**What specific help do you need?**
<!-- Describe your deployment issue or question -->

**What error messages are you seeing?**
<!-- Paste any error messages from GitHub Actions or Vercel -->

**What have you tried so far?**
<!-- List the steps you've already taken -->

## Deployment URLs

**Frontend Vercel URL:** 
**Backend Vercel URL:** 
**Database Provider:** (Neon / PlanetScale / Vercel Postgres / Other)

## Additional Context

<!-- Add any other context about the deployment issue here -->

---

## Quick Fix Commands

If deployment is failing, try these commands:

```bash
# Validate configuration
./scripts/validate-deployment.sh

# Manual deployment test
cd backend && vercel --prod
cd ../frontend && vercel --prod

# Check Vercel project status
vercel projects ls
vercel teams ls
```