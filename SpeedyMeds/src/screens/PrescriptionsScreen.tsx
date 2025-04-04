/**
 * Prescriptions List Screen Component
 *
 * This screen is intended to display a list of the user's current and past prescriptions.
 * Users might be able to view details, request refills, or manage settings related
 * to their prescriptions from here. Currently, it's a placeholder.
 *
 * @module screens/PrescriptionsScreen
 * @see stores/appDataStore - The Zustand store providing the prescriptions data.
 * @see types/index - Defines the `Prescription` type.
 */

import React, { useState } from "react";
import { FlatList, View } from "react-native"; // Import FlatList for list rendering (Keep View for renderPrescriptionItem)
// Import UI components from React Native Paper
import {
  Text,
  List,
  Divider,
  useTheme,
  Badge, // Import Badge for supply status
  Searchbar, // Import Searchbar
} from "react-native-paper";
// Import styled-components for creating theme-aware styled native components
import styled from "styled-components/native";
// Import navigation prop types
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { BottomTabParamList } from "../navigation/types";
// Import the AppTheme type for strong typing with styled-components and theme usage
import type { AppTheme } from "../theme/theme";
// Import base colors directly for workaround
import { colors as customColors } from "../theme/colors";
// Import the hook to access the global application data store (Zustand)
import useAppDataStore from "../stores/appDataStore";
// Import the Prescription type and related enums
import type { Prescription } from "../types";
import { PrescriptionSupplyStatus, PrescriptionAlert } from "../types";
// Import reusable components
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorDisplay from "../components/ErrorDisplay";
import ScreenContainer from "../components/ScreenContainer";

// ============================================================================
// Navigation Props Type
// ============================================================================

/**
 * @description Defines the navigation props expected by the PrescriptionsScreen.
 * Uses `BottomTabScreenProps` specific to its position within the `MainTabNavigator`.
 * @typedef {BottomTabScreenProps<BottomTabParamList, "Prescriptions">} PrescriptionsScreenProps
 */
type PrescriptionsScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Prescriptions"
>;

// ============================================================================
// Styled Components
// ============================================================================

// Local styled components for this screen specifically

/**
 * @description Styled View to hold the alert badge and text, aligning them horizontally.
 */
const AlertContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.xs}px;
`;

/**
 * @description Styled Badge component for displaying supply status with appropriate background color.
 */
// Explicitly type the props expected by the styled component's interpolated functions
const StatusBadge = styled(Badge)<{
  status: PrescriptionSupplyStatus; // Expect a 'status' prop of type PrescriptionSupplyStatus
  theme: AppTheme;
}>`
  margin-left: ${(props: { theme: AppTheme }) => props.theme.customSpacing.s}px;
  /* Conditionally set background color based on status */
  background-color: ${(props: {
    status: PrescriptionSupplyStatus;
    theme: AppTheme;
  }) => {
    switch (props.status) {
      case PrescriptionSupplyStatus.CRITICAL:
        return props.theme.colors.error;
      case PrescriptionSupplyStatus.LOW:
        // Access warning color from the AppTheme type
        // Workaround: Access base warning color directly
        return customColors.warning;
      default:
        return props.theme.colors.primary;
    }
  }};
  /* Ensure text color contrasts well */
  color: ${(props: { status: PrescriptionSupplyStatus; theme: AppTheme }) => {
    switch (props.status) {
      case PrescriptionSupplyStatus.CRITICAL:
      case PrescriptionSupplyStatus.LOW:
        // Access textLight color from the AppTheme type
        // Assuming textLight is white in our custom colors
        // Workaround: Access base textLight color directly
        return props.theme.colors.onError ?? customColors.textLight;
      default:
        // Use onPrimary or similar for default status background
        // Access textLight color from the AppTheme type
        // Workaround: Access base textLight color directly
        return props.theme.colors.onPrimary ?? customColors.textLight;
    }
  }};
