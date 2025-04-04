/**
 * Prescriptions List Screen Component
 *
 * @file This file defines the React component for the "Prescriptions" screen in the SpeedyMeds app.
 * @module screens/PrescriptionsScreen
 *
 * @purpose This screen displays a list of the user's prescriptions. It allows users to view
 * their medication list and potentially search through it. It handles loading, error,
 * and empty states gracefully.
 *
 * @dependencies
 * - React (for component logic, state, memoization)
 * - React Native (for core UI elements like `FlatList`, `View`)
 * - React Native Paper (for UI components like `Text`, `List`, `Divider`, `Badge`, `Searchbar`, `useTheme`)
 * - styled-components/native (for creating custom styled components)
 * - @react-navigation/bottom-tabs (for navigation prop types)
 * - Zustand (`useAppDataStore`) (for accessing global application state)
 * - Internal:
 *   - `../navigation/types` (for navigation parameter list types)
 *   - `../theme/theme` (for `AppTheme` type definition)
 *   - `../theme/colors` (for base color definitions, used as a workaround)
 *   - `../stores/appDataStore` (hook to access prescription data, loading/error state)
 *   - `../types` (for `Prescription`, `PrescriptionSupplyStatus`, `PrescriptionAlert` types)
 *   - `../components/LoadingIndicator` (reusable loading component)
 *   - `../components/ErrorDisplay` (reusable error display component)
 *   - `../components/ScreenContainer` (reusable screen wrapper)
 *
 * @see {@link https://reactnative.dev/docs/flatlist | React Native FlatList}
 * @see {@link https://callstack.github.io/react-native-paper/ | React Native Paper Docs}
 * @see {@link https://styled-components.com/docs/basics#react-native | styled-components for React Native}
 * @see {@link https://reactnavigation.org/docs/typescript/ | React Navigation TypeScript Guide}
 * @see {@link https://github.com/pmndrs/zustand | Zustand State Management}
 * @see {@link ./stores/appDataStore.ts | Project's Zustand Store}
 * @see {@link ./types/index.ts | Project's Type Definitions}
 */

import React, { useState, useMemo } from "react"; // Import React hooks: useState for local state, useMemo for optimization
import { FlatList, View } from "react-native"; // Import core RN components: FlatList for efficient list rendering, View for layout
// Import UI components from React Native Paper library for Material Design elements
import {
  Text, // For displaying text
  List, // For list items and icons
  Divider, // For separating list items
  useTheme, // Hook to access the current theme (light/dark)
  Badge, // For small status indicators (like supply status)
  Searchbar, // Input component for searching
} from "react-native-paper";
// Import styled-components for creating theme-aware styled native components
import styled from "styled-components/native";
// Import navigation prop types for type safety with React Navigation
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { BottomTabParamList } from "../navigation/types"; // Defines the parameters for each tab screen
// Import the AppTheme type for strong typing when using theme properties
import type { AppTheme } from "../theme/theme";
// Import base colors directly. This is sometimes needed if theme types aren't perfectly inferred by styled-components or for specific logic.
import { colors as customColors } from "../theme/colors";
// Import the hook to access the global application data store (managed by Zustand)
import useAppDataStore from "../stores/appDataStore";
// Import the Prescription type and related enums for data structure consistency
import type { Prescription } from "../types";
import { PrescriptionSupplyStatus, PrescriptionAlert } from "../types"; // Enums provide named constants for status/alert types
// Import reusable custom components for common UI patterns
import LoadingIndicator from "../components/LoadingIndicator"; // Shows when data is loading
import ErrorDisplay from "../components/ErrorDisplay"; // Shows if an error occurs
import ScreenContainer from "../components/ScreenContainer"; // Provides consistent padding and background

// ============================================================================
// Navigation Props Type
// ============================================================================

/**
 * Defines the shape of the navigation props specifically for the PrescriptionsScreen.
 *
 * @description This type uses `BottomTabScreenProps` from React Navigation, which includes
 * both `navigation` (for navigating) and `route` (for route params) objects.
 * It's parameterized with `BottomTabParamList` (listing all tabs and their params)
 * and `"Prescriptions"` (the name of this specific screen route).
 * This ensures type safety when accessing navigation functions or route parameters.
 *
 * @typedef {BottomTabScreenProps<BottomTabParamList, "Prescriptions">} PrescriptionsScreenProps
 * @property navigation - The navigation object provided by React Navigation.
 * @property route - The route object containing information about the current route.
 * @see {@link https://reactnavigation.org/docs/typescript/#type-checking-screens | React Navigation: Type checking screens}
 */
type PrescriptionsScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Prescriptions" // This must match the screen name in MainTabNavigator
>;

// ============================================================================
// Styled Components
// ============================================================================
// Styled components allow us to write CSS-like styles directly within our JavaScript/TypeScript
// files, often using tagged template literals. They integrate well with themes.

/**
 * A styled `View` component specifically for holding an alert icon and its text.
 *
 * @description Arranges the icon and text horizontally (`flex-direction: row`) and
 * centers them vertically (`align-items: center`). Adds a small top margin using
 * spacing defined in the theme.
 * The `({ theme }: { theme: AppTheme })` syntax explicitly types the props object
 * passed to the style function, ensuring access to `theme.customSpacing`.
 */
const AlertContainer = styled(View)`
  flex-direction: row; /* Arrange children side-by-side */
  align-items: center; /* Align children vertically in the center */
  margin-top: ${({ theme }: { theme: AppTheme }) =>
    theme.customSpacing.xs}px; /* Add small space above */
`;

/**
 * A styled `Badge` component used to display the prescription supply status.
 *
 * @description This component extends React Native Paper's `Badge`. It dynamically sets
 * its `background-color` and text `color` based on the `status` prop passed to it,
 * ensuring visual distinction for critical or low supplies.
 *
 * @param {object} props - The props passed to the component.
 * @param {PrescriptionSupplyStatus} props.status - The supply status enum value.
 * @param {AppTheme} props.theme - The application theme object provided by the ThemeProvider.
 *
 * @example
 * <StatusBadge status={PrescriptionSupplyStatus.LOW} theme={currentTheme}>
 *   10 days left
 * </StatusBadge>
 */
// We explicitly define the props expected by our styled component's style functions.
// This includes the `status` we use for conditional styling and the `theme` provided by styled-components.
const StatusBadge = styled(Badge)<{
  status: PrescriptionSupplyStatus; // The supply status (e.g., OK, LOW, CRITICAL)
  theme: AppTheme; // The theme object for accessing colors and spacing
}>`
  margin-left: ${(props: { theme: AppTheme }) =>
    props.theme.customSpacing.s}px; /* Add space to the left */

  /* Dynamically set background color based on the 'status' prop */
  background-color: ${(props: {
    status: PrescriptionSupplyStatus;
    theme: AppTheme;
  }) => {
    switch (props.status) {
      case PrescriptionSupplyStatus.CRITICAL:
        // Use the theme's defined error color for critical status
        return props.theme.colors.error;
      case PrescriptionSupplyStatus.LOW:
        // Use a warning color for low status.
        // Workaround: Accessing base color directly as theme typing might be complex.
        // Ideally, the theme type would guarantee a 'warning' color.
        return customColors.warning;
      default: // PrescriptionSupplyStatus.OK or any other status
        // Use the theme's primary color for normal status
        return props.theme.colors.primary;
    }
  }};

  /* Dynamically set text color for good contrast against the background */
  color: ${(props: { status: PrescriptionSupplyStatus; theme: AppTheme }) => {
    switch (props.status) {
      case PrescriptionSupplyStatus.CRITICAL:
      case PrescriptionSupplyStatus.LOW:
        // Use the theme's 'onError' color if defined, otherwise fallback to a light text color.
        // This ensures text is readable on dark error/warning backgrounds.
        return props.theme.colors.onError ?? customColors.textLight;
      default: // PrescriptionSupplyStatus.OK
        // Use the theme's 'onPrimary' color if defined, otherwise fallback to a light text color.
        // This ensures text is readable on the primary background color.
        return props.theme.colors.onPrimary ?? customColors.textLight;
    }
  }};
`;

// ============================================================================
// Prescriptions Screen Component Definition
// ============================================================================

/**
 * The main functional component for the Prescriptions screen.
 *
 * @description This component orchestrates the display of the prescription list.
 * It fetches data from the Zustand store, handles loading/error/empty states,
 * manages the search query input, filters the displayed prescriptions based on the query,
 * and renders the list using `FlatList` and custom item components.
 *
 * @param {PrescriptionsScreenProps} _props - Component props provided by React Navigation.
 *        The underscore prefix indicates they are currently unused within the component body,
 *        but are destructured for type checking and potential future use.
 * @returns {React.ReactElement} The rendered UI for the Prescriptions screen.
 */
