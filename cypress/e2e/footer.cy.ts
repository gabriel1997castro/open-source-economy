describe('Footer Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display footer with all sections', () => {
    cy.get('footer').should('be.visible')
    
    // Check main sections
    cy.get('footer').contains('Company').should('be.visible')
    cy.get('footer').contains('Resources').should('be.visible')
    
    // Check footer logo and description
    cy.get('footer').contains('Open Source Economy').should('be.visible')
    cy.get('footer').contains('non-profit organization').should('be.visible')
  })

  it('should have working company links', () => {
    cy.get('footer').within(() => {
      // Test internal links (these should use React Router)
      cy.contains('About Us').should('have.attr', 'href').and('not.include', 'http')
      cy.contains('Contact').should('have.attr', 'href').and('not.include', 'http')
      
      // Click on About Us link
      cy.contains('About Us').click()
    })
    
    cy.url().should('include', '/about')
  })

  it('should have working resource links', () => {
    cy.get('footer').within(() => {
      // These are likely external or placeholder links
      cy.contains('Documentation').should('be.visible')
      cy.contains('Blog').should('be.visible')
      cy.contains('Guides').should('be.visible')
      cy.contains('API Reference').should('be.visible')
      cy.contains('Support').should('be.visible')
    })
  })

  it('should display social media links', () => {
    cy.get('footer').within(() => {
      // Check that social links exist and are external
      cy.get('a[href*="linkedin.com"]').should('be.visible').and('have.attr', 'target', '_blank')
      cy.get('a[href*="x.com"]').should('be.visible').and('have.attr', 'target', '_blank')
      cy.get('a[href*="youtube.com"]').should('be.visible').and('have.attr', 'target', '_blank')
    })
  })

  it('should display newsletter subscription form', () => {
    cy.get('footer').within(() => {
      // Check for newsletter form elements
      cy.get('input[type="email"]').should('be.visible')
      cy.contains('Subscribe').should('be.visible')
    })
  })

  it('should have legal links in bottom footer', () => {
    cy.get('footer').within(() => {
      cy.contains('Terms Of Service').should('be.visible')
      cy.contains('Privacy Policy').should('be.visible')
      cy.contains('CHE-440.058.692').should('be.visible') // Swiss company number
    })
  })

  it('should be responsive', () => {
    // Test desktop view
    cy.viewport(1280, 720)
    cy.get('footer').should('be.visible')
    
    // Test tablet view
    cy.viewport('ipad-2')
    cy.get('footer').should('be.visible')
    
    // Test mobile view
    cy.viewport('iphone-x')
    cy.get('footer').should('be.visible')
  })

  it('should maintain proper link behavior for internal vs external links', () => {
    cy.get('footer').within(() => {
      // Internal links should not have target="_blank"
      cy.contains('About Us').should('not.have.attr', 'target', '_blank')
      cy.contains('Contact').should('not.have.attr', 'target', '_blank')
      
      // External links should have target="_blank"
      cy.get('a[href*="linkedin.com"]').should('have.attr', 'target', '_blank')
      cy.get('a[href*="x.com"]').should('have.attr', 'target', '_blank')
      cy.get('a[href*="youtube.com"]').should('have.attr', 'target', '_blank')
    })
  })
})