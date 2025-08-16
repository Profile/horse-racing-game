Cypress.Commands.add('generateHorses', () => {
  cy.getByTestId('horse-racing-generate-horses-btn').click()
  cy.getByTestId('horse-racing-available-horses-area-div').should('be.visible')
})

Cypress.Commands.add('generateRaceSchedule', () => {
  cy.getByTestId('horse-racing-generate-schedule-btn').click()
  cy.getByTestId('horse-racing-race-area-div').should('be.visible')
})

Cypress.Commands.add('startRace', () => {
  cy.getByTestId('horse-racing-race-area-start-race-btn').click()
  cy.getByTestId('horse-racing-race-area-start-race-btn').should('be.disabled')
})

Cypress.Commands.add('waitForHorsesGenerated', () => {
  cy.getByTestId('horse-racing-available-horses-area-div').should('be.visible')
  cy.get('[data-test-id*="horse-racing-all-horses-horse-"]').should('have.length.greaterThan', 0)
})

Cypress.Commands.add('waitForRaceScheduleGenerated', () => {
  cy.getByTestId('horse-racing-race-area-div').should('be.visible')
  cy.get('[data-test-id*="horse-racing-participants-horse-area-item-"]').should('have.length.greaterThan', 0)
})
