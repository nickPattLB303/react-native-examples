# Section 3: Advanced Debugging

## Overview

Advanced debugging techniques are essential for tackling complex issues in React Native applications. This section covers advanced debugging strategies, tools, and approaches for debugging challenging problems in both development and production environments. You'll learn how to debug native modules, third-party libraries, and production issues.

## Learning Objectives

By the end of this section, you will be able to:

- Debug complex React Native issues
- Troubleshoot native module integration
- Debug third-party libraries
- Implement source maps for production debugging
- Use advanced debugging tools and techniques
- Debug memory leaks and performance issues
- Implement crash reporting and analytics
- Create a comprehensive debugging strategy

## Debugging Native Modules

### Understanding the Bridge

React Native uses a bridge to communicate between JavaScript and native code. Understanding how the bridge works is crucial for debugging native modules:

1. **JavaScript to Native Communication**: JavaScript code calls native methods through the bridge
2. **Native to JavaScript Communication**: Native code can call JavaScript methods through the bridge
3. **Serialization/Deserialization**: Data is serialized when crossing the bridge, which can cause performance issues

### Debugging Native Module Issues

#### iOS Native Module Debugging

1. **Add Logging to Native Code**:

```objective-c
// RCT_EXPORT_METHOD implementation
RCT_EXPORT_METHOD(myMethod:(NSString *)param callback:(RCTResponseSenderBlock)callback)
{
  NSLog(@"myMethod called with param: %@", param);
  
  // Your implementation
  
  NSLog(@"myMethod completed with result: %@", result);
  callback(@[result]);
}
```

2. **Use Xcode Breakpoints**:
   - Open your project in Xcode
   - Set breakpoints in your native module implementation
   - Run your app from Xcode
   - When your JavaScript code calls the native module, execution will pause at the breakpoint

3. **Inspect Bridge Traffic**:

```objective-c
// AppDelegate.m
#import <React/RCTLog.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Set up bridge logging
  RCTSetLogThreshold(RCTLogLevelInfo);
  RCTSetLogFunction(^(RCTLogLevel level, RCTLogSource source, NSString *fileName, NSNumber *lineNumber, NSString *message) {
    NSLog(@"[RCT] %@", message);
  });
  
  // Rest of your setup
}
```

#### Android Native Module Debugging

1. **Add Logging to Native Code**:

```java
// Java implementation
@ReactMethod
public void myMethod(String param, Callback callback) {
  Log.d("MyNativeModule", "myMethod called with param: " + param);
  
  // Your implementation
  
  Log.d("MyNativeModule", "myMethod completed with result: " + result);
  callback.invoke(result);
}
```

2. **Use Android Studio Breakpoints**:
   - Open your project in Android Studio
   - Set breakpoints in your native module implementation
   - Run your app from Android Studio
   - When your JavaScript code calls the native module, execution will pause at the breakpoint

3. **Filter LogCat Output**:
   - Open LogCat in Android Studio
   - Filter by tag (e.g., "MyNativeModule" or "ReactNative")

### Debugging Bridge Performance

1. **Monitor Bridge Traffic**:

```jsx
// In your JavaScript code
if (__DEV__) {
  const MessageQueue = require('react-native/Libraries/BatchedBridge/MessageQueue');
  const spyFunction = (msg) => {
    console.log(`Bridge call: ${msg.module}.${msg.method}(${JSON.stringify(msg.args)})`);
  };
  
  MessageQueue.spy(spyFunction);
}
```

2. **Analyze Bridge Calls**:
   - Look for frequent bridge calls
   - Identify large payloads
   - Consider batching or optimizing bridge calls

## Debugging Third-Party Libraries

### Identifying Issues in Third-Party Code

1. **Isolate the Issue**:
   - Create a minimal reproduction case
   - Determine if the issue is in your code or the library

2. **Check GitHub Issues**:
   - Search for similar issues in the library's GitHub repository
   - Check if there are known workarounds or fixes

3. **Inspect Library Source Code**:
   - Look at the library's source code to understand its implementation
   - Identify potential issues or bugs

