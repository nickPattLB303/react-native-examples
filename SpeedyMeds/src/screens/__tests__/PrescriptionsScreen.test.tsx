import React from "react";
import { screen, fireEvent } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render
import PrescriptionsScreen from "../PrescriptionsScreen";
import useAppDataStore from "../../stores/appDataStore";
import { PrescriptionSupplyStatus, PrescriptionAlert } from "../../types"; // Import enums

// --- Mocks ---

// Mock the Zustand store
jest.mock("../../stores/appDataStore");
const mockUseAppDataStore = useAppDataStore as jest.MockedFunction<
  typeof useAppDataStore
>;

// Mock navigation props
const mockNavigation = {
  // Add methods if needed
};
const mockRoute = { key: "PrescriptionsKey", name: "Prescriptions" as const };
const mockProps = {
  navigation: mockNavigation,
  route: mockRoute,
};

// Default mock state values
const mockPrescriptions = [
  {
    id: "rx1",
    drugName: "Atorvastatin",
    dosage: "20mg",
    daysSupplyRemaining: 85,
    supplyStatus: PrescriptionSupplyStatus.OK,
    patientName: "Test User",
    refillsRemaining: 3,
    alert: PrescriptionAlert.NONE,
  },
  {
    id: "rx2",
    drugName: "Amoxicillin",
    dosage: "500mg",
    daysSupplyRemaining: 5,
    supplyStatus: PrescriptionSupplyStatus.CRITICAL,
    patientName: "Test User",
    refillsRemaining: 0,
    alert: PrescriptionAlert.PRICE_RISING,
  },
];

const defaultStoreState = {
  prescriptions: mockPrescriptions,
  isLoading: false,
  error: null,
  // Include other state slices
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

describe("PrescriptionsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set default mock implementation using mockImplementation
    mockUseAppDataStore.mockImplementation((selector) => {
      if (selector) {
        return selector(defaultStoreState);
      }
      return defaultStoreState;
    });
  });

  it("renders loading indicator when loading and no prescriptions", () => {
    const loadingState = {
      ...defaultStoreState,
      isLoading: true,
      prescriptions: [],
    };
    mockUseAppDataStore.mockImplementation((selector) => {
      if (selector) {
        return selector(loadingState);
      }
      return loadingState;
    });
    render(<PrescriptionsScreen {...(mockProps as any)} />);
    expect(screen.getByText("Loading Prescriptions...")).toBeVisible();
  });

  it("renders error display when there is an error", () => {
    const error = new Error("Failed to fetch prescriptions");
    const errorState = {
      ...defaultStoreState,
      isLoading: false,
      error: error,
    };
    mockUseAppDataStore.mockImplementation((selector) => {
      if (selector) {
        return selector(errorState);
      }
      return errorState;
    });
    render(<PrescriptionsScreen {...(mockProps as any)} />);
    expect(screen.getByText("An Error Occurred")).toBeVisible();
    expect(screen.getByText(error.message)).toBeVisible();
  });

  it("renders empty state message when no prescriptions are available", () => {
    const emptyState = {
      ...defaultStoreState,
      isLoading: false,
      prescriptions: [],
    };
    mockUseAppDataStore.mockImplementation((selector) => {
      if (selector) {
        return selector(emptyState);
      }
      return emptyState;
    });
    render(<PrescriptionsScreen {...(mockProps as any)} />);
    // Search bar should NOT be visible in empty state based on current logic
    expect(screen.queryByPlaceholderText("Search Prescriptions")).toBeNull();
    expect(screen.getByText("No Prescriptions Found")).toBeVisible();
    expect(
      screen.getByText("You currently have no prescriptions listed."),
    ).toBeVisible();
  });

  it("renders the list of prescriptions and search bar correctly", () => {
    render(<PrescriptionsScreen {...(mockProps as any)} />);

    // Check for Searchbar
    expect(screen.getByPlaceholderText("Search Prescriptions")).toBeVisible();

    // Check for the first prescription details
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
    // Check for supply badge text
    expect(
      screen.getByText(`${mockPrescriptions[0].daysSupplyRemaining} days left`),
    ).toBeVisible();

    // Check for the second prescription details
    expect(
      screen.getByText(
        `${mockPrescriptions[1].drugName} ${mockPrescriptions[1].dosage}`,
      ),
    ).toBeVisible();
    // Check for alert text (rendered by renderAlert helper)
    expect(screen.getByText("Price may be rising")).toBeVisible();
  });

  it("updates search query state when text is entered in Searchbar", () => {
    render(<PrescriptionsScreen {...(mockProps as any)} />);
    const searchInput = screen.getByPlaceholderText("Search Prescriptions");
    const testQuery = "Atorva";

    fireEvent.changeText(searchInput, testQuery);

    // Check if the input value updated (reflecting state change)
    expect(searchInput.props.value).toBe(testQuery);
    // Note: This test doesn't check filtering logic, only that the state updates.
  });

  it("filters prescriptions based on search query", () => {
    render(<PrescriptionsScreen {...(mockProps as any)} />);
    const searchInput = screen.getByPlaceholderText("Search Prescriptions");

    // Initially, both prescriptions should be visible
    expect(screen.getByText(/Atorvastatin/)).toBeVisible();
    expect(screen.getByText(/Amoxicillin/)).toBeVisible();

    // Filter for "Atorva"
    fireEvent.changeText(searchInput, "Atorva");

    // Only Atorvastatin should be visible
    expect(screen.getByText(/Atorvastatin/)).toBeVisible();
    expect(screen.queryByText(/Amoxicillin/)).toBeNull();

    // Clear the search
    fireEvent.changeText(searchInput, "");

    // Both should be visible again
    expect(screen.getByText(/Atorvastatin/)).toBeVisible();
    expect(screen.getByText(/Amoxicillin/)).toBeVisible();
  });
});
