# Open Source Economy Challenge Plan

## 📋 **Project Plan: Full-Stack Web App Technical Challenge**

### **Phase 1: Project Setup & Architecture Planning**

#### 1.1 Repository Structure

```
project-root/
├── frontend/                 # React + TypeScript + Tailwind
├── backend/                  # Express + TypeScript + PostgreSQL
├── shared/                   # Shared types and utilities
├── docs/                     # Documentation
├── scripts/                  # Deployment and utility scripts
└── README.md
```

#### 1.2 Tech Stack Setup

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: Express.js + TypeScript + PostgreSQL + Prisma ORM
- **Deployment**: Vercel (frontend + backend) + Neon PostgreSQL
- **Testing**: Cypress (End-to-End testing only)
- **Tooling**: ESLint, Prettier, Husky for git hooks

#### 1.3 Development Environment

```bash
# Initialize monorepo structure
mkdir fullstack-challenge && cd fullstack-challenge
git init
npm init -y

# Setup frontend
npx create-react-app frontend --template typescript
cd frontend && npm install tailwindcss @headlessui/react

# Setup backend
mkdir backend && cd backend
npm init -y
npm install express typescript @types/express prisma @prisma/client
```

### **Phase 2: Database Design & Backend Foundation**

#### 2.1 Database Schema

```sql
-- Primary form submissions
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  linkedin VARCHAR(255), -- Optional field
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);
```

#### 2.2 Backend API Structure

```typescript
// shared/types.ts
export interface ContactFormData {
  name: string;
  linkedin?: string;
  email: string;
  message: string;
}

export interface NewsletterSubscription {
  email: string;
}

// Consider adding response types too:
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ContactSubmissionResponse {
  id: number;
  message: string;
}

// API endpoints to implement:
// POST /api/contact - Submit contact form
// POST /api/newsletter - Subscribe to newsletter
// GET /api/health - Health check
```

#### 2.3 Validation & Error Handling

- Implement Zod for runtime validation
- Custom error classes for different error types
- Consistent API response format

```typescript
// validation/schemas.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email format").max(255),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email format").max(255),
});
```

### **Phase 3: Backend Implementation**

#### 3.1 Core Backend Features

```typescript
// Key components to build:
1. Express server setup with TypeScript
2. Prisma schema and migrations
3. Input validation middleware
4. Database service layer
5. API route handlers
6. Error handling middleware
7. CORS and security setup
```

#### 3.2 Testing Strategy

```typescript
// E2E testing with Cypress covers:
1. Complete user workflows (contact form, newsletter signup)
2. API endpoint integration validation
3. Database operations and cleanup
4. Frontend-backend integration
5. Mobile responsive behavior
6. Error handling and validation
```

### **Phase 4: Frontend Implementation**

#### 4.1 Component Architecture

```tsx
// Component structure:
src/
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── forms/               # Form components
│   └── layout/              # Layout components
├── hooks/                   # Custom React hooks
├── services/               # API service layer
├── types/                  # TypeScript types
└── utils/                  # Utility functions
```

#### 4.2 Key Components to Build

1. **Main Layout Component** - Responsive layout matching Figma
2. **Contact Form Component** - Primary form with validation
3. **Newsletter Subscription** - Footer newsletter form
4. **UI Components** - Buttons, inputs, error states, success states
5. **Loading States** - Proper UX during API calls

#### 4.3 State Management

- React hooks for form state
- Custom hooks for API calls
- Error and loading state management

### **Phase 5: Integration & E2E Testing**

#### 5.1 Cypress E2E Testing

```typescript
// Cypress tests cover the complete application:
1. Contact form submission workflow
2. Newsletter subscription flow
3. Form validation and error handling
4. Navigation and mobile menu behavior
5. API integration and data persistence
6. Automated test data cleanup
```

#### 5.2 Testing Infrastructure

- Cypress runs on every pull request via GitHub Actions
- Automated test database setup and teardown
- Test data cleanup to prevent pollution between runs
- Screenshot and video capture for debugging failures

### **Phase 6: UI/UX Implementation**

#### 6.1 Figma Implementation

- Pixel-perfect implementation of the design
- Responsive breakpoints (mobile, tablet, desktop)
- Proper typography and spacing
- Color scheme and theme implementation

#### 6.2 Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Screen reader compatibility
- Form validation announcements

### **Phase 7: Deployment & DevOps**

#### 7.1 Deployment Setup

```bash
# Vercel deployment configuration
# vercel.json for backend API routes
# Environment variable setup
# Database migration scripts
```

#### 7.2 Production Considerations

- Environment variable management
- Database connection pooling
- Error logging and monitoring
- Performance optimization

### **Phase 8: Documentation & AI Usage**

#### 8.1 README Documentation

```markdown
# Project sections to document:

1. Architecture overview
2. Setup instructions
3. Environment variables
4. Database migrations
5. Testing instructions
6. Deployment guide
7. AI usage documentation
```

#### 8.2 AI Usage Documentation

Track and document:

- Code generation assistance
- Architecture decisions
- Debugging help
- Testing strategy development
- Review and validation process

## 🚀 **Implementation Priority Order**

### High Priority (Must Have)

1. ✅ Basic project setup and architecture
2. ✅ Database schema and migrations
3. ✅ Backend API endpoints
4. ✅ Frontend form components
5. ✅ Form validation (client + server)
6. ✅ Basic responsive layout

### Medium Priority (Should Have)

1. ✅ Comprehensive testing suite
2. ✅ Error handling and loading states
3. ✅ Accessibility features
4. ✅ Production deployment
5. ✅ Performance optimization

### Nice to Have (Could Have)

1. Advanced animations
2. Email notifications
3. Admin dashboard
4. Analytics tracking

## 🛠 **AI Integration Strategy**

### Where to Use AI:

1. **Boilerplate Generation** - Initial project structure
2. **Component Templates** - React component scaffolding
3. **API Route Logic** - Express route handlers
4. **Cypress Test Cases** - End-to-end test scenarios
5. **Documentation** - README and code comments
6. **Debugging** - Error resolution assistance

### Validation Process:

1. Review all AI-generated code
2. Test functionality thoroughly
3. Ensure code follows best practices
4. Verify type safety
5. Check security implications
