/**
 * Account Screen Component
 *
 * Displays user account information, profile details, and provides navigation
 * to various account-related settings sections. It fetches the necessary user data
 * from the global Zustand store.
 *
 * @module screens/AccountScreen
 * @see https://callstack.github.io/react-native-paper/ - React Native Paper documentation (for UI components)
 * @see https://styled-components.com/docs/basics#react-native - Styled Components for React Native
 * @see https://github.com/pmndrs/zustand - Zustand documentation (for state management)
 */

import React from "react";
import { View, ScrollView } from "react-native";
// Import UI components from React Native Paper library
import {
  Text,
  Avatar,
  List,
  Button,
  useTheme, // Hook to access theme properties easily
} from "react-native-paper";
// Import styled-components for creating theme-aware styled native components
import styled from "styled-components/native";
// Import the AppTheme type for strong typing with styled-components
import type { AppTheme } from "../theme/theme";
// Import the hook to access the global application data store (Zustand)
import useAppDataStore from "../stores/appDataStore";
// Import navigation prop types
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { BottomTabParamList } from "../navigation/types";
// Import reusable components
import ScreenContainer from "../components/ScreenContainer";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorDisplay from "../components/ErrorDisplay";

// ============================================================================
// Navigation Props Type
// ============================================================================

/**
 * @description Defines the navigation props expected by the AccountScreen.
 * Uses `BottomTabScreenProps` specific to its position within the `MainTabNavigator`.
 * @typedef {BottomTabScreenProps<BottomTabParamList, "Account">} AccountScreenProps
 */
type AccountScreenProps = BottomTabScreenProps<BottomTabParamList, "Account">;

// ============================================================================
// Styled Components
// ============================================================================

// Local styled components for this screen specifically
/**
 * @description A styled `View` specifically for the top profile section.
 * Centers the avatar and text, adds vertical padding using theme spacing.
 */
const ProfileSection = styled(View)`
  align-items: center; /* Center items horizontally */
  /* Apply large vertical padding, no horizontal padding */
  padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.l}px 0;
`;

// ============================================================================
// Account Screen Component
// ============================================================================

/**
 * @description Screen component for displaying user account information and settings.
 * It retrieves user profile data, loading status, and error status from the
 * global `useAppDataStore` (Zustand). It displays loading/error indicators or
 * the user's profile and navigation options.
 *
 * @param {AccountScreenProps} props - Navigation props provided by React Navigation.
 *        While not explicitly used in this version, including them is good practice.
 * @returns {React.ReactElement} The rendered Account screen UI.
 */
const AccountScreen: React.FC<AccountScreenProps> = (
  _props: AccountScreenProps, // Prefix with _ if props aren't used directly yet
) => {
  // Access the global state and actions from the Zustand store.
  // This hook subscribes the component to changes in these specific state slices.
  // Using selectors like `(state) => state.userProfile` is generally preferred for performance,
  // but selecting the whole object is acceptable if multiple slices are needed.
  // Consider using `shallow` comparison if selecting multiple properties in one go:
  // const { userProfile, isLoading, error } = useAppDataStore(state => ({ ... }), shallow);
  const { userProfile, isLoading, error } = useAppDataStore();

  // Access the theme object directly using the hook from React Native Paper
  // This is useful for accessing theme properties outside styled-components if needed.
  const theme = useTheme<AppTheme>();

  // --- Loading State ---
  // Display a loading indicator if data is loading *and* we don't have profile data yet.
  // This prevents the loading indicator from flashing during background refetches.
  if (isLoading && !userProfile) {
    // Use reusable LoadingIndicator
    return <LoadingIndicator message="Loading Account..." />;
  }

  // --- Error State ---
  // Display an error message if an error occurred during data fetching.
  if (error) {
    // Use reusable ErrorDisplay
    // TODO: Add retry mechanism
    return <ErrorDisplay error={error} />;
  }

  // --- No Data State ---
  // Handle the unlikely case where loading is finished, there's no error, but userProfile is still null/undefined.
  if (!userProfile) {
    // Use ScreenContainer for consistent padding/background
    // Center content using inline styles
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

  // --- Success State (Data Available) ---
  // Prepare display data from the userProfile object.
  const displayName = `${userProfile.firstName} (${userProfile.birthYear})`;
  // Calculate the initial for the Avatar, handling potential undefined/empty names.
  const initial = userProfile.firstName?.charAt(0)?.toUpperCase() || "U"; // Default to 'U'

  return (
    // Use the reusable ScreenContainer and wrap content in a ScrollView
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.customSpacing.l }} // Add padding at the bottom
      >
        {/* Display the profile avatar, name, and member ID */}
        <ProfileSection>
          {/* Avatar.Text displays text initials */}
          <Avatar.Text
            size={70} // Set avatar size
            label={initial} // Display the calculated initial
            style={{ marginBottom: theme.customSpacing.s }} // Add some margin below
            // accessibilityLabel={`Avatar for ${displayName}`} // Good for accessibility
          />
          {/* Use Text variants for semantic typography */}
          <Text variant="titleLarge">{displayName}</Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onSurfaceVariant }} // Use a secondary text color from theme
          >
            Member ID: {userProfile.memberId}
          </Text>
        </ProfileSection>

        {/* Display a list of navigation options using List.Section and List.Item */}
        {/* @see https://callstack.github.io/react-native-paper/docs/components/List/ListSection */}
        {/* @see https://callstack.github.io/react-native-paper/docs/components/List/ListItem */}
        <List.Section>
          <List.Item
            title="Personal Information"
            // `left` prop renders a component (like an Icon) to the left of the title.
            left={(props) => <List.Icon {...props} icon="account-outline" />}
            // `right` prop renders a component to the right (e.g., chevron for navigation indication).
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            // `onPress` defines the action when the item is tapped.
            // TODO: Implement actual navigation logic.
            onPress={() => console.log("Navigate to Personal Info screen")}
            // accessibilityLabel="Navigate to Personal Information" // Good for accessibility
          />
          <List.Item
            title="Payment Methods"
            left={(props) => (
              <List.Icon {...props} icon="credit-card-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            // TODO: Implement actual navigation logic.
            onPress={() => console.log("Navigate to Payment Methods screen")}
          />
          <List.Item
            title="Communication Preferences"
            left={(props) => <List.Icon {...props} icon="email-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            // TODO: Implement actual navigation logic.
            onPress={() =>
              console.log("Navigate to Communication Preferences screen")
            }
          />
          <List.Item
            title="Security"
            left={(props) => <List.Icon {...props} icon="lock-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            // TODO: Implement actual navigation logic.
            onPress={() => console.log("Navigate to Security screen")}
          />
          <List.Item
            title="Help & Support"
            left={(props) => (
              <List.Icon {...props} icon="help-circle-outline" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            // TODO: Implement actual navigation logic.
            onPress={() => console.log("Navigate to Help & Support screen")}
          />
        </List.Section>

        {/* Log Out Button */}
        <Button
          mode="outlined" // Use outlined style for less emphasis than 'contained'
          onPress={() => console.log("Log Out action triggered")} // TODO: Implement actual log out logic
          style={{
            marginHorizontal: theme.customSpacing.m, // Add horizontal margin
            marginTop: theme.customSpacing.l, // Add top margin
            borderColor: theme.colors.error, // Use error color for border
          }}
          textColor={theme.colors.error} // Use error color for text
          // accessibilityLabel="Log out of your account" // Good for accessibility
        >
          Log Out
        </Button>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AccountScreen;