const PrescriptionsScreen: React.FC<PrescriptionsScreenProps> = (
  _props: PrescriptionsScreenProps, // Props are typed but currently unused
): React.ReactElement => {
  // --- State Management ---

  // Access global state slices from the Zustand store.
  // Using individual selectors like `state => state.prescriptions` is generally more performant
  // than selecting the entire state object (`state => state`), as it prevents re-renders
  // if unrelated parts of the state change.
  // See: https://github.com/pmndrs/zustand#selecting-multiple-state-slices
  const prescriptions = useAppDataStore((state) => state.prescriptions);
  const isLoading = useAppDataStore((state) => state.isLoading);
  const error = useAppDataStore((state) => state.error);

  // Access the current theme object (provided by PaperProvider via ThemeContext).
  // Explicitly typing the return value with `AppTheme` ensures we can safely access
  // our custom theme properties (like customSpacing).
  const theme: AppTheme = useTheme<AppTheme>();

  // Local state for the search bar input value.
  // `useState` returns a state variable (`searchQuery`) and a function to update it (`setSearchQuery`).
  // See: https://react.dev/reference/react/useState
  const [searchQuery, setSearchQuery] = useState<string>(""); // Initialize with an empty string

  // --- Data Processing ---

  // Memoized filtering of prescriptions based on the search query.
  // `useMemo` recalculates the `filteredPrescriptions` array *only* when `prescriptions` or `searchQuery` changes.
  // This prevents expensive filtering on every render, optimizing performance.
  // See: https://react.dev/reference/react/useMemo
  const filteredPrescriptions = useMemo<Prescription[]>(() => {
    // If the search query is empty, return the original full list.
    if (!searchQuery) {
      return prescriptions;
    }
    // Convert the query to lowercase for case-insensitive matching.
    const lowerCaseQuery = searchQuery.toLowerCase();
    // Filter the `prescriptions` array. Keep only items where the lowercase drug name
    // includes the lowercase search query.
    return prescriptions.filter((rx) =>
      rx.drugName.toLowerCase().includes(lowerCaseQuery),
    );
  }, [prescriptions, searchQuery]); // Dependencies: recalculate when these change

  // --- Helper Rendering Functions ---

  /**
   * Renders an alert message with an icon based on the prescription's alert status.
   *
   * @function renderAlert
   * @param {PrescriptionAlert} alertType - The type of alert (e.g., NONE, PRICE_RISING).
   * @param {AppTheme} theme - The current theme object (passed down to avoid hook calls in loops).
   * @param {number} [savingsAmount] - Optional amount for savings alerts.
   * @returns {React.ReactElement | null} A JSX element representing the alert, or null if no alert.
   */
  const renderAlert = (
    alertType: PrescriptionAlert,
    theme: AppTheme, // Receive theme as a parameter
    savingsAmount?: number,
  ): React.ReactElement | null => {
    let icon: string | null = null; // Icon name (from MaterialCommunityIcons)
    let message: string | null = null; // Alert text
    let color: string = theme.colors.onSurfaceVariant; // Default text/icon color

    switch (alertType) {
      case PrescriptionAlert.PRICE_RISING:
        icon = "trending-up"; // MaterialCommunityIcons name
        message = "Price may be rising";
        // Use warning color from theme (via direct access workaround)
        color = customColors.warning;
        break;
      case PrescriptionAlert.SAVINGS_AVAILABLE:
        icon = "currency-usd"; // MaterialCommunityIcons name
        message = `Save $${savingsAmount?.toFixed(2)} with alternative`; // Format savings amount
        color = theme.colors.primary; // Use primary color for informational alerts
        break;
      case PrescriptionAlert.NONE: // No alert
      default:
        return null; // Don't render anything if there's no alert
    }

    // Render the alert using the styled AlertContainer and Paper components
    return (
      <AlertContainer>
        {icon && ( // Only render icon if one is set
          <List.Icon
            icon={icon}
            color={color}
            style={{ margin: 0, padding: 0, marginRight: 4 }} // Adjust spacing
          />
        )}
        <Text variant="bodySmall" style={{ color: color }}>
          {message}
        </Text>
      </AlertContainer>
    );
  };

  /**
   * Renders a single prescription item component for the FlatList.
   *
   * @function renderPrescriptionItem
   * @param {object} listItemProps - The props provided by FlatList for each item.
   * @param {Prescription} listItemProps.item - The data object for the current prescription.
   * @returns {React.ReactElement} A JSX element representing one row in the prescription list.
   * @see {@link https://reactnative.dev/docs/flatlist#renderitem | FlatList renderItem prop}
   * @see {@link https://callstack.github.io/react-native-paper/docs/components/List/ListItem/ | Paper List.Item}
   * @see {@link https://callstack.github.io/react-native-paper/docs/components/Badge/ | Paper Badge}
   */
  const renderPrescriptionItem = ({
    item, // Destructure the 'item' data from the props passed by FlatList
  }: {
    item: Prescription; // Explicitly type the 'item' expected
  }): React.ReactElement => (
    <List.Item
      // Main title: Drug name and dosage
      title={`${item.drugName} ${item.dosage}`}
      // Description line: Patient name and refills remaining
      description={`Patient: ${item.patientName} | Refills: ${item.refillsRemaining}`}
      // Content displayed on the right side of the list item
      right={() => (
        // Use a View to group the badge and alert vertically
        <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
          {/* Display supply status using the custom styled StatusBadge */}
          <StatusBadge status={item.supplyStatus} theme={theme}>
            {item.daysSupplyRemaining} days left
          </StatusBadge>
          {/* Render the alert component below the badge, passing the theme */}
          {renderAlert(item.alert, theme, item.savingsAmount)}
        </View>
      )}
      // TODO: Implement onPress handler for navigating to a detailed view
      // onPress={() => navigation.navigate('PrescriptionDetail', { prescriptionId: item.id })}
      // Add an icon on the left side for visual structure
      left={(props) => <List.Icon {...props} icon="pill" />} // Uses Paper's List.Icon
      // Accessibility: Provide a descriptive label for screen readers
      accessibilityLabel={`Prescription for ${item.drugName}, ${item.dosage}. Patient: ${item.patientName}. Refills remaining: ${item.refillsRemaining}. Supply: ${item.daysSupplyRemaining} days left.`}
    />
  );

  // --- Conditional Rendering Logic ---

  // 1. Loading State: Show indicator if loading and no data is present yet.
  if (isLoading && prescriptions.length === 0) {
    return <LoadingIndicator message="Loading Prescriptions..." />;
  }

  // 2. Error State: Show error message if an error occurred.
  if (error) {
    // TODO: Implement a retry mechanism by passing a `retryAction` prop to ErrorDisplay
    // const handleRetry = () => { /* Logic to refetch data */ };
    return <ErrorDisplay error={error /* retryAction={handleRetry} */} />;
  }

  // 3. Empty State: Show message if not loading, no error, but no prescriptions found.
  if (!isLoading && prescriptions.length === 0) {
    return (
      <ScreenContainer>
        {/* Center the text elements */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="titleMedium" style={{ textAlign: "center" }}>
            No Prescriptions Found
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              marginTop: theme.customSpacing.s,
              textAlign: "center",
              color: theme.colors.onSurfaceVariant, // Use a slightly muted color
            }}
          >
            You currently have no prescriptions listed.
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  // 4. Success State: Render the search bar and the list of prescriptions.
  return (
    <ScreenContainer>
      {/* Search Bar Component */}
      {/* See: https://callstack.github.io/react-native-paper/docs/components/Searchbar/ */}
      <Searchbar
        placeholder="Search Prescriptions" // Placeholder text inside the bar
        onChangeText={setSearchQuery} // Update the searchQuery state when text changes
        value={searchQuery} // Control the input value with the state
        style={{ marginBottom: theme.customSpacing.s }} // Add space below the search bar
        accessibilityLabel="Search prescriptions by name or keyword" // For screen readers
        mode="view" // Use the newer 'view' mode for better styling consistency
        elevation={1} // Add subtle elevation
      />

      {/* Prescription List */}
      {/* See: https://reactnative.dev/docs/flatlist */}
      <FlatList
        data={filteredPrescriptions} // Use the memoized, filtered list data
        renderItem={renderPrescriptionItem} // Function to render each item
        keyExtractor={(item) => item.id} // Unique key for each item (important for performance)
        ItemSeparatorComponent={() => <Divider />} // Render a divider between items
        // Optional: Add padding inside the list scroll area
        // contentContainerStyle={{ paddingBottom: theme.customSpacing.l }}
        keyboardShouldPersistTaps="handled" // Dismiss keyboard when tapping outside input
      />
    </ScreenContainer>
  );
};

export default PrescriptionsScreen; // Export the component for use in the app navigator
