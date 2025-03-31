module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.js'],
  // Optional: Add moduleNameMapper if needed for path aliases later
  // moduleNameMapper: {
  //   '^@components/(.*)$': '<rootDir>/src/components/$1',
  //   '^@screens/(.*)$': '<rootDir>/src/screens/$1',
  //   // Add other aliases as needed
  // },
  // Optional: Configure code coverage
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   '**/*.{ts,tsx}',
  //   '!**/node_modules/**',
  //   '!**/__tests__/**',
  //   '!*.config.js',
  //   '!App.tsx', // Often exclude the root App file unless specifically testing it
  // ],
  // coverageReporters: ['json', 'lcov', 'text', 'clover'],
};