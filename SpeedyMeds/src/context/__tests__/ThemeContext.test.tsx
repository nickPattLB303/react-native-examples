/**
 * Test Suite for ThemeContext
 *
 * @file This file contains tests for the ThemeProvider and useThemeContext hook.
 * @module context/__tests__/ThemeContext.test
 *
 * @purpose To verify that the ThemeContext correctly manages theme state (light/dark/system),
 * provides the appropriate theme object (lightTheme/darkTheme), and allows consumers
 * to update the theme preference.
 *
 * @dependencies
 * - React: For creating components.
 * - react-native: For core components (Text, Button) and the `useColorScheme` hook (mocked).
 * - @testing-library/react-native: For rendering components (`render`), querying elements (`screen`),
 *   and firing events (`fireEvent`, `act`).
 * - Internal:
 *   - `../ThemeContext`: The context provider and hook being tested.
 *   - `../../theme/theme`: The actual light and dark theme objects used for verification.
 *
 * @see {@link https://reactjs.org/docs/context.html | React Context API}
 * @see {@link https://callstack.github.io/react-native-testing-library/ | React Native Testing Library Docs}
 * @see {@link https://jestjs.io/docs/en/mock-functions | Jest Mock Functions}
 * @see {@link https://reactnative.dev/docs/usecolorscheme | React Native useColorScheme Hook}
 */

import React from "react";
import {
  Text,
  Button,
  // Import the hook we intend to mock
  useColorScheme as useDeviceColorScheme, // Alias to avoid naming conflict if needed later
} from "react-native";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import {
  ThemeProvider, // The context provider component
  useThemeContext, // The hook used by components to access the context
  ThemePreference, // The type for theme preference values ('light', 'dark', 'system')
} from "../ThemeContext"; // Adjust path if needed
import { lightTheme, darkTheme } from "../../theme/theme"; // Import actual themes for comparison

// --- Mocks ---

/**
 * Mock for the `useColorScheme` hook from React Native.
 *
 * @reason The real `useColorScheme` hook detects the device's system theme (light/dark).
 * In the Jest test environment (Node.js), there's no concept of a device theme.
 * We need to manually control what the hook returns for different test scenarios.
 * @strategy We use `jest.fn()` to create a mock function (`mockUseColorScheme`) and then
 * use `jest.mock` to tell Jest that whenever `react-native/Libraries/Utilities/useColorScheme`
 * is imported, it should use our `mockUseColorScheme` function instead of the real one.
 * In `beforeEach`, we can set the return value of this mock (e.g., `'light'` or `'dark'`).
 */
const mockUseColorScheme = jest.fn();
jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  // The module exports its hook as the default export
  default: mockUseColorScheme,
}));

// --- Test Consumer Component ---

/**
 * A simple component designed specifically for testing the ThemeContext.
 *
 * @description This component uses the `useThemeContext` hook to access the theme state
 * (`theme`, `themePreference`, `isDark`) and the `setThemePreference` action.
 * It renders the current state values into `<Text>` elements with `testID`s, allowing
 * our tests to easily query and assert these values. It also includes buttons to
 * trigger the `setThemePreference` action, simulating user interaction.
 *
 * @returns {React.ReactElement} JSX elements displaying context values and buttons to change preference.
 */
const TestConsumerComponent = (): React.ReactElement => {
  // Use the hook to get values from the nearest ThemeProvider
  const { theme, themePreference, setThemePreference, isDark } =
    useThemeContext();

  return (
    <>
      {/* Display current preference */}
      <Text testID="theme-preference">Preference: {themePreference}</Text>
      {/* Display whether the current theme is dark */}
      <Text testID="is-dark">Is Dark: {isDark.toString()}</Text>
      {/* Display a value from the theme object to verify the correct theme is applied */}
      <Text testID="primary-color">Primary Color: {theme.colors.primary}</Text>

      {/* Buttons to change the theme preference */}
      <Button
        title="Set Light"
        onPress={() => setThemePreference("light")} // Call action on press
        testID="set-light-button" // Test ID for querying
      />
      <Button
        title="Set Dark"
        onPress={() => setThemePreference("dark")}
        testID="set-dark-button"
      />
      <Button
        title="Set System"
        onPress={() => setThemePreference("system")}
        testID="set-system-button"
      />
    </>
  );
};

// --- Tests ---

/**
 * Test suite for the ThemeContext functionality.
 */
