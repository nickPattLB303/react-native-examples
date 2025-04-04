/**
 * Account Screen Component
 *
 * @file This file defines the React component for the "Account" screen.
 * @module screens/AccountScreen
 *
 * @purpose Displays user account information (fetched from global state), profile details,
 * and provides navigation links (currently placeholders) to various account-related settings sections.
 * It handles loading and error states gracefully.
 *
 * @dependencies
 * - React: For component logic.
 * - React Native (`View`, `ScrollView`): For layout and scrolling.
 * - React Native Paper (`Text`, `Avatar`, `List`, `useTheme`): For UI elements and theming.
 * - styled-components/native: For creating custom styled components.
 * - Zustand (`useAppDataStore`): For accessing global user profile state, loading/error status.
 * - @react-navigation/bottom-tabs: For navigation prop types.
 * - Internal:
 *   - `../theme/theme`: For `AppTheme` type definition.
 *   - `../stores/appDataStore`: Hook to access the global store.
 *   - `../navigation/types`: For navigation parameter list types.
 *   - `../components/ScreenContainer`: Reusable screen wrapper.
 *   - `../components/LoadingIndicator`: Reusable loading component.
 *   - `../components/ErrorDisplay`: Reusable error display component.
 *   - `../components/ThemeSelector`: Reusable theme selection component.
 *
 * @see {@link https://callstack.github.io/react-native-paper/ | React Native Paper Docs}
 * @see {@link https://styled-components.com/docs/basics#react-native | styled-components for React Native}
 * @see {@link https://github.com/pmndrs/zustand | Zustand Documentation}
 * @see {@link ../stores/appDataStore.ts | Project's Zustand Store}
 */

import React from "react";
import { View, ScrollView } from "react-native"; // Core layout components
// Import UI components from React Native Paper library
import {
  Text, // For displaying text
  Avatar, // For user avatar/initials
  List, // For creating lists of items (settings links)
  useTheme, // Hook to access theme properties (colors, spacing)
} from "react-native-paper";
// Import styled-components for creating theme-aware styled native components
import styled from "styled-components/native";
// Import the AppTheme type for strong typing when using theme properties
import type { AppTheme } from "../theme/theme";
// Import the hook to access the global application data store (Zustand)
import useAppDataStore from "../stores/appDataStore";
// Import navigation prop types for type safety with React Navigation
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { BottomTabParamList } from "../navigation/types"; // Defines parameters for each tab
// Import reusable custom components
import ScreenContainer from "../components/ScreenContainer"; // Consistent screen padding/background
import LoadingIndicator from "../components/LoadingIndicator"; // Shows when loading
import ErrorDisplay from "../components/ErrorDisplay"; // Shows on error
import ThemeSelector from "../components/ThemeSelector"; // Import the new component

// ============================================================================
// Navigation Props Type
// ============================================================================

/**
 * Defines the shape of the navigation props specifically for the AccountScreen.
 *
 * @description Ensures type safety when accessing `navigation` or `route` props
 * provided by the BottomTabNavigator.
 * @typedef {BottomTabScreenProps<BottomTabParamList, "Account">} AccountScreenProps
 * @see {@link https://reactnavigation.org/docs/typescript/#type-checking-screens | React Navigation: Type checking screens}
 */
type AccountScreenProps = BottomTabScreenProps<BottomTabParamList, "Account">;

// ============================================================================
// Styled Components
// ============================================================================

/**
 * A styled `View` component for the top profile section containing the avatar and user info.
 *
 * @description Uses Flexbox (`align-items: center`) to center its children horizontally.
 * Applies large vertical padding and zero horizontal padding using theme spacing values.
 */
const ProfileSection = styled(View)`
  align-items: center; /* Center avatar and text horizontally */
  /* Apply large vertical padding, no horizontal padding */
  padding-vertical: ${({ theme }: { theme: AppTheme }) =>
    theme.customSpacing.l}px;
  padding-horizontal: 0;
`;

// ============================================================================
// Account Screen Component Definition
// ============================================================================

