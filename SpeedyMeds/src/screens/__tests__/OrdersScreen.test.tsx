/**
 * Test Suite for OrdersScreen Component
 *
 * @file This file contains tests for the OrdersScreen component.
 * @module screens/__tests__/OrdersScreen.test
 *
 * @purpose To verify that the OrdersScreen renders correctly based on different
 * application states (loading, error, success with orders, empty state) fetched
 * from the Zustand store. It also tests navigation to the OrderDetail screen
 * when an order item or the test button is pressed.
 *
 * @dependencies
 * - React: For component rendering.
 * - @testing-library/react-native: For rendering (`render`), querying (`screen`),
 *   firing events (`fireEvent`), and wrapping state updates (`act`).
 * - Internal:
 *   - `../../test-utils/renderWithProviders`: Custom render function including theme providers.
 *   - `../OrdersScreen`: The component being tested.
 *   - `../../stores/appDataStore`: The Zustand store hook (mocked).
 *   - `../../types`: For data structure types (`Order`, `OrderStatus`, `AppDataState`).
 *
 * @see {@link ../OrdersScreen.tsx | OrdersScreen Component}
 * @see {@link ../../stores/appDataStore.ts | appDataStore Zustand Store}
 * @see {@link ../../test-utils/renderWithProviders.tsx | Custom Render Function}
 * @see {@link https://callstack.github.io/react-native-testing-library/ | React Native Testing Library Docs}
 * @see {@link https://jestjs.io/docs/en/mock-functions | Jest Mock Functions}
 */

import React from "react";
import { screen, fireEvent } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render with theme providers
import OrdersScreen from "../OrdersScreen";
import useAppDataStore, { AppDataState } from "../../stores/appDataStore"; // Import store hook and state type
import { Order, OrderStatus } from "../../types"; // Import Order type and OrderStatus enum

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
 * @strategy Basic mock objects. `navigation.navigate` is mocked with `jest.fn()`
 * to allow verification of navigation calls. The route name 'OrdersList' must match
 * the name defined in the OrdersStackNavigator.
 */
const mockNavigation = {
  navigate: jest.fn(), // Mock the navigate function
};
// Route prop needs key and name matching the navigator's screen definition
const mockRoute = { key: "OrdersListKey", name: "OrdersList" as const };
const mockProps = {
  navigation: mockNavigation,
  route: mockRoute,
};

// --- Mock Data ---

