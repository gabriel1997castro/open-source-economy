// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { CYPRESS_TEST_EMAILS } from "./cleanup";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to test API endpoint directly
       * @example cy.testApiEndpoint('POST', '/contact', { name: 'Test', email: 'test@example.com' })
       */
      testApiEndpoint(
        method: string,
        endpoint: string,
        body?: any
      ): Chainable<Response<any>>;

      /**
       * Custom command to cleanup test data by email patterns
       * @example cy.cleanupTestData(['cypress.test@example.com'])
       */
      cleanupTestData(emails?: string[]): Chainable<void>;

      /**
       * Custom command to cleanup all test data created by Cypress
       * @example cy.cleanupAllCypressData()
       */
      cleanupAllCypressData(): Chainable<void>;

      /**
       * Custom command to delete contact submission by email
       * @example cy.deleteContactByEmail('test@example.com')
       */
      deleteContactByEmail(email: string): Chainable<void>;

      /**
       * Custom command to delete newsletter subscription by email
       * @example cy.deleteNewsletterByEmail('test@example.com')
       */
      deleteNewsletterByEmail(email: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add(
  "testApiEndpoint",
  (method: string, endpoint: string, body?: any) => {
    const baseUrl =
      Cypress.env("BACKEND_API_URL") || "http://localhost:3001/api";

    return cy.request({
      method,
      url: `${baseUrl}${endpoint}`,
      body,
      failOnStatusCode: false,
    });
  }
);

// Improved cleanup commands for test data
Cypress.Commands.add("deleteContactByEmail", (email: string) => {
  const baseUrl = Cypress.env("BACKEND_API_URL") || "http://localhost:3001/api";

  cy.log(`Cleanup: Deleting contact data for ${email}`);

  // Use the new bulk cleanup endpoint
  cy.request({
    method: "POST",
    url: `${baseUrl}/contact/cleanup/emails`,
    body: { emails: [email] },
    failOnStatusCode: false,
    timeout: 10000,
  }).then((response) => {
    cy.log(
      `Contact cleanup result for ${email}: ${response.status} - Deleted: ${
        response.body?.data?.deletedCount || 0
      }`
    );
  });
});

Cypress.Commands.add("deleteNewsletterByEmail", (email: string) => {
  const baseUrl = Cypress.env("BACKEND_API_URL") || "http://localhost:3001/api";

  cy.log(`Cleanup: Deleting newsletter subscription for ${email}`);

  // Use the new bulk cleanup endpoint
  cy.request({
    method: "POST",
    url: `${baseUrl}/newsletter/cleanup/emails`,
    body: { emails: [email] },
    failOnStatusCode: false,
    timeout: 10000,
  }).then((response) => {
    cy.log(
      `Newsletter cleanup result for ${email}: ${response.status} - Deleted: ${
        response.body?.data?.deletedCount || 0
      }`
    );
  });
});

Cypress.Commands.add("cleanupTestData", (emails: string[] = []) => {
  const baseUrl = Cypress.env("BACKEND_API_URL") || "http://localhost:3001/api";

  if (emails.length === 0) {
    cy.log("Cleanup: No emails provided, using bulk test cleanup");

    // Clean up all test data at once
    cy.request({
      method: "POST",
      url: `${baseUrl}/contact/cleanup/test`,
      failOnStatusCode: false,
      timeout: 10000,
    }).then((response) => {
      cy.log(
        `Bulk contact cleanup: ${response.status} - Deleted: ${
          response.body?.data?.deletedCount || 0
        }`
      );
    });

    cy.request({
      method: "POST",
      url: `${baseUrl}/newsletter/cleanup/test`,
      failOnStatusCode: false,
      timeout: 10000,
    }).then((response) => {
      cy.log(
        `Bulk newsletter cleanup: ${response.status} - Deleted: ${
          response.body?.data?.deletedCount || 0
        }`
      );
    });
  } else {
    cy.log(`Cleanup: Processing ${emails.length} specific emails`);

    // Clean up specific emails in bulk
    cy.request({
      method: "POST",
      url: `${baseUrl}/contact/cleanup/emails`,
      body: { emails },
      failOnStatusCode: false,
      timeout: 10000,
    }).then((response) => {
      cy.log(
        `Contact cleanup: ${response.status} - Deleted: ${
          response.body?.data?.deletedCount || 0
        }`
      );
    });

    cy.request({
      method: "POST",
      url: `${baseUrl}/newsletter/cleanup/emails`,
      body: { emails },
      failOnStatusCode: false,
      timeout: 10000,
    }).then((response) => {
      cy.log(
        `Newsletter cleanup: ${response.status} - Deleted: ${
          response.body?.data?.deletedCount || 0
        }`
      );
    });
  }
});

Cypress.Commands.add("cleanupAllCypressData", () => {
  cy.log("Cleanup: Starting comprehensive Cypress data cleanup");

  // Use the bulk test cleanup (more efficient)
  cy.cleanupTestData();
});

export {};
