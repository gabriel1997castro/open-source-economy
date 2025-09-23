// Cypress cleanup utilities
// This file contains utilities for cleaning up test data

export const TEST_EMAIL_PATTERNS = {
  // All emails used in Cypress tests should follow these patterns
  CYPRESS_PREFIX: "cypress.",
  TEST_DOMAINS: ["@example.com", "@test.com"],
} as const;

export const CYPRESS_TEST_EMAILS = [
  "cypress.test@example.com",
  "cypress.linkedin@example.com",
  "cypress.newsletter@example.com",
  "cypress.duplicate@example.com",
  "cypress.ui@example.com",
  "cypress.newsletter.ui@example.com",
] as const;

/**
 * Cleanup configuration for different test suites
 */
export const CLEANUP_CONFIG = {
  // Clean up after each test in these suites
  PER_TEST_CLEANUP: ["api-integration.cy.ts", "form-integration.cy.ts"],

  // Clean up after entire suite completion
  SUITE_CLEANUP: ["api-integration.cy.ts"],

  // Global cleanup (before/after all tests)
  GLOBAL_CLEANUP: true,
} as const;

/**
 * Helper function to generate unique test emails
 */
export function generateTestEmail(prefix: string = "test"): string {
  const timestamp = Date.now();
  return `cypress.${prefix}.${timestamp}@example.com`;
}

/**
 * Helper function to check if an email is a test email
 */
export function isTestEmail(email: string): boolean {
  return (
    email.includes("cypress.") &&
    (email.includes("@example.com") || email.includes("@test.com"))
  );
}
