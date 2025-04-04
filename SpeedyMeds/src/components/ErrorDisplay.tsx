/**
 * Error Display Component
 *
 * @file This file defines a reusable React component for displaying error messages.
 * @module components/ErrorDisplay
 *
 * @purpose Provides a consistent way to show users that an error has occurred,
 * displaying the error message and optionally offering a way to retry the failed action.
 * It adapts to the application's theme (light/dark mode).
 *
 * @dependencies
 * - React: For component creation.
 * - React Native (`View`): For layout container.
 * - React Native Paper (`Text`, `Button`, `useTheme`): For UI elements and theme access.
 * - styled-components/native: For creating theme-aware styled components.
 * - Internal:
 *   - `../theme/theme`: For `AppTheme` type definition.
 *
 * @example
 * // Basic usage:
 * <ErrorDisplay error="Network request failed" />
 *
 * // Usage with an Error object and a retry function:
 * const handleRetry = () => console.log("Retrying...");
 * <ErrorDisplay error={new Error("Could not load data.")} retryAction={handleRetry} />
 */

import React from "react";
import { View } from "react-native"; // Core layout component
import { Text, Button, useTheme } from "react-native-paper"; // UI components from Paper
import styled from "styled-components/native"; // For creating styled components
import type { AppTheme } from "../theme/theme"; // Type definition for our theme

// --- Styled Components ---

/**
 * Styled container for the entire error display area.
 *
 * @description Uses Flexbox to center its children both horizontally (`align-items`)
 * and vertically (`justify-content`). Takes up all available vertical space (`flex: 1`).
 * Applies padding from the theme and sets the background color based on the current theme.
 */
const ErrorContainer = styled(View)`
  flex: 1; /* Take up all available space vertically */
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  padding: ${({ theme }: { theme: AppTheme }) =>
    theme.customSpacing.m}px; /* Apply medium padding from theme */
  background-color: ${({ theme }: { theme: AppTheme }) =>
    theme.colors.background}; /* Use theme's background color */
`;

/**
 * Styled Text component specifically for displaying the error message text.
 *
 * @description Sets the text color to the theme's error color for visual emphasis.
 * Centers the text and adds some bottom margin using theme spacing.
 */
const ErrorMessageText = styled(Text)`
  color: ${({ theme }: { theme: AppTheme }) =>
    theme.colors.error}; /* Use theme's error color */
  text-align: center; /* Center the error message text */
  margin-bottom: ${({ theme }: { theme: AppTheme }) =>
    theme.customSpacing.m}px; /* Add medium margin below text */
`;

// --- Component Props Interface ---

/**
 * Defines the properties (props) accepted by the ErrorDisplay component.
 *
 * @interface ErrorDisplayProps
 * @property {Error | string | null} error - The error to display. Can be an `Error` object
 *   (its `message` property will be used) or a simple string. If `null`, the component renders nothing.
 * @property {() => void} [retryAction] - An optional callback function. If provided, a "Retry"
 *   button will be displayed, and this function will be called when the button is pressed.
 */
interface ErrorDisplayProps {
  error: Error | string | null; // The error object or message string
  retryAction?: () => void; // Optional function to call on retry
}

// --- ErrorDisplay Component ---

/**
 * A reusable component to display a centered error message with an optional retry button.
 *
 * @description This component takes an error (either an `Error` object or a string)
 * and an optional `retryAction` function. It renders nothing if no error is provided.
 * Otherwise, it displays a generic title ("An Error Occurred" or "Error") and the specific
 * error message, styled using the application theme's error color. If `retryAction` is
 * provided, it renders a "Retry" button.
 *
 * @param {ErrorDisplayProps} props - The component props.
 * @returns {React.ReactElement | null} The rendered error display UI, or null if no error prop is passed.
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, retryAction }) => {
  // Get the current theme object using the hook from React Native Paper
  const theme = useTheme<AppTheme>();

  // --- Early exit ---
  // If no error is passed in, don't render anything.
  if (!error) {
    return null;
  }

  // --- Prepare error message ---
  // Determine the message string to display. If 'error' is an Error object, use its message property.
  // Otherwise, assume 'error' is already a string.
  const errorMessage = error instanceof Error ? error.message : error;
  // Determine a generic title based on whether we received an Error object or just a string.
  const errorTitle = error instanceof Error ? "An Error Occurred" : "Error";

  // --- Render component ---
  return (
    <ErrorContainer>
      {/* Display the generic error title */}
      <ErrorMessageText variant="titleMedium">{errorTitle}</ErrorMessageText>
      {/* Display the specific error message */}
      <ErrorMessageText variant="bodyMedium">{errorMessage}</ErrorMessageText>

      {/* Conditionally render the retry button only if retryAction function is provided */}
      {retryAction && (
        <Button
          mode="contained" // Style the button with a background
          onPress={retryAction} // Call the provided function when pressed
          icon="reload" // Use a relevant icon (from MaterialCommunityIcons)
          style={{ marginTop: theme.customSpacing.m }} // Add space above the button
          // Style the button's text label to ensure contrast with the button's background
          labelStyle={{ color: theme.colors.onErrorContainer }}
          // Use the theme's error container color for the button background for visual consistency
          buttonColor={theme.colors.errorContainer}
          // Accessibility: Provide a clear label for screen readers
          accessibilityLabel="Retry loading data"
        >
          Retry
        </Button>
      )}
    </ErrorContainer>
  );
};

export default ErrorDisplay; // Export the component for use in other parts of the app
