/**
 * Jest Setup File for SpeedyMeds App
 *
 * This file is automatically run by Jest before executing the test suite
 * (as configured potentially in `jest.config.js` or `package.json` via `setupFilesAfterEnv`).
 * It's used for global test setup tasks.
 *
 * Primary Purpose Here:
 *   - Global test setup tasks.
 *   - Previously, this imported `@testing-library/jest-native/extend-expect`, but
 *     those matchers are now built into `@testing-library/react-native` v12.4+
 *     and this separate import is no longer needed (and the package is deprecated).
 *
 * Other Potential Uses (Add as needed):
 *   - Global mocks for native modules or external libraries (e.g., mocking `AsyncStorage`).
 *   - Setting up mock implementations for APIs (though often done per-test or per-suite).
 *   - Configuring test utilities.
 *
 * @see https://jestjs.io/docs/configuration#setupfilesafterenv-array
 * @see https://callstack.github.io/react-native-testing-library/docs/migration/jest-matchers - RNTL Jest Matchers Migration Guide
 * @see docs/setup/testing-config.md - Project's testing setup documentation.
 */

// No longer needed as of @testing-library/react-native v12.4+
// import "@testing-library/jest-native/extend-expect";

// --- Mocks ---

// Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => {
  // Return null for all icons to avoid font loading issues in tests
  const MockIcon = () => null;
  return {
    MaterialCommunityIcons: MockIcon,
    Ionicons: MockIcon, // Add other icon sets used if necessary
    // Add other icon sets as needed (e.g., FontAwesome, Entypo)
    createIconSet: () => MockIcon, // Mock the factory function too
    createIconSetFromIcoMoon: () => MockIcon,
    createIconSetFromFontello: () => MockIcon,
  };
});

// --- Optional: Add other global setup below ---

// Example: Mocking a native module like AsyncStorage (if needed globally)
// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// );

// Example: Mocking react-native-gesture-handler (often needed)
// require('react-native-gesture-handler/jestSetup');

// Example: Silence specific console warnings/errors during tests (use with caution)
// jest.spyOn(console, 'warn').mockImplementation(() => {});

console.log("Jest setup file executed.");
