import React from "react";
import { View } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import type { AppTheme } from "../theme/theme";

/**
 * @description Styled container for error states, centering content.
 * Applies theme background color and padding.
 */
const ErrorContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
  background-color: ${({ theme }: { theme: AppTheme }) =>
    theme.colors.background};
`;

/**
 * @description Styled Text component for displaying the error message prominently.
 * Uses the theme's error color.
 */
const ErrorMessageText = styled(Text)`
  color: ${({ theme }: { theme: AppTheme }) => theme.colors.error};
  text-align: center;
  margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.customSpacing.m}px;
`;

/**
 * @description Props for the ErrorDisplay component.
 * @interface ErrorDisplayProps
 * @property {Error | string | null} error - The error object or message string to display.
 * @property {() => void} [retryAction] - Optional function to call when a retry button is pressed.
 */
interface ErrorDisplayProps {
  error: Error | string | null;
  retryAction?: () => void;
}

/**
 * @description A reusable component to display a centered error message
 * with an optional retry button, respecting the application theme.
 *
 * @param {ErrorDisplayProps} props - Component props.
 * @param {Error | string | null} props.error - The error object or message.
 * @param {() => void} [props.retryAction] - Function to execute on retry.
 * @returns {React.ReactElement | null} The rendered error display or null if no error.
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, retryAction }) => {
  const theme = useTheme<AppTheme>();

  if (!error) {
    return null; // Don't render anything if there's no error
  }

  // Extract message string from Error object or use the string directly
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <ErrorContainer>
      <ErrorMessageText variant="titleMedium">
        {/* Display a generic title or the specific message */}
        {error instanceof Error ? "An Error Occurred" : "Error"}
      </ErrorMessageText>
      <ErrorMessageText variant="bodyMedium">{errorMessage}</ErrorMessageText>

      {/* Conditionally render the retry button if an action is provided */}
      {retryAction && (
        <Button
          mode="contained"
          onPress={retryAction}
          icon="reload" // Use a relevant icon
          style={{ marginTop: theme.customSpacing.m }}
          // Ensure button text color contrasts with button background
          labelStyle={{ color: theme.colors.onErrorContainer }}
          buttonColor={theme.colors.errorContainer} // Use error container color for button
          accessibilityLabel="Retry loading data" // Add accessibility label
        >
          Retry
        </Button>
      )}
    </ErrorContainer>
  );
};

export default ErrorDisplay;
