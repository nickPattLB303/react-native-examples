/**
 * Test Suite for PrescriptionsScreen Component
 *
 * @file This file contains tests for the PrescriptionsScreen component.
 * @module screens/__tests__/PrescriptionsScreen.test
 *
 * @purpose To verify that the PrescriptionsScreen renders correctly based on different
 * application states (loading, error, success with prescriptions, empty state) fetched
 * from the Zustand store. It also tests the search bar functionality (state update and filtering).
 *
 * @dependencies
 * - React: For component rendering.
 * - @testing-library/react-native: For rendering (`render`), querying (`screen`),
 *   firing events (`fireEvent`), and wrapping state updates (`act`).
 * - Internal:
 *   - `../../test-utils/renderWithProviders`: Custom render function including theme providers.
 *   - `../PrescriptionsScreen`: The component being tested.
 *   - `../../stores/appDataStore`: The Zustand store hook (mocked).
 *   - `../../types`: For data structure types (`Prescription`, `PrescriptionSupplyStatus`, `PrescriptionAlert`, `AppDataState`).
 *
 * @see {@link ../PrescriptionsScreen.tsx | PrescriptionsScreen Component}
 * @see {@link ../../stores/appDataStore.ts | appDataStore Zustand Store}
 * @see {@link ../../test-utils/renderWithProviders.tsx | Custom Render Function}
 * @see {@link https://callstack.github.io/react-native-testing-library/ | React Native Testing Library Docs}
 * @see {@link https://jestjs.io/docs/en/mock-functions | Jest Mock Functions}
 */

import React from "react";
import { screen, fireEvent } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render with theme providers
import PrescriptionsScreen from "../PrescriptionsScreen";
import useAppDataStore, { AppDataState } from "../../stores/appDataStore"; // Import store hook and state type
import {
  Prescription,
  PrescriptionSupplyStatus,
  PrescriptionAlert,
} from "../../types"; // Import Prescription type and enums

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

/**
 * Mock navigation props (`navigation` and `route`).
 * @strategy Basic mock objects. Navigation isn't heavily used here yet, but mocks prevent errors.
 */
const mockNavigation = {
  // navigate: jest.fn(), // Add if navigation actions are tested
};
const mockRoute = { key: "PrescriptionsKey", name: "Prescriptions" as const }; // Name must match BottomTabParamList
const mockProps = {
  navigation: mockNavigation,
  route: mockRoute,
};

// --- Mock Data ---

/** Mock Prescription data for successful state tests. */
const mockPrescriptions: Prescription[] = [
  {
    id: "rx1",
    drugName: "Atorvastatin",
    dosage: "20mg",
    daysSupplyRemaining: 85,
    supplyStatus: PrescriptionSupplyStatus.OK, // Use enum
    patientName: "Test User",
    refillsRemaining: 3,
    alert: PrescriptionAlert.NONE, // Use enum
  },
  {
    id: "rx2",
    drugName: "Amoxicillin",
    dosage: "500mg",
    daysSupplyRemaining: 5,
    supplyStatus: PrescriptionSupplyStatus.CRITICAL, // Use enum
    patientName: "Test User",
    refillsRemaining: 0,
    alert: PrescriptionAlert.PRICE_RISING, // Use enum
  },
];

/** Default state object to be returned by the mocked Zustand store. */
const defaultStoreState: AppDataState = {
  prescriptions: mockPrescriptions, // Use mock prescriptions data
  isLoading: false,
  error: null,
  // Include other state slices and actions for completeness
  userProfile: null,
  medicationReminders: [],
  orders: [],
  setUserProfile: jest.fn(),
  setMedicationReminders: jest.fn(),
  setPrescriptions: jest.fn(),
  setOrders: jest.fn(),
  setError: jest.fn(),
  setLoading: jest.fn(),
};

// --- Tests ---

/**
 * Test suite for the PrescriptionsScreen component.
 */
