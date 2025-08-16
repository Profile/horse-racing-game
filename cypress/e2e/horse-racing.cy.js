describe('Horse Racing Game E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForVue()
  })

  it('should display the main game interface', () => {
    cy.getByTestId('horse-racing-generate-horses-btn').should('be.visible')
    cy.getByTestId('horse-racing-generate-schedule-btn').should('not.exist')
    cy.getByTestId('horse-racing-available-horses-area-div').should('be.visible')
    cy.getByTestId('horse-racing-race-area-div').should('not.exist')
  })

  it('should generate horses when generate horses button is clicked', () => {
    cy.get('[data-test-id*="horse-racing-all-horses-horse-"]').should('have.length', 0)
    
    cy.generateHorses()
    
    cy.waitForHorsesGenerated()
    
    cy.getByTestId('horse-racing-generate-schedule-btn').should('not.be.disabled')
  })

  it('should generate race schedule when generate schedule button is clicked', () => {
    cy.generateHorses()
    cy.waitForHorsesGenerated()
    
    cy.generateRaceSchedule()
    
    cy.waitForRaceScheduleGenerated()
  })

  it('should start and complete a race', () => {
    cy.generateHorses()
    cy.waitForHorsesGenerated()
    cy.generateRaceSchedule()
    cy.waitForRaceScheduleGenerated()
    
    cy.startRace()
    
    cy.waitForRaceComplete()
    
    cy.getByTestId('horse-racing-race-results-div').should('be.visible')
  })

  it('should disable buttons during race animation', () => {
    cy.generateHorses()
    cy.waitForHorsesGenerated()
    cy.generateRaceSchedule()
    cy.waitForRaceScheduleGenerated()
    
    cy.startRace()
    
    cy.getByTestId('horse-racing-generate-horses-btn').should('be.disabled')
    cy.getByTestId('horse-racing-generate-schedule-btn').should('be.disabled')
    
    cy.waitForRaceComplete()
    
    cy.getByTestId('horse-racing-generate-horses-btn').should('not.be.disabled')
    cy.getByTestId('horse-racing-generate-schedule-btn').should('not.be.disabled')
  })

  it('should display horse information correctly', () => {
    cy.generateHorses()
    cy.waitForHorsesGenerated()
    
    cy.get('[data-test-id*="horse-racing-all-horses-horse-"]').first().within(() => {
      cy.get('[data-test-id*="horse-racing-all-horses-horse-name-"]').should('be.visible')
      cy.get('[data-test-id*="horse-racing-all-horses-horse-condition-"]').should('be.visible')
    })
  })

  it('should handle race reset correctly', () => {
    cy.generateHorses()
    cy.waitForHorsesGenerated()
    cy.generateRaceSchedule()
    cy.waitForRaceScheduleGenerated()
    cy.startRace()
    cy.waitForRaceComplete()
    
    cy.generateRaceSchedule()
    cy.waitForRaceScheduleGenerated()
    
    cy.getByTestId('horse-racing-race-area-div').should('be.visible')
    cy.get('[data-test-id*="horse-racing-participants-horse-area-item-"]').should('have.length.greaterThan', 0)
  })

  it('should complete all 6 rounds and show final results', () => {
    cy.generateHorses()
    cy.waitForHorsesGenerated()
    cy.generateRaceSchedule()
    cy.waitForRaceScheduleGenerated()
    
    for (let round = 1; round <= 6; round++) {
      if (round === 1) {
        cy.startRace()
      } else {
        cy.getByTestId('horse-racing-race-area-start-next-round-btn').click()
      }
      
      if (round < 6) {
        cy.waitForRaceComplete()
      } else {
        cy.waitForAllRoundsComplete()
      }
    }
    
    cy.getByTestId('horse-racing-race-results-div').should('be.visible')
    cy.contains('Round 6 of 6').should('be.visible')
  })
})
