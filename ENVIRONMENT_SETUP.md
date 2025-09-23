# Environment Variables Setup Guide

## 🚀 Production Environment Variables (Vercel Dashboard)

All production environment variables are configured directly in Vercel dashboard. No local .env files are used for production deployments.

### Backend Environment Variables

**Configure in: Vercel Dashboard → Backend Project → Settings → Environment Variables**

| Variable       | Value                                 | Description                           |
| -------------- | ------------------------------------- | ------------------------------------- |
| `DATABASE_URL` | `postgresql://user:pass@host:port/db` | Production database connection string |
| `NODE_ENV`     | `production`                          | Node environment                      |
| `FRONTEND_URL` | `https://your-frontend.vercel.app`    | Frontend URL for CORS (optional)      |

### Frontend Environment Variables

**Configure in: Vercel Dashboard → Frontend Project → Settings → Environment Variables**

| Variable       | Value                             | Description                    |
| -------------- | --------------------------------- | ------------------------------ |
| `VITE_API_URL` | `https://your-backend.vercel.app` | Backend API URL for production |

## 🛠️ Local Development Environment

For local development only, use `frontend/.env`:

```bash
# frontend/.env
VITE_API_URL=http://localhost:3001
```

**No backend .env file needed** - backend runs with default development settings locally.

## 🔧 How It Works

1. **Development**:

   - Frontend uses `frontend/.env` for local API URL
   - Backend uses default localhost settings

2. **Production**:
   - Vercel automatically injects environment variables during build
   - No .env files are deployed or needed
   - All configuration is managed through Vercel dashboard

## ✅ Benefits of This Approach

- ✅ **Security**: No sensitive data in repository
- ✅ **Simplicity**: Single source of truth (Vercel dashboard)
- ✅ **Flexibility**: Easy to update without code changes
- ✅ **Separation**: Clear distinction between dev and prod
- ✅ **Team-friendly**: No need to share .env files

## 🚨 Important Notes

- Never commit production environment variables to git
- Always use Vercel dashboard for production environment configuration
- Local development only needs `frontend/.env` for API URL
- Changes to Vercel environment variables require redeployment

## 🔗 Quick Links

- [Backend Vercel Project Settings](https://vercel.com/dashboard) → Your Backend Project → Settings → Environment Variables
- [Frontend Vercel Project Settings](https://vercel.com/dashboard) → Your Frontend Project → Settings → Environment Variables
- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
