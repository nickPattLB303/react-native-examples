/**
 * @module components/shared/ErrorBoundary
 * @description A reusable error boundary component for handling errors gracefully
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol';
import { Card } from '../styled/containers';
import styled from 'styled-components/native';
import { ThemedText } from '../ThemedText';
import { useTheme } from 'styled-components';

/**
 * Props for the ErrorBoundary component
 * @interface ErrorBoundaryProps
 */
export interface ErrorBoundaryProps {
  /** The child content to render */
  children: ReactNode;
  /** Optional fallback component to render when an error occurs */
  fallback?: ReactNode;
  /** Optional callback when an error occurs */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Optional style overrides */
  style?: StyleProp<ViewStyle>;
}

/**
 * State for the ErrorBoundary component
 * @interface ErrorBoundaryState
 */
interface ErrorBoundaryState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error that occurred */
  error: Error | null;
}

/**
 * Styled container for the error state
 */
const ErrorContainer = styled(Card)`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.errorContainer};
`;

/**
 * Styled icon container
 */
const IconContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

/**
 * Default error fallback component
 */
const DefaultErrorFallback = styled(({ error, style }: { error: Error; style?: StyleProp<ViewStyle> }) => {
  const theme = useTheme();
  
  return (
    <ErrorContainer style={style}>
      <IconContainer>
        <IconSymbol
          name="xmark.circle.fill"
          size={48}
          color={theme.colors.error}
        />
      </IconContainer>
      <ThemedText
        type="title"
        color={theme.colors.onErrorContainer}
        accessibilityRole="alert"
      >
        Something went wrong
      </ThemedText>
      <ThemedText
        type="default"
        color={theme.colors.onErrorContainer}
      >
        {error.message || 'An unexpected error occurred'}
      </ThemedText>
      <ThemedText
        type="defaultSemiBold"
        color={theme.colors.onErrorContainer}
      >
        Please try again later
      </ThemedText>
    </ErrorContainer>
  );
})``;

/**
 * A reusable error boundary component that catches and handles errors
 * gracefully. It provides a default error UI but also supports custom
 * fallback components.
 * 
 * @component
 * @extends {Component<ErrorBoundaryProps, ErrorBoundaryState>}
 * 
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   return (
 *     <ErrorBoundary>
 *       <AppContent />
 *     </ErrorBoundary>
 *   );
 * }
 * 
 * @example
 * // With custom fallback and error handling
 * function MedicationList() {
 *   const handleError = useCallback((error: Error) => {
 *     // Log error to monitoring service
 *     logError(error);
 *   }, []);
 * 
 *   return (
 *     <ErrorBoundary
 *       onError={handleError}
 *       fallback={<CustomErrorUI />}
 *     >
 *       <MedicationContent />
 *     </ErrorBoundary>
 *   );
 * }
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  /**
   * Update state when an error occurs
   */
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Handle the error
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  /**
   * Reset the error state
   */
  public reset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    const { hasError, error } = this.state;
    const { children, fallback, style } = this.props;

    if (hasError && error) {
      const FallbackComponent = fallback || <DefaultErrorFallback error={error} style={style} />;
      return FallbackComponent;
    }

    return children;
  }
} 