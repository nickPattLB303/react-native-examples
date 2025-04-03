import React from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  ActivityIndicator,
  Avatar,
  List,
  Button,
} from "react-native-paper";
import styled from "styled-components/native";
import type { AppTheme } from "../theme/theme";
import useAppDataStore from "../stores/appDataStore";

/**
 * @description Screen component for displaying user account information and settings.
 * Fetches user data from Zustand store and displays it.
 * @returns {React.ReactElement} The rendered Account screen.
 */
/**
 * @description Styled container for the screen content.
 * Applies theme-based padding and background color, centers content.
 */
const ScreenContainer = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }: { theme: AppTheme }) =>
    theme.colors.background};
`;

const ProfileSection = styled(View)`
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.l}px 0;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
  background-color: ${({ theme }: { theme: AppTheme }) =>
    theme.colors.background};
`;

const ErrorText = styled(Text)`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.error};
  margin: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
`;

/**
 * @description Screen component for displaying user account information and settings.
 * Fetches user data from Zustand store and displays it.
 * @returns {React.ReactElement} The rendered Account screen.
 */
const AccountScreen = () => {
  const { userProfile, isLoading, error } = useAppDataStore();

  if (isLoading && !userProfile) {
    return (
      <LoadingContainer>
        <ActivityIndicator animating={true} size="large" />
        <Text>Loading Account...</Text>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <ErrorText>Error loading account data: {error.message}</ErrorText>
      </LoadingContainer>
    );
  }

  if (!userProfile) {
    return (
      <LoadingContainer>
        <Text>No user profile data available.</Text>
      </LoadingContainer>
    );
  }

  const displayName = `${userProfile.firstName} (${userProfile.birthYear})`;
  const initial = userProfile.firstName?.charAt(0)?.toUpperCase() || "U";

  return (
    <ScreenContainer contentContainerStyle={{ paddingBottom: 20 }}>
      <ProfileSection>
        <Avatar.Text size={70} label={initial} style={{ marginBottom: 10 }} />
        <Text variant="titleLarge">{displayName}</Text>
        <Text variant="bodyMedium" style={{ color: "grey" }}>
          Member ID: {userProfile.memberId}
        </Text>
      </ProfileSection>

      <List.Section>
        <List.Item
          title="Personal Information"
          left={(props) => <List.Icon {...props} icon="account-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log("Navigate to Personal Info")}
        />
        <List.Item
          title="Payment Methods"
          left={(props) => <List.Icon {...props} icon="credit-card-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log("Navigate to Payment Methods")}
        />
        <List.Item
          title="Communication Preferences"
          left={(props) => <List.Icon {...props} icon="email-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log("Navigate to Communication Preferences")}
        />
        <List.Item
          title="Security"
          left={(props) => <List.Icon {...props} icon="lock-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log("Navigate to Security")}
        />
        <List.Item
          title="Help & Support"
          left={(props) => <List.Icon {...props} icon="help-circle-outline" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log("Navigate to Help & Support")}
        />
      </List.Section>

      <Button
        mode="outlined"
        onPress={() => console.log("Log Out Pressed")}
        style={{ marginHorizontal: 15, marginTop: 20 }}
        textColor="red"
      >
        Log Out
      </Button>
    </ScreenContainer>
  );
};

export default AccountScreen;
