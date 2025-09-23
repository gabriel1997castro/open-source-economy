# Testing Documentation

## 🧪 Testing Strategy

This project uses **Cypress for end-to-end testing exclusively**. We don't use unit, integration, or component tests. Instead, we rely on comprehensive E2E tests that validate the entire application workflow from user interface to database.

## 🎯 Why Cypress-Only?

### Benefits of E2E-First Testing

1. **Real User Workflows**: Tests exactly what users experience
2. **Full Stack Integration**: Validates frontend, backend, and database together
3. **Confidence**: One passing E2E test provides more confidence than many unit tests
4. **Maintenance**: Fewer, more meaningful tests to maintain
5. **Business Value**: Tests actual user stories and business requirements

### What We Test

- ✅ Complete user workflows (contact form submission, newsletter signup)
- ✅ Frontend-backend API integration
- ✅ Database operations and data persistence
- ✅ Form validation and error handling
- ✅ Mobile responsive behavior
- ✅ Navigation and user interface interactions

### What We Don't Test

- ❌ Individual component unit tests
- ❌ Service layer unit tests
- ❌ Utility function tests
- ❌ Mocked API calls

## 🚀 Running Tests

### Local Development

```bash
# Open Cypress interactive test runner
npm run test:e2e:open

# Run tests in headless mode
npm run test:e2e

# Run with full browser output
npm run test:e2e:headless
```

### Prerequisites for Local Testing

1. **Start the development servers**:

   ```bash
   npm run dev  # Starts both backend and frontend
   ```

2. **Ensure test database is set up**:
   ```bash
   cd backend
   npx prisma migrate dev
   ```

## 🏗️ Test Structure

### Test Files

```
cypress/
├── e2e/
│   ├── api-integration.cy.ts    # Contact form and newsletter API tests
│   └── navigation.cy.ts         # Navigation and mobile menu tests
├── support/
│   ├── commands.ts              # Custom Cypress commands
│   └── e2e.ts                   # Global test configuration
└── cypress.config.ts            # Cypress configuration
```

### Test Categories

#### 1. API Integration Tests (`api-integration.cy.ts`)

Tests the core business functionality:

- **Contact Form Submission**

  - Valid form submission
  - Email validation
  - Required field validation
  - Success message display

- **Newsletter Subscription**
  - Valid email subscription
  - Duplicate email handling
  - Email format validation
  - Success confirmation

#### 2. Navigation Tests (`navigation.cy.ts`)

Tests user interface and navigation:

- **Desktop Navigation**

  - Header link functionality
  - Smooth scrolling behavior

- **Mobile Navigation**
  - Hamburger menu toggle
  - Mobile menu visibility
  - Responsive layout

## 🔧 Test Data Management

### Automatic Cleanup

All tests automatically clean up their data using dedicated cleanup endpoints:

```typescript
// Custom Cypress commands for cleanup
cy.cleanupTestContacts(); // Removes test contact submissions
cy.cleanupTestNewsletter(); // Removes test newsletter subscriptions
```

### Cleanup Endpoints

The backend provides these endpoints specifically for testing:

```
POST /api/contact/cleanup/test     # Remove all test contacts
POST /api/newsletter/cleanup/test  # Remove all test subscriptions
```

### Test Data Isolation

- Each test run uses unique test data (email addresses, names)
- Tests don't depend on existing database state
- Cleanup runs after each test to prevent pollution

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

Tests run automatically on every pull request via `.github/workflows/cypress.yml`:

1. **Environment Setup**

   - Ubuntu runner with Node.js 20
   - PostgreSQL test database
   - Install dependencies

2. **Application Startup**

   - Build shared package
   - Setup and migrate test database
   - Start backend server (port 3001)
   - Start frontend server (port 5173)

3. **Test Execution**

   - Run Cypress tests with Chrome browser
   - Wait for servers to be ready
   - Execute all test specs

