# Open Source Economy - Frontend

React + TypeScript frontend application built with Vite, part of the Open Source Economy full-stack project.

## 🏗️ Project Architecture

[DEMO LINK](https://open-source-economy-frontend.vercel.app/)
This is the **frontend package** in a monorepo structure:

```
open-source-economy/
├── frontend/          # 👈 This package (React + TypeScript + Tailwind)
├── backend/           # Express + TypeScript + PostgreSQL
├── shared/            # Shared TypeScript types & validation
└── cypress/           # End-to-end testing
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm (workspaces enabled)
- Built shared types package

### Development Setup

```bash
# From project root - install all dependencies
cd ../
npm install

# Build shared types (required dependency)
npm run build --workspace=shared

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev:frontend
# Or from frontend directory: npm run dev
```

### Environment Variables

Create `.env` file in this directory:

```env
VITE_API_URL=http://localhost:3001/api
```

**Production (Vercel):**

```env
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

## 📦 Dependencies

### Shared Package Integration

This frontend depends on the `@open-source-economy/shared` package for:

- **TypeScript Types**: Contact, Newsletter, API interfaces
- **Validation Schemas**: Zod schemas for form validation
- **Constants**: Shared configuration values

**Important**: The shared package must be built before building this frontend:

```bash
# From project root
npm run build --workspace=shared
npm run build --workspace=frontend
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server (http://localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build locally

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking

# From project root (recommended)
npm run dev:frontend    # Start frontend dev server
npm run build --workspace=frontend  # Build frontend package
```

## 🎨 Tech Stack

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Full type safety with shared types
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Zod**: Runtime validation (from shared package)

## 📱 Features

### Pages & Components

- **Home**: Landing page with hero section and features
- **Contact**: Contact form with validation and API integration
- **About**: Company information and mission
- **Newsletter**: Subscription form with duplicate handling

### Core Features

- **Responsive Design**: Mobile-first Tailwind CSS
- **Form Validation**: Client-side validation using shared Zod schemas
- **API Integration**: Type-safe API calls to Express backend
- **Error Handling**: User-friendly error messages and states
- **Loading States**: Smooth UX during API calls

## 🔄 Development Workflow

### Working with Shared Types

When shared types are updated:

```bash
# Rebuild shared package
cd ../shared
npm run build

# Restart frontend dev server to pick up changes
cd ../frontend
npm run dev
```

### Hot Module Replacement (HMR)

Vite provides fast HMR for:

- React components
- CSS/Tailwind changes
- TypeScript files

Changes to shared types require a rebuild of the shared package.

## 🚀 Deployment

### Vercel Deployment (Recommended)

**Build Configuration:**

```
Build Command:     cd .. && npm run build --workspace=shared && npm run build --workspace=frontend
Output Directory:  dist
Install Command:   cd .. && npm install
```

**Environment Variables:**

```env
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

### Manual Build

```bash
# From project root
npm run build --workspace=shared
npm run build --workspace=frontend

# Output files will be in frontend/dist/
```

## 🧪 Testing

This project uses **Cypress for E2E testing only**. Frontend-specific tests are located in the root `cypress/` directory and cover:

- Contact form submission and validation
- Newsletter subscription flow
- Navigation and routing
- API integration with backend
- Responsive design behavior

```bash
# From project root
npm run test:e2e           # Run headless tests
npm run test:e2e:open     # Open Cypress interface
```

## 🔧 Configuration Files

- `vite.config.ts`: Vite configuration with React plugin
- `tsconfig.json`: TypeScript configuration extending base config
- `tailwind.config.js`: Tailwind CSS configuration
- `eslint.config.js`: ESLint rules for React + TypeScript

## 🚨 Troubleshooting

### Cannot find module '@open-source-economy/shared'

The shared package isn't built:

```bash
cd ../shared
npm run build
cd ../frontend
npm run dev
```

### Type errors after shared types update

```bash
# Rebuild shared and restart dev server
cd ../shared && npm run build
cd ../frontend && npm run dev
```

### CORS errors in development

Check that `VITE_API_URL` points to the correct backend URL and the backend is running.

## 📚 Key Dependencies

- **@open-source-economy/shared**: Internal shared types package
- **react**: UI library
- **react-router-dom**: Client-side routing
- **@vitejs/plugin-react**: Vite React support
- **tailwindcss**: CSS framework
- **typescript**: Type safety

## 🔗 Related Documentation

- [Main Project README](../README.md) - Full project overview
- [Backend README](../backend/README.md) - API documentation
- [Deployment Guide](../DEPLOYMENT.md) - Vercel deployment process
- [Shared Package](../shared/README.md) - Types and validation schemas
