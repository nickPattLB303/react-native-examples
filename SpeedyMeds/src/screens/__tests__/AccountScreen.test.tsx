/**
 * Test Suite for AccountScreen Component
 *
 * @file This file contains tests for the AccountScreen component.
 * @module screens/__tests__/AccountScreen.test
 *
 * @purpose To verify that the AccountScreen renders correctly based on the
 * application state (loading, error, success with profile data, no profile data)
 * and that user interactions (pressing list items, log out button) trigger the
 * expected console logs (as navigation is not fully implemented/mocked here).
 *
 * @dependencies
 * - React: For component rendering.
 * - @testing-library/react-native: For rendering (`render`), querying (`screen`),
 *   firing events (`fireEvent`), and wrapping state updates (`act`).
 * - Internal:
 *   - `../../test-utils/renderWithProviders`: Custom render function that includes theme providers.
 *   - `../AccountScreen`: The component being tested.
 *   - `../../stores/appDataStore`: The Zustand store hook (mocked).
 *   - `../../types`: For `UserProfile` type definition.
 *
 * @see {@link ../AccountScreen.tsx | AccountScreen Component}
 * @see {@link ../../stores/appDataStore.ts | appDataStore Zustand Store}
 * @see {@link ../../test-utils/renderWithProviders.tsx | Custom Render Function}
 * @see {@link https://callstack.github.io/react-native-testing-library/ | React Native Testing Library Docs}
 * @see {@link https://jestjs.io/docs/en/mock-functions | Jest Mock Functions}
 */

import React from "react";
import { screen, fireEvent, act } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render with theme providers
import AccountScreen from "../AccountScreen";
import useAppDataStore, { AppDataState } from "../../stores/appDataStore"; // Import state type
import type { UserProfile } from "../../types"; // Import UserProfile type

// --- Mocks ---

/**
 * Mock the Zustand store (`useAppDataStore`).
 *
 * @reason The AccountScreen depends on `useAppDataStore` to get user profile data,
 * loading status, and error status. In tests, we need to control this state
 * directly without relying on the actual store implementation or data fetching.
 * @strategy We use `jest.mock` to replace the actual store hook with a mock function.
 * We then use `mockImplementation` in `beforeEach` or specific tests to define
 * what state the mock hook should return for different scenarios. Using
 * `mockImplementation` allows the mock to accept a selector function, mimicking
 * the real hook's behavior more closely than `mockReturnValue`.
 * @see {@link https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn | Jest mockImplementation}
 */
jest.mock("../../stores/appDataStore");
// Create a typed mock function for the store hook
const mockUseAppDataStore = useAppDataStore as jest.MockedFunction<
  typeof useAppDataStore
>;

/**
 * Mock navigation props (`navigation` and `route`).
 *
 * @reason React Navigation passes these props to screen components. While this
 * screen doesn't heavily use them *yet*, providing basic mocks prevents potential
 * errors if the component tries to access them.
 * @strategy Create simple objects with the expected structure. `mockNavigation`
 * can have mock functions added (e.g., `navigate: jest.fn()`) if needed for
 * testing navigation calls. `mockRoute` needs a `key` and `name`.
 */
const mockNavigation = {
  // navigate: jest.fn(), // Example if navigation was tested
};
// Route prop needs key and name matching the navigator's screen definition
const mockRoute = { key: "AccountKey", name: "Account" as const }; // Use 'as const' for type safety
const mockProps = {
  navigation: mockNavigation,
  route: mockRoute,
};

// --- Mock Data ---

/** Mock UserProfile data for successful state tests. */
const mockUserProfile: UserProfile = {
  firstName: "Test",
  lastNameInitial: "U",
  birthYear: 1990,
  memberId: "12345",
  balanceDue: 123.45,
};

/** Default state object to be returned by the mocked Zustand store. */
const defaultStoreState: AppDataState = {
  userProfile: mockUserProfile,
  isLoading: false,
  error: null,
  // Include other state slices and actions, even if not directly used by this screen,
  // because the mock replaces the *entire* store hook's return value.
  medicationReminders: [],
  prescriptions: [],
  orders: [],
  // Mock actions using jest.fn() so we could spy on them if needed, though not used here.
  setUserProfile: jest.fn(),
  setMedicationReminders: jest.fn(),
  setPrescriptions: jest.fn(),
  setOrders: jest.fn(),
  setError: jest.fn(),
  setLoading: jest.fn(),
};

/** Spy on console.log to verify button press outputs. */
// We mock the implementation to prevent test logs from cluttering the output.
const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

// --- Tests ---

/**
 * Test suite for the AccountScreen component.
 */