4. **Artifact Collection**
   - Upload screenshots on failure
   - Upload videos for debugging
   - Clean up test data

### Pipeline Configuration

```yaml
# Key environment variables
CYPRESS_baseUrl: http://localhost:5173
CYPRESS_BACKEND_API_URL: http://localhost:3001/api
DATABASE_URL: postgresql://postgres:postgres@localhost:5432/open_source_economy_test
```

## 📝 Writing New Tests

### Best Practices

1. **Use Page Object Pattern**

   ```typescript
   // Good: Descriptive selectors
   cy.get('[data-testid="contact-form"]');

   // Avoid: Fragile selectors
   cy.get(".css-class-123");
   ```

2. **Test User Workflows**

   ```typescript
   it("should allow user to submit contact form", () => {
     cy.visit("/");
     cy.get('[data-testid="name-input"]').type("Test User");
     cy.get('[data-testid="email-input"]').type("test@example.com");
     cy.get('[data-testid="message-input"]').type("Test message");
     cy.get('[data-testid="submit-button"]').click();
     cy.contains("Thank you! Your message has been sent.");
   });
   ```

3. **Clean Up After Tests**
   ```typescript
   afterEach(() => {
     cy.cleanupTestContacts();
     cy.cleanupTestNewsletter();
   });
   ```

### Adding New Test Cases

1. **Create test file** in `cypress/e2e/`
2. **Add cleanup logic** for any data the test creates
3. **Use unique test data** to avoid conflicts
4. **Test the complete user journey**, not just individual functions

## 🔍 Debugging Tests

### Local Debugging

1. **Use Cypress GUI**: `npm run test:e2e:open`
2. **Browser DevTools**: Available in Cypress runner
3. **Screenshots**: Automatic on failure
4. **Time Travel**: Click on test steps to see DOM state

### CI Debugging

1. **Artifacts**: Download screenshots and videos from GitHub Actions
2. **Logs**: Check workflow logs for detailed error messages
3. **Reproduce Locally**: Run same test commands locally

### Common Issues

| Issue                    | Solution                                                       |
| ------------------------ | -------------------------------------------------------------- |
| Node.js version errors   | Ensure Node.js 20+ is installed (required for latest packages) |
| Package lock sync issues | Run `npm install` instead of `npm ci` to update lock file      |
| Test timeouts            | Increase wait times or check server startup                    |
| Element not found        | Use `data-testid` attributes, wait for elements                |
| API failures             | Check backend logs, verify database connection                 |
| Flaky tests              | Add proper waits, ensure cleanup runs                          |

## 📊 Test Coverage Philosophy

Instead of measuring code coverage percentage, we focus on:

1. **User Story Coverage**: Every user workflow is tested
2. **Error Path Coverage**: All validation and error cases are tested
3. **Integration Coverage**: All API endpoints are tested through UI
4. **Regression Coverage**: Bug fixes include corresponding tests

## 🎯 Goals and Metrics

### Success Metrics

- ✅ All tests pass on every PR
- ✅ Tests complete in under 5 minutes
- ✅ Zero test data pollution
- ✅ Clear failure messages and debugging info

### Quality Standards

- Tests should be **reliable** (not flaky)
- Tests should be **fast** (efficient execution)
- Tests should be **maintainable** (easy to update)
- Tests should be **meaningful** (test real user value)

## 🚨 Troubleshooting

### Common Commands

```bash
# Clear Cypress cache
npx cypress cache clear

# Run specific test file
npx cypress run --spec "cypress/e2e/api-integration.cy.ts"

# Debug mode with browser
npx cypress open --browser chrome

# Run with environment variables
CYPRESS_baseUrl=http://localhost:3000 npm run test:e2e
```

### Performance Tips

1. Use `cy.intercept()` to stub external APIs
2. Minimize database operations in tests
3. Use `cy.session()` for authentication flows
4. Run tests in parallel when possible

---

This testing strategy ensures high confidence in our application while maintaining development velocity and code quality.
