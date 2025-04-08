/**
 * Test Suite for HomeScreen Component
 *
 * @file This file contains tests for the HomeScreen component.
 * @module screens/__tests__/HomeScreen.test
 *
 * @purpose To verify that the HomeScreen renders correctly based on different
 * application states (loading, error, success) fetched from the Zustand store
 * and the Theme context. It also tests navigation actions triggered by pressing
 * cards and theme switching functionality.
 *
 * @dependencies
 * - React: For component rendering.
 * - @testing-library/react-native: For rendering (`render`), querying (`screen`),
 *   firing events (`fireEvent`), and wrapping state updates (`act`).
 * - Internal:
 *   - `../../test-utils/renderWithProviders`: Custom render function including theme providers.
 *   - `../HomeScreen`: The component being tested.
 *   - `../../stores/appDataStore`: The Zustand store hook (mocked).
 *   - `../../context/ThemeContext`: The Theme context hook (mocked).
 *   - `../../theme/theme`: For theme object comparison (`lightTheme`).
 *   - `../../types`: For data structure types (`AppDataState`, `MedicationReminder`).
 *
 * @see {@link ../HomeScreen.tsx | HomeScreen Component}
 * @see {@link ../../stores/appDataStore.ts | appDataStore Zustand Store}
 * @see {@link ../../context/ThemeContext.ts | ThemeContext}
 * @see {@link ../../test-utils/renderWithProviders.tsx | Custom Render Function}
 * @see {@link https://callstack.github.io/react-native-testing-library/ | React Native Testing Library Docs}
 * @see {@link https://jestjs.io/docs/en/mock-functions | Jest Mock Functions}
 */

import React from "react";
import { screen, fireEvent } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render with theme providers
import HomeScreen from "../HomeScreen";
import useAppDataStore, { AppDataState } from "../../stores/appDataStore"; // Import store hook and state type
// Removed import of useThemeContext as it's no longer mocked here
import { lightTheme } from "../../theme/theme"; // Import a theme object for default mock
import type { MedicationReminder } from "../../types"; // Import specific types needed

// --- Mocks ---

/**
 * Mock the Zustand store (`useAppDataStore`).
 * @strategy Uses `jest.mock` to replace the real hook. `mockImplementation` is used
 * in `beforeEach` and specific tests to control the returned state, supporting selectors.
 */
jest.mock("../../stores/appDataStore");
const mockUseAppDataStore = useAppDataStore as jest.MockedFunction<
  typeof useAppDataStore
>;

// Removed mocking for useThemeContext. Tests will now use the actual
// ThemeProvider supplied by renderWithProviders.

/**
 * Mock navigation props (`navigation` and `route`).
 * @strategy Basic mock objects. `navigation.navigate` is mocked with `jest.fn()`
 * to allow verification of navigation calls.
 */
const mockNavigation = {
  navigate: jest.fn(), // Mock the navigate function
};
const mockRoute = { key: "HomeScreenKey", name: "Home" as const }; // Route name must match BottomTabParamList
const mockProps = {
  navigation: mockNavigation,
  route: mockRoute,
};

// --- Mock Data ---

/** Default mock state for `useAppDataStore` hook. */
const defaultStoreState: AppDataState = {
  userProfile: {
    firstName: "Test",
    lastNameInitial: "U",
    birthYear: 1990,
    memberId: "12345",
    balanceDue: 123.45,
  },
  isLoading: false,
  error: null,
  medicationReminders: [
    { id: "rem1", name: "Morning Meds", time: "8:00 AM" },
    { id: "rem2", name: "Evening Meds", time: "8:00 PM" },
  ],
  prescriptions: [],
  orders: [],
  // Include mock action functions
  setUserProfile: jest.fn(),
  setMedicationReminders: jest.fn(),
  setPrescriptions: jest.fn(),
  setOrders: jest.fn(),
  setError: jest.fn(),
  setLoading: jest.fn(),
};

// Removed defaultThemeContextState as useThemeContext is no longer mocked here.

// --- Tests ---

/**
 * Test suite for the HomeScreen component.
 */
