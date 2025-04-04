import React from "react";
import { screen, fireEvent } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render
import OrdersScreen from "../OrdersScreen";
import useAppDataStore from "../../stores/appDataStore";
import { OrderStatus } from "../../types"; // Import enum if needed for mock data

// --- Mocks ---

// Mock the Zustand store
jest.mock("../../stores/appDataStore");
const mockUseAppDataStore = useAppDataStore as jest.MockedFunction<
  typeof useAppDataStore
>;

// Mock navigation props
const mockNavigation = {
  navigate: jest.fn(),
};
// Route prop needs key and name matching the navigator's screen definition
const mockRoute = { key: "OrdersListKey", name: "OrdersList" as const };
const mockProps = {
  navigation: mockNavigation,
  route: mockRoute,
};

// Default mock state values
const mockOrders = [
  {
    id: "1",
    drugName: "Lisinopril",
    dosage: "10mg",
    orderDate: new Date(2024, 0, 15), // Use Date objects
    orderNumber: "ORD111",
    status: OrderStatus.DELIVERED,
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
    status: OrderStatus.SHIPPED,
    trackingNumber: "1Z9999W99999999999",
    shippingAddress: {
      street: "1 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
  },
];

const defaultStoreState = {
  orders: mockOrders,
  isLoading: false,
  error: null,
  // Include other state slices even if not directly used by this screen,
  // as the hook might select the whole state depending on implementation.
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

describe("OrdersScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set default mock implementations for Zustand store
    mockUseAppDataStore.mockReturnValue(defaultStoreState);
  });

  it("renders loading indicator when loading and no orders", () => {
    mockUseAppDataStore.mockReturnValue({
      ...defaultStoreState,
      isLoading: true,
      orders: [], // Ensure orders are empty for initial loading state
    });
    render(<OrdersScreen {...(mockProps as any)} />);
    expect(screen.getByText("Loading Orders...")).toBeVisible();
  });

  it("renders error display when there is an error", () => {
    const error = new Error("Failed to fetch orders");
    mockUseAppDataStore.mockReturnValue({
      ...defaultStoreState,
      isLoading: false,
      error: error,
    });
    render(<OrdersScreen {...(mockProps as any)} />);
    expect(screen.getByText("An Error Occurred")).toBeVisible(); // From ErrorDisplay
    expect(screen.getByText(error.message)).toBeVisible();
  });

  it("renders empty state message when no orders are available", () => {
    mockUseAppDataStore.mockReturnValue({
      ...defaultStoreState,
      isLoading: false,
      orders: [], // Empty orders array
    });
    render(<OrdersScreen {...(mockProps as any)} />);
    expect(screen.getByText("No Orders Found")).toBeVisible();
    expect(
      screen.getByText("You haven't placed any orders yet."),
    ).toBeVisible();
  });

  it("renders the list of orders correctly", () => {
    render(<OrdersScreen {...(mockProps as any)} />);

    // Check for the first order details
    expect(
      screen.getByText(`${mockOrders[0].drugName} ${mockOrders[0].dosage}`),
    ).toBeVisible();
    expect(
      screen.getByText(
        `Order #${mockOrders[0].orderNumber} - ${mockOrders[0].status}`,
      ),
    ).toBeVisible();

    // Check for the second order details
    expect(
      screen.getByText(`${mockOrders[1].drugName} ${mockOrders[1].dosage}`),
    ).toBeVisible();
    expect(
      screen.getByText(
        `Order #${mockOrders[1].orderNumber} - ${mockOrders[1].status}`,
      ),
    ).toBeVisible();

    // Check for the test button
    expect(screen.getByText(/View Hardcoded Order 12345/i)).toBeVisible();
  });

  it("navigates to OrderDetail when an order item is pressed", () => {
    render(<OrdersScreen {...(mockProps as any)} />);
    // Use the accessibility label added previously
    const firstOrderItem = screen.getByLabelText(
      `Order for ${mockOrders[0].drugName}, ${mockOrders[0].dosage}. Order number ${mockOrders[0].orderNumber}. Status: ${mockOrders[0].status}. Date: ${mockOrders[0].orderDate.toLocaleDateString()}. Press to view details.`,
    );
    fireEvent.press(firstOrderItem);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("OrderDetail", {
      orderId: mockOrders[0].id,
    });
  });

  it("navigates to OrderDetail when the hardcoded test button is pressed", () => {
    render(<OrdersScreen {...(mockProps as any)} />);
    const testButton = screen.getByText(/View Hardcoded Order 12345/i);
    fireEvent.press(testButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("OrderDetail", {
      orderId: "12345",
    });
  });
});
