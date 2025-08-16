import Header from '../../src/components/Header.vue'

describe('Header Component', () => {
  beforeEach(() => {
    cy.mount(Header, {
      props: {
        disableGenerateHorsesBtn: false,
        disableGenerateScheduleBtn: true,
        showGenerateScheduleBtn: false,
        onGenerateHorsesClick: cy.stub().as('generateHorsesClick'),
        onGenerateScheduleClick: cy.stub().as('generateScheduleClick'),
      },
    })
  })

  it('should render generate horses button', () => {
    cy.getByTestId('horse-racing-generate-horses-btn').should('be.visible')
    cy.getByTestId('horse-racing-generate-horses-btn').should('contain.text', 'Generate Horses')
  })

  it('should call onGenerateHorsesClick when generate horses button is clicked', () => {
    cy.getByTestId('horse-racing-generate-horses-btn').click()
    cy.get('@generateHorsesClick').should('have.been.called')
  })

  it('should not show generate schedule button when showGenerateScheduleBtn is false', () => {
    cy.getByTestId('horse-racing-generate-schedule-btn').should('not.exist')
  })

  it('should show generate schedule button when showGenerateScheduleBtn is true', () => {
    cy.mount(Header, {
      props: {
        disableGenerateHorsesBtn: false,
        disableGenerateScheduleBtn: false,
        showGenerateScheduleBtn: true,
        onGenerateHorsesClick: cy.stub().as('generateHorsesClick'),
        onGenerateScheduleClick: cy.stub().as('generateScheduleClick'),
      },
    })
    
    cy.getByTestId('horse-racing-generate-schedule-btn').should('be.visible')
    cy.getByTestId('horse-racing-generate-schedule-btn').should('contain.text', 'Generate Schedule')
  })

  it('should disable generate horses button when disableGenerateHorsesBtn is true', () => {
    cy.mount(Header, {
      props: {
        disableGenerateHorsesBtn: true,
        disableGenerateScheduleBtn: true,
        showGenerateScheduleBtn: false,
        onGenerateHorsesClick: cy.stub().as('generateHorsesClick'),
        onGenerateScheduleClick: cy.stub().as('generateScheduleClick'),
      },
    })
    
    cy.getByTestId('horse-racing-generate-horses-btn').should('be.disabled')
  })

  it('should disable generate schedule button when disableGenerateScheduleBtn is true', () => {
    cy.mount(Header, {
      props: {
        disableGenerateHorsesBtn: false,
        disableGenerateScheduleBtn: true,
        showGenerateScheduleBtn: true,
        onGenerateHorsesClick: cy.stub().as('generateHorsesClick'),
        onGenerateScheduleClick: cy.stub().as('generateScheduleClick'),
      },
    })
    
    cy.getByTestId('horse-racing-generate-schedule-btn').should('be.disabled')
  })
})