describe("PrescriptionsScreen", () => {
  /**
   * Setup before each test.
   * @purpose Resets mocks and sets the default mock implementation for the Zustand store.
   */
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock calls

    // Default mock for Zustand store using mockImplementation
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
   * Test case: Renders loading indicator correctly.
   * @assertion Checks if loading text is visible when `isLoading` is true and `prescriptions` is empty.
   */
  it("renders loading indicator when loading and no prescriptions", () => {
    // Arrange: Define loading state
    const loadingState: AppDataState = {
      ...defaultStoreState,
      isLoading: true,
      prescriptions: [], // Ensure prescriptions are empty for initial load
      error: null,
    };
    // Override mock implementation
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        if (selector) {
          return selector(loadingState);
        }
        return loadingState;
      },
    );

    // Act: Render
    render(<PrescriptionsScreen {...(mockProps as any)} />);

    // Assert: Check for loading text
    expect(screen.getByText("Loading Prescriptions...")).toBeVisible();
  });

  /**
   * Test case: Renders error display correctly.
   * @assertion Checks if error component and message are visible when `error` is present.
   */
  it("renders error display when there is an error", () => {
    // Arrange: Define error state
    const error = new Error("Failed to fetch prescriptions");
    const errorState: AppDataState = {
      ...defaultStoreState,
      isLoading: false,
      error: error,
      prescriptions: [], // Data might be empty on error
    };
    // Override mock implementation
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        if (selector) {
          return selector(errorState);
        }
        return errorState;
      },
    );

    // Act: Render
    render(<PrescriptionsScreen {...(mockProps as any)} />);

    // Assert: Check for error UI
    expect(screen.getByText("An Error Occurred")).toBeVisible(); // From ErrorDisplay
    expect(screen.getByText(error.message)).toBeVisible();
  });

  /**
   * Test case: Renders empty state message correctly.
   * @assertion Checks if "No Prescriptions Found" message is visible and search bar is hidden
   *            when `prescriptions` array is empty after loading.
   */
  it("renders empty state message when no prescriptions are available", () => {
    // Arrange: Define empty state
    const emptyState: AppDataState = {
      ...defaultStoreState,
      isLoading: false,
      prescriptions: [], // Explicitly empty prescriptions array
      error: null,
    };
    // Override mock implementation
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        if (selector) {
          return selector(emptyState);
        }
        return emptyState;
      },
    );

    // Act: Render
    render(<PrescriptionsScreen {...(mockProps as any)} />);

    // Assert: Check for empty state UI elements
    // Search bar should NOT be visible in empty state based on component logic
    expect(screen.queryByPlaceholderText("Search Prescriptions")).toBeNull();
    expect(screen.getByText("No Prescriptions Found")).toBeVisible();
    expect(
      screen.getByText("You currently have no prescriptions listed."),
    ).toBeVisible();
  });

  /**
   * Test case: Renders the list of prescriptions and search bar correctly when data is available.
   * @assertion Checks if search bar and details for both mock prescriptions are visible.
   */
  it("renders the list of prescriptions and search bar correctly", () => {
    // Arrange: Use default state from beforeEach

    // Act: Render
    render(<PrescriptionsScreen {...(mockProps as any)} />);

    // Assert: Check for Searchbar presence
    expect(screen.getByPlaceholderText("Search Prescriptions")).toBeVisible();

    // Assert: Check details for the first mock prescription
    expect(
      screen.getByText(
        `${mockPrescriptions[0].drugName} ${mockPrescriptions[0].dosage}`,
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        `Patient: ${mockPrescriptions[0].patientName} | Refills: ${mockPrescriptions[0].refillsRemaining}`,
      ),
    ).toBeVisible();
    // Check supply badge text for the first prescription
    expect(
      screen.getByText(`${mockPrescriptions[0].daysSupplyRemaining} days left`),
    ).toBeVisible();

    // Assert: Check details for the second mock prescription
    expect(
      screen.getByText(
        `${mockPrescriptions[1].drugName} ${mockPrescriptions[1].dosage}`,
      ),
    ).toBeVisible();
    // Check alert text rendered by the helper function in the component
    expect(screen.getByText("Price may be rising")).toBeVisible();
  });

  /**
   * Test case: Verifies that typing in the Searchbar updates its value (reflecting state change).
   * @action Simulates typing text into the search input.
   * @assertion Checks if the `value` prop of the Searchbar component matches the typed text.
   * @note This test focuses on the state update, not the filtering logic itself.
   */
  it("updates search query state when text is entered in Searchbar", () => {
    // Arrange
    render(<PrescriptionsScreen {...(mockProps as any)} />);
    const searchInput = screen.getByPlaceholderText("Search Prescriptions");
    const testQuery = "Atorva";

    // Act: Simulate user typing into the search bar
    fireEvent.changeText(searchInput, testQuery);

    // Assert: Check if the input's displayed value updated
    expect(searchInput.props.value).toBe(testQuery);
  });

  /**
   * Test case: Verifies that the list filters correctly based on the search query.
   * @action Simulates typing text, checks filtered results, clears text, checks results again.
   * @assertion Checks which prescription items are visible/hidden based on the filter.
   */
  it("filters prescriptions based on search query", () => {
    // Arrange
    render(<PrescriptionsScreen {...(mockProps as any)} />);
    const searchInput = screen.getByPlaceholderText("Search Prescriptions");

    // Assert Initial State: Both prescriptions should be visible initially
    expect(screen.getByText(/Atorvastatin/)).toBeVisible(); // Use regex for flexibility
    expect(screen.getByText(/Amoxicillin/)).toBeVisible();

    // Act 1: Filter for "Atorva" (case-insensitive)
    fireEvent.changeText(searchInput, "Atorva");

    // Assert 1: Only Atorvastatin should be visible
    expect(screen.getByText(/Atorvastatin/)).toBeVisible();
    // queryByText returns null if not found, useful for asserting absence
    expect(screen.queryByText(/Amoxicillin/)).toBeNull();

    // Act 2: Clear the search query
    fireEvent.changeText(searchInput, "");

    // Assert 2: Both prescriptions should be visible again
    expect(screen.getByText(/Atorvastatin/)).toBeVisible();
    expect(screen.getByText(/Amoxicillin/)).toBeVisible();
  });
});