/**
 * The main functional component for the Account screen.
 *
 * @description This screen displays user profile information and provides links to
 * various account settings (currently placeholders). It fetches the user profile,
 * loading status, and error status from the global `useAppDataStore`. It handles
 * rendering loading indicators, error messages, or the main account view based on this state.
 * It also includes the theme selection component.
 *
 * @param {AccountScreenProps} _props - Navigation props provided by React Navigation.
 *        The underscore prefix indicates they are currently unused but included for type safety.
 * @returns {React.ReactElement} The rendered UI for the Account screen.
 */
const AccountScreen: React.FC<AccountScreenProps> = (
  _props: AccountScreenProps, // Props are typed but currently unused
): React.ReactElement => {
  // --- State and Theme Access ---

  // Access global state slices from the Zustand store.
  const { userProfile, isLoading, error } = useAppDataStore();

  // Access the theme object using the hook from React Native Paper.
  const theme = useTheme<AppTheme>();

  // --- Conditional Rendering Logic ---

  // 1. Loading State: Show indicator if data is loading AND profile isn't already loaded.
  if (isLoading && !userProfile) {
    return <LoadingIndicator message="Loading Account..." />;
  }

  // 2. Error State: Show error display if an error occurred.
  if (error) {
    // TODO: Implement a retry mechanism by passing a `retryAction` prop to ErrorDisplay
    return <ErrorDisplay error={error} />;
  }

  // 3. No Data State: Handle the edge case where loading finished, no error, but profile is still null.
  if (!userProfile) {
    return (
      <ScreenContainer>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No user profile data available.</Text>
        </View>
      </ScreenContainer>
    );
  }

  // --- Success State: Render Account Details ---

  // Prepare data for display
  const displayName = `${userProfile.firstName} (${userProfile.birthYear})`;
  // Get the first initial for the Avatar, defaulting to 'U' if name is missing/empty.
  const initial = userProfile.firstName?.charAt(0)?.toUpperCase() || "U";

  return (
    // Use ScreenContainer for consistent padding/background.
    // Use ScrollView to allow content to scroll if it exceeds screen height.
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false} // Hide the scroll bar
        contentContainerStyle={{ paddingBottom: theme.customSpacing.l }} // Ensure space at the bottom
      >
        {/* Profile Section */}
        <ProfileSection>
          {/* Avatar Component: Displays user initial */}
          <Avatar.Text
            size={70} // Define avatar size
            label={initial} // The text initial to display
            style={{ marginBottom: theme.customSpacing.s }} // Space below avatar
            accessibilityLabel={`Avatar for ${displayName}`} // Important for screen readers
          />
          {/* Display Name and Member ID */}
          <Text variant="titleLarge">{displayName}</Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onSurfaceVariant }} // Use a slightly muted color for secondary info
          >
            Member ID: {userProfile.memberId}
          </Text>
        </ProfileSection>

        {/* Settings List Section */}
        <List.Section>
          {/* Each List.Item represents a tappable row */}
          <List.Item
            title="Personal Information"
            left={(props) => <List.Icon {...props} icon="account-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Navigate to Personal Info screen")}
            accessibilityLabel="Navigate to Personal Information"
          />
          <List.Item
            title="Payment Methods"
            left={(props) => (
              <List.Icon {...props} icon="credit-card-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Navigate to Payment Methods screen")}
            accessibilityLabel="Navigate to Payment Methods"
          />
          <List.Item
            title="Communication Preferences"
            left={(props) => <List.Icon {...props} icon="email-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() =>
              console.log("Navigate to Communication Preferences screen")
            }
            accessibilityLabel="Navigate to Communication Preferences"
          />
          <List.Item
            title="Security"
            left={(props) => <List.Icon {...props} icon="lock-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Navigate to Security screen")}
            accessibilityLabel="Navigate to Security Settings"
          />
          <List.Item
            title="Help & Support"
            left={(props) => (
              <List.Icon {...props} icon="help-circle-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Navigate to Help & Support screen")}
            accessibilityLabel="Navigate to Help and Support"
          />
        </List.Section>
        {/* Theme Selector */}
        <ThemeSelector />
      </ScrollView>
    </ScreenContainer>
  );
};

export default AccountScreen; // Export the component for use in the navigator
