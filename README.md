# Horse Racing Game - Vue 2 + TypeScript

A Vue 2 horse racing game built with TypeScript, featuring horse generation, race scheduling, and animated races.

## Project setup
```bash
npm ci --legacy-peer-deps
```

### Compiles and hot-reloads for development
```bash
npm run serve
```

### Compiles and minifies for production
```bash
npm run build
```

### Run your unit tests
```bash
npm run test:unit
```

### Run unit tests with coverage
```bash
npm run test:unit:coverage
```

### Run E2E tests
```bash
# Start dev server first, then in another terminal:
npm run test:e2e

# Or use the convenience script:
./scripts/test-e2e.sh

# Interactive mode:
npm run test:e2e:open
```

### Run component tests
```bash
npm run test:component
npm run test:component:open
```

### Lint and fix files
```bash
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Testing

This project includes comprehensive testing:

- **Unit Tests**: Jest-based tests for Vuex store and utilities
- **E2E Tests**: Cypress tests for complete user workflows
- **Component Tests**: Cypress component tests for individual Vue components

See [cypress/README.md](cypress/README.md) for detailed E2E testing documentation.

## Unit Testing

### Test Structure
```
src/store/modules/horses/__tests__/
├── horses.spec.ts      # Vuex store module tests
└── utils.spec.ts       # Utility function tests
```

### Unit Test Coverage
Run tests with coverage to see how well your code is tested:

```bash
npm run test:unit:coverage
```

This will generate a coverage report showing:
- **Statements**: Percentage of code statements executed
- **Branches**: Percentage of conditional branches tested
- **Functions**: Percentage of functions called
- **Lines**: Percentage of lines executed

### Writing Unit Tests
- **Store Tests**: Test Vuex mutations, actions, and getters
- **Utility Tests**: Test pure functions with various inputs
- **Component Tests**: Test individual Vue components in isolation

### Test Commands
```bash
# Run all unit tests
npm run test:unit

# Run tests with coverage
npm run test:unit:coverage

# Run tests in watch mode (development)
npm run test:unit -- --watch

# Run specific test file
npm run test:unit -- horses.spec.ts
```

## Code Quality

### ESLint Configuration
This project uses ESLint with TypeScript and Vue.js rules for consistent code quality.

### Linting Commands
```bash
# Check for linting errors
npm run lint

# Auto-fix linting issues
npm run lint -- --fix

# Check specific files
npm run lint -- src/components/Header.vue

# Check with detailed output
npm run lint -- --format=stylish
```

### Linting Rules
- **TypeScript**: Strict type checking and best practices
- **Vue.js**: Vue 2 specific rules and component standards
- **Prettier**: Code formatting consistency
- **ES6+**: Modern JavaScript features and patterns

### Pre-commit Hooks
Consider setting up pre-commit hooks to automatically run:
- `npm run lint` - Check code quality
- `npm run test:unit` - Ensure tests pass
- `npm run build` - Verify build works

## Development Workflow

### Recommended Development Process
1. **Write Code** → Implement features in components/store
2. **Write Tests** → Add unit tests for new functionality
3. **Check Quality** → Run `npm run lint` to ensure code standards
4. **Verify Tests** → Run `npm run test:unit` to ensure tests pass
5. **Check Coverage** → Run `npm run test:unit:coverage` to maintain good coverage
6. **Commit** → Only commit when all checks pass

### Quality Gates
- **Linting**: All files must pass ESLint rules
- **Unit Tests**: All tests must pass with >80% coverage
- **Build**: Project must build successfully
- **E2E Tests**: Critical user flows must pass