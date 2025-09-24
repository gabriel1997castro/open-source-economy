# CORS Configuration for Vercel Deployment

This guide explains how to fix CORS errors when deploying to Vercel.

## 🚨 Common CORS Error

```
Access to fetch at 'https://your-backend.vercel.app/api/contact' from origin 'https://your-frontend.vercel.app' has been blocked by CORS policy
```

## ✅ Solution Overview

The CORS error occurs because:

1. Your frontend and backend are deployed to different Vercel domains
2. The backend needs to explicitly allow your frontend domain
3. Environment variables need to be configured correctly

## 📋 Step-by-Step Fix

### 1. Deploy Both Applications First

Make sure both frontend and backend are deployed to Vercel:

```bash
# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd frontend
vercel --prod
```

Note the URLs provided by Vercel (e.g., `https://your-backend-abc123.vercel.app`)

### 2. Configure Backend Environment Variables

In your **backend** Vercel project dashboard, add these environment variables:

```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Important:** Replace `your-frontend-domain.vercel.app` with your actual frontend URL from step 1.

### 3. Configure Frontend Environment Variables

In your **frontend** Vercel project dashboard, add:

```env
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

**Important:** Replace `your-backend-domain.vercel.app` with your actual backend URL from step 1.

### 4. Redeploy Both Applications

After setting environment variables, trigger new deployments:

```bash
# Trigger redeploys by making small commits
git commit --allow-empty -m "fix: update CORS configuration"
git push origin master
```

Or manually redeploy from Vercel dashboard.

## 🧪 Test Your Configuration

Use our test script to verify CORS is working:

```bash
# Set your production URLs
export FRONTEND_URL=https://your-frontend.vercel.app
export BACKEND_URL=https://your-backend.vercel.app

# Run the test
./scripts/test-cors.sh
```

## 🔧 Advanced Configuration

### Custom Domain Setup

If you're using custom domains, update the environment variables accordingly:

```env
# Backend environment variables
CORS_ORIGIN=https://your-custom-domain.com
FRONTEND_URL=https://your-custom-domain.com

# Frontend environment variables
VITE_API_URL=https://api.your-custom-domain.com/api
```

### Multiple Frontend Domains

To allow multiple domains (e.g., staging + production):

```env
# In backend - use comma-separated values
CORS_ORIGIN=https://staging.yourdomain.com,https://yourdomain.com
```

The backend code automatically handles multiple origins.

### Preview Deployments

The backend is configured to automatically allow:

- All `*.vercel.app` domains (for preview deployments)
- The specific `CORS_ORIGIN` domain (for production)

## 🔍 Troubleshooting

### 1. "CORS blocked origin" in logs

Check your backend logs in Vercel. You'll see which origin was blocked:

```
CORS blocked origin: https://some-domain.vercel.app
```

Add this domain to your `CORS_ORIGIN` environment variable.

### 2. Environment variables not loaded

Verify environment variables are set in Vercel dashboard:

- Go to your project → Settings → Environment Variables
- Ensure they're set for the correct environment (Production/Preview)
- Redeploy after adding/changing variables

### 3. Still getting CORS errors

1. Clear browser cache and try in incognito mode
2. Check browser network tab for the actual request URLs
3. Verify the frontend is making requests to the correct backend URL
4. Run the CORS test script to verify configuration

### 4. Preflight requests failing

Ensure your backend environment variables include:

```env
NODE_ENV=production
```

The CORS configuration behaves differently in development vs production.

## 📚 How Our CORS Configuration Works

The backend (`src/app.ts`) has intelligent CORS handling:

1. **Development**: Allows all localhost origins
2. **Production**:
   - Allows specific `CORS_ORIGIN` domain
   - Allows all `*.vercel.app` domains (for previews)
   - Logs blocked origins for debugging

This ensures:

- ✅ Development works without configuration
- ✅ Production is secure but flexible
- ✅ Preview deployments work automatically
- ✅ Easy debugging with clear logs

## 🚀 Quick Reference

### Backend Environment Variables (Vercel Dashboard)

```env
DATABASE_URL=postgresql://...
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend Environment Variables (Vercel Dashboard)

```env
VITE_API_URL=https://your-backend.vercel.app/api
```

### GitHub Repository Secrets (for CI/CD)

```env
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID_FRONTEND=frontend_project_id
VERCEL_PROJECT_ID_BACKEND=backend_project_id
DATABASE_URL=postgresql://...
```
