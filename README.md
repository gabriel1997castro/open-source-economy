# Open Source Economy - Full-Stack Challenge

A full-stack web application built with TypeScript, React, Express, and PostgreSQL.

## 🏗️ Architecture

This project uses a monorepo structure with shared TypeScript types:

```
project-root/
├── frontend/          # React + TypeScript + Tailwind
├── backend/           # Express + TypeScript + PostgreSQL
├── shared/            # Shared types and validation schemas
└── README.md
```

### Why we are not using authentication for the backend API

1. Public Contact Forms: These endpoints are meant to be publicly accessible so anyone can contact you or subscribe to your newsletter without barriers.
2. Simple Data Collection: We're collecting basic information (name, email, message) that users voluntarily provide.
3. User Experience: Adding authentication would create friction for legitimate users trying to contact us or subscribe.

### Security Measures we should implement

1. Rate Limiting: Prevent spam by limiting requests per IP address
2. Input Validation: Sanitize and validate all input data (implemented)
3. Email Verification: For newsletter subscriptions, send confirmation emails
4. CORS Configuration: Properly configure CORS for our frontend domain (implemented)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- PostgreSQL (or use Neon for cloud database)

### 🚀 Quick Start - Deployment

To set up automatic deployment to Vercel:

```bash
# 1. Run the setup script
./scripts/setup-vercel.sh

# 2. Validate configuration
./scripts/validate-deployment.sh
```

Then configure your GitHub repository secrets and Vercel environment variables as guided by the script.

**For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Installation

1. **Clone and install dependencies**

   ```bash
   git clone <repository-url>
   cd open-source-economy
   npm install
   ```

2. **Build shared types package** (Required first step)

   ```bash
   # Build the shared types that both frontend and backend depend on
   npm run build --workspace=shared

   # Or alternatively:
   cd shared
   npm run build
   cd ..
   ```

3. **Set up environment variables**

   ```bash
   # Backend environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database URL and other settings
   ```

4. **Set up database**

   ```bash
   cd backend
   npx prisma migrate dev
   cd ..
   ```

5. **Start development servers**

   ```bash
   # Start both frontend and backend
   npm run dev

   # Or start individually:
   npm run dev:backend    # Starts backend on http://localhost:3001
   npm run dev:frontend   # Starts frontend on http://localhost:3000
   ```

## 📦 Shared Types Package

The `shared` package contains TypeScript types and Zod validation schemas used by both frontend and backend.

### Building Shared Types

**Important:** The shared package must be built before building frontend or backend:

```bash
# Build shared types
cd shared
npm run build

# Or from root directory
npm run build --workspace=shared
```

### Development Workflow

When working on shared types:

```bash
# Watch mode for automatic rebuilds
cd shared
npm run dev

# In another terminal, rebuild dependent packages
cd ../backend
npm run build

cd ../frontend
npm run build
```

### Shared Package Structure

```
shared/
├── src/
│   ├── types/           # TypeScript interfaces
│   ├── validation/      # Zod schemas
│   └── index.ts        # Main exports
├── dist/               # Built JavaScript/TypeScript declarations
└── package.json
```

## 🔧 Development Scripts

```bash
# Root level commands
npm run dev              # Start all development servers
npm run build           # Build all packages
npm run test            # Run all tests

# Package-specific commands
npm run dev:shared      # Watch mode for shared types
npm run dev:backend     # Start backend development server
npm run dev:frontend    # Start frontend development server

# Workspace commands
npm run build --workspace=shared    # Build only shared package
npm run build --workspace=backend   # Build only backend
npm run build --workspace=frontend  # Build only frontend
```

## 🔄 Build Order

Due to dependencies between packages, build in this order:

1. **Shared** (contains types used by others)
2. **Backend** (depends on shared types)
3. **Frontend** (depends on shared types)

```bash
# Correct build sequence
npm run build --workspace=shared
npm run build --workspace=backend
npm run build --workspace=frontend
```

## 🚨 Troubleshooting

### "Cannot find module '@open-source-economy/shared'"

This means the shared package isn't built or linked properly:

```bash
# Solution: Build shared package first
cd shared
npm run build

# Then build the package that's failing
cd ../backend  # or ../frontend
npm run build
```

