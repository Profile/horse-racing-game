import AvailableHorsesArea from '../../src/components/Race/components/AvailableHorsesArea.vue'

describe('AvailableHorsesArea Component', () => {
  const mockHorses = [
    {
      id: 1,
      name: 'Thunder Bolt',
      speed: 85,
      endurance: 90,
      color: '#FF0000'
    },
    {
      id: 2,
      name: 'Silver Arrow',
      speed: 92,
      endurance: 78,
      color: '#0000FF'
    }
  ]

  beforeEach(() => {
    cy.mount(AvailableHorsesArea, {
      props: {
        horses: mockHorses
      }
    })
  })

  it('should display all horses', () => {
    cy.get('[data-test-id*="horse-racing-all-horses-horse-"]').should('have.length', 2)
  })

  it('should display horse information correctly', () => {
    cy.get('[data-test-id*="horse-racing-all-horses-horse-"]').first().within(() => {
      cy.get('[data-test-id*="horse-racing-all-horses-horse-name-"]').should('contain.text', 'Thunder Bolt')
      cy.get('[data-test-id*="horse-racing-all-horses-horse-condition"]').should('contain.text', 'Condition:')
    })
  })

  it('should display empty state when no horses', () => {
    cy.mount(AvailableHorsesArea, {
      props: {
        horses: []
      }
    })
    
    cy.get('[data-test-id*="horse-racing-all-horses-horse-"]').should('have.length', 0)
    cy.getByTestId('horse-racing-available-horses-area-div').should('be.visible')
  })

  it('should display horses with different colors', () => {
    cy.get('[data-test-id*="horse-racing-all-horses-horse-"]').first().should('have.css', 'border-color', 'rgb(255, 0, 0)')
    cy.get('[data-test-id*="horse-racing-all-horses-horse-"]').last().should('have.css', 'border-color', 'rgb(0, 0, 255)')
  })
})
