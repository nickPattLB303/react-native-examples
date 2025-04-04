/**
 * Home Screen (Dashboard) Component
 *
 * This is the main landing screen of the application after the user is authenticated (implicitly, in this version).
 * It typically displays summary information, quick actions, or serves as a central navigation point.
 * Currently, it displays a welcome message and provides controls to change the application theme.
 *
 * @module screens/HomeScreen
 * @see screens/AccountScreen - Example of another screen using similar patterns.
 * @see context/ThemeContext - Context providing theme state and functions.
 */

import React from "react";
import { View, ScrollView } from "react-native";
// Import UI components from React Native Paper
import { Text, SegmentedButtons, Card, List, Avatar } from "react-native-paper";
// Import styled-components for creating theme-aware styled native components
import styled from "styled-components/native";
// Import the custom hook to access the theme context
import { useThemeContext } from "../context/ThemeContext";
// Import the type definition for theme preference values
import type { ThemePreference } from "../context/ThemeContext";
import type { MedicationReminder } from "../types"; // Import reminder type
// Import the AppTheme type for strong typing with styled-components and theme usage
import type { AppTheme } from "../theme/theme";
// Import navigation prop types (even if not used directly, good practice for screen components)
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { BottomTabParamList } from "../navigation/types";
// Import reusable components
import ScreenContainer from "../components/ScreenContainer";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorDisplay from "../components/ErrorDisplay";
// Import the hook to access the global application data store (Zustand)
import useAppDataStore from "../stores/appDataStore";

// ============================================================================
// Navigation Props Type
// ============================================================================

/**
 * @description Defines the navigation props expected by the HomeScreen.
 * Uses `BottomTabScreenProps` specific to its position within the `MainTabNavigator`.
 * @typedef {BottomTabScreenProps<BottomTabParamList, "Home">} HomeScreenProps
 */
type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, "Home">;

// ============================================================================
// Styled Components
// ============================================================================

/**
 * @description A styled `View` component serving as the main container for the screen content.
 * It ensures the container takes up the full screen height (`flex: 1`), centers its children
 * both horizontally (`align-items: center`) and vertically (`justify-content: center`),
 * applies standard padding from the theme, and sets the background color based on the theme.
 *
 * Note: The explicit `{ theme: AppTheme }` typing for the `theme` prop within the template literal
 * is a robust way to ensure TypeScript provides correct autocompletion and type checking,
 * even if global `styled-components` theme typing (`styled.d.ts`) is set up.
 */

// ============================================================================
// Home Screen Component
// ============================================================================

/**
 * @description The main dashboard/home screen component. Displays user info,
 * balance, navigation cards, reminders, and theme controls.
 * Fetches data from the global Zustand store.
 *
 * @param {HomeScreenProps} props - Navigation props provided by React Navigation.
 *        Currently unused but included for completeness and future potential use.
 * @returns {React.ReactElement} The rendered Home screen UI.
 */
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Destructure values from the theme context using the custom hook.
  const { themePreference, setThemePreference, theme } = useThemeContext(); // Get theme from context
  // Fetch required data slices from Zustand store
  const userProfile = useAppDataStore((state) => state.userProfile);
  const reminders = useAppDataStore((state) => state.medicationReminders);
  const isLoading = useAppDataStore((state) => state.isLoading);
  const error = useAppDataStore((state) => state.error);

  // --- Handle Loading and Error States ---
  if (isLoading && !userProfile) {
    // Show loading indicator only on initial load when profile isn't available yet
    return <LoadingIndicator message="Loading Dashboard..." />;
  }

  if (error) {
    // Show error display if fetching failed
    // TODO: Add retry mechanism
    return <ErrorDisplay error={error} />;
  }

  // --- Render Dashboard Content ---
  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Message */}
        <Text
          variant="headlineMedium"
          style={{ marginBottom: theme.customSpacing.s }}
        >
          Welcome back, {userProfile?.firstName ?? "User"}!
        </Text>

        {/* Balance Display (Placeholder) */}
        <Card mode="elevated" style={{ marginBottom: theme.customSpacing.m }}>
          <Card.Title
            title="Current Balance"
            subtitle="$123.45" // Placeholder value
            left={(props) => <Avatar.Icon {...props} icon="wallet" />}
          />
        </Card>

        {/* Navigation Cards (Placeholder Structure) */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: theme.customSpacing.m,
          }}
        >
          <Card
            mode="outlined"
            style={{ flex: 1, marginRight: theme.customSpacing.xs }}
            onPress={() => navigation.navigate("Prescriptions")} // Navigate to Prescriptions tab
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
          <Card
            mode="outlined"
            style={{ flex: 1, marginLeft: theme.customSpacing.xs }}
            onPress={() => navigation.navigate("Orders")} // Navigate to Orders tab
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: theme.customSpacing.l,
          }}
        >
          <Card
            mode="outlined"
            style={{ flex: 1, marginRight: theme.customSpacing.xs }}
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
          <Card
            mode="outlined"
            style={{ flex: 1, marginLeft: theme.customSpacing.xs }}
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

        {/* Medication Reminders */}
        <List.Section title="Medication Reminders">
          {reminders.length > 0 ? (
            reminders.map((reminder: MedicationReminder) => (
              <List.Item
                key={reminder.id}
                title={reminder.name} // Use the correct property 'name'
                description={`Time: ${reminder.time}`} // Use the correct property 'time'
                left={(props) => <List.Icon {...props} icon="alarm-check" />}
              />
            ))
          ) : (
            <Text
              style={{
                paddingLeft: theme.customSpacing.m,
                fontStyle: "italic",
              }}
            >
              No reminders set.
            </Text>
          )}
        </List.Section>

        {/* Theme selection buttons (Kept at the bottom for now) */}
        <SegmentedButtons
          value={themePreference}
          onValueChange={(value) =>
            setThemePreference(value as ThemePreference)
          }
          buttons={[
            {
              value: "light",
              label: "Light",
              icon: "brightness-5",
              accessibilityLabel: "Set light theme",
            },
            {
              value: "dark",
              label: "Dark",
              icon: "brightness-4",
              accessibilityLabel: "Set dark theme",
            },
            {
              value: "system",
              label: "System",
              icon: "brightness-auto",
              accessibilityLabel: "Use system theme setting",
            },
          ]}
          style={{
            marginTop: theme.customSpacing.l,
            marginBottom: theme.customSpacing.m,
          }}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;
