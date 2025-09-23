// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
      
      /**
       * Custom command to test API endpoint directly
       * @example cy.testApiEndpoint('POST', '/contact', { name: 'Test', email: 'test@example.com' })
       */
      testApiEndpoint(method: string, endpoint: string, body?: any): Chainable<Response>
    }
  }
}

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add('testApiEndpoint', (method: string, endpoint: string, body?: any) => {
  const baseUrl = Cypress.env('BACKEND_API_URL') || 'http://localhost:3000/api'
  
  return cy.request({
    method,
    url: `${baseUrl}${endpoint}`,
    body,
    failOnStatusCode: false
  })
})

export {}