describe("AccountScreen", () => {
  /**
   * Setup before each test.
   *
   * @purpose Resets mocks and sets the default mock implementation for the Zustand store.
   */
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock call counts and implementations

    // Set the default mock implementation for the Zustand store hook.
    // This function will be called whenever `useAppDataStore` is used in the component.
    // It checks if a selector function was passed (like `state => state.userProfile`).
    // If yes, it applies the selector to `defaultStoreState`.
    // If no selector was passed (meaning the component wants the whole state),
    // it returns the entire `defaultStoreState`.
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        if (selector) {
          return selector(defaultStoreState);
        }
        return defaultStoreState;
      },
    );
  });

  /**
   * Cleanup after all tests in this suite are finished.
   */
  afterAll(() => {
    // Restore the original console.log implementation.
    consoleSpy.mockRestore();
  });

  /**
   * Test case: Renders loading indicator when `isLoading` is true and `userProfile` is null.
   */
  it("renders loading indicator when loading and no profile", () => {
    // Arrange: Override the default mock state for this specific test.
    const loadingState: AppDataState = {
      ...defaultStoreState, // Start with defaults
      isLoading: true, // Override isLoading
      userProfile: null, // Override userProfile
    };
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        if (selector) {
          return selector(loadingState);
        }
        return loadingState;
      },
    );

    // Act: Render the component with the loading state
    render(<AccountScreen {...(mockProps as any)} />); // Pass mock navigation props

    // Assert: Check if the loading text is visible
    expect(screen.getByText("Loading Account...")).toBeVisible();
  });

  /**
   * Test case: Renders error display when `error` is present in the state.
   */
  it("renders error display when there is an error", () => {
    // Arrange: Create a mock error and set the store state
    const error = new Error("Failed to fetch account");
    const errorState: AppDataState = {
      ...defaultStoreState,
      isLoading: false, // Loading is false when there's an error
      error: error, // Set the error object
      userProfile: null, // Profile might be null if fetch failed
    };
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        if (selector) {
          return selector(errorState);
        }
        return errorState;
      },
    );

    // Act: Render the component
    render(<AccountScreen {...(mockProps as any)} />);

    // Assert: Check if the error component and message are visible
    expect(screen.getByText("An Error Occurred")).toBeVisible(); // From ErrorDisplay component
    expect(screen.getByText(error.message)).toBeVisible();
  });

  /**
   * Test case: Renders a specific message when loading is finished but the profile is still null.
   */
  it("renders no data message when profile is null after load", () => {
    // Arrange: Set store state to loaded but no profile
    const noProfileState: AppDataState = {
      ...defaultStoreState,
      isLoading: false,
      userProfile: null, // Explicitly null profile
      error: null, // No error
    };
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        if (selector) {
          return selector(noProfileState);
        }
        return noProfileState;
      },
    );

    // Act: Render the component
    render(<AccountScreen {...(mockProps as any)} />);

    // Assert: Check for the specific "no data" message
    expect(screen.getByText("No user profile data available.")).toBeVisible();
  });

  /**
   * Test case: Renders the user's profile information and list items correctly when data is loaded.
   */
  it("renders profile info and list items correctly", () => {
    // Arrange: Use the default state (isLoading: false, userProfile: mockUserProfile)
    // The mock implementation is already set in beforeEach.

    // Act: Render the component
    render(<AccountScreen {...(mockProps as any)} />);

    // Assert: Check profile information elements
    expect(
      screen.getByText(
        `${mockUserProfile.firstName} (${mockUserProfile.birthYear})`, // Check formatted name/year
      ),
    ).toBeVisible();
    expect(
      screen.getByText(`Member ID: ${mockUserProfile.memberId}`), // Check member ID
    ).toBeVisible();
    // Check Avatar accessibility label
    expect(
      screen.getByLabelText(
        `Avatar for ${mockUserProfile.firstName} (${mockUserProfile.birthYear})`,
      ),
    ).toBeVisible();

    // Assert: Check that all expected list items are rendered
    expect(screen.getByText("Personal Information")).toBeVisible();
    expect(screen.getByText("Payment Methods")).toBeVisible();
    expect(screen.getByText("Communication Preferences")).toBeVisible();
    expect(screen.getByText("Security")).toBeVisible();
    expect(screen.getByText("Help & Support")).toBeVisible();

    // Assert: Check the Log Out button
    // Use getByRole for better accessibility testing
    expect(screen.getByRole("button", { name: /log out/i })).toBeVisible();
  });

  /**
   * Test case: Verifies console log when "Personal Information" is pressed.
   */
  it("logs message when Personal Information item is pressed", () => {
    // Arrange
    render(<AccountScreen {...(mockProps as any)} />);
    // Act: Simulate pressing the list item
    fireEvent.press(screen.getByText("Personal Information"));
    // Assert: Check if console.log was called with the expected message
    expect(consoleSpy).toHaveBeenCalledWith("Navigate to Personal Info screen");
  });

  /**
   * Test case: Verifies console log when "Payment Methods" is pressed.
   */
  it("logs message when Payment Methods item is pressed", () => {
    render(<AccountScreen {...(mockProps as any)} />);
    fireEvent.press(screen.getByText("Payment Methods"));
    expect(consoleSpy).toHaveBeenCalledWith(
      "Navigate to Payment Methods screen",
    );
  });

  /**
   * Test case: Verifies console log when "Communication Preferences" is pressed.
   */
  it("logs message when Communication Preferences item is pressed", () => {
    render(<AccountScreen {...(mockProps as any)} />);
    fireEvent.press(screen.getByText("Communication Preferences"));
    expect(consoleSpy).toHaveBeenCalledWith(
      "Navigate to Communication Preferences screen",
    );
  });

  /**
   * Test case: Verifies console log when "Security" is pressed.
   */
  it("logs message when Security item is pressed", () => {
    render(<AccountScreen {...(mockProps as any)} />);
    fireEvent.press(screen.getByText("Security"));
    expect(consoleSpy).toHaveBeenCalledWith("Navigate to Security screen");
  });

  /**
   * Test case: Verifies console log when "Help & Support" is pressed.
   */
  it("logs message when Help & Support item is pressed", () => {
    render(<AccountScreen {...(mockProps as any)} />);
    fireEvent.press(screen.getByText("Help & Support"));
    expect(consoleSpy).toHaveBeenCalledWith(
      "Navigate to Help & Support screen",
    );
  });

  /**
   * Test case: Verifies console log when "Log Out" button is pressed.
   */
  it("logs message when Log Out button is pressed", () => {
    render(<AccountScreen {...(mockProps as any)} />);
    // Use getByRole for better targeting
    fireEvent.press(screen.getByRole("button", { name: /log out/i }));
    expect(consoleSpy).toHaveBeenCalledWith("Log Out action triggered");
  });
});
