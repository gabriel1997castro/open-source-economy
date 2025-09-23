# Cypress E2E Testing Guide

## Overview

This project includes comprehensive end-to-end tests using Cypress to test both the frontend functionality and real API integration. The tests are designed to work with the actual backend API rather than mocked services.

## Test Structure

### Test Files
- `cypress/e2e/navigation.cy.ts` - Tests for React Router navigation functionality
- `cypress/e2e/footer.cy.ts` - Tests for footer components and links
- `cypress/e2e/api-integration.cy.ts` - Tests for API endpoints and form integrations

### Test Coverage

#### Navigation Tests
- Page navigation using React Router
- Navbar highlighting of current page
- Mobile menu functionality
- Contact section scrolling behavior
- Browser back/forward navigation

#### Footer Tests  
- Footer visibility and content
- Internal vs external link behavior
- Social media links
- Newsletter subscription form
- Responsive design
- React Router integration for internal links

#### API Integration Tests
- Contact form API (`POST /api/contact`)
  - Valid form submission
  - Form validation (email, required fields, message length)
  - LinkedIn profile inclusion
- Newsletter API (`POST /api/newsletter`)
  - Valid email subscription
  - Duplicate subscription handling
  - Email validation
- Health check endpoint (`GET /api/health`)
- UI form submission with API verification

## Setup and Configuration

### Prerequisites
1. Frontend development server running on `http://localhost:5173`
2. Backend API server running on `http://localhost:3001`
3. Database properly configured and migrations run

### Installation
Cypress is already installed in the project. To run tests:

```bash
# Run all tests in headless mode
npm run test:e2e

# Open Cypress Test Runner (interactive mode)
npm run test:e2e:open

# Run tests in headless mode explicitly
npm run test:e2e:headless
```

### Configuration
The Cypress configuration is in `cypress.config.ts`:
- Base URL: `http://localhost:5173` (frontend dev server)
- Backend API URL: `http://localhost:3000/api` (configurable via env variable)
- Viewport: 1280x720 (also tests responsive breakpoints)

## Running Tests with Real API

### Step 1: Start the Backend
```bash
# In the backend directory
cd backend
npm run dev
```

### Step 2: Start the Frontend
```bash
# In the frontend directory  
cd frontend
npm run dev
```

### Step 3: Run Cypress Tests
```bash
# In the project root
npm run test:e2e
```

## Test Features

### Custom Commands
- `cy.dataCy(value)` - Select elements by data-cy attribute
- `cy.testApiEndpoint(method, endpoint, body)` - Test API endpoints directly

### API Testing Strategy
The tests use real API calls to ensure:
- Actual form validation works correctly
- Database operations succeed
- Error handling is properly implemented
- API responses match expected format

### Responsive Testing
Tests include viewport changes to ensure functionality across:
- Desktop (1280x720)
- Tablet (iPad)
- Mobile (iPhone X)

## Expected Backend API Endpoints

The tests expect these endpoints to be available:

1. `POST /api/contact` - Contact form submission
   - Accepts: name, email, message, linkedin (optional)
   - Returns: { success: boolean, message: string, data?: object }

2. `POST /api/newsletter` - Newsletter subscription  
   - Accepts: email
   - Returns: { success: boolean, message: string }

3. `GET /api/health` - Health check
   - Returns: { status: "OK" }

## Troubleshooting

### Backend Issues
If the backend is not running or has build issues:
1. Check that all dependencies are installed
2. Ensure database is running and configured
3. Run database migrations if needed
4. Check backend README for specific setup instructions

### Frontend Issues
If the frontend is not running:
1. Ensure all dependencies are installed (`npm install`)
2. Check that the dev server starts without errors (`npm run dev`)

### Test Failures
Common causes and solutions:
1. **Server not running** - Ensure both frontend and backend are running
2. **API endpoints not available** - Check backend implementation
3. **Network timeouts** - Increase timeout values in Cypress config
4. **Element not found** - Check if UI components have expected structure

## Contributing

When adding new features:
1. Add corresponding Cypress tests
2. Use data-cy attributes for reliable element selection  
3. Test both success and error scenarios
4. Include responsive design testing where relevant
5. Verify API integration with real endpoints

## Notes

- Tests use real API calls, not mocks, for comprehensive integration testing
- Footer has been moved to `/frontend/src/components/layout/footer/`
- Navigation uses React Router Dom v7 (React 19 compatible)
- All internal links use React Router Link component
- External links maintain proper target="_blank" behavior