#!/bin/bash

# Start the development server in the background
echo "Starting development server..."
npm run serve &
DEV_SERVER_PID=$!

# Wait for the server to be ready
echo "Waiting for server to be ready..."
sleep 10

# Run E2E tests
echo "Running E2E tests..."
npm run test:e2e

# Store the exit code
TEST_EXIT_CODE=$?

# Stop the development server
echo "Stopping development server..."
kill $DEV_SERVER_PID

# Exit with the test exit code
exit $TEST_EXIT_CODE
