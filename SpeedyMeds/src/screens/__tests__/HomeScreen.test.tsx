import React from "react";
import { screen, fireEvent } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render
import HomeScreen from "../HomeScreen";
import useAppDataStore from "../../stores/appDataStore";
import { useThemeContext } from "../../context/ThemeContext";
import { lightTheme } from "../../theme/theme"; // Import a theme object

// --- Mocks ---

// Mock the Zustand store
jest.mock("../../stores/appDataStore");
const mockUseAppDataStore = useAppDataStore as jest.MockedFunction<
  typeof useAppDataStore
>;

// Mock the Theme context
jest.mock("../../context/ThemeContext");
const mockUseThemeContext = useThemeContext as jest.MockedFunction<
  typeof useThemeContext
>;

// Mock navigation props
const mockNavigation = {
  navigate: jest.fn(),
  // Add other navigation methods if needed by the component
};
const mockRoute = { key: "HomeScreenKey", name: "Home" as const }; // Route name must match BottomTabParamList
const mockProps = {
  navigation: mockNavigation,
  route: mockRoute,
};

// Default mock state values
const defaultStoreState = {
  userProfile: {
    firstName: "Test",
    lastNameInitial: "U",
    birthYear: 1990,
    memberId: "12345",
    balanceDue: 123.45, // Add balance if needed by component logic later
  },
  reminders: [
    { id: "1", name: "Morning Meds", time: "8:00 AM" },
    { id: "2", name: "Evening Meds", time: "8:00 PM" },
  ],
  isLoading: false,
  error: null,
};

const defaultThemeContextState = {
  themePreference: "system" as const,
  setThemePreference: jest.fn(),
  theme: lightTheme, // Provide a default theme object
  isDark: false,
};

// --- Tests ---

describe("HomeScreen", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Set default mock implementations
    mockUseAppDataStore.mockReturnValue(defaultStoreState);
    mockUseThemeContext.mockReturnValue(defaultThemeContextState);
  });

  it("renders loading indicator when loading and no profile", () => {
    mockUseAppDataStore.mockReturnValue({
      ...defaultStoreState,
      isLoading: true,
      userProfile: null, // Ensure profile is null for initial loading state
    });
    render(<HomeScreen {...(mockProps as any)} />);
    expect(screen.getByText("Loading Dashboard...")).toBeVisible();
  });

  it("renders error display when there is an error", () => {
    const error = new Error("Failed to fetch data");
    mockUseAppDataStore.mockReturnValue({
      ...defaultStoreState,
      isLoading: false,
      error: error,
    });
    render(<HomeScreen {...(mockProps as any)} />);
    expect(screen.getByText("An Error Occurred")).toBeVisible();
    expect(screen.getByText(error.message)).toBeVisible();
  });

  it("renders dashboard content correctly on successful load", () => {
    render(<HomeScreen {...(mockProps as any)} />);

    // Check welcome message
    expect(
      screen.getByText(
        `Welcome back, ${defaultStoreState.userProfile.firstName}!`,
      ),
    ).toBeVisible();

    // Check balance card (using accessibility label)
    expect(screen.getByLabelText(/Current account balance/i)).toBeVisible();

    // Check navigation cards (using accessibility label)
    expect(
      screen.getByLabelText(/Navigate to Prescriptions screen/i),
    ).toBeVisible();
    expect(screen.getByLabelText(/Navigate to Orders screen/i)).toBeVisible();
    expect(screen.getByLabelText(/Navigate to Delivery screen/i)).toBeVisible();
    expect(
      screen.getByLabelText(/Navigate to Resources screen/i),
    ).toBeVisible();

    // Check reminder list section title
    expect(screen.getByText("Medication Reminders")).toBeVisible();
    // Check specific reminder
    expect(screen.getByText(defaultStoreState.reminders[0].name)).toBeVisible();
    expect(
      screen.getByText(`Time: ${defaultStoreState.reminders[0].time}`),
    ).toBeVisible();

    // Check theme switcher buttons
    expect(screen.getByLabelText("Set light theme")).toBeVisible();
    expect(screen.getByLabelText("Set dark theme")).toBeVisible();
    expect(screen.getByLabelText("Set system theme setting")).toBeVisible();
  });

  it("navigates to Prescriptions when Prescriptions card is pressed", () => {
    render(<HomeScreen {...(mockProps as any)} />);
    const prescriptionsCard = screen.getByLabelText(
      /Navigate to Prescriptions screen/i,
    );
    fireEvent.press(prescriptionsCard);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Prescriptions");
  });

  it("navigates to Orders when Orders card is pressed", () => {
    render(<HomeScreen {...(mockProps as any)} />);
    const ordersCard = screen.getByLabelText(/Navigate to Orders screen/i);
    fireEvent.press(ordersCard);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Orders");
  });

  it("calls setThemePreference when a theme button is pressed", () => {
    render(<HomeScreen {...(mockProps as any)} />);
    const darkThemeButton = screen.getByLabelText("Set dark theme");
    fireEvent.press(darkThemeButton);
    expect(defaultThemeContextState.setThemePreference).toHaveBeenCalledWith(
      "dark",
    );
  });
});
