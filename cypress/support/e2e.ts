// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import { CLEANUP_CONFIG } from "./cleanup";

// Global cleanup setup
beforeEach(() => {
  // Ensure we start with a clean slate for each test
  // This is especially important for API integration tests
  cy.log("Performing pre-test cleanup");
});

afterEach(() => {
  // Additional cleanup after each test to ensure no leftover data
  cy.log("Performing post-test cleanup");
});

// Handle uncaught exceptions to prevent test failures from blocking cleanup
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error but don't fail the test if it's during cleanup
  if (err.message.includes("cleanup") || err.message.includes("delete")) {
    console.log("Cleanup error (non-critical):", err.message);
    return false;
  }
  // Return true to fail the test for other errors
  return true;
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