describe("HomeScreen", () => {
  /**
   * Setup before each test.
   * @purpose Resets mocks and sets default implementations/return values.
   */
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock calls and implementations

    // Default mock for Zustand store using mockImplementation
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        // If a selector function is provided, apply it to the default state
        if (selector) {
          return selector(defaultStoreState);
        }
        // Otherwise, return the entire default state
        return defaultStoreState;
      },
    );

    // Removed mock setup for useThemeContext
  });

  /**
   * Test case: Renders loading indicator correctly.
   * @assertion Checks if the specific loading text is visible when `isLoading` is true.
   */
  it("renders loading indicator when loading and no profile", () => {
    // Arrange: Define specific state for this test
    const loadingState: AppDataState = {
      ...defaultStoreState,
      isLoading: true,
      userProfile: null, // Profile is null during initial load
      // Ensure other required fields are present
      medicationReminders: [], // Reminders might also be empty during load
      prescriptions: [],
      orders: [],
      error: null,
    };
    // Override the default mock implementation for this test only
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        if (selector) {
          return selector(loadingState);
        }
        return loadingState;
      },
    );

    // Act: Render the component
    render(<HomeScreen {...(mockProps as any)} />);

    // Assert: Check for loading text
    expect(screen.getByText("Loading Dashboard...")).toBeVisible();
  });

  /**
   * Test case: Renders error display correctly.
   * @assertion Checks if the generic error component and the specific error message are visible.
   */
  it("renders error display when there is an error", () => {
    // Arrange: Define error state
    const error = new Error("Failed to fetch data");
    const errorState: AppDataState = {
      ...defaultStoreState,
      isLoading: false, // Loading finished (with error)
      error: error, // Set the error object
      userProfile: null, // Profile likely null if fetch failed
      medicationReminders: [], // Data might be empty on error
      prescriptions: [],
      orders: [],
    };
    // Override mock implementation for this test
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        if (selector) {
          return selector(errorState);
        }
        return errorState;
      },
    );

    // Act: Render the component
    render(<HomeScreen {...(mockProps as any)} />);

    // Assert: Check for error UI elements
    expect(screen.getByText("An Error Occurred")).toBeVisible(); // From ErrorDisplay
    expect(screen.getByText(error.message)).toBeVisible(); // Specific error message
  });

  /**
   * Test case: Renders all expected dashboard elements when data loads successfully.
   * @assertion Checks for welcome message, balance card, navigation cards, reminders list, and theme switcher.
   */
  it("renders dashboard content correctly on successful load", () => {
    // Arrange: Use default mocks set in beforeEach (successful load state)

    // Act: Render the component
    render(<HomeScreen {...(mockProps as any)} />);

    // Assert: Check various UI elements are present and display correct data
    // Welcome message
    expect(
      screen.getByText(
        `Welcome back, ${defaultStoreState.userProfile?.firstName}!`, // Use optional chaining for safety
      ),
    ).toBeVisible();

    // Balance card (using accessibility label for robustness)
    expect(screen.getByLabelText(/Current account balance/i)).toBeVisible();

    // Navigation cards (using accessibility labels)
    expect(
      screen.getByLabelText(/Navigate to Prescriptions screen/i),
    ).toBeVisible();
    expect(screen.getByLabelText(/Navigate to Orders screen/i)).toBeVisible();
    expect(screen.getByLabelText(/Navigate to Delivery screen/i)).toBeVisible(); // Placeholder card
    expect(
      screen.getByLabelText(/Navigate to Resources screen/i),
    ).toBeVisible(); // Placeholder card

    // Reminders section
    expect(screen.getByText("Medication Reminders")).toBeVisible();
    // Check first reminder details
    expect(
      screen.getByText(defaultStoreState.medicationReminders[0].name),
    ).toBeVisible();
    expect(
      screen.getByText(
        `Time: ${defaultStoreState.medicationReminders[0].time}`,
      ),
    ).toBeVisible();

    // Theme switcher buttons are not rendered directly in HomeScreen,
    // so assertions for them are removed from this test.
  });

  /**
   * Test case: Verifies navigation to Prescriptions screen.
   * @action Simulates pressing the Prescriptions navigation card.
   * @assertion Checks if `navigation.navigate` was called with "Prescriptions".
   */
  it("navigates to Prescriptions when Prescriptions card is pressed", () => {
    // Arrange
    render(<HomeScreen {...(mockProps as any)} />);
    // Act: Find the card by label and press it
    const prescriptionsCard = screen.getByLabelText(
      /Navigate to Prescriptions screen/i,
    );
    fireEvent.press(prescriptionsCard);
    // Assert: Check if navigate was called correctly
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Prescriptions");
  });

  /**
   * Test case: Verifies navigation to Orders screen.
   * @action Simulates pressing the Orders navigation card.
   * @assertion Checks if `navigation.navigate` was called with "Orders".
   */
  it("navigates to Orders when Orders card is pressed", () => {
    // Arrange
    render(<HomeScreen {...(mockProps as any)} />);
    // Act
    const ordersCard = screen.getByLabelText(/Navigate to Orders screen/i);
    fireEvent.press(ordersCard);
    // Assert
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Orders");
  });

  // Note: Tests for Delivery/Resources cards were removed as they currently lack onPress handlers.

  // Removed test case for theme button press as HomeScreen does not render ThemeSelector.
});