/** Mock Order data for successful state tests. */
const mockOrders: Order[] = [
  {
    id: "1",
    drugName: "Lisinopril",
    dosage: "10mg",
    orderDate: new Date(2024, 0, 15), // Use specific Date objects for consistency
    orderNumber: "ORD111",
    status: OrderStatus.DELIVERED, // Use enum member
    shippingAddress: {
      street: "1 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
  },
  {
    id: "2",
    drugName: "Metformin",
    dosage: "500mg",
    orderDate: new Date(2024, 1, 20),
    orderNumber: "ORD222",
    status: OrderStatus.SHIPPED, // Use enum member
    trackingNumber: "1Z9999W99999999999", // Example tracking number
    shippingAddress: {
      street: "1 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
  },
];

/** Default state object to be returned by the mocked Zustand store. */
const defaultStoreState: AppDataState = {
  orders: mockOrders, // Use the mock orders data
  isLoading: false,
  error: null,
  // Include other state slices and actions for completeness
  userProfile: null,
  medicationReminders: [],
  prescriptions: [],
  setUserProfile: jest.fn(),
  setMedicationReminders: jest.fn(),
  setPrescriptions: jest.fn(),
  setOrders: jest.fn(),
  setError: jest.fn(),
  setLoading: jest.fn(),
};

// --- Tests ---

/**
 * Test suite for the OrdersScreen component.
 */
describe("OrdersScreen", () => {
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
   * @assertion Checks if the loading text is visible when `isLoading` is true and `orders` is empty.
   */
  it("renders loading indicator when loading and no orders", () => {
    // Arrange: Define loading state
    const loadingState: AppDataState = {
      ...defaultStoreState,
      isLoading: true,
      orders: [], // Ensure orders are empty for initial loading state
      error: null,
    };
    // Override mock implementation for this test
    mockUseAppDataStore.mockImplementation(
      (selector?: (state: AppDataState) => any) => {
        if (selector) {
          return selector(loadingState);
        }
        return loadingState;
      },
    );

    // Act: Render the component
    render(<OrdersScreen {...(mockProps as any)} />);

    // Assert: Check for loading text
    expect(screen.getByText("Loading Orders...")).toBeVisible();
  });

  /**
   * Test case: Renders error display correctly.
   * @assertion Checks if the error component and message are visible when `error` is present.
   */
  it("renders error display when there is an error", () => {
    // Arrange: Define error state
    const error = new Error("Failed to fetch orders");
    const errorState: AppDataState = {
      ...defaultStoreState,
      isLoading: false,
      error: error,
      orders: [], // Orders might be empty on error
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
    render(<OrdersScreen {...(mockProps as any)} />);

    // Assert: Check for error UI
    expect(screen.getByText("An Error Occurred")).toBeVisible(); // From ErrorDisplay
    expect(screen.getByText(error.message)).toBeVisible();
  });

  /**
   * Test case: Renders empty state message correctly.
   * @assertion Checks if the specific "No Orders Found" message is visible when `orders` array is empty after loading.
   */
  it("renders empty state message when no orders are available", () => {
    // Arrange: Define empty state
    const emptyState: AppDataState = {
      ...defaultStoreState,
      isLoading: false,
      orders: [], // Explicitly empty orders array
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
    render(<OrdersScreen {...(mockProps as any)} />);

    // Assert: Check for empty state text
    expect(screen.getByText("No Orders Found")).toBeVisible();
    expect(
      screen.getByText("You haven't placed any orders yet."), // Check secondary message
    ).toBeVisible();
  });

  /**
   * Test case: Renders the list of orders correctly when data is available.
   * @assertion Checks if details for both mock orders and the test button are visible.
   */
  it("renders the list of orders correctly", () => {
    // Arrange: Use default state from beforeEach

    // Act: Render
    render(<OrdersScreen {...(mockProps as any)} />);

    // Assert: Check details for the first mock order
    expect(
      screen.getByText(`${mockOrders[0].drugName} ${mockOrders[0].dosage}`),
    ).toBeVisible();
    expect(
      screen.getByText(
        `Order #${mockOrders[0].orderNumber} - ${mockOrders[0].status}`, // Check formatted status string
      ),
    ).toBeVisible();

    // Assert: Check details for the second mock order
    expect(
      screen.getByText(`${mockOrders[1].drugName} ${mockOrders[1].dosage}`),
    ).toBeVisible();
    expect(
      screen.getByText(
        `Order #${mockOrders[1].orderNumber} - ${mockOrders[1].status}`,
      ),
    ).toBeVisible();

    // Assert: Check for the hardcoded test button (if still present in component)
    // Using regex for flexibility with the button text
    expect(screen.getByText(/View Hardcoded Order 12345/i)).toBeVisible();
  });

  /**
   * Test case: Verifies navigation to OrderDetail screen when an order item is pressed.
   * @action Simulates pressing the first order item in the list.
   * @assertion Checks if `navigation.navigate` was called with "OrderDetail" and the correct `orderId`.
   */
  it("navigates to OrderDetail when an order item is pressed", () => {
    // Arrange
    render(<OrdersScreen {...(mockProps as any)} />);

    // Act: Find the first order item using its accessibility label and press it
    // Ensure the accessibilityLabel in the component matches this format.
    const firstOrderItem = screen.getByLabelText(
      `Order for ${mockOrders[0].drugName}, ${
        mockOrders[0].dosage
      }. Order number ${
        mockOrders[0].orderNumber
      }. Status: ${mockOrders[0].status}. Date: ${mockOrders[0].orderDate.toLocaleDateString()}. Press to view details.`,
    );
    fireEvent.press(firstOrderItem);

    // Assert: Check if navigation was called with the correct screen name and parameters
    expect(mockNavigation.navigate).toHaveBeenCalledWith("OrderDetail", {
      orderId: mockOrders[0].id, // Expecting the ID of the first mock order
    });
  });

  /**
   * Test case: Verifies navigation to OrderDetail screen when the hardcoded test button is pressed.
   * @action Simulates pressing the "View Hardcoded Order 12345" button.
   * @assertion Checks if `navigation.navigate` was called with "OrderDetail" and the hardcoded `orderId`.
   */
  it("navigates to OrderDetail when the hardcoded test button is pressed", () => {
    // Arrange
    render(<OrdersScreen {...(mockProps as any)} />);

    // Act: Find the button by text and press it
    const testButton = screen.getByText(/View Hardcoded Order 12345/i);
    fireEvent.press(testButton);

    // Assert: Check navigation call
    expect(mockNavigation.navigate).toHaveBeenCalledWith("OrderDetail", {
      orderId: "12345", // Expecting the hardcoded ID from the button's action
    });
  });
});