`;

// ============================================================================
// Prescriptions Screen Component
// ============================================================================

/**
 * @description Screen component responsible for displaying a list of the user's prescriptions.
 * It retrieves the prescriptions list, loading status, and error status from the
 * global `useAppDataStore` (Zustand). It renders the list using `FlatList`.
 *
 * **Future Enhancements:**
 *   - Implement navigation to a detailed prescription view.
 *   - Add functionality for refill requests.
 *   - Implement filtering or sorting options.
 *
 * @param {PrescriptionsScreenProps} props - Component props provided by React Navigation.
 *        Currently unused but included for completeness.
 * @returns {React.ReactElement} The rendered Prescriptions list screen UI.
 */
const PrescriptionsScreen: React.FC<PrescriptionsScreenProps> = (
  _props: PrescriptionsScreenProps,
) => {
  // Access the global state from the Zustand store using individual selectors.
  // This prevents unnecessary re-renders caused by creating new objects in the selector.
  const prescriptions = useAppDataStore((state) => state.prescriptions);
  const isLoading = useAppDataStore((state) => state.isLoading);
  const error = useAppDataStore((state) => state.error);

  // Access the theme object.
  // Access the theme object, explicitly providing the AppTheme type to the hook.
  const theme: AppTheme = useTheme<AppTheme>();
  // State for the search query
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * @description Renders the alert icon and text based on the prescription's alert status.
   * @param {PrescriptionAlert} alertType - The type of alert for the prescription.
   * @param {number | undefined} savingsAmount - The potential savings amount.
   * @returns {React.ReactElement | null} The rendered alert component or null if no alert.
   */
  const renderAlert = (
    alertType: PrescriptionAlert, // The type of alert
    theme: AppTheme, // Pass the theme object for color access
    savingsAmount?: number, // Optional savings amount
  ): React.ReactElement | null => {
    // Use the passed theme object
    // No need to call useTheme again here, use the passed theme object
    let icon: string | null = null;
    let message: string | null = null;
    let color: string = theme.colors.onSurfaceVariant; // Default color

    switch (alertType) {
      case PrescriptionAlert.PRICE_RISING:
        icon = "trending-up"; // Example icon
        message = "Price may be rising";
        // Access warning color from our AppTheme
        // Access warning color from the passed AppTheme object
        // Workaround: Access base warning color directly
        color = customColors.warning;
        break;
      case PrescriptionAlert.SAVINGS_AVAILABLE:
        icon = "currency-usd"; // Example icon
        message = `Save $${savingsAmount?.toFixed(2)} with alternative`;
        color = theme.colors.primary; // Use primary/info color
        break;
      case PrescriptionAlert.NONE:
      default:
        return null; // No alert to render
    }

    return (
      <AlertContainer>
        <List.Icon
          icon={icon}
          color={color}
          style={{ margin: 0, padding: 0 }}
        />
        <Text variant="bodySmall" style={{ color: color, marginLeft: 4 }}>
          {message}
        </Text>
      </AlertContainer>
    );
  };

  /**
   * @description Renders a single prescription item within the FlatList.
   * Uses React Native Paper's List.Item and Badge for styling.
   * @param {object} props - Props containing the item data.
   * @param {Prescription} props.item - The prescription data object for the current row.
   * @returns {React.ReactElement} The rendered list item component.
   */
  const renderPrescriptionItem = ({
    item,
  }: {
    item: Prescription;
  }): React.ReactElement => (
    <List.Item
      title={`${item.drugName} ${item.dosage}`}
      description={`Patient: ${item.patientName} | Refills: ${item.refillsRemaining}`}
      // Display supply status using a Badge
      right={() => (
        <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
          <StatusBadge status={item.supplyStatus} theme={theme}>
            {item.daysSupplyRemaining} days left
          </StatusBadge>
          {/* Render alert info below the badge if applicable, passing the theme */}
          {renderAlert(item.alert, theme, item.savingsAmount)}
        </View>
      )}
      // TODO: Implement onPress to navigate to a detail screen if needed
      // onPress={() => console.log('Navigate to detail for:', item.id)}
      // Add a left icon for visual flair
      left={(props) => <List.Icon {...props} icon="pill" />}
    />
  );

  // --- Loading State ---
  if (isLoading && prescriptions.length === 0) {
    // Use the reusable LoadingIndicator component
    return <LoadingIndicator message="Loading Prescriptions..." />;
  }

  // --- Error State ---
  if (error) {
    // Use the reusable ErrorDisplay component
    // TODO: Implement retry mechanism by passing a retryAction prop
    return <ErrorDisplay error={error} />;
  }

  // --- Empty State ---
  if (!isLoading && prescriptions.length === 0) {
    // Use ScreenContainer for consistent padding/background
    // Center content using inline styles for now
    return (
      <ScreenContainer>
        {/* Add Searchbar */}
        <Searchbar
          placeholder="Search Prescriptions"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ marginBottom: theme.customSpacing.s }}
          // TODO: Implement filtering logic based on searchQuery
        />
        <Text
          variant="titleMedium"
          style={{ textAlign: "center", alignSelf: "center" }}
        >
          No Prescriptions Found
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            marginTop: theme.customSpacing.s,
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          You currently have no prescriptions listed.
        </Text>
      </ScreenContainer>
    );
  }

  // --- Success State (Render Prescription List) ---
  return (
    <ScreenContainer>
      <FlatList
        data={prescriptions}
        renderItem={renderPrescriptionItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />} // Add dividers between items
        // Add padding to the content container if needed
        // contentContainerStyle={{ paddingVertical: theme.customSpacing.s }}
      />
    </ScreenContainer>
  );
};

export default PrescriptionsScreen;
