import React from "react";
import {
  Text,
  Button,
  useColorScheme as useDeviceColorScheme,
} from "react-native";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import {
  ThemeProvider,
  useThemeContext,
  ThemePreference,
} from "../ThemeContext"; // Adjust path if needed
import { lightTheme, darkTheme } from "../../theme/theme"; // Adjust path if needed

// --- Mocks ---

// Mock only the useColorScheme hook from react-native
const mockUseColorScheme = jest.fn();
jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  default: mockUseColorScheme,
}));

// --- Test Consumer Component ---

// A simple component that consumes the theme context and displays its values
const TestConsumerComponent = () => {
  const { theme, themePreference, setThemePreference, isDark } =
    useThemeContext();

  return (
    <>
      <Text testID="theme-preference">Preference: {themePreference}</Text>
      <Text testID="is-dark">Is Dark: {isDark.toString()}</Text>
      {/* Display a theme color to verify the theme object is correct */}
      <Text testID="primary-color">Primary Color: {theme.colors.primary}</Text>
      <Button
        title="Set Light"
        onPress={() => setThemePreference("light")}
        testID="set-light-button"
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

describe("ThemeContext", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Default mock system theme to 'light'
    mockUseColorScheme.mockReturnValue("light");
  });

  it("provides default context values (system preference, light mode)", () => {
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: system",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: false");
    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      `Primary Color: ${lightTheme.colors.primary}`,
    );
  });

  it("updates context when preference is set to 'dark'", () => {
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.press(screen.getByTestId("set-dark-button"));
    });

    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: dark",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: true");
    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      `Primary Color: ${darkTheme.colors.primary}`,
    );
  });

  it("updates context when preference is set to 'light'", () => {
    // Start with dark to ensure change happens
    mockUseColorScheme.mockReturnValue("dark");
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>,
    );

    // Set to dark first (via system)
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: true");

    // Now explicitly set to light
    act(() => {
      fireEvent.press(screen.getByTestId("set-light-button"));
    });

    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: light",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: false");
    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      `Primary Color: ${lightTheme.colors.primary}`,
    );
  });

  it("updates context based on system preference (system dark)", () => {
    mockUseColorScheme.mockReturnValue("dark"); // Mock system theme as dark
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>,
    );

    // Initial state should reflect dark system theme
    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: system",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: true");
    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      `Primary Color: ${darkTheme.colors.primary}`,
    );
  });

  it("updates context when preference is set back to 'system' (system light)", () => {
    render(
      <ThemeProvider>
        <TestConsumerComponent />
      </ThemeProvider>,
    );

    // Set to dark first
    act(() => {
      fireEvent.press(screen.getByTestId("set-dark-button"));
    });
    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: dark",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: true");

    // Set back to system (which is mocked as light)
    act(() => {
      fireEvent.press(screen.getByTestId("set-system-button"));
    });

    expect(screen.getByTestId("theme-preference")).toHaveTextContent(
      "Preference: system",
    );
    expect(screen.getByTestId("is-dark")).toHaveTextContent("Is Dark: false");
    expect(screen.getByTestId("primary-color")).toHaveTextContent(
      `Primary Color: ${lightTheme.colors.primary}`,
    );
  });

  it("throws error when useThemeContext is used outside ThemeProvider", () => {
    // Suppress console.error for this specific test, as React logs the error boundary message
    const originalError = console.error;
    console.error = jest.fn();

    // Expect rendering the consumer outside the provider to throw
    expect(() => render(<TestConsumerComponent />)).toThrow(
      "useThemeContext must be used within a ThemeProvider",
    );

    // Restore console.error
    console.error = originalError;
  });
});