### Type errors after updating shared types

```bash
# Rebuild shared package and clear TypeScript cache
cd shared
npm run build

cd ../backend
rm -rf dist/
npm run build
```

## 📚 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, TypeScript, Prisma ORM
- **Database**: PostgreSQL (local) or Neon (cloud)
- **Shared**: TypeScript, Zod validation
- **Deployment**: Vercel (frontend + backend) + Neon PostgreSQL

## 🧪 Testing

This project uses **Cypress for end-to-end testing only**. We don't use unit or integration tests - instead, we rely on comprehensive E2E tests that validate the entire application flow.

### Running Cypress Tests

```bash
# Run Cypress tests in headless mode (CI/CD)
npm run test:e2e

# Open Cypress interactive test runner (development)
npm run test:e2e:open

# Run tests headless with full browser output
npm run test:e2e:headless
```

### Test Coverage

Our Cypress tests cover:

- **Contact Form**: Submission, validation, error handling
- **Newsletter Subscription**: Signup, validation, duplicate handling
- **Navigation**: Menu functionality, mobile responsive behavior
- **API Integration**: Backend endpoints, database operations

### CI/CD Pipeline

Cypress tests run automatically on every pull request via GitHub Actions. The pipeline:

1. Sets up PostgreSQL test database
2. Builds and starts backend/frontend servers
3. Runs complete Cypress test suite
4. Cleans up test data automatically

### Test Data Management

Tests automatically clean up any data they create using dedicated cleanup endpoints, ensuring no test pollution between runs.

## 🚀 Deployment

This project uses GitHub Actions to automatically deploy to Vercel. The frontend and backend are deployed to separate Vercel projects.

### Automatic Deployment

Deployments are triggered automatically on:

- Pushes to `main` or `master` branch (production deployment)
- Merged pull requests to `main` or `master` branch (production deployment)
- Pull request updates (preview deployments)

### Vercel Configuration

#### Required Secrets

Add these secrets to your GitHub repository settings:

```bash
VERCEL_TOKEN              # Vercel API token
VERCEL_ORG_ID            # Your Vercel organization ID
VERCEL_PROJECT_ID_FRONTEND # Frontend project ID on Vercel
VERCEL_PROJECT_ID_BACKEND  # Backend project ID on Vercel
DATABASE_URL             # PostgreSQL connection string for backend
```

#### Environment Variables

**Backend Environment Variables (set in Vercel dashboard):**

```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

**Frontend Environment Variables (set in Vercel dashboard):**

```env
VITE_API_URL=https://your-backend-api.vercel.app/api
```

### Manual Deployment

You can also deploy manually using Vercel CLI:

```bash
# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd frontend
vercel --prod
```

### Deployment Architecture

- **Frontend**: Single Page Application (SPA) deployed as static files
- **Backend**: Serverless API functions deployed to Vercel
- **Database**: PostgreSQL (recommended: Neon, PlanetScale, or Vercel Postgres)
- **Shared Package**: Built during CI/CD and used by both frontend and backend

### Build Process

The deployment workflow follows this build order:

1. Install dependencies
2. Build shared package (contains TypeScript types)
3. Generate Prisma client (backend only)
4. Build backend/frontend
5. Deploy to respective Vercel projects

### Troubleshooting Deployment

**Common Issues:**

1. **Prisma Client Not Found**

   - Ensure `DATABASE_URL` environment variable is set
   - Check that Prisma generates successfully during build

2. **Shared Package Build Fails**

   - The shared package must build first as other packages depend on it
   - Check TypeScript configuration in `shared/tsconfig.json`

3. **Vercel Project Not Found**

   - Verify `VERCEL_PROJECT_ID_*` secrets are correct
   - Check that Vercel projects exist and are linked to the correct organization

4. **CORS Errors After Deployment**
   - See detailed guide: [docs/CORS_FIX.md](./docs/CORS_FIX.md)
   - Set `CORS_ORIGIN` environment variable in backend Vercel project
   - Set `VITE_API_URL` environment variable in frontend Vercel project
   - Use the test script: `./scripts/test-cors.sh`