### Debugging Strategies for Third-Party Libraries

1. **Monkey Patching**:

```jsx
// Original library function
const originalFunction = ThirdPartyLibrary.someFunction;

// Replace with your own implementation
ThirdPartyLibrary.someFunction = function(...args) {
  console.log('someFunction called with args:', args);
  
  // Call the original function
  const result = originalFunction.apply(this, args);
  
  console.log('someFunction returned:', result);
  return result;
};
```

2. **Forking and Modifying**:
   - Fork the library repository
   - Make necessary changes
   - Use your forked version in your project

```bash
# Clone the repository
git clone https://github.com/author/library.git

# Make changes

# Install from local directory
npm install ./library
```

3. **Using Patch-Package**:

```bash
# Install patch-package
npm install --save-dev patch-package postinstall-postinstall

# Modify node_modules/some-package
# ...

# Create a patch
npx patch-package some-package

# Add to package.json scripts
# "postinstall": "patch-package"
```

## Production Debugging

### Source Maps

Source maps allow you to debug minified JavaScript code by mapping it back to the original source code.

#### Generating Source Maps

1. **For Expo Projects**:

```bash
expo build:android --release --sourcemaps
# or
expo build:ios --release --sourcemaps
```

2. **For React Native CLI Projects**:

```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --sourcemap-output android/app/src/main/assets/index.android.bundle.map
```

#### Using Source Maps with Error Reporting Services

1. **Sentry Integration**:

```jsx
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_DSN_HERE',
  enableAutoSessionTracking: true,
  // Enable source maps
  attachSourceMaps: true,
  // Upload source maps during build process
  // or use the Sentry CLI to upload them
});
```

2. **Uploading Source Maps to Sentry**:

```bash
# Install Sentry CLI
npm install @sentry/cli --save-dev

# Configure Sentry CLI
npx sentry-cli login

# Upload source maps
npx sentry-cli releases new YOUR_RELEASE_NAME
npx sentry-cli releases files YOUR_RELEASE_NAME upload-sourcemaps --strip-prefix /path/to/project/root /path/to/sourcemaps
npx sentry-cli releases finalize YOUR_RELEASE_NAME
```

### Remote Logging

Implement remote logging to capture logs from production apps:

```typescript
// remoteLogger.ts
import { logger } from './logger';

class RemoteLogger {
  private apiUrl: string;
  private batchSize: number = 10;
  private logQueue: any[] = [];
  private isSending: boolean = false;
  
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    
    // Set up periodic sending
    setInterval(() => this.sendLogs(), 30000); // Send logs every 30 seconds
  }
  
  log(level: string, message: string, data?: any): void {
    // Create log entry
    const logEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      // Add device and app information
      device: {
        platform: Platform.OS,
        version: Platform.Version,
      },
      app: {
        version: DeviceInfo.getVersion(),
        buildNumber: DeviceInfo.getBuildNumber(),
      },
    };
    
    // Add to queue
    this.logQueue.push(logEntry);
    
    // Send logs if queue is full
    if (this.logQueue.length >= this.batchSize) {
      this.sendLogs();
    }
  }
  
  async sendLogs(): Promise<void> {
    if (this.isSending || this.logQueue.length === 0) {
      return;
    }
    
    this.isSending = true;
    
    try {
      // Get logs to send
      const logsToSend = [...this.logQueue];
      this.logQueue = [];
      
      // Send logs to server
      await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logsToSend),
      });
    } catch (error) {
      // If sending fails, add logs back to queue
      this.logQueue = [...this.logQueue, ...logsToSend];
      
      // Log error locally
      logger.error('Failed to send logs to server', error);
    } finally {
      this.isSending = false;
    }
  }
}

export const remoteLogger = new RemoteLogger('https://api.example.com/logs');
```

### Crash Reporting

Implement comprehensive crash reporting:

