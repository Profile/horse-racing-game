
import './commands'

Cypress.on('uncaught:exception', () => {
  return false
})

Cypress.Commands.add('waitForVue', () => {
  cy.get('[data-test-id]', { timeout: 10000 }).should('be.visible')
})


Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-test-id="${testId}"]`)
})

Cypress.Commands.add('waitForRaceComplete', () => {
  cy.get('[data-test-id="horse-racing-race-area-start-next-round-btn"], [data-test-id="horse-racing-race-results-div"]', { timeout: 15000 }).should('be.visible')
})

Cypress.Commands.add('waitForAllRoundsComplete', () => {
  cy.getByTestId('horse-racing-race-results-div').should('be.visible')
  cy.contains('Round 6 of 6').should('be.visible')
})
