import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import type { AppTheme } from "../theme/theme";

/**
 * @description Styled container for loading states, centering content.
 * Applies theme background color and padding.
 */
const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
  background-color: ${({ theme }: { theme: AppTheme }) =>
    theme.colors.background};
`;

/**
 * @description Props for the LoadingIndicator component.
 * @interface LoadingIndicatorProps
 * @property {string} [message="Loading..."] - Optional message to display below the indicator.
 */
interface LoadingIndicatorProps {
  message?: string;
}

/**
 * @description A reusable component to display a centered loading indicator
 * with an optional message, respecting the application theme.
 *
 * @param {LoadingIndicatorProps} props - Component props.
 * @param {string} [props.message="Loading..."] - Optional message to display.
 * @returns {React.ReactElement} The rendered loading indicator component.
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = "Loading...",
}) => {
  const theme = useTheme<AppTheme>();

  return (
    <LoadingContainer>
      <ActivityIndicator
        animating={true}
        size="large"
        color={theme.colors.primary} // Use primary theme color
      />
      {message && ( // Conditionally render the message if provided
        <Text
          variant="bodyMedium"
          style={{
            marginTop: theme.customSpacing.s,
            color: theme.colors.onBackground,
          }}
        >
          {message}
        </Text>
      )}
    </LoadingContainer>
  );
};

export default LoadingIndicator;
