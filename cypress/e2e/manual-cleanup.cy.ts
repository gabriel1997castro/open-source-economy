// Manual cleanup script for Cypress test data
// Run this script to manually clean up any leftover test data
// Usage: npx cypress run --spec "cypress/e2e/manual-cleanup.cy.ts"

describe("Manual Cleanup", () => {
  it("should clean up all Cypress test data", () => {
    cy.log("Starting manual cleanup of all Cypress test data...");

    // Clean up all known test emails using the new bulk endpoints
    cy.cleanupAllCypressData();

    cy.log("Manual cleanup completed successfully!");
  });

  it("should verify cleanup was successful", () => {
    const baseUrl =
      Cypress.env("BACKEND_API_URL") || "http://localhost:3001/api";

    cy.log("Verifying that test data has been cleaned up...");

    // Check that no test emails remain in contacts
    cy.request({
      method: "GET",
      url: `${baseUrl}/contact`,
      failOnStatusCode: false,
    }).then((response) => {
      if (
        response.status === 200 &&
        response.body.data &&
        response.body.data.submissions
      ) {
        const testContacts = response.body.data.submissions.filter(
          (contact: any) => contact.email.includes("cypress.")
        );
        cy.log(`Found ${testContacts.length} remaining test contacts`);
        expect(testContacts).to.have.length(
          0,
          "No test contacts should remain"
        );
      }
    });

    // Check that no test emails remain in newsletter
    cy.request({
      method: "GET",
      url: `${baseUrl}/newsletter`,
      failOnStatusCode: false,
    }).then((response) => {
      if (
        response.status === 200 &&
        response.body.data &&
        response.body.data.subscriptions
      ) {
        const testSubscriptions = response.body.data.subscriptions.filter(
          (sub: any) => sub.email.includes("cypress.")
        );
        cy.log(
          `Found ${testSubscriptions.length} remaining test subscriptions`
        );
        expect(testSubscriptions).to.have.length(
          0,
          "No test subscriptions should remain"
        );
      }
    });

    cy.log("Verification completed successfully!");
  });

  it("should clean up specific test data if bulk cleanup fails", () => {
    const specificTestEmails = [
      "cypress.test@example.com",
      "cypress.linkedin@example.com",
      "cypress.newsletter@example.com",
      "cypress.duplicate@example.com",
      "cypress.ui@example.com",
      "cypress.newsletter.ui@example.com",
    ];

    cy.log("Performing targeted cleanup of specific test emails...");
    cy.cleanupTestData(specificTestEmails);
    cy.log("Targeted cleanup completed!");
  });
});
