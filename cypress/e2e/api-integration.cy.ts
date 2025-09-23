describe("API Integration Tests", () => {
  // Cleanup before and after all tests
  before(() => {
    cy.log("Pre-test cleanup: Removing any existing test data");
    cy.cleanupAllCypressData();
  });

  after(() => {
    cy.log("Post-test cleanup: Removing test data created during tests");
    cy.cleanupAllCypressData();
  });

  describe("Contact Form API", () => {
    it("should successfully submit contact form with valid data", () => {
      const contactData = {
        name: "Cypress Test User",
        email: "cypress.test@example.com",
        message: "This is a test message from Cypress automated testing.",
      };

      cy.testApiEndpoint("POST", "/contact", contactData).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.include("Thank you");
      });
    });

    it("should submit contact form with LinkedIn profile", () => {
      const contactData = {
        name: "Cypress LinkedIn User",
        email: "cypress.linkedin@example.com",
        linkedin: "https://linkedin.com/in/test-user",
        message: "Testing contact form with LinkedIn profile included.",
      };

      cy.testApiEndpoint("POST", "/contact", contactData).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("success", true);
      });
    });

    it("should reject contact form with invalid email", () => {
      const contactData = {
        name: "Test User",
        email: "invalid-email",
        message: "This should fail due to invalid email.",
      };

      cy.testApiEndpoint("POST", "/contact", contactData).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("success", false);
        expect(response.body).to.have.property("error");
      });
    });

    it("should reject contact form with missing required fields", () => {
      const contactData = {
        name: "Test User",
        // Missing email and message
      };

      cy.testApiEndpoint("POST", "/contact", contactData).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("success", false);
      });
    });

    it("should reject contact form with message too short", () => {
      const contactData = {
        name: "Test User",
        email: "test@example.com",
        message: "Short", // Too short according to validation rules
      };

      cy.testApiEndpoint("POST", "/contact", contactData).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("success", false);
      });
    });
  });

  describe("Newsletter API", () => {
    // afterEach(() => {
    //   // Clean up test data after each newsletter test
    //   cy.cleanupTestData([
    //     "cypress.newsletter@example.com",
    //     "cypress.duplicate@example.com",
    //     "invalid-email-format",
    //   ]);
    // });

    it("should successfully subscribe to newsletter with valid email", () => {
      const newsletterData = {
        email: "cypress.newsletter@example.com",
      };

      cy.testApiEndpoint("POST", "/newsletter", newsletterData).then(
        (response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property("success", true);
          expect(response.body).to.have.property("message");
          expect(response.body.message).to.include("Thank you for subscribing");
        }
      );
    });

    it("should handle duplicate newsletter subscription gracefully", () => {
      const newsletterData = {
        email: "cypress.duplicate@example.com",
      };

      // First subscription
      cy.testApiEndpoint("POST", "/newsletter", newsletterData).then(
        (response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property("success", true);
        }
      );

      // Second subscription (duplicate)
      cy.testApiEndpoint("POST", "/newsletter", newsletterData).then(
        (response) => {
          // Should either succeed with a message about already subscribed
          // or return a specific status for duplicates
          expect([200, 409]).to.include(response.status);
          expect(response.body).to.have.property("success");
        }
      );
    });

    it("should reject newsletter subscription with invalid email", () => {
      const newsletterData = {
        email: "invalid-email-format",
      };

      cy.testApiEndpoint("POST", "/newsletter", newsletterData).then(
        (response) => {
          expect(response.status).to.eq(400);
          expect(response.body).to.have.property("success", false);
        }
      );
    });

    it("should reject newsletter subscription with missing email", () => {
      cy.testApiEndpoint("POST", "/newsletter", {}).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("success", false);
      });
    });
  });

  describe("Form Integration Tests", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    // afterEach(() => {
    //   // Clean up UI test data
    //   cy.cleanupTestData([
    //     "cypress.ui@example.com",
    //     "cypress.newsletter.ui@example.com",
    //   ]);
    // });

    it("should submit contact form through UI and verify API call", () => {
      // Scroll to contact section
      cy.get("#contact").scrollIntoView();

      // Fill out the form
      cy.get("#contact").within(() => {
        cy.get('input[name="fullName"]').type("Cypress UI Test");
        cy.get('input[name="email"]').type("cypress.ui@example.com");
        cy.get('textarea[name="message"]').type(
          "This is a test message submitted through the UI."
        );

        // Intercept the API call
        cy.intercept("POST", "**/api/contact").as("contactSubmit");

        cy.get('button[type="submit"]').click();

        // Wait for API call and verify
        cy.wait("@contactSubmit").then((interception) => {
          expect(interception.response?.statusCode).to.eq(201);
          expect(interception.response?.body).to.have.property("success", true);
        });

        // Check for success message in UI
        cy.contains("Thank you").should("be.visible");
      });
    });

    it("should submit newsletter form through UI and verify API call", () => {
      // Scroll to footer where newsletter form is located
      cy.get("footer").scrollIntoView();

      cy.get("footer").within(() => {
        // Intercept the API call
        cy.intercept("POST", "**/api/newsletter").as("newsletterSubmit");

        cy.get('input[type="email"]').type("cypress.newsletter.ui@example.com");
        cy.contains("Subscribe").click();

        // Wait for API call and verify
        cy.wait("@newsletterSubmit").then((interception) => {
          expect(interception.response?.statusCode).to.eq(201);
          expect(interception.response?.body).to.have.property("success", true);
        });

        // Check for success message in UI
        cy.contains("subscribed", { matchCase: false }).should("be.visible");
      });
    });
  });
});
