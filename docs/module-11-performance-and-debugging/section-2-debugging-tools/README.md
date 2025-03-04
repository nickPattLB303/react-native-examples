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

### Flipper

[Flipper](https://fbflipper.com/) is a platform for debugging mobile apps, providing a suite of tools for inspecting and manipulating your app during development.

#### Installation

1. Download and install Flipper from [fbflipper.com](https://fbflipper.com/)
2. Install the required dependencies in your React Native project:

```bash
npm install --save-dev react-native-flipper
```

3. For iOS, add the following to your Podfile:

```ruby
pod 'Flipper', '~> 0.99.0'
pod 'Flipper-Folly', '~> 2.6'
pod 'Flipper-RSocket', '~> 1.4'
```

4. Run `pod install` in the iOS directory

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

```javascript
function handleSubmit() {
  const data = prepareData();
  debugger; // Execution will pause here when debugging is enabled
  submitData(data);
}
```

### Inspecting Variables

When execution is paused at a breakpoint, you can inspect variables:

1. Hover over a variable in the source code to see its value
2. Use the Console panel to evaluate expressions
3. Use the Scope panel to see all variables in the current scope

### Console Debugging

The console provides various methods for debugging:

```javascript
// Basic logging
console.log('User data:', userData);

// Warning
console.warn('Deprecated function used');

// Error
console.error('Failed to load data:', error);

// Information
console.info('App initialized');

// Grouping related logs
console.group('User Authentication');
console.log('Checking credentials...');
console.log('Authentication successful');
console.groupEnd();

// Timing operations
console.time('dataFetch');
await fetchData();
console.timeEnd('dataFetch');

// Displaying tabular data
console.table(users);

// Conditional logging
console.assert(user.age >= 18, 'User must be 18 or older');

// Tracing function calls
console.trace('How did we get here?');
```

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

### Redux Debugging

If your app uses Redux, you can debug Redux state and actions:

#### Using React Native Debugger

1. Make sure your app is connected to React Native Debugger
2. Open the Redux DevTools panel
3. View state changes and actions

#### Using Flipper

1. Install the Redux plugin in Flipper
2. Connect your Redux store to Flipper:

```javascript
import { createStore } from 'redux';
import { addPlugin } from 'react-native-flipper';
import { createDebugger } from 'redux-flipper';

const store = createStore(rootReducer);

// Add the Redux debugger plugin
if (__DEV__) {
  addPlugin(createDebugger(store));
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

## Error Handling and Reporting

### Error Boundaries

Error boundaries are React components that catch JavaScript errors in their child component tree:

```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    // logErrorToService(error, errorInfo);
  }

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
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### Global Error Handler

Set up a global error handler to catch unhandled errors:

```typescript
import { ErrorUtils } from 'react-native';

// Set up global error handler
if (__DEV__) {
  // Keep the original error handler for development
  const originalHandler = ErrorUtils.getGlobalHandler();
  
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    // Log the error
    console.error('Global error:', error);
    
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
        'An unexpected error occurred. Please restart the app.',
        [{ text: 'OK' }]
      );
    }
  });
}
```

### Error Reporting Services

Integrate with error reporting services to track errors in production:

#### Sentry

```bash
npm install @sentry/react-native
```

```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_DSN_HERE',
  environment: __DEV__ ? 'development' : 'production',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
  tracesSampleRate: 1.0,
});

// Capture exceptions
try {
  // Your code
} catch (error) {
  Sentry.captureException(error);
}

// Add context
Sentry.setUser({
  id: 'user-123',
  email: 'user@example.com',
});

Sentry.setTag('feature', 'medication-tracking');
```

## Effective Logging

### Structured Logging

Implement structured logging for better debugging:

```typescript
// logger.ts
enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  tags?: Record<string, string>;
}

class Logger {
  private context: Record<string, string> = {};
  
  setContext(context: Record<string, string>): void {
    this.context = { ...this.context, ...context };
  }
  
  debug(message: string, data?: any, tags?: Record<string, string>): void {
    this.log(LogLevel.DEBUG, message, data, tags);
  }
  
  info(message: string, data?: any, tags?: Record<string, string>): void {
    this.log(LogLevel.INFO, message, data, tags);
  }
  
  warn(message: string, data?: any, tags?: Record<string, string>): void {
    this.log(LogLevel.WARN, message, data, tags);
  }
  
  error(message: string, data?: any, tags?: Record<string, string>): void {
    this.log(LogLevel.ERROR, message, data, tags);
  }
  
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
import { logger } from './logger';

// Set context for all logs
logger.setContext({ screen: 'MedicationList', userId: '123' });

// Log messages
logger.debug('Initializing component');
logger.info('User viewed medication list', { count: medications.length });
logger.warn('Slow operation detected', { duration: 1500 });
logger.error('Failed to fetch medications', error, { attempt: 3 });
```

### Log Collection

Collect logs for analysis:

```typescript
// logCollector.ts
class LogCollector {
  private logs: any[] = [];
  private maxLogs: number = 1000;
  
  addLog(log: any): void {
    this.logs.push(log);
    
    // Keep logs under the maximum size
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }
  
  getLogs(): any[] {
    return [...this.logs];
  }
  
  clearLogs(): void {
    this.logs = [];
  }
  
  exportLogs(): string {
    return JSON.stringify(this.logs);
  }
  
  sendLogsToServer(): Promise<void> {
    return fetch('https://api.example.com/logs', {
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

## Debugging Common Issues

### Layout Issues

#### Using Flipper Layout Inspector

1. Open Flipper
2. Select the Layout plugin
3. Inspect the component hierarchy and styles

#### Using React DevTools

1. Open React DevTools
2. Select a component in the component tree
3. Inspect and modify its props and state

### Navigation Issues

1. Check navigation state:

```typescript
import { useNavigationState } from '@react-navigation/native';

function NavigationDebugger() {
  const state = useNavigationState(state => state);
  console.log('Navigation state:', state);
  return null;
}
```

2. Add navigation listeners:

```typescript
import { useNavigation } from '@react-navigation/native';

function NavigationLogger() {
  const navigation = useNavigation();
  
  React.useEffect(() => {
    const unsubscribeState = navigation.addListener('state', (e) => {
      console.log('Navigation state changed:', e.data);
    });
    
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('Screen focused');
    });
    
    const unsubscribeBlur = navigation.addListener('blur', () => {
      console.log('Screen blurred');
    });
    
    return () => {
      unsubscribeState();
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);
  
  return null;
}
```

### State Management Issues

1. Log state changes:

```typescript
// For useState
const [count, setCount] = useState(0);

const incrementWithLogging = () => {
  console.log('Before increment:', count);
  setCount(prevCount => {
    const newCount = prevCount + 1;
    console.log('After increment:', newCount);
    return newCount;
  });
};

// For useReducer
const [state, dispatch] = useReducer((state, action) => {
  console.log('Reducer called with action:', action);
  console.log('Current state:', state);
  
  // Your reducer logic
  
  console.log('New state:', newState);
  return newState;
}, initialState);
```

2. Use React DevTools to inspect component state

### Network Issues

1. Implement network request logging:

```typescript
// api.ts
import axios from 'axios';
import { logger } from './logger';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    logger.info('API Request', {
      url: config.url,
      method: config.method,
      data: config.data,
    });
    return config;
  },
  (error) => {
    logger.error('API Request Error', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    logger.info('API Response', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    logger.error('API Response Error', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default api;
```

2. Use network debugging tools in Chrome DevTools, Flipper, or React Native Debugger

### Performance Issues

1. Use the Performance Monitor to identify performance bottlenecks
2. Profile JavaScript execution using Chrome DevTools
3. Use React DevTools Profiler to identify slow component renders

## Systematic Debugging Approach

Follow a systematic approach to debugging:

1. **Reproduce the Issue**:
   - Create a reliable way to reproduce the issue
   - Document the steps to reproduce

2. **Isolate the Problem**:
   - Determine if the issue is in JavaScript or native code
   - Identify the specific component or function causing the issue

3. **Gather Information**:
   - Check logs and error messages
   - Use debugging tools to inspect state and execution

4. **Form a Hypothesis**:
   - Based on the information gathered, form a hypothesis about the cause
   - Think about what might be causing the issue

5. **Test the Hypothesis**:
   - Make changes to test your hypothesis
   - Use debugging tools to verify your changes

6. **Fix the Issue**:
   - Implement a proper fix
   - Ensure the fix doesn't introduce new issues

7. **Verify the Fix**:
   - Test the fix thoroughly
   - Ensure the issue is resolved in all scenarios

8. **Document the Solution**:
   - Document what caused the issue and how it was fixed
   - Share the knowledge with your team

## Exercise: Debugging a React Native App

Debug a medication tracking application with the following issues:

1. The app crashes when adding a new medication
2. The medication list doesn't update after adding a new medication
3. Network requests fail intermittently
4. The app has performance issues when scrolling through a long list of medications
5. Layout issues on different screen sizes

## Next Steps

In the next section, we'll explore advanced debugging techniques and tools for React Native applications, focusing on more complex scenarios and production debugging.

## Additional Resources

- [React Native Debugging Documentation](https://reactnative.dev/docs/debugging)
- [Flipper Documentation](https://fbflipper.com/docs/getting-started/react-native/)
- [React DevTools Documentation](https://reactnative.dev/docs/debugging#react-developer-tools)
- [Chrome DevTools Documentation](https://developers.google.com/web/tools/chrome-devtools)
- [Sentry React Native Documentation](https://docs.sentry.io/platforms/react-native/)
- [Debugging JavaScript in React Native](https://reactnative.dev/docs/debugging#chrome-developer-tools)
