# Section 2: Debugging Tools

## Overview

Effective debugging is essential for developing robust React Native applications. This section covers various debugging tools and techniques that will help you identify and fix issues in your React Native applications. You'll learn how to use built-in and third-party debugging tools, set up a debugging environment, and apply systematic debugging approaches.

## Learning Objectives

By the end of this section, you will be able to:

- Set up a debugging environment for React Native
- Use built-in and third-party debugging tools
- Debug JavaScript code in React Native
- Debug native code in React Native
- Implement error boundaries and error handling
- Use logging effectively
- Apply systematic debugging approaches
- Debug common React Native issues

## Setting Up a Debugging Environment

### React Native Debugger

[React Native Debugger](https://github.com/jhen0409/react-native-debugger) is a standalone app that combines React DevTools, Redux DevTools, and Chrome DevTools into one package.

#### Installation

```bash
# macOS with Homebrew
brew install --cask react-native-debugger

# Windows or Linux
# Download from https://github.com/jhen0409/react-native-debugger/releases
```

#### Setup

1. Run React Native Debugger
2. In your React Native app, enable remote debugging:
   - Shake your device or press `Cmd+D` (iOS simulator) or `Cmd+M` (Android emulator)
   - Select "Debug JS Remotely" or "Debug"
3. The debugger should automatically connect to your app

> 💡 **Deep Dive**: React Native Debugger works by connecting to the JavaScript runtime of your app through WebSockets. When you enable remote debugging, React Native redirects the JavaScript execution from the app's JavaScript engine to the one in Chrome or React Native Debugger, allowing you to use powerful debugging tools.

### Flipper

[Flipper](https://fbflipper.com/) is a platform for debugging mobile apps, providing a suite of tools for inspecting and manipulating your app during development.

#### Installation

1. Download and install Flipper from [fbflipper.com](https://fbflipper.com/)
2. Install the required dependencies in your React Native project:

```bash
npx expo install react-native-flipper
```

3. For iOS, add the following to your Podfile:

```ruby
pod 'Flipper', '~> 0.99.0'
pod 'Flipper-Folly', '~> 2.6'
pod 'Flipper-RSocket', '~> 1.4'
```

4. Run `pod install` in the iOS directory

> 🔄 **Platform Specific**: For Android developers, Flipper connects to your app through Android Debug Bridge (ADB). For iOS developers, it uses a custom protocol that communicates with your app through the iOS device's USB connection.

#### Setup

1. Run your React Native app
2. Open Flipper
3. Your app should automatically connect to Flipper

### Chrome DevTools

Chrome DevTools can be used for debugging JavaScript in React Native applications.

#### Setup

1. In your React Native app, enable remote debugging:
   - Shake your device or press `Cmd+D` (iOS simulator) or `Cmd+M` (Android emulator)
   - Select "Debug JS Remotely" or "Debug"
2. A Chrome tab should open automatically
3. Open Chrome DevTools by pressing `F12` or `Cmd+Option+I` (Mac) or `Ctrl+Shift+I` (Windows/Linux)

## JavaScript Debugging

### Using Breakpoints

Breakpoints allow you to pause execution at specific points in your code:

#### In Chrome DevTools

1. Navigate to the Sources tab
2. Find your JavaScript file
3. Click on the line number where you want to set a breakpoint
4. When execution reaches that line, it will pause

#### In React Native Debugger

1. Navigate to the Sources tab
2. Find your JavaScript file
3. Click on the line number where you want to set a breakpoint
4. When execution reaches that line, it will pause

#### In Code

You can also add breakpoints directly in your code using the `debugger` statement:

```jsx
/**
 * Handles the submission of medication data to the server
 * @param {Object} medication - The medication data to submit
 * @returns {Promise<Object>} The server response
 */
function handleMedicationSubmit(medication) {
  const data = prepareMedicationData(medication);
  debugger; // Execution will pause here when debugging is enabled
  return submitMedicationData(data);
}
```

> 💡 **Deep Dive**: When you use the `debugger` statement, React Native's JavaScript engine detects it and sends a signal to the connected debugger to pause execution. This works because the JavaScript engine has built-in support for debugging protocols that allow external tools to control execution.

### Inspecting Variables

When execution is paused at a breakpoint, you can inspect variables:

1. Hover over a variable in the source code to see its value
2. Use the Console panel to evaluate expressions
3. Use the Scope panel to see all variables in the current scope

### Console Debugging

The console provides various methods for debugging:

```jsx
/**
 * Pharmacy order processing utility
 * @file orderProcessor.js
 * @author React Native Training Team
 * @date 2025-03-04
 */

/**
 * Processes a new medication order
 * @param {Object} order - The order details
 * @param {Object} user - The user information
 * @returns {Promise<Object>} The processed order
 * @example
 * processOrder({
 *   medications: [{ id: 'med-123', quantity: 2 }],
 *   deliveryAddress: '123 Main St'
 * }, { id: 'user-456', name: 'John Doe' });
 */
async function processOrder(order, user) {
  // Basic logging
  console.log('Processing order for medications:', order.medications);

  // Warning for low stock
  if (order.medications.some(med => med.stock < med.quantity)) {
    console.warn('Some medications have low stock levels');
  }

  // Error for invalid prescription
  if (!order.prescriptionValid) {
    console.error('Invalid prescription for order:', order.id);
    throw new Error('Invalid prescription');
  }

  // Information about delivery
  console.info('Order will be delivered to:', order.deliveryAddress);

  // Grouping related logs
  console.group('Pharmacy Processing');
  console.log('Verifying prescription...');
  console.log('Preparing medications...');
  console.log('Packaging order...');
  console.groupEnd();

  // Timing operations
  console.time('orderProcessing');
  await processOrderItems(order.medications);
  console.timeEnd('orderProcessing');

  // Displaying tabular data
  console.table(order.medications);

  // Conditional logging
  console.assert(user.age >= 18, 'User must be 18 or older to order medications');

  // Tracing function calls
  console.trace('Order processing complete');
  
  return { ...order, status: 'processed' };
}
```

> 🔍 **Instructor Note**: Encourage students to use descriptive console messages that include context. For example, instead of `console.log(data)`, use `console.log('Medication data:', data)`.

### Network Debugging

#### Using Chrome DevTools

1. Open the Network tab in Chrome DevTools
2. Make a network request in your app
3. Inspect the request and response details

#### Using Flipper

1. Install the Network plugin in Flipper
2. Make a network request in your app
3. View the request and response details in Flipper

#### Using React Native Debugger

1. Open the Network tab in React Native Debugger
2. Make a network request in your app
3. Inspect the request and response details

> 💡 **Deep Dive**: React Native's networking layer uses the native networking capabilities of each platform. On iOS, it uses NSURLSession, while on Android, it uses OkHttp. The JavaScript interface abstracts these implementations, allowing you to use a consistent API across platforms.

### Redux Debugging

If your app uses Redux, you can debug Redux state and actions:

#### Using React Native Debugger

1. Make sure your app is connected to React Native Debugger
2. Open the Redux DevTools panel
3. View state changes and actions

#### Using Flipper

1. Install the Redux plugin in Flipper
2. Connect your Redux store to Flipper:

```jsx
/**
 * Redux store configuration with Flipper debugging
 * @file store.js
 * @author React Native Training Team
 * @date 2025-03-04
 */

import { createStore } from 'redux';
import { addPlugin } from 'react-native-flipper';
import { createDebugger } from 'redux-flipper';
import { pharmacyReducer } from './reducers';

/**
 * Creates and configures the Redux store for the pharmacy application
 * @param {Object} initialState - The initial state for the store
 * @returns {Object} The configured Redux store
 * @example
 * const store = configureStore({ medications: [], prescriptions: [] });
 */
export function configureStore(initialState = {}) {
  const store = createStore(pharmacyReducer, initialState);

  // Add the Redux debugger plugin in development mode
  if (__DEV__) {
    addPlugin(createDebugger(store));
  }
  
  return store;
}
```

## Native Code Debugging

### iOS Debugging

#### Using Xcode

1. Open your project in Xcode
2. Set breakpoints in your native code
3. Run your app from Xcode
4. When execution reaches a breakpoint, it will pause

#### Using LLDB

LLDB is the debugger used by Xcode:

```bash
# Print variable value
po variableName

# Print object description
p variableName

# Continue execution
continue

# Step over
next

# Step into
step

# Step out
finish
```

> 💡 **Deep Dive**: LLDB (Low Level Debugger) is the default debugger in Xcode. It communicates directly with the iOS runtime, allowing you to inspect memory, evaluate expressions, and control execution flow at a very low level. This is particularly useful when debugging native modules or understanding how React Native interacts with the iOS platform.

### Android Debugging

#### Using Android Studio

1. Open your project in Android Studio
2. Set breakpoints in your native code
3. Run your app from Android Studio
4. When execution reaches a breakpoint, it will pause

#### Using ADB

ADB (Android Debug Bridge) provides various debugging commands:

```bash
# View logs
adb logcat

# Filter logs by tag
adb logcat -s ReactNative

# Install app
adb install app.apk

# Uninstall app
adb uninstall com.example.app

# Take screenshot
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Record screen
adb shell screenrecord /sdcard/video.mp4
```

> 🔄 **Platform Specific**: Android developers can use ADB to interact with their devices directly from the command line. This is particularly useful for automation and CI/CD pipelines.

## Error Handling and Reporting

### Error Boundaries

Error boundaries are React components that catch JavaScript errors in their child component tree:

```typescript
/**
 * Error boundary component for handling errors in React components
 * @file ErrorBoundary.tsx
 * @author React Native Training Team
 * @date 2025-03-04
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Props for the ErrorBoundary component
 */
interface Props {
  /** Child components that will be rendered inside the error boundary */
  children: ReactNode;
  /** Optional custom fallback UI to display when an error occurs */
  fallback?: ReactNode;
}

/**
 * State for the ErrorBoundary component
 */
interface State {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error that occurred, if any */
  error: Error | null;
}

/**
 * A component that catches JavaScript errors in its child component tree
 * and displays a fallback UI instead of crashing the whole app
 * 
 * @example
 * // Basic usage
 * <ErrorBoundary>
 *   <MedicationList medications={medications} />
 * </ErrorBoundary>
 * 
 * // With custom fallback UI
 * <ErrorBoundary fallback={<MedicationListError />}>
 *   <MedicationList medications={medications} />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Update state when an error occurs in the child component tree
   * @param {Error} error - The error that was thrown
   * @returns {State} The updated state
   */
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  /**
   * Called when an error occurs in the child component tree
   * @param {Error} error - The error that was thrown
   * @param {ErrorInfo} errorInfo - Information about the component stack
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    // logErrorToService(error, errorInfo);
  }

  /**
   * Render the component
   * @returns {ReactNode} The rendered component
   */
  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{this.state.error?.message}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8d7da',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#721c24',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#721c24',
    textAlign: 'center',
  },
});

export default ErrorBoundary;
```

Usage:

```typescript
/**
 * Main pharmacy application component with error boundary
 * @file PharmacyApp.tsx
 * @author React Native Training Team
 * @date 2025-03-04
 */

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import MedicationList from './MedicationList';

/**
 * Main application component with error handling
 * @returns {JSX.Element} The rendered component
 */
function PharmacyApp(): JSX.Element {
  return (
    <ErrorBoundary>
      <MedicationList />
    </ErrorBoundary>
  );
}

export default PharmacyApp;
```

> 💡 **Deep Dive**: Error boundaries work by leveraging React's component lifecycle methods. When an error occurs during rendering, React propagates it up the component tree until it finds an error boundary. The error boundary then renders a fallback UI instead of the component that crashed. This is similar to try-catch blocks in regular JavaScript, but for component trees.

### Global Error Handler

Set up a global error handler to catch unhandled errors:

```typescript
/**
 * Global error handler configuration
 * @file errorHandler.ts
 * @author React Native Training Team
 * @date 2025-03-04
 */

import { ErrorUtils, Alert } from 'react-native';

/**
 * Configures the global error handler for the application
 * @example
 * // In your app's entry point
 * import './errorHandler';
 */
function configureGlobalErrorHandler(): void {
  // Set up global error handler
  if (__DEV__) {
    // Keep the original error handler for development
    const originalHandler = ErrorUtils.getGlobalHandler();
    
    ErrorUtils.setGlobalHandler((error, isFatal) => {
      // Log the error
      console.error('Global error in pharmacy app:', error);
      
      // You can also log to a service
      // logErrorToService(error);
      
      // Call the original handler
      originalHandler(error, isFatal);
    });
  } else {
    // In production, replace the error handler
    ErrorUtils.setGlobalHandler((error, isFatal) => {
      // Log the error to a service
      // logErrorToService(error);
      
      // Show a user-friendly message
      if (isFatal) {
        Alert.alert(
          'Unexpected Error',
          'An unexpected error occurred in the pharmacy app. Please restart the app.',
          [{ text: 'OK' }]
        );
      }
    });
  }
}

// Execute the configuration
configureGlobalErrorHandler();

// Export for testing purposes
export { configureGlobalErrorHandler };
```

> 💡 **Deep Dive**: React Native's `ErrorUtils` provides a way to intercept and handle JavaScript errors at the global level. When an unhandled exception occurs, React Native's JavaScript runtime calls the global error handler before crashing the app. By setting a custom handler, you can log the error, show a user-friendly message, and potentially recover from the error.

### Error Reporting Services

Integrate with error reporting services to track errors in production:

#### Sentry

```bash
npx expo install @sentry/react-native
```

```typescript
/**
 * Sentry error reporting configuration
 * @file sentryConfig.ts
 * @author React Native Training Team
 * @date 2025-03-04
 */

import * as Sentry from '@sentry/react-native';

/**
 * Initializes Sentry for error reporting in the pharmacy application
 * @param {string} dsn - The Sentry DSN (Data Source Name)
 * @example
 * // In your app's entry point
 * import { initSentry } from './sentryConfig';
 * initSentry('https://examplePublicKey@o0.ingest.sentry.io/0');
 */
export function initSentry(dsn: string): void {
  Sentry.init({
    dsn,
    environment: __DEV__ ? 'development' : 'production',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
    tracesSampleRate: 1.0,
  });
}

/**
 * Captures an exception and sends it to Sentry
 * @param {Error} error - The error to capture
 * @example
 * try {
 *   fetchMedications();
 * } catch (error) {
 *   captureException(error);
 * }
 */
export function captureException(error: Error): void {
  Sentry.captureException(error);
}

/**
 * Sets user information for Sentry events
 * @param {Object} user - The user information
 * @param {string} user.id - The user ID
 * @param {string} [user.email] - The user email
 * @param {string} [user.username] - The username
 * @example
 * setUser({
 *   id: 'user-123',
 *   email: 'patient@example.com',
 *   username: 'patient123'
 * });
 */
export function setUser(user: { id: string; email?: string; username?: string }): void {
  Sentry.setUser(user);
}

/**
 * Sets a tag for Sentry events
 * @param {string} key - The tag key
 * @param {string} value - The tag value
 * @example
 * setTag('feature', 'medication-tracking');
 */
export function setTag(key: string, value: string): void {
  Sentry.setTag(key, value);
}
```

> 🔍 **Instructor Note**: Remind students to never commit API keys or sensitive information directly in the code. Use environment variables or a secure configuration management system.

## Effective Logging

### Structured Logging

Implement structured logging for better debugging:

```typescript
/**
 * Structured logging system for the pharmacy application
 * @file logger.ts
 * @author React Native Training Team
 * @date 2025-03-04
 */

/**
 * Log levels for the logger
 */
enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Structure of a log entry
 */
interface LogEntry {
  /** ISO timestamp of when the log was created */
  timestamp: string;
  /** Log level */
  level: LogLevel;
  /** Log message */
  message: string;
  /** Additional data to log */
  data?: any;
  /** Tags for categorizing logs */
  tags?: Record<string, string>;
}

/**
 * Structured logger for the pharmacy application
 * @example
 * // Basic usage
 * logger.info('User viewed medication list');
 * 
 * // With additional data
 * logger.error('Failed to fetch medications', error);
 * 
 * // With tags
 * logger.debug('Processing prescription', prescription, { feature: 'prescription-processing' });
 */
class Logger {
  /** Context information to include with all logs */
  private context: Record<string, string> = {};
  
  /**
   * Sets context information to include with all logs
   * @param {Record<string, string>} context - The context information
   * @example
   * logger.setContext({ screen: 'MedicationList', userId: '123' });
   */
  setContext(context: Record<string, string>): void {
    this.context = { ...this.context, ...context };
  }
  
  /**
   * Logs a debug message
   * @param {string} message - The log message
   * @param {any} [data] - Additional data to log
   * @param {Record<string, string>} [tags] - Tags for categorizing the log
   * @example
   * logger.debug('Initializing medication component');
   */
  debug(message: string, data?: any, tags?: Record<string, string>): void {
    this.log(LogLevel.DEBUG, message, data, tags);
  }
  
  /**
   * Logs an info message
   * @param {string} message - The log message
   * @param {any} [data] - Additional data to log
   * @param {Record<string, string>} [tags] - Tags for categorizing the log
   * @example
   * logger.info('User viewed medication list', { count: medications.length });
   */
  info(message: string, data?: any, tags?: Record<string, string>): void {
    this.log(LogLevel.INFO, message, data, tags);
  }
  
  /**
   * Logs a warning message
   * @param {string} message - The log message
   * @param {any} [data] - Additional data to log
   * @param {Record<string, string>} [tags] - Tags for categorizing the log
   * @example
   * logger.warn('Medication stock low', { medicationId: 'med-123', stock: 2 });
   */
  warn(message: string, data?: any, tags?: Record<string, string>): void {
    this.log(LogLevel.WARN, message, data, tags);
  }
  
  /**
   * Logs an error message
   * @param {string} message - The log message
   * @param {any} [data] - Additional data to log
   * @param {Record<string, string>} [tags] - Tags for categorizing the log
   * @example
   * logger.error('Failed to fetch medications', error, { attempt: 3 });
   */
  error(message: string, data?: any, tags?: Record<string, string>): void {
    this.log(LogLevel.ERROR, message, data, tags);
  }
  
  /**
   * Internal method to log a message
   * @param {LogLevel} level - The log level
   * @param {string} message - The log message
   * @param {any} [data] - Additional data to log
   * @param {Record<string, string>} [tags] - Tags for categorizing the log
   * @private
   */
  private log(level: LogLevel, message: string, data?: any, tags?: Record<string, string>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      tags: { ...this.context, ...tags },
    };
    
    if (__DEV__) {
      // In development, log to console
      switch (level) {
        case LogLevel.DEBUG:
          console.log(`[${entry.timestamp}] [${level}] ${message}`, data || '');
          break;
        case LogLevel.INFO:
          console.info(`[${entry.timestamp}] [${level}] ${message}`, data || '');
          break;
        case LogLevel.WARN:
          console.warn(`[${entry.timestamp}] [${level}] ${message}`, data || '');
          break;
        case LogLevel.ERROR:
          console.error(`[${entry.timestamp}] [${level}] ${message}`, data || '');
          break;
      }
    } else {
      // In production, you might want to send logs to a service
      // sendLogToService(entry);
    }
  }
}

export const logger = new Logger();
```

Usage:

```typescript
/**
 * Medication list component with structured logging
 * @file MedicationList.tsx
 * @author React Native Training Team
 * @date 2025-03-04
 */

import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { logger } from './logger';
import { fetchMedications } from './api';
import MedicationItem from './MedicationItem';

/**
 * Component that displays a list of medications
 * @returns {JSX.Element} The rendered component
 */
function MedicationList(): JSX.Element {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Set context for all logs from this component
    logger.setContext({ component: 'MedicationList' });
    
    // Log component initialization
    logger.debug('Initializing medication list component');
    
    async function loadMedications() {
      try {
        logger.info('Fetching medications');
        const data = await fetchMedications();
        logger.info('Medications fetched successfully', { count: data.length });
        setMedications(data);
      } catch (err) {
        logger.error('Failed to fetch medications', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadMedications();
  }, []);
  
  if (loading) {
    logger.debug('Rendering loading state');
    return <Text>Loading medications...</Text>;
  }
  
  if (error) {
    logger.debug('Rendering error state');
    return <Text>Error loading medications</Text>;
  }
  
  logger.debug('Rendering medication list', { count: medications.length });
  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MedicationItem medication={item} />}
    />
  );
}

export default MedicationList;
```

> 💡 **Deep Dive**: Structured logging provides a consistent format for log entries, making them easier to parse, filter, and analyze. By including additional context like timestamps, log levels, and tags, you can quickly identify patterns and troubleshoot issues in your application.

### Log Collection

Collect logs for analysis:

```typescript
/**
 * Log collection system for the pharmacy application
 * @file logCollector.ts
 * @author React Native Training Team
 * @date 2025-03-04
 */

/**
 * Collects and manages logs for the pharmacy application
 * @example
 * // Add a log
 * logCollector.addLog({ level: 'ERROR', message: 'Failed to fetch medications' });
 * 
 * // Send logs to server
 * logCollector.sendLogsToServer();
 */
class LogCollector {
  /** Array of collected logs */
  private logs: any[] = [];
  /** Maximum number of logs to store */
  private maxLogs: number = 1000;
  
  /**
   * Adds a log to the collector
   * @param {any} log - The log to add
   * @example
   * logCollector.addLog({
   *   level: 'ERROR',
   *   message: 'Failed to fetch medications',
   *   timestamp: new Date().toISOString()
   * });
   */
  addLog(log: any): void {
    this.logs.push(log);
    
    // Keep logs under the maximum size
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }
  
  /**
   * Gets all collected logs
   * @returns {any[]} The collected logs
   * @example
   * const logs = logCollector.getLogs();
   * console.log(`Collected ${logs.length} logs`);
   */
  getLogs(): any[] {
    return [...this.logs];
  }
  
  /**
   * Clears all collected logs
   * @example
   * logCollector.clearLogs();
   */
  clearLogs(): void {
    this.logs = [];
  }
  
  /**
   * Exports logs as a JSON string
   * @returns {string} The logs as a JSON string
   * @example
   * const logsJson = logCollector.exportLogs();
   * saveToFile('logs.json', logsJson);
   */
  exportLogs(): string {
    return JSON.stringify(this.logs);
  }
  
  /**
   * Sends logs to a server
   * @returns {Promise<void>} A promise that resolves when the logs are sent
   * @example
   * try {
   *   await logCollector.sendLogsToServer();
   *   console.log('Logs sent successfully');
   * } catch (error) {
   *   console.error('Failed to send logs', error);
   * }
   */
  sendLogsToServer(): Promise<void> {
    return fetch('https://api.pharmacy-example.com/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: this.exportLogs(),
    })
    .then(() => {
      this.clearLogs();
    });
  }
}

export const logCollector = new LogCollector();
```

> 🚀 **Quick Start**: To quickly implement log collection in your pharmacy
