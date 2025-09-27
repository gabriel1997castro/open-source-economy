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

### ⚠️ CORS Security Note

**Current Status**: CORS is configured to allow only origin prod origin since vercel generate new domains for preview.

**Why**: Vercel generates new domains for each deployment (e.g., `frontend-abc123.vercel.app`), making it impractical to maintain a static allowlist.

See `backend/src/app.ts` for current CORS implementation details.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- PostgreSQL (or use Neon for cloud database)

### 🚀 Quick Start - Deployment

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
      # Generate Prisma client
      npx prisma generate
      # Migrations
      npx prisma migrate dev
      cd ..
   ```

5. **Start development servers**

   ```bash
   # Start both frontend and backend
   npm run dev

   # Or start individually:
   npm run dev:backend    # Starts backend on http://localhost:3001
   npm run dev:frontend   # Starts frontend on http://localhost:5173
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

## 🤖 AI Usage Documentation

This section documents the AI tools used during development, areas where AI assisted, validation processes, and decisions made about AI-generated content.

### AI Tools Used

- **GitHub Copilot**: Primary AI coding assistant for code generation, completion, and refactoring
- **Claude (via GitHub Copilot)**: Used for complex problem-solving, architecture decisions, and comprehensive code reviews

### Areas Where AI Assisted

#### 🏗️ **Architecture & Setup**

- **Monorepo Structure**: AI helped design the workspace configuration and build dependencies
- **TypeScript Configuration**: Generated tsconfig.json files for proper module resolution across packages
- **Package.json Scripts**: Created development and build scripts for the monorepo workflow

#### 🎨 **Frontend Development**

- **React Components**: Generated initial component structure and Tailwind CSS styling
- **Form Validation**: Created client-side validation logic with proper error handling
- **Responsive Design**: Helped implement mobile-first design patterns and navigation components
- **TypeScript Types**: Generated type definitions for props and state management

#### ⚙️ **Backend Development**

- **Express.js Setup**: Created server configuration, middleware, and route structure
- **Prisma Integration**: Generated database schema, migration files, and ORM queries
- **API Endpoints**: Developed RESTful endpoints for contact forms and newsletter subscription
- **Error Handling**: Implemented global error handling middleware and validation

#### 🔧 **Development Workflow**

- **Build Configuration**: Created Vite and TypeScript build configurations
- **CORS Setup**: Developed flexible CORS configuration for development and production
- **Environment Variables**: Generated environment configuration templates

#### 🚀 **Deployment & DevOps**

- **Vercel Configuration**: Created build commands and deployment configuration for monorepo
- **GitHub Actions**: Generated CI/CD pipeline for automated testing and deployment
- **Database Migrations**: Configured automated migration deployment for production

#### 🧪 **Testing**

- **Cypress Tests**: Generated end-to-end test suites covering critical user flows
- **Test Data Management**: Created cleanup utilities and test database management

### What Was Validated

#### ✅ **Code Quality Checks**

- **Type Safety**: Manually reviewed all TypeScript types for accuracy and completeness
- **Error Handling**: Tested all error scenarios and edge cases manually
- **Security Practices**: Validated input sanitization, CORS configuration, and rate limiting approaches
- **Performance**: Reviewed build outputs, bundle sizes, and rendering performance

#### ✅ **Functionality Testing**

- **Form Submissions**: Manually tested all form validation and submission flows
- **API Endpoints**: Verified all backend endpoints with various input scenarios
- **Database Operations**: Confirmed Prisma queries work correctly with test data
- **Responsive Design**: Tested UI across multiple device sizes and browsers

#### ✅ **Integration Validation**

- **Frontend-Backend Communication**: Verified API integration and error handling
- **Database Connectivity**: Tested database connections in both development and production
- **Deployment Process**: Manually verified build and deployment workflows

### What Was Kept vs Changed

#### 🟢 **Kept (AI-Generated Content)**

- **Initial Component Structure**: Basic React component scaffolding was solid
- **TypeScript Configurations**: Build configurations worked well out-of-the-box
- **Test Structure**: Cypress test organization and patterns were effective
- **Documentation**: Most generated documentation was comprehensive and accurate

#### 🟡 **Modified (AI + Human Refinement)**

- **CORS Configuration**: Started with basic AI setup, refined for production security needs
- **Error Messages**: Enhanced AI-generated error messages for better UX
- **Styling Details**: Adjusted Tailwind classes for pixel-perfect design matching
- **Build Commands**: Optimized monorepo build sequence based on dependency analysis
- **Environment Variables**: Added additional configuration options for production deployment
- **Prisma Schema**: Database schema design was appropriate for the use case but I had to add a small field missing

#### 🔴 **Replaced (Human Implementation)**

- **Navigation Highlighting Logic**: Rewrote AI logic that incorrectly highlighted multiple nav items
- **Form State Management**: Replaced overly complex AI-generated state logic with simpler solutions
- **Database Connection Handling**: Implemented custom connection pooling instead of AI suggestion
- **Deployment Script Order**: Corrected build sequence to properly handle shared package dependencies

### Validation Process

#### 🔍 **Code Review Approach**

1. **Line-by-line Review**: Every AI-generated code block was manually reviewed for logic and security
2. **Integration Testing**: Tested how AI-generated components worked together

#### 🧪 **Testing Strategy**

1. **Functionality**: Manual testing of all user-facing features
2. **Edge Cases**: Tested error scenarios and boundary conditions
3. **Cross-browser**: Verified compatibility across different browsers and devices
4. **Production**: Tested deployment process and production configuration

#### 📚 **Documentation Verification**

1. **Accuracy**: Verified all AI-generated documentation matched actual implementation
2. **Completeness**: Ensured setup instructions actually work from scratch
3. **Clarity**: Rewrote complex AI explanations for better developer experience

### Key Learnings

- **AI Strengths**: Excellent for boilerplate code, configuration files, and initial architecture
- **AI Limitations**: Required human oversight for complex business logic and security considerations
- **Best Practices**: AI works best when given specific, well-defined requirements
- **Quality Assurance**: Human validation and testing remain essential for production-ready code

This project demonstrates effective AI-human collaboration, leveraging AI for rapid development while maintaining code quality and security through human expertise and validation.
