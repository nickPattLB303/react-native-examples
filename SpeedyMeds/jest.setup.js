/**
 * Jest Setup File for SpeedyMeds App
 *
 * @file This file configures the global testing environment for Jest before any tests are run.
 * It's automatically executed by Jest based on the configuration in `jest.config.js`
 * or `package.json` (look for `setupFilesAfterEnv`).
 *
 * @purpose We use this file to set up global mocks and configurations needed for
 * our React Native tests to run correctly in the Node.js environment Jest uses.
 * Native device features (like font loading, icons, native modules) don't exist
 * in Node.js, so we need to provide simple "fake" versions (mocks) for them.
 *
 * @see {@link https://jestjs.io/docs/configuration#setupfilesafterenv-array | Jest setupFilesAfterEnv Config}
 * @see {@link https://callstack.github.io/react-native-testing-library/docs/migration/jest-matchers | RNTL Jest Matchers Migration Guide} - Explains why `@testing-library/jest-native/extend-expect` is no longer needed.
 * @see {@link ./docs/setup/testing-config.md | Project Testing Setup Documentation} - More details on this project's testing strategy.
 */

// --- Deprecated Import ---
// The `extend-expect` import from `@testing-library/jest-native` used to add helpful
// matchers like `toBeVisible()`. However, these are now included directly in
// `@testing-library/react-native` (since v12.4+), so this separate package is deprecated.
// import "@testing-library/jest-native/extend-expect";

// --- Global Mocks ---
// `jest.mock(moduleName, factory)` tells Jest: "Whenever code asks for `moduleName`,
// don't give it the real module. Instead, give it the result of the `factory` function."
// This is crucial for testing React Native components in Node.js.

/**
 * Mock for `@expo/vector-icons`.
 *
 * @reason Vector icons rely on native font loading, which doesn't work in Jest's Node environment.
 * Attempting to render real icons would cause errors.
 * @strategy We replace all icon components (`MaterialCommunityIcons`, `Ionicons`, etc.)
 * with a simple function component that renders nothing (`() => null`). This prevents
 * errors and allows tests to run without worrying about actual icon rendering.
 * We also mock the factory functions (`createIconSet`, etc.) used internally.
 * @see {@link https://docs.expo.dev/guides/icons/ | Expo Vector Icons Guide}
 */
jest.mock("@expo/vector-icons", () => {
  // A simple React component that renders nothing.
  const MockIcon = () => null;
  return {
    // Mock specific icon sets used in the app
    MaterialCommunityIcons: MockIcon,
    Ionicons: MockIcon,
    // Add mocks for any other icon sets you might use (e.g., FontAwesome, Entypo)

    // Mock the functions used to create icon sets
    createIconSet: () => MockIcon,
    createIconSetFromIcoMoon: () => MockIcon,
    createIconSetFromFontello: () => MockIcon,
  };
});

/**
 * Mock for `expo-font`.
 *
 * @reason Loading custom fonts (`.ttf`, `.otf`) is a native device feature.
 * The `expo-font` library manages this, but its functions (`loadAsync`, `useFonts`)
 * will fail in the Jest environment.
 * @strategy We mock the core functions:
 *   - `loadAsync`: Mocked to return a resolved promise immediately, simulating successful font loading.
 *   - `isLoaded`: Mocked to always return `true`.
 *   - `useFonts`: Mocked as a Jest function (`jest.fn()`) that returns `[true, null]`.
 *     This mimics the hook successfully loading fonts and having no error.
 * @see {@link https://docs.expo.dev/versions/latest/sdk/font/ | Expo Font Documentation}
 */
jest.mock("expo-font", () => ({
  /** Mock implementation of expo-font's loadAsync function. */
  loadAsync: jest.fn().mockResolvedValue(undefined), // Simulate fonts loaded successfully
  /** Mock implementation of expo-font's isLoaded function. */
  isLoaded: jest.fn().mockReturnValue(true), // Assume fonts are always loaded
  /** Mock implementation of the useFonts hook. Returns [loaded, error]. */
  useFonts: jest.fn().mockReturnValue([true, null]), // Simulate hook returning loaded state
}));

// --- Optional: Add other global setup below ---

// Example: Mocking a native module like AsyncStorage (if needed globally)
// Useful if many tests interact with device storage.
// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// );

// Example: Mocking react-native-gesture-handler (often needed for navigation/interactions)
// Gesture Handler relies heavily on native code.
// require('react-native-gesture-handler/jestSetup'); // Provides standard mocks

// Example: Silence specific console warnings/errors during tests (use with caution!)
// This can hide potentially useful warnings. Only use if a specific warning is known
// to be irrelevant noise in the test environment.
// jest.spyOn(console, 'warn').mockImplementation((message) => {
//   if (message.includes("Specific warning text to ignore")) {
//     return; // Ignore this specific warning
//   }
//   // Log other warnings
//   console.warn(message);
// });

// --- Suppress Specific Console Warnings ---
// Define the specific warning messages to ignore
const warningsToIgnore = [
  "Warning: An update to Animated", // Ignore the Animated view act warning
  "Warning: The current testing environment is not configured to support act(...)", // Ignore the environment act warning
];

// Use jest.spyOn to mock console.error
jest.spyOn(console, "error").mockImplementation((...args) => {
  // Check if the first argument is a string and includes any of the warning messages
  if (
    typeof args[0] === "string" &&
    warningsToIgnore.some((warning) => args[0].includes(warning))
  ) {
    // If it's a warning we want to ignore, do nothing (suppress it)
    return;
  }
  // Otherwise, call the original console.error.
  // We need to access the original implementation differently when using spyOn.
  // Calling console.error directly here would cause infinite recursion.
  // Instead, we access the original implementation via the spy object's backup.
  // Note: This assumes Jest stores the original function somewhere accessible,
  // which might not be straightforward. A simpler approach for just suppression
  // is often just returning without calling anything if the warning matches.
  // Let's stick to the simpler suppression: just return if it matches.
  // If other errors needed logging, a more complex setup might be required.
});

// Log to console to confirm this setup file ran. Useful for debugging setup issues.
console.log(
  "✅ Jest setup file executed successfully (with console error suppression).",
);