```typescript
// crashReporting.ts
import * as Sentry from '@sentry/react-native';
import { Alert, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export function initCrashReporting(): void {
  Sentry.init({
    dsn: 'YOUR_DSN_HERE',
    environment: __DEV__ ? 'development' : 'production',
    release: `${DeviceInfo.getVersion()}+${DeviceInfo.getBuildNumber()}`,
    dist: DeviceInfo.getBuildNumber(),
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,
    attachStacktrace: true,
    // Add more context
    beforeSend: (event) => {
      // Add custom data to the event
      event.extra = {
        ...event.extra,
        deviceId: DeviceInfo.getDeviceId(),
        appVersion: DeviceInfo.getVersion(),
        buildNumber: DeviceInfo.getBuildNumber(),
        platform: Platform.OS,
        platformVersion: Platform.Version,
      };
      
      return event;
    },
  });
  
  // Set up global error handler
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    Sentry.captureException(error);
    
    // Show a user-friendly message for fatal errors
    if (isFatal) {
      Alert.alert(
        'Unexpected Error',
        'An unexpected error occurred. Please restart the app.',
        [{ text: 'OK' }]
      );
    }
  });
}

export function setUserContext(user: { id: string; email?: string; name?: string }): void {
  Sentry.setUser(user);
}

export function clearUserContext(): void {
  Sentry.setUser(null);
}

export function setTag(key: string, value: string): void {
  Sentry.setTag(key, value);
}

export function captureMessage(message: string, level?: Sentry.Severity): void {
  Sentry.captureMessage(message, level);
}

export function captureException(error: Error): void {
  Sentry.captureException(error);
}

export function startTransaction(name: string, op: string): Sentry.Transaction {
  return Sentry.startTransaction({ name, op });
}
```

## Advanced Memory Debugging

### Identifying Memory Leaks

1. **Using Chrome DevTools**:
   - Open Chrome DevTools
   - Go to the Memory tab
   - Take a heap snapshot
   - Perform actions in your app
   - Take another heap snapshot
   - Compare snapshots to identify retained objects

2. **Using Flipper**:
   - Open Flipper
   - Use the Memory plugin
   - Monitor memory usage over time
   - Identify memory growth patterns

### Common Memory Leak Patterns

1. **Event Listeners**:

```jsx
// Bad: Event listener not removed
componentDidMount() {
  AppState.addEventListener('change', this.handleAppStateChange);
}

// Good: Event listener removed in componentWillUnmount
componentDidMount() {
  this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);
}

componentWillUnmount() {
  if (this.appStateSubscription) {
    this.appStateSubscription.remove();
  }
}
```

2. **Timers**:

```jsx
// Bad: Timer not cleared
componentDidMount() {
  this.timer = setInterval(() => {
    this.updateData();
  }, 1000);
}

// Good: Timer cleared in componentWillUnmount
componentDidMount() {
  this.timer = setInterval(() => {
    this.updateData();
  }, 1000);
}

componentWillUnmount() {
  if (this.timer) {
    clearInterval(this.timer);
  }
}
```

3. **Closures**:

```jsx
// Bad: Closure capturing component instance
fetchData = () => {
  api.getData().then(data => {
    // This closure captures 'this', preventing garbage collection
    this.setState({ data });
  });
};

// Good: Check if component is mounted
componentDidMount() {
  this._isMounted = true;
}

fetchData = () => {
  api.getData().then(data => {
    if (this._isMounted) {
      this.setState({ data });
    }
  });
};

componentWillUnmount() {
  this._isMounted = false;
}
```

### Memory Profiling

1. **Using Chrome DevTools**:
   - Open Chrome DevTools
   - Go to the Performance tab
   - Record a performance profile
   - Look for memory usage patterns

2. **Using Systrace**:
   - Run your app with Systrace enabled
   - Analyze memory allocation patterns

## Advanced Performance Debugging

### JavaScript Thread Performance

1. **Identifying JS Thread Bottlenecks**:
   - Use the Performance Monitor to check JS frame rate
   - Look for drops in frame rate during specific operations

2. **Profiling JavaScript Execution**:
   - Use Chrome DevTools Performance tab
   - Record a performance profile
   - Identify long-running JavaScript operations

