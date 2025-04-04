/**
 * Home Screen (Dashboard) Component
 *
 * @file This file defines the React component for the main "Home" or dashboard screen.
 * @module screens/HomeScreen
 *
 * @purpose Serves as the primary landing screen after app launch (assuming user is logged in).
 * It displays a personalized welcome message, summary information (like balance),
 * quick navigation cards to other sections, medication reminders, and theme controls.
 *
 * @dependencies
 * - React: For component logic.
 * - React Native (`View`, `ScrollView`): For layout and scrolling.
 * - React Native Paper (`Text`, `SegmentedButtons`, `Card`, `List`, `Avatar`): For UI elements.
 * - Internal:
 *   - `../context/ThemeContext`: Hook (`useThemeContext`) to access and modify theme state.
 *   - `../types`: For `ThemePreference`, `MedicationReminder` types.
 *   - `../navigation/types`: For navigation prop types (`BottomTabScreenProps`, `BottomTabParamList`).
 *   - `../components/ScreenContainer`: Reusable screen wrapper.
 *   - `../components/LoadingIndicator`: Reusable loading component.
 *   - `../components/ErrorDisplay`: Reusable error display component.
 *   - `../stores/appDataStore`: Hook (`useAppDataStore`) to access global state (profile, reminders, loading/error).
 *
 * @see {@link ../context/ThemeContext.ts | Theme Context}
 * @see {@link ../stores/appDataStore.ts | App Data Store (Zustand)}
 */

import React from "react";
import { View, ScrollView } from "react-native"; // Core layout components
// Import UI components from React Native Paper
import {
  Text, // For displaying text
  Card, // Used for balance display and navigation links
  List, // Used for displaying reminders
  Avatar, // Used for icons within Cards and List items
} from "react-native-paper";
// Import the custom hook to access the theme context
import { useThemeContext } from "../context/ThemeContext";
// Import the type definition for theme preference values ('light', 'dark', 'system')
import type { ThemePreference } from "../context/ThemeContext";
import type { MedicationReminder } from "../types"; // Type for reminder data structure
// Import navigation prop types for type safety
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { BottomTabParamList } from "../navigation/types"; // Defines parameters for each tab
// Import reusable custom components
import ScreenContainer from "../components/ScreenContainer"; // Consistent screen padding/background
import LoadingIndicator from "../components/LoadingIndicator"; // Shows when loading
import ErrorDisplay from "../components/ErrorDisplay"; // Shows on error
// Import the hook to access the global application data store (Zustand)
import useAppDataStore from "../stores/appDataStore";

// ============================================================================
// Navigation Props Type
// ============================================================================

/**
 * Defines the shape of the navigation props specifically for the HomeScreen.
 *
 * @description Ensures type safety when accessing `navigation` or `route` props
 * provided by the BottomTabNavigator.
 * @typedef {BottomTabScreenProps<BottomTabParamList, "Home">} HomeScreenProps
 * @see {@link https://reactnavigation.org/docs/typescript/#type-checking-screens | React Navigation: Type checking screens}
 */
type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, "Home">;

// ============================================================================
// Home Screen Component Definition
// ============================================================================

/**
 * The main functional component for the Home screen (Dashboard).
 *
 * @description Displays a welcome message, summary cards (balance, navigation),
 * a list of medication reminders, and theme selection controls. It fetches required data
 * (user profile, reminders, loading/error state) from the global `useAppDataStore` and
 * theme information from `useThemeContext`. Handles loading and error states.
 *
 * @param {HomeScreenProps} props - Navigation props provided by React Navigation.
 *        Specifically uses `props.navigation` for navigating when cards are pressed.
 * @returns {React.ReactElement} The rendered UI for the Home screen.
 */
