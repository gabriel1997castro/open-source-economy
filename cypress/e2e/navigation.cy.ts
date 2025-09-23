describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home page', () => {
    cy.contains('Open Source Economy').should('be.visible')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should navigate to About page via navbar', () => {
    cy.get('nav').contains('About Us').click()
    cy.url().should('include', '/about')
    cy.get('nav').contains('About Us').should('have.class', 'text-primary-500')
  })

  it('should navigate to Solutions page via navbar', () => {
    cy.get('nav').contains('Solutions').click()
    cy.url().should('include', '/solutions')
    cy.get('nav').contains('Solutions').should('have.class', 'text-primary-500')
  })

  it('should navigate to Sign In page via navbar button', () => {
    cy.get('nav').contains('Sign In').click()
    cy.url().should('include', '/signin')
  })

  it('should handle contact navigation and scroll to contact section', () => {
    cy.get('nav').contains('Contact Us').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    // Wait a moment for the scroll to happen
    cy.wait(200)
    // Check if contact section exists and is visible
    cy.get('#contact').should('be.visible')
  })

  it('should work with mobile menu', () => {
    cy.viewport('iphone-x')
    cy.get('[aria-label="Open main menu"]').click()
    cy.get('nav').contains('About Us').should('be.visible').click()
    cy.url().should('include', '/about')
  })

  it('should highlight current page in navigation', () => {
    // Test home page highlight
    cy.visit('/')
    cy.get('nav').contains('Home').should('have.class', 'text-primary-500')
    
    // Test about page highlight
    cy.visit('/about')
    cy.get('nav').contains('About Us').should('have.class', 'text-primary-500')
    
    // Test solutions page highlight
    cy.visit('/solutions')
    cy.get('nav').contains('Solutions').should('have.class', 'text-primary-500')
  })

  it('should navigate back and forth between pages', () => {
    cy.visit('/')
    cy.get('nav').contains('About Us').click()
    cy.url().should('include', '/about')
    
    cy.go('back')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    
    cy.go('forward')
    cy.url().should('include', '/about')
  })
})