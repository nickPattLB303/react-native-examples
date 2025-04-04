import React from "react";
import { screen, fireEvent } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render
import AccountScreen from "../AccountScreen";
import useAppDataStore from "../../stores/appDataStore";

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
const mockRoute = { key: "AccountKey", name: "Account" as const };
const mockProps = {
  navigation: mockNavigation,
  route: mockRoute,
};

// Default mock state values
const mockUserProfile = {
  firstName: "Test",
  lastNameInitial: "U",
  birthYear: 1990,
  memberId: "12345",
  balanceDue: 123.45,
};

const defaultStoreState = {
  userProfile: mockUserProfile,
  isLoading: false,
  error: null,
  // Include other state slices
  medicationReminders: [],
  prescriptions: [],
  orders: [],
  setUserProfile: jest.fn(),
  setMedicationReminders: jest.fn(),
  setPrescriptions: jest.fn(),
  setOrders: jest.fn(),
  setError: jest.fn(),
  setLoading: jest.fn(),
};

// Mock console.log
const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

// --- Tests ---

describe("AccountScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDataStore.mockReturnValue(defaultStoreState);
  });

  afterAll(() => {
    // Restore console.log mock
    consoleSpy.mockRestore();
  });

  it("renders loading indicator when loading and no profile", () => {
    mockUseAppDataStore.mockReturnValue({
      ...defaultStoreState,
      isLoading: true,
      userProfile: null,
    });
    render(<AccountScreen {...(mockProps as any)} />);
    expect(screen.getByText("Loading Account...")).toBeVisible();
  });

  it("renders error display when there is an error", () => {
    const error = new Error("Failed to fetch account");
    mockUseAppDataStore.mockReturnValue({
      ...defaultStoreState,
      isLoading: false,
      error: error,
    });
    render(<AccountScreen {...(mockProps as any)} />);
    expect(screen.getByText("An Error Occurred")).toBeVisible();
    expect(screen.getByText(error.message)).toBeVisible();
  });

  it("renders no data message when profile is null after load", () => {
    mockUseAppDataStore.mockReturnValue({
      ...defaultStoreState,
      isLoading: false,
      userProfile: null,
    });
    render(<AccountScreen {...(mockProps as any)} />);
    expect(screen.getByText("No user profile data available.")).toBeVisible();
  });

  it("renders profile info and list items correctly", () => {
    render(<AccountScreen {...(mockProps as any)} />);

    // Check profile info
    expect(
      screen.getByText(
        `${mockUserProfile.firstName} (${mockUserProfile.birthYear})`,
      ),
    ).toBeVisible();
    expect(
      screen.getByText(`Member ID: ${mockUserProfile.memberId}`),
    ).toBeVisible();
    expect(
      screen.getByLabelText(
        `Avatar for ${mockUserProfile.firstName} (${mockUserProfile.birthYear})`,
      ),
    ).toBeVisible();

    // Check list items
    expect(screen.getByText("Personal Information")).toBeVisible();
    expect(screen.getByText("Payment Methods")).toBeVisible();
    expect(screen.getByText("Communication Preferences")).toBeVisible();
    expect(screen.getByText("Security")).toBeVisible();
    expect(screen.getByText("Help & Support")).toBeVisible();

    // Check Log Out button
    expect(screen.getByRole("button", { name: /log out/i })).toBeVisible();
  });

  it("logs message when Personal Information item is pressed", () => {
    render(<AccountScreen {...(mockProps as any)} />);
    fireEvent.press(screen.getByText("Personal Information"));
    expect(consoleSpy).toHaveBeenCalledWith("Navigate to Personal Info screen");
  });

  // Add similar tests for other list items...

  it("logs message when Log Out button is pressed", () => {
    render(<AccountScreen {...(mockProps as any)} />);
    fireEvent.press(screen.getByRole("button", { name: /log out/i }));
    expect(consoleSpy).toHaveBeenCalledWith("Log Out action triggered");
  });
});
