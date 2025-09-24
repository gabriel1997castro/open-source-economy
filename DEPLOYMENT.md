# Vercel Deployment Guide

This project deploys to **two separate Vercel projects** - one for frontend and one for backend. This separation allows for independent scaling and configuration.

## 🏗️ **Deployment Architecture**

```
┌─────────────────┐    ┌─────────────────┐
│  Frontend App   │    │  Backend API    │
│  (React/Vite)   │───▶│  (Express)      │
│  Vercel Project │    │  Vercel Project │
└─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Neon PostgreSQL   │
                    │   (Database)    │
                    └─────────────────┘
```

## 🚀 **Project 1: Frontend Deployment**

### **Vercel Configuration**

```
Build Command:     cd .. && npm run build --workspace=shared && npm run build --workspace=frontend
Output Directory:  dist
Install Command:   cd .. && npm install
```

### **Build Process Explained**

1. **`cd ..`** - Navigate to monorepo root
2. **`npm install`** - Install all workspace dependencies
3. **`npm run build --workspace=shared`** - Build shared TypeScript types first
4. **`npm run build --workspace=frontend`** - Build React app with Vite
5. **Output**: Static files in `frontend/dist/` directory

### **Environment Variables**

```env
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

**Example:**

```env
VITE_API_URL=https://open-source-economy-backend-two.vercel.app/api
```

## ⚙️ **Project 2: Backend Deployment**

### **Vercel Configuration**

```
Build Command:     cd .. && npm install && npm run build --workspace=shared && cd backend && npx prisma generate && npx prisma migrate deploy && npm run build
Output Directory:  dist
Install Command:   cd .. && npm install
```

### **Build Process Explained**

1. **`cd ..`** - Navigate to monorepo root
2. **`npm install`** - Install all workspace dependencies
3. **`npm run build --workspace=shared`** - Build shared TypeScript types
4. **`cd backend`** - Navigate to backend directory
5. **`npx prisma generate`** - Generate Prisma client for database access
6. **`npx prisma migrate deploy`** - **Apply database migrations** ⚠️ Critical step!
7. **`npm run build`** - Build Express app to JavaScript

### **Environment Variables**

```env
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
```

**For Neon (Production):**

```env
NODE_ENV=production
DATABASE_URL=postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

## 🗄️ **Database: Neon PostgreSQL**

**Why Neon?**

- ✅ Serverless PostgreSQL optimized for modern apps
- ✅ Automatic scaling and branching
- ✅ Perfect for Vercel deployments
- ✅ Built-in connection pooling

**Configuration:**

1. Create database at [neon.tech](https://neon.tech)
2. Copy connection string
3. Add to backend Vercel project environment variables
4. Migrations run automatically on each deploy

## 🔄 **Deployment Workflow**

### **Automatic Deployment (Recommended)**

- Push to `master` branch triggers both deployments
- Preview deployments for pull requests
- Automatic rollbacks on failure

## ⚠️ **Important Notes**

### **Build Order Matters**

The shared package **must** be built first as both frontend and backend depend on it:

```
1. shared package (TypeScript types)
2. Frontend OR Backend (can be parallel)
```

### **Database Migrations**

- Migrations run automatically on backend deployment
- Uses `prisma migrate deploy` (production-safe)
- No data loss on schema changes

### **Environment Variables**

- **Frontend**: Must start with `VITE_` to be included in build
- **Backend**: Standard environment variables
- **Never commit**: Database credentials or API keys

## 🔧 **Troubleshooting**

### **Build Failures**

```bash
# Common issues:
1. Shared package not built → Check build command includes workspace=shared
2. Database connection → Verify DATABASE_URL format
3. Missing dependencies → Ensure npm install runs from root
```

### **Database Connection**

```bash
# Test database connection locally:
cd backend
npx prisma studio  # Opens database browser
```

## 📊 **Production URLs Example**

```
Frontend:  https://open-source-economy-frontend.vercel.app
Backend:   https://open-source-economy-backend-two.vercel.app
```

## 🚀 **Next Steps**

1. **Monitor**: Check Vercel logs for deployment status
2. **Test**: Verify both frontend and API work together
3. **Scale**: Configure auto-scaling based on usage

## Troubleshooting Deployment

**Common Issues:**

1. **Prisma Client Not Found**

   - Ensure `DATABASE_URL` environment variable is set
   - Check that Prisma generates successfully during build

2. **Shared Package Build Fails**

   - The shared package must build first as other packages depend on it
   - Check TypeScript configuration in `shared/tsconfig.json`

---
