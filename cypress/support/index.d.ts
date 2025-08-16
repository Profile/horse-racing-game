/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to wait for Vue to be ready
     * @example cy.waitForVue()
     */
    waitForVue(): Chainable<Element>

    /**
     * Custom command to get element by test ID
     * @example cy.getByTestId('horse-racing-generate-horses-btn')
     */
    getByTestId(testId: string): Chainable<Element>

    /**
     * Custom command to wait for race animation to complete
     * @example cy.waitForRaceComplete()
     */
    waitForRaceComplete(): Chainable<Element>

    /**
     * Custom command to wait for all rounds to complete (final round)
     * @example cy.waitForAllRoundsComplete()
     */
    waitForAllRoundsComplete(): Chainable<Element>

    /**
     * Custom command to generate horses
     * @example cy.generateHorses()
     */
    generateHorses(): Chainable<Element>

    /**
     * Custom command to generate race schedule
     * @example cy.generateRaceSchedule()
     */
    generateRaceSchedule(): Chainable<Element>

    /**
     * Custom command to start a race
     * @example cy.startRace()
     */
    startRace(): Chainable<Element>

    /**
     * Custom command to wait for horses to be generated
     * @example cy.waitForHorsesGenerated()
     */
    waitForHorsesGenerated(): Chainable<Element>

    /**
     * Custom command to wait for race schedule to be generated
     * @example cy.waitForRaceScheduleGenerated()
     */
    waitForRaceScheduleGenerated(): Chainable<Element>
  }
}