describe("ThemeContext", () => {
  /**
   * Setup function run before each individual test (`it` block).
   *
   * @purpose Resets mocks to ensure tests don't interfere with each other.
   * Sets a default mock return value for the system color scheme.
   */
  beforeEach(() => {
    // Clear mock call history and reset any mock implementations
    jest.clearAllMocks();
    // Default mock: Simulate the device system theme being 'light'
    mockUseColorScheme.mockReturnValue("light");
  });

  /**
   * Test case: Verifies the initial state of the context when no preference is set.
   *
   * @assertion Should default to 'system' preference.
   * @assertion Should use the light theme if the mocked system theme is 'light'.
   * @assertion `isDark` should be false.
   */
  it("provides default context values (system preference, light mode)", () => {
    // Render the consumer component wrapped in the provider
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>,
    );

    // Assertions: Check if the rendered text matches the expected default state
    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: system", // Default preference
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: false"); // System is mocked as light
    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      `Primary Color: ${lightTheme.colors.primary}`, // Should use light theme colors
    );
  });

  /**
   * Test case: Verifies that setting the preference to 'dark' updates the context correctly.
   *
   * @action Simulates pressing the "Set Dark" button.
   * @assertion Preference should update to 'dark'.
   * @assertion `isDark` should become true.
   * @assertion The theme object should switch to `darkTheme`.
   */
  it("updates context when preference is set to 'dark'", () => {
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>,
    );

    // Simulate pressing the "Set Dark" button.
    // `act` is used to wrap state updates triggered by events to ensure React
    // processes them correctly before assertions run.
    // See: https://reactjs.org/docs/testing-recipes.html#act
    act(() => {
      fireEvent.press(screen.getByTestId("set-dark-button"));
    });

    // Assertions: Check if the context values updated after the button press
    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: dark",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: true");
    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      `Primary Color: ${darkTheme.colors.primary}`, // Should now use dark theme colors
    );
  });

  /**
   * Test case: Verifies that setting the preference to 'light' updates the context correctly,
   * even if the initial system theme was dark.
   *
   * @setup Mocks system theme to 'dark' initially.
   * @action Simulates pressing the "Set Light" button.
   * @assertion Preference should update to 'light'.
   * @assertion `isDark` should become false.
   * @assertion The theme object should switch to `lightTheme`.
   */
  it("updates context when preference is set to 'light'", () => {
    // Arrange: Start with system mocked as dark to ensure a change occurs
    mockUseColorScheme.mockReturnValue("dark");
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>,
    );

    // Verify initial state based on dark system theme
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: true");

    // Act: Simulate pressing the "Set Light" button
    act(() => {
      fireEvent.press(screen.getByTestId("set-light-button"));
    });

    // Assertions: Check if context updated to light theme override
    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: light",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: false");
    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      `Primary Color: ${lightTheme.colors.primary}`,
    );
  });

  /**
   * Test case: Verifies that the context correctly reflects a dark system theme
   * when the preference is set to 'system'.
   *
   * @setup Mocks system theme to 'dark'.
   * @assertion Preference should be 'system'.
   * @assertion `isDark` should be true.
   * @assertion The theme object should be `darkTheme`.
   */
  it("updates context based on system preference (system dark)", () => {
    // Arrange: Mock system theme as dark
    mockUseColorScheme.mockReturnValue("dark");
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>,
    );

    // Assertions: Check initial state reflects the mocked dark system theme
    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: system",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: true");
    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      `Primary Color: ${darkTheme.colors.primary}`,
    );
  });

  /**
   * Test case: Verifies switching from an explicit preference ('dark') back to 'system'.
   *
   * @setup Mocks system theme to 'light'.
   * @action Simulates setting preference to 'dark', then back to 'system'.
   * @assertion Preference should become 'system'.
   * @assertion `isDark` should become false (reflecting the light system theme).
   * @assertion The theme object should switch back to `lightTheme`.
   */
  it("updates context when preference is set back to 'system' (system light)", () => {
    // Arrange: System is mocked as 'light' by default in beforeEach
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>,
    );

    // Act 1: Set to dark first
    act(() => {
      fireEvent.press(screen.getByTestId("set-dark-button"));
    });
    // Verify it's dark
    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: dark",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: true");

    // Act 2: Set back to system
    act(() => {
      fireEvent.press(screen.getByTestId("set-system-button"));
    });

    // Assertions: Check if context reverted to system (light) state
    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: system",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: false");
    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      `Primary Color: ${lightTheme.colors.primary}`,
    );
  });

  /**
   * Test case: Verifies that using the `useThemeContext` hook outside of a `ThemeProvider` throws an error.
   *
   * @purpose Ensures the hook provides a clear error message if used incorrectly,
   *          helping developers identify setup issues.
   * @assertion Rendering the consumer component *without* a ThemeProvider wrapper should throw a specific error.
   */
  it("throws error when useThemeContext is used outside ThemeProvider", () => {
    // Arrange: Suppress the expected console error output from React's error boundary
    // during this test to keep the test output clean.
    const originalError = console.error;
    console.error = jest.fn(); // Replace console.error with a mock

    // Act & Assert: Expect the render function to throw the specific error
    expect(
      () => render(<TestConsumerComponent />), // Render consumer without provider
    ).toThrow("useThemeContext must be used within a ThemeProvider"); // Check error message

    // Cleanup: Restore the original console.error function
    console.error = originalError;
  });
});
