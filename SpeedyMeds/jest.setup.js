/**
 * Jest Setup File for SpeedyMeds App
 *
 * This file is automatically run by Jest before executing the test suite
 * (as configured potentially in `jest.config.js` or `package.json` via `setupFilesAfterEnv`).
 * It's used for global test setup tasks.
 *
 * Primary Purpose Here:
 *   - Import and extend Jest's `expect` with React Native-specific matchers
 *     provided by `@testing-library/jest-native`. This gives us useful assertions
 *     like `toBeVisible()`, `toBeDisabled()`, `toHaveStyle()`, etc., making tests
 *     more readable and expressive for React Native components.
 *
 * Other Potential Uses (Add as needed):
 *   - Global mocks for native modules or external libraries (e.g., mocking `AsyncStorage`).
 *   - Setting up mock implementations for APIs (though often done per-test or per-suite).
 *   - Configuring test utilities.
 *
 * @see https://jestjs.io/docs/configuration#setupfilesafterenv-array
 * @see https://github.com/testing-library/jest-native#usage
 * @see docs/setup/testing-config.md - Project's testing setup documentation.
 */

// Import the jest-native matchers to extend Jest's `expect`
// eslint-disable-next-line import/no-unresolved -- ESLint struggles with this path, but it's correct for Jest
import "@testing-library/jest-native/extend-expect";

// --- Optional: Add other global setup below ---

// Example: Mocking a native module like AsyncStorage (if needed globally)
// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// );

// Example: Mocking react-native-gesture-handler (often needed)
// require('react-native-gesture-handler/jestSetup');

// Example: Silence specific console warnings/errors during tests (use with caution)
// jest.spyOn(console, 'warn').mockImplementation(() => {});

console.log("Jest setup file executed: jest-native matchers extended.");
