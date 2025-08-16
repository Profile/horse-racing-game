# Cypress E2E Testing Setup

This project uses Cypress for End-to-End (E2E) testing and component testing.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Vue CLI development server running on port 8080

## Installation

Cypress is already installed as a dev dependency. If you need to reinstall:

```bash
npm install --save-dev cypress
```

## Available Scripts

### E2E Testing
- `npm run test:e2e` - Run all E2E tests in headless mode
- `npm run test:e2e:open` - Open Cypress Test Runner for E2E tests
- `npm run test:e2e:headed` - Run E2E tests in headed mode (with browser visible)

### Component Testing
- `npm run test:component` - Run all component tests in headless mode
- `npm run test:component:open` - Open Cypress Test Runner for component tests

## Test Structure

```
cypress/
├── e2e/                    # E2E test files
│   └── horse-racing.cy.js # Main game flow tests
├── component/              # Component test files
│   ├── Header.cy.js       # Header component tests
│   └── AvailableHorsesArea.cy.js # AvailableHorsesArea component tests
├── support/                # Support files
│   ├── e2e.js            # E2E support configuration
│   ├── component.js      # Component support configuration
│   └── commands.js       # Custom Cypress commands
└── fixtures/              # Test data files (if needed)
```

## Custom Commands

The following custom commands are available in E2E tests:

- `cy.generateHorses()` - Clicks the generate horses button
- `cy.generateRaceSchedule()` - Clicks the generate race schedule button
- `cy.startRace()` - Starts a race
- `cy.waitForHorsesGenerated()` - Waits for horses to be generated
- `cy.waitForRaceScheduleGenerated()` - Waits for race schedule to be generated
- `cy.waitForRaceComplete()` - Waits for race animation to complete
- `cy.getByTestId(testId)` - Gets element by test ID attribute

## Test Data Attributes

The application uses `data-test-id` attributes for reliable element selection. These are generated using the `getTestAttributes` utility function.

Example test IDs:
- `horse-racing-generate-horses-btn`
- `horse-racing-generate-schedule-btn`
- `horse-racing-available-horses`
- `horse-racing-race-area`

## Running Tests

### 1. Start the Development Server
```bash
npm run serve
```

### 2. Run E2E Tests
In a new terminal:
```bash
npm run test:e2e
```

### 3. Open Cypress Test Runner (Interactive Mode)
```bash
npm run test:e2e:open
```

## Writing Tests

### E2E Test Example
```javascript
it('should generate horses when generate horses button is clicked', () => {
  // Initially no horses should be available
  cy.get('[data-test-id*="horse-racing-horse-item"]').should('have.length', 0)
  
  // Click generate horses button
  cy.generateHorses()
  
  // Wait for horses to be generated and displayed
  cy.waitForHorsesGenerated()
})
```

### Component Test Example
```javascript
it('should render generate horses button', () => {
  cy.getByTestId('horse-racing-generate-horses-btn').should('be.visible')
  cy.getByTestId('horse-racing-generate-horses-btn').should('contain.text', 'Generate Horses')
})
```

## Best Practices

1. **Use test IDs**: Always use `data-test-id` attributes for element selection
2. **Wait for state changes**: Use custom commands to wait for async operations
3. **Test user flows**: Focus on testing complete user journeys
4. **Keep tests independent**: Each test should be able to run independently
5. **Use descriptive test names**: Test names should clearly describe what is being tested

## Troubleshooting

### Common Issues

1. **Tests fail with "element not found"**: Make sure the development server is running on port 8080
2. **Race conditions**: Use the custom wait commands for async operations
3. **Component mounting issues**: Ensure all required props are provided in component tests

### Debug Mode

Run tests with `--headed` flag to see the browser and debug visually:
```bash
npm run test:e2e:headed
```

## Configuration

The Cypress configuration is in `cypress.config.js`. Key settings:
- Base URL: `http://localhost:8080`
- Viewport: 1280x720
- Timeouts: 10 seconds for commands and requests
- Screenshots: Enabled on test failure
