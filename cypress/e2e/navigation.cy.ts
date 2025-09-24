describe("Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the home page", () => {
    cy.contains("Open Source Economy").should("be.visible");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should navigate to About page via navbar", () => {
    cy.get("nav").contains("About Us").click();
    cy.url().should("include", "/about");
    cy.get("nav").contains("About Us").should("have.class", "text-primary-500");
  });

  it("should navigate to Solutions page via navbar", () => {
    cy.get("nav").contains("Solutions").click();
    cy.url().should("include", "/solutions");
    cy.get("nav")
      .contains("Solutions")
      .should("have.class", "text-primary-500");
  });

  it("should navigate to Sign In page via navbar button", () => {
    cy.get("nav").contains("Sign In").click();
    cy.url().should("include", "/signin");
  });

  it("should handle contact navigation and scroll to contact section", () => {
    cy.get("nav").contains("Contact Us").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    // Wait a moment for the scroll to happen
    cy.wait(200);
    // Check if contact section exists and is visible
    cy.get("#contact").should("be.visible");
    // Contact Us should NOT be highlighted since it's an action, not a page
    cy.get("nav").contains("Contact Us").should("not.have.class", "text-primary-500");
    // Home should be highlighted since we're on the home page
    cy.get("nav").contains("Home").should("have.class", "text-primary-500");
  });

  it("should never highlight contact us link as it's an action, not a page", () => {
    // Visit different pages and ensure Contact Us is never highlighted
    const pages = ["/", "/about", "/solutions"];
    
    pages.forEach((page) => {
      cy.visit(page);
      cy.get("nav").contains("Contact Us").should("not.have.class", "text-primary-500");
    });
  });

  it("should work with mobile menu", () => {
    cy.viewport("iphone-x");
    cy.get('[aria-label="Open main menu"]').click();

    // Wait for mobile menu to appear and click the mobile navigation item
    // The mobile menu appears conditionally, so we wait for it and target it directly
    cy.get(".md\\:hidden").should("be.visible").contains("About Us").click();

    cy.url().should("include", "/about");

    // Reset viewport back to default desktop size
    cy.viewport(1280, 720);
  });

  it("should highlight current page in navigation", () => {
    // Test home page highlight
    cy.visit("/");
    cy.get("nav").contains("Home").should("have.class", "text-primary-500");
    // Contact Us should NOT be highlighted when on home page
    cy.get("nav").contains("Contact Us").should("not.have.class", "text-primary-500");

    // Test about page highlight
    cy.visit("/about");
    cy.get("nav").contains("About Us").should("have.class", "text-primary-500");
    // Other links should not be highlighted
    cy.get("nav").contains("Home").should("not.have.class", "text-primary-500");
    cy.get("nav").contains("Contact Us").should("not.have.class", "text-primary-500");

    // Test solutions page highlight
    cy.visit("/solutions");
    cy.get("nav")
      .contains("Solutions")
      .should("have.class", "text-primary-500");
    // Other links should not be highlighted
    cy.get("nav").contains("Home").should("not.have.class", "text-primary-500");
    cy.get("nav").contains("Contact Us").should("not.have.class", "text-primary-500");
  });

  it("should navigate back and forth between pages", () => {
    cy.visit("/");
    cy.get("nav").contains("About Us").click();
    cy.url().should("include", "/about");

    cy.go("back");
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    cy.go("forward");
    cy.url().should("include", "/about");
  });
});
