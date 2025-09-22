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

- Node.js 18+
- npm or yarn
- PostgreSQL (or use Neon for cloud database)

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

```bash
# Run all tests
npm test

# Test specific package
npm test --workspace=backend
npm test --workspace=frontend
npm test --workspace=shared
```
