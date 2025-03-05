/**
 * @fileoverview Error boundary component for catching and displaying errors
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Logger } from '../utils/Logger';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Initialize logger
const logger = new Logger();

/**
 * Error boundary component for catching and displaying errors
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state when an error occurs
   * @param error The error that occurred
   * @returns Updated state
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  /**
   * Log error details when an error occurs
   * @param error The error that occurred
   * @param errorInfo Additional error information
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error('Error caught by ErrorBoundary', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
    });
    
    this.setState({
      errorInfo,
    });
  }

  /**
   * Reset the error state
   */
  handleReset = (): void => {
    logger.info('Resetting error boundary');
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>{this.state.error?.toString()}</ErrorMessage>
          <ComponentStack>
            {this.state.errorInfo?.componentStack}
          </ComponentStack>
          <Button title="Try Again" onPress={this.handleReset} />
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

const ErrorContainer = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: #f8d7da;
`;

const ErrorTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #721c24;
  margin-bottom: 16px;
  text-align: center;
`;

const ErrorMessage = styled.Text`
  font-size: 16px;
  color: #721c24;
  margin-bottom: 16px;
  text-align: center;
`;

const ComponentStack = styled.Text`
  font-size: 12px;
  color: #721c24;
  margin-bottom: 24px;
  padding: 8px;
  background-color: #f5c6cb;
  border-radius: 4px;
  width: 100%;
`; 