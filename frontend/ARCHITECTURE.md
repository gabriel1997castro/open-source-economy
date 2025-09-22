# Frontend Architecture Guide

## 🏗️ **Improved Architecture Overview**

The frontend has been restructured with a domain-driven approach for better maintainability, scalability, and developer experience.

## 📁 **Directory Structure**

```
src/
├── components/           # All React components organized by domain
│   ├── ui/              # Reusable UI components (design system)
│   │   ├── Button.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorCard.tsx
│   │   ├── Logo.tsx
│   │   └── index.ts     # Barrel exports
│   │
│   ├── forms/           # Form-related components
│   │   ├── ContactForm.tsx
│   │   ├── NewsletterSubscription.tsx
│   │   └── index.ts
│   │
│   ├── layout/          # Layout and navigation components
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   └── index.ts
│   │
│   ├── sections/        # Page sections (business logic)
│   │   ├── OpenSourceCost.tsx
│   │   ├── DoYouRemember.tsx
│   │   ├── LetUsProtectYou.tsx
│   │   ├── GetInTouch.tsx
│   │   ├── RiskScoreCard.tsx
│   │   ├── AnimationExamples.tsx
│   │   └── index.ts
│   │
│   ├── footer/          # Footer components
│   │   ├── Footer.tsx
│   │   ├── FooterLogo.tsx
│   │   ├── FooterSection.tsx
│   │   ├── FooterLink.tsx
│   │   ├── SocialLinks.tsx
│   │   └── index.ts
│   │
│   └── index.ts         # Main barrel export
│
├── hooks/               # Custom React hooks
│   ├── useContactForm.ts
│   ├── useNewsletterSubscription.ts
│   ├── useScrollAnimation.ts
│   ├── useIntersectionObserver.ts
│   └── index.ts
│
├── services/            # API and external service integrations
│   └── api.ts
│
├── types/               # Frontend-specific TypeScript types
│   └── index.ts
│
├── assets/              # Static assets (SVGs, images)
├── lazyComponents.ts    # Organized lazy loading strategy
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## 🎯 **Architecture Principles**

### **1. Domain-Driven Organization**

- **UI Components**: Pure, reusable design system components
- **Forms**: Business logic components for data collection
- **Layout**: Application structure and navigation
- **Sections**: Page-specific business logic components
- **Footer**: Site-wide footer functionality

### **2. Barrel Exports Pattern**

- Each domain folder has an `index.ts` file
- Simplifies imports: `import { Button } from "./components"`
- Enables easy component discovery and refactoring

### **3. Separation of Concerns**

- **Components**: Pure UI logic and presentation
- **Hooks**: Reusable business logic and state management
- **Services**: External API interactions and data fetching
- **Types**: Type definitions scoped to frontend needs

### **4. Optimized Code Splitting**

- Grouped lazy loading in `lazyComponents.ts`
- Strategic component bundling for performance
- Future-ready for feature-based code splitting

## 🎨 **Component Categorization**

### **UI Components** (`/ui`)

- **Purpose**: Reusable design system components
- **Examples**: Button, LoadingSpinner, ErrorCard, Logo
- **Characteristics**:
  - Pure presentation logic
  - Highly reusable
  - Minimal business logic
  - Consistent styling patterns

### **Form Components** (`/forms`)

- **Purpose**: Data collection and user input
- **Examples**: ContactForm, NewsletterSubscription
- **Characteristics**:
  - Form validation logic
  - API integration
  - User interaction handling
  - State management

### **Layout Components** (`/layout`)

- **Purpose**: Application structure and navigation
- **Examples**: Layout, Navbar
- **Characteristics**:
  - Page structure
  - Navigation logic
  - Global state management
  - Responsive design

### **Section Components** (`/sections`)

- **Purpose**: Page-specific content and business logic
- **Examples**: OpenSourceCost, DoYouRemember, GetInTouch
- **Characteristics**:
  - Business-specific content
  - Complex interactions
  - Data visualization
  - Feature implementations

## 📦 **Performance Optimizations**

### **Lazy Loading Strategy**

```typescript
// Organized in lazyComponents.ts
export const LandingSections = {
  OpenSourceCost: lazy(() => import("./components/sections/OpenSourceCost")),
  DoYouRemember: lazy(() => import("./components/sections/DoYouRemember")),
  // ... grouped by feature
};
```
