/**
 * @fileoverview Error Boundary component to catch and display errors
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      errorInfo
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>{this.state.error?.toString()}</ErrorMessage>
          {this.state.errorInfo && (
            <ErrorStack>
              {this.state.errorInfo.componentStack}
            </ErrorStack>
          )}
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

const ErrorStack = styled.Text`
  font-size: 12px;
  color: #721c24;
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
`; 