3. **Optimizing JavaScript Performance**:
   - Move expensive operations off the main thread
   - Use `requestAnimationFrame` for animations
   - Implement virtualization for long lists

### Native Thread Performance

1. **Identifying Native Thread Bottlenecks**:
   - Use the Performance Monitor to check UI frame rate
   - Look for drops in frame rate during specific operations

2. **Profiling Native Execution**:
   - Use Xcode Instruments (iOS) or Android Profiler (Android)
   - Identify long-running native operations

3. **Optimizing Native Performance**:
   - Optimize native view hierarchies
   - Reduce bridge traffic
   - Use native optimizations where possible

### Bridge Performance

1. **Identifying Bridge Bottlenecks**:
   - Monitor bridge traffic using the spy function
   - Look for frequent or large bridge calls

2. **Optimizing Bridge Performance**:
   - Batch bridge calls
   - Reduce data size
   - Move critical operations to native code

## Debugging Complex UI Issues

### Layout Debugging

1. **Using Flipper Layout Inspector**:
   - Open Flipper
   - Use the Layout plugin
   - Inspect component hierarchy and styles
   - Modify styles in real-time

2. **Using React DevTools**:
   - Open React DevTools
   - Inspect component props and state
   - Modify props and state to test changes

3. **Using View Hierarchy Debugger**:
   - In Xcode, use the View Hierarchy Debugger
   - In Android Studio, use the Layout Inspector

### Animation Debugging

1. **Using the Animated API Debugger**:

```jsx
if (__DEV__) {
  require('react-native').Animated.setUseNativeDriver(false);
  require('react-native').Animated.addListener('change', (state) => {
    console.log('Animated state:', state);
  });
}
```

2. **Debugging Reanimated**:

```jsx
import { useAnimatedReaction } from 'react-native-reanimated';

// In your component
useAnimatedReaction(
  () => animatedValue.value,
  (current, previous) => {
    console.log(`Animated value changed from ${previous} to ${current}`);
  }
);
```

## Creating a Comprehensive Debugging Strategy

### Development Environment Setup

1. **Configure Development Tools**:
   - Set up React Native Debugger
   - Configure Flipper plugins
   - Set up source maps

2. **Implement Debugging Utilities**:
   - Create a logger utility
   - Set up error boundaries
   - Implement performance monitoring

### Debugging Workflow

1. **Reproduce the Issue**:
   - Create a reliable reproduction case
   - Document the steps to reproduce

2. **Gather Information**:
   - Check logs and error messages
   - Use debugging tools to inspect state and execution
   - Capture screenshots or videos if applicable

3. **Analyze the Problem**:
   - Determine the root cause
   - Identify the affected components or systems

4. **Implement a Solution**:
   - Fix the issue
   - Add tests to prevent regression
   - Document the solution

### Production Monitoring

1. **Implement Error Tracking**:
   - Set up Sentry or another error tracking service
   - Configure source maps for better stack traces

2. **Implement Analytics**:
   - Track user actions and app state
   - Monitor performance metrics

3. **Implement Remote Logging**:
   - Capture logs from production apps
   - Analyze logs to identify issues

## Exercise: Advanced Debugging

Debug a medication tracking application with the following complex issues:

1. Memory leak causing the app to crash after extended use
2. Performance issues when rendering a large list of medications
3. Native module integration issues
4. Third-party library conflicts
5. Production crash that doesn't occur in development

## Next Steps

In the next section, we'll explore testing in React Native, focusing on unit testing, integration testing, and end-to-end testing.

## Additional Resources

- [React Native Performance Documentation](https://reactnative.dev/docs/performance)
- [Sentry React Native Documentation](https://docs.sentry.io/platforms/react-native/)
- [Flipper Documentation](https://fbflipper.com/docs/getting-started/react-native/)
- [React Native Debugger Documentation](https://github.com/jhen0409/react-native-debugger)
- [Chrome DevTools Memory Profiling](https://developers.google.com/web/tools/chrome-devtools/memory-problems)
- [React Native Internals](https://reactnative.dev/docs/next/architecture-overview)