const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation, // Destructure navigation prop for use
}): React.ReactElement => {
  // --- State and Context Access ---

  // Get theme state and functions from the ThemeContext
  const { themePreference, setThemePreference, theme } = useThemeContext();

  // Get required data slices from the global Zustand store using selectors
  // Using selectors ensures the component only re-renders if these specific slices change.
  const userProfile = useAppDataStore((state) => state.userProfile);
  const reminders = useAppDataStore((state) => state.medicationReminders); // Correct state slice name
  const isLoading = useAppDataStore((state) => state.isLoading);
  const error = useAppDataStore((state) => state.error);

  // --- Conditional Rendering: Loading and Error States ---

  // Show loading indicator only on initial load (when profile isn't available yet)
  if (isLoading && !userProfile) {
    return <LoadingIndicator message="Loading Dashboard..." />;
  }

  // Show error display if fetching data failed
  if (error) {
    // TODO: Implement a retry mechanism by passing a `retryAction` prop
    return <ErrorDisplay error={error} />;
  }

  // --- Success State: Render Dashboard ---
  // Assumes userProfile is loaded if we reach this point without loading/error
  return (
    <ScreenContainer>
      {/* Use ScrollView to allow content to scroll if it exceeds screen height */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Message */}
        <Text
          variant="headlineMedium" // Use semantic typography variant
          style={{ marginBottom: theme.customSpacing.s }} // Add space below heading
        >
          {/* Display user's first name, fallback to "User" if profile is somehow null */}
          Welcome back, {userProfile?.firstName ?? "User"}!
        </Text>

        {/* Balance Display Card (Placeholder Data) */}
        <Card
          mode="elevated" // Add shadow elevation
          style={{ marginBottom: theme.customSpacing.m }} // Space below card
          // Accessibility: Announce the purpose and content of the card
          accessibilityLabel="Current account balance: $123.45" // Hardcoded placeholder value
        >
          <Card.Title
            title="Current Balance"
            subtitle="$123.45" // Hardcoded placeholder value
            // Add an icon to the left of the title/subtitle
            left={(props) => <Avatar.Icon {...props} icon="wallet" />}
          />
        </Card>

        {/* Quick Navigation Cards Section */}
        {/* Row 1: Prescriptions & Orders */}
        <View
          style={{
            flexDirection: "row", // Arrange cards horizontally
            justifyContent: "space-between", // Distribute space between cards
            marginBottom: theme.customSpacing.m, // Space below the row
          }}
        >
          {/* Prescriptions Card */}
          <Card
            mode="outlined" // Use outlined style for navigation cards
            style={{ flex: 1, marginRight: theme.customSpacing.xs }} // Take up half space, add right margin
            onPress={() => navigation.navigate("Prescriptions")} // Navigate on press
            accessibilityRole="button" // Indicate it's interactive
            accessibilityLabel="Navigate to Prescriptions screen" // Clear label for screen readers
          >
            <Card.Content style={{ alignItems: "center" }}>
              <Avatar.Icon size={40} icon="pill" />
              <Text
                variant="labelMedium"
                style={{ marginTop: theme.customSpacing.xs }}
              >
                Prescriptions
              </Text>
            </Card.Content>
          </Card>
          {/* Orders Card */}
          <Card
            mode="outlined"
            style={{ flex: 1, marginLeft: theme.customSpacing.xs }} // Take up half space, add left margin
            onPress={() => navigation.navigate("Orders")} // Navigate on press
            accessibilityRole="button"
            accessibilityLabel="Navigate to Orders screen"
          >
            <Card.Content style={{ alignItems: "center" }}>
              <Avatar.Icon size={40} icon="receipt" />
              <Text
                variant="labelMedium"
                style={{ marginTop: theme.customSpacing.xs }}
              >
                Orders
              </Text>
            </Card.Content>
          </Card>
        </View>
        {/* Row 2: Delivery & Resources (Placeholders) */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: theme.customSpacing.l, // Larger margin below second row
          }}
        >
          {/* Delivery Card (Placeholder) */}
          <Card
            mode="outlined"
            style={{ flex: 1, marginRight: theme.customSpacing.xs }}
            // onPress={() => { /* TODO: Navigate to Delivery */ }} // No action yet
            accessibilityRole="button"
            // Indicate that this feature is not yet implemented for accessibility
            accessibilityLabel="Navigate to Delivery screen (Not implemented)"
          >
            <Card.Content style={{ alignItems: "center" }}>
              <Avatar.Icon size={40} icon="truck-delivery" />
              <Text
                variant="labelMedium"
                style={{ marginTop: theme.customSpacing.xs }}
              >
                Delivery
              </Text>
            </Card.Content>
          </Card>
          {/* Resources Card (Placeholder) */}
          <Card
            mode="outlined"
            style={{ flex: 1, marginLeft: theme.customSpacing.xs }}
            // onPress={() => { /* TODO: Navigate to Resources */ }} // No action yet
            accessibilityRole="button"
            accessibilityLabel="Navigate to Resources screen (Not implemented)"
          >
            <Card.Content style={{ alignItems: "center" }}>
              <Avatar.Icon size={40} icon="help-circle" />
              <Text
                variant="labelMedium"
                style={{ marginTop: theme.customSpacing.xs }}
              >
                Resources
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Medication Reminders Section */}
        <List.Section title="Medication Reminders">
          {/* Check if there are any reminders */}
          {reminders.length > 0 ? (
            // If yes, map over them and render a List.Item for each
            reminders.map((reminder: MedicationReminder) => (
              <List.Item
                key={reminder.id} // Unique key for each list item
                title={reminder.name} // Display reminder name
                description={`Time: ${reminder.time}`} // Display reminder time
                // Add an icon to the left
                left={(props) => <List.Icon {...props} icon="alarm-check" />}
                // Accessibility label for the reminder item
                accessibilityLabel={`Medication reminder: ${reminder.name}, Time: ${reminder.time}`}
              />
            ))
          ) : (
            // If no reminders, display a message
            <Text
              style={{
                paddingLeft: theme.customSpacing.m, // Indent text slightly
                fontStyle: "italic", // Italicize for emphasis
                color: theme.colors.onSurfaceVariant, // Use a muted color
              }}
            >
              No reminders set.
            </Text>
          )}
        </List.Section>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen; // Export the component for use in the navigator
