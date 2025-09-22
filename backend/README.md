# Open Source Economy - Backend API

A TypeScript Express.js backend API serving the Open Source Economy platform, providing secure form submission handling and newsletter management with PostgreSQL persistence.

## 🏗️ **Architecture Overview**

This backend follows a layered architecture pattern with clear separation of concerns:

```
src/
├── controllers/     # Request handling and response formatting
├── services/        # Business logic and data processing
├── routes/          # API endpoint definitions
├── middleware/      # Cross-cutting concerns (validation, errors)
├── lib/            # Database connection and utilities
└── types/          # TypeScript type definitions
```

### **Tech Stack**

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod for runtime type checking
- **Testing**: Jest with Supertest
- **Development**: Nodemon with hot reload

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)
- Environment variables configured

### **Installation**

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Start development server
npm run dev:watch
```

### **Environment Variables**

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/open_source_economy"

# Server
PORT=3001
NODE_ENV=development

# CORS (optional - defaults to allow all)
CORS_ORIGIN="http://localhost:3000"
```

## 📊 **Database Schema**

### **Contact Submissions**

Stores form submissions from the "Get In Touch" contact form.

```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  linkedin VARCHAR(255), -- Optional LinkedIn profile
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Newsletter Subscriptions**

Manages email subscriptions for marketing communications.

```sql
CREATE TABLE newsletter_subscriptions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);
```

## 🛠 **API Endpoints**

### **Contact Form API**

#### `POST /api/contact`

Submit a contact form with user inquiries.

**Request Body:**

```typescript
{
  name: string;        // Required: Full name
  email: string;       // Required: Valid email address
  linkedin?: string;   // Optional: LinkedIn profile URL
  message: string;     // Required: Message content (min 10 chars)
}
```

**Response:**

```typescript
{
  success: true,
  message: "Thank you for your message! We'll get back to you soon!",
  data: { id: 123 }
}
```

**Validation Rules:**

- Name: 1-255 characters, required
- Email: Valid email format, required
- LinkedIn: Valid URL format, optional
- Message: Minimum 10 characters, required

### **Newsletter API**

#### `POST /api/newsletter`

Subscribe an email address to the newsletter.

**Request Body:**

```typescript
{
  email: string; // Required: Valid email address
}
```

**Response:**

```typescript
{
  success: true,
  message: "Successfully subscribed to newsletter!",
  data: { id: 456 }
}
```

**Features:**

- Duplicate email handling (idempotent)
- Email format validation
- Subscription status tracking

### **Health Check**

#### `GET /health`

System health and status verification.

**Response:**

```typescript
{
  status: "ok",
  timestamp: "2025-01-15T10:30:00Z",
  database: "connected"
}
```

## 🔒 **Security & Validation**

### **Input Validation**

All endpoints use Zod schemas for runtime validation:

```typescript
// Contact form validation
const contactFormSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  linkedin: z.string().url().optional().or(z.literal("")),
  message: z.string().min(10),
});
```

### **Error Handling**

Centralized error handling with consistent response format:

```typescript
// Error response structure
{
  success: false,
  error: "Validation failed",
  details: {
    field: "email",
    message: "Invalid email format"
  }
}
```

### **CORS Configuration**

Configurable CORS settings for cross-origin requests:

- Development: Allows localhost origins
- Production: Restricted to allowed domains

## 🏢 **Service Layer Architecture**

### **ContactService**

Handles all contact form business logic:

- Form submission validation
- Database persistence
- Email formatting and sanitization
- Error handling and logging

### **NewsletterService**

Manages newsletter subscriptions:

- Email validation and normalization
- Duplicate subscription handling
- Subscription status management
- Future: Unsubscribe functionality

## 🧪 **Testing**

### **Test Structure**

```
src/__tests__/
├── unit/
│   ├── controllers/     # Controller unit tests
│   ├── services/        # Service layer tests
│   └── middleware/      # Middleware tests
└── integration/         # API endpoint tests
```

### **Running Tests**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### **Test Database**

```bash
# Test database connection
npm run test:db

# Reset test database
npm run db:reset
```

## 📦 **Database Operations**

### **Prisma Commands**

```bash
# Generate Prisma client
npm run db:generate

# Create and apply migration
npm run db:migrate

# Reset database (⚠️ destructive)
npm run db:reset

# Open Prisma Studio
npm run db:studio
```

### **Migration Workflow**

1. Modify `prisma/schema.prisma`
2. Run `npm run db:migrate`
3. Provide migration name
4. Review generated SQL in `prisma/migrations/`

## 🚀 **Deployment**

### **Build Process**

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

### **Production Environment**

- Database connection pooling
- Environment-specific error handling
- Request logging and monitoring
- Security headers and rate limiting

### **Vercel Deployment**

The backend is configured for serverless deployment on Vercel:

- API routes in `/api` directory
- Environment variables in Vercel dashboard
- Automatic deployments from Git

## 📝 **Development Scripts**

| Command              | Description              |
| -------------------- | ------------------------ |
| `npm run dev`        | Start development server |
| `npm run dev:watch`  | Start with file watching |
| `npm run build`      | Build for production     |
| `npm start`          | Start production server  |
| `npm test`           | Run test suite           |
| `npm run db:migrate` | Run database migrations  |
| `npm run db:studio`  | Open Prisma Studio       |

## 🤝 **Contributing**

### **Code Style**

- TypeScript strict mode enabled
- ESLint and Prettier configured
- Conventional commit messages
- API-first development approach

### **Adding New Endpoints**

1. Define types in `shared/types/`
2. Create Zod validation schema
3. Implement service layer logic
4. Create controller methods
5. Add route definitions
6. Write comprehensive tests

## 📚 **Additional Resources**

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Zod Validation](https://zod.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🐛 **Troubleshooting**

### **Common Issues**

**Database Connection:**

```bash
# Check database URL format
echo $DATABASE_URL

# Test connection
npm run test:db
```

**Prisma Client:**

```bash
# Regenerate client if types are outdated
npm run db:generate
```

**Migration Errors:**

```bash
# Reset and recreate database
npm run db:reset
npm run db:migrate
```

---
