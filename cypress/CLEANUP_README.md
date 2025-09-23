# Cypress Test Data Cleanup System

This system automatically cleans up test data created during Cypress API integration tests to prevent database pollution and ensure test isolation.

## How It Works

### Automatic Cleanup

- **Before all tests**: Cleans up any leftover data from previous test runs
- **After each test**: Cleans up data created by individual tests
- **After all tests**: Final cleanup to ensure database is clean

### Cleanup Commands

#### `cy.cleanupAllCypressData()`

Cleans up all known Cypress test emails from both contact submissions and newsletter subscriptions.

#### `cy.cleanupTestData(emails: string[])`

Cleans up specific test emails provided in the array.

#### `cy.deleteContactByEmail(email: string)`

Deletes a contact submission by email address.

#### `cy.deleteNewsletterByEmail(email: string)`

Unsubscribes/deletes a newsletter subscription by email address.

## Test Email Patterns

All Cypress test emails follow the pattern: `cypress.{identifier}@example.com`

Currently tracked test emails:

- `cypress.test@example.com`
- `cypress.linkedin@example.com`
- `cypress.newsletter@example.com`
- `cypress.duplicate@example.com`
- `cypress.ui@example.com`
- `cypress.newsletter.ui@example.com`

## Usage in Tests

### Automatic (Recommended)

The cleanup system is automatically applied to API integration tests. No additional code needed.

### Manual

```typescript
// Clean up specific emails
cy.cleanupTestData(["test1@example.com", "test2@example.com"]);

// Clean up all Cypress test data
cy.cleanupAllCypressData();
```

## Manual Cleanup

If you need to manually clean the database:

```bash
# Run the manual cleanup script
npx cypress run --spec "cypress/e2e/manual-cleanup.cy.ts"
```

## Adding New Test Emails

When adding new test emails to your tests:

1. Use the pattern `cypress.{identifier}@example.com`
2. Add the email to `CYPRESS_TEST_EMAILS` in `cypress/support/cleanup.ts`
3. The cleanup system will automatically handle it

## Configuration

Cleanup behavior is configured in `cypress/support/cleanup.ts`:

- `CYPRESS_TEST_EMAILS`: List of all test emails to clean
- `CLEANUP_CONFIG`: Configuration for when cleanup should run
- Helper functions for generating and identifying test emails

## Error Handling

The cleanup system includes error handling to prevent cleanup failures from breaking tests:

- Cleanup requests use `failOnStatusCode: false`
- Uncaught cleanup exceptions are logged but don't fail tests
- Each cleanup operation is independent (one failure doesn't block others)
