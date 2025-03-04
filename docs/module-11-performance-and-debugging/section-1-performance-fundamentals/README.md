# Section 1: Performance Fundamentals

> 🔍 **Instructor Note**: This section covers critical performance concepts that affect user experience. Emphasize the importance of measuring before optimizing and help students understand the relationship between the JavaScript thread and native UI thread.

## Overview

Performance is a critical aspect of React Native applications that directly impacts user experience. This section covers the fundamental concepts of performance in React Native, including how to measure, analyze, and optimize your application's performance.

## Learning Objectives

By the end of this section, you will be able to:

- Understand the key performance metrics in React Native applications
- Identify common performance bottlenecks
- Measure and analyze performance using built-in and third-party tools
- Apply best practices for optimizing React Native performance
- Implement performance monitoring in your applications
- Use TypeScript to prevent performance issues

## Understanding React Native Performance

React Native applications run on two threads:

1. **JavaScript Thread**: Executes your JavaScript code, manages the component tree, and handles business logic
2. **Main/UI Thread**: Renders the native UI components and handles user interactions

Performance issues can occur in either thread or in the communication between them.

### Key Performance Metrics

- **Startup Time**: How long it takes for your app to launch
- **Frame Rate**: Measured in frames per second (fps), with 60fps being the target
- **Memory Usage**: How much memory your app consumes
- **CPU Usage**: How much CPU your app utilizes
- **Network Performance**: How efficiently your app makes network requests
- **Bundle Size**: How large your JavaScript bundle is
- **Time to Interactive**: How long it takes for your app to become responsive

### Common Performance Bottlenecks

1. **Render Performance**:
   - Unnecessary re-renders
   - Complex component trees
   - Inefficient list rendering

2. **JavaScript Performance**:
   - Expensive computations on the JS thread
   - Large JavaScript bundles
   - Memory leaks

3. **Native Performance**:
   - Complex native views
   - Inefficient bridge communication
   - Native module bottlenecks

4. **Network Performance**:
   - Excessive or inefficient API calls
   - Large payload sizes
   - Poor caching strategies

## Measuring Performance

### Using the Performance Monitor

React Native provides a built-in Performance Monitor that you can enable in the developer menu:

1. Shake your device or press `Cmd+D` (iOS simulator) or `Cmd+M` (Android emulator)
2. Select "Show Performance Monitor"

This will display metrics like:
- JavaScript frame rate
- UI frame rate
- Memory usage

### Using Flipper

[Flipper](https://fbflipper.com/) is a desktop debugging platform for mobile developers that provides several performance monitoring tools:

1. Install Flipper on your development machine
2. Connect your app to Flipper
3. Use the Performance plugin to monitor:
   - CPU usage
   - Memory usage
   - Network requests
   - Layout performance

### Using React DevTools

React DevTools provides a Profiler for measuring component render performance:

1. Install React DevTools: `npm install -g react-devtools`
2. Run React DevTools: `react-devtools`
3. Connect your app to React DevTools
4. Use the Profiler tab to record and analyze component renders

### Using Systrace

Systrace is a tool for analyzing the execution of your application at the system level:

1. Run your app with Systrace enabled:
   ```bash
   npx react-native run-android --trace-systrace
   # or
   npx react-native run-ios --trace-systrace
   ```
2. Perform the actions you want to analyze
3. Stop the trace and analyze the results

> 💡 **Deep Dive**: Systrace works by capturing a complete snapshot of system events across all processes. When you run React Native with Systrace enabled, it adds markers in the native code that appear in the trace. These markers help you identify when JavaScript is executing, when native modules are being called, and when UI updates are happening. The trace data shows you exactly how long each operation takes at the system level, helping you pinpoint bottlenecks in the JavaScript thread, UI thread, or bridge communication.

### Custom Performance Measurements

You can add custom performance measurements to your code:

```typescript
import { PerformanceObserver, performance } from 'perf_hooks';

// Create a performance observer
const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});
obs.observe({ entryTypes: ['measure'] });

// Measure a function's performance
function measureFunction() {
  const start = `myFunction-${Date.now()}`;
  performance.mark(start);
  
  // Your function code here
  myFunction();
  
  const end = `myFunction-end-${Date.now()}`;
  performance.mark(end);
  performance.measure('myFunction', start, end);
}
```

## Analyzing Performance Issues

> 🔄 **For Android Developers**: These performance measurement techniques are similar to Android's Systrace and TraceView tools. If you're familiar with Android profiling, you'll find React Native's performance tools follow similar principles but with JavaScript-specific considerations.

> 🔄 **For iOS Developers**: If you've used Instruments in Xcode for performance profiling, you'll notice similarities in the approach. React Native's tools provide visibility into both the JavaScript execution and native rendering, similar to how Instruments shows you CPU, memory, and graphics performance.

### Identifying Render Performance Issues

1. **Component Profiling**:
   - Use React DevTools Profiler to identify components that render frequently or take a long time to render
   - Look for components that render when their props haven't changed

2. **List Performance**:
   - Check if lists are rendering efficiently
   - Verify that list items have proper keys
   - Look for complex list item components

### Identifying JavaScript Performance Issues

1. **CPU Profiling**:
   - Use Chrome DevTools or Safari Web Inspector to profile JavaScript execution
   - Look for functions that take a long time to execute

2. **Memory Profiling**:
   - Use memory profilers to identify memory leaks
   - Look for growing memory usage over time

### Identifying Native Performance Issues

1. **Bridge Communication**:
   - Monitor the number of bridge calls
   - Look for excessive serialization/deserialization

2. **Native Module Performance**:
   - Profile native modules using platform-specific tools
   - Look for blocking operations on the main thread

## Performance Best Practices

### General Best Practices

1. **Measure First**: Always measure performance before and after optimizations
2. **Focus on User Experience**: Prioritize optimizations that impact user experience
3. **Optimize the Critical Path**: Focus on the most frequently used parts of your app
4. **Progressive Enhancement**: Start with a basic implementation and add features progressively

### JavaScript Optimization

1. **Memoization**: Use `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary calculations and renders

```typescript
import React, { useMemo, useCallback } from 'react';

function ExpensiveComponent({ data, onItemPress }) {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      fullName: `${item.firstName} ${item.lastName}`,
      totalAmount: item.price * item.quantity
    }));
  }, [data]);
  
  // Memoize callback functions
  const handleItemPress = useCallback((id) => {
    onItemPress(id);
  }, [onItemPress]);
  
  return (
    // Component implementation
  );
}

// Memoize the entire component
export default React.memo(ExpensiveComponent);
```

2. **Avoid Anonymous Functions in Renders**: Define functions outside the render method or memoize them

```typescript
// Bad
function BadComponent({ onPress }) {
  return (
    <Button onPress={() => onPress()} />
  );
}

// Good
function GoodComponent({ onPress }) {
  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);
  
  return (
    <Button onPress={handlePress} />
  );
}
```

3. **Debounce and Throttle**: Limit the frequency of expensive operations

```typescript
import { debounce, throttle } from 'lodash';

// Debounce: Wait until user stops typing
const debouncedSearch = debounce((query) => {
  searchApi(query);
}, 300);

// Throttle: Limit to once per 100ms
const throttledScroll = throttle((event) => {
  handleScroll(event);
}, 100);
```

### Render Optimization

1. **Flatten Component Trees**: Avoid deeply nested component hierarchies

```typescript
// Bad: Deeply nested
<View>
  <View>
    <View>
      <Text>Deeply nested text</Text>
    </View>
  </View>
</View>

// Good: Flattened
<View style={styles.container}>
  <Text style={styles.text}>Flattened text</Text>
</View>
```

2. **Use PureComponent or React.memo**: Prevent unnecessary re-renders

```typescript
// Class component
class MedicationItem extends React.PureComponent {
  render() {
    return (
      // Component implementation
    );
  }
}

// Function component
const MedicationItem = React.memo(({ medication }) => {
  return (
    // Component implementation
  );
});
```

3. **Optimize Lists**: Use `FlatList` or `SectionList` with proper configuration

```typescript
import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';

function MedicationsList({ medications }) {
  // Memoize renderItem function
  const renderItem = useCallback(({ item }) => (
    <MedicationItem medication={item} />
  ), []);
  
  // Memoize keyExtractor function
  const keyExtractor = useCallback((item) => item.id.toString(), []);
  
  return (
    <FlatList
      data={medications}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      getItemLayout={(data, index) => ({
        length: 80,
        offset: 80 * index,
        index,
      })}
    />
  );
}
```

### Memory Optimization

1. **Clean Up Resources**: Always clean up resources in `useEffect` cleanup functions

```typescript
import React, { useEffect } from 'react';

function SubscriptionComponent() {
  useEffect(() => {
    const subscription = subscribeToData();
    
    // Clean up function
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  return (
    // Component implementation
  );
}
```

2. **Avoid Memory Leaks**: Be careful with closures and event listeners

```typescript
import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

function AppStateMonitor() {
  const appStateSubscription = useRef(null);
  
  useEffect(() => {
    // Store the subscription in a ref
    appStateSubscription.current = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    
    // Clean up function
    return () => {
      if (appStateSubscription.current) {
        appStateSubscription.current.remove();
      }
    };
  }, []);
  
  const handleAppStateChange = (nextAppState) => {
    // Handle app state change
  };
  
  return null;
}
```

3. **Use Proper Image Handling**: Optimize images and use proper caching

```typescript
import React from 'react';
import FastImage from 'react-native-fast-image';

function OptimizedImage({ uri }) {
  return (
    <FastImage
      style={{ width: 200, height: 200 }}
      source={{
        uri: uri,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
}
```

### Network Optimization

1. **Implement Proper Caching**: Cache network responses appropriately

```typescript
import { useQuery } from '@tanstack/react-query';

function useMedications() {
  return useQuery({
    queryKey: ['medications'],
    queryFn: fetchMedications,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
}
```

2. **Optimize Payload Size**: Minimize the size of data transferred over the network

```typescript
// API function that requests only needed fields
async function fetchMedicationSummary() {
  const response = await fetch('/api/medications?fields=id,name,dosage');
  return response.json();
}
```

3. **Implement Pagination**: Load data in chunks instead of all at once

```typescript
import { useInfiniteQuery } from '@tanstack/react-query';

function usePaginatedMedications() {
  return useInfiniteQuery({
    queryKey: ['medications', 'paginated'],
    queryFn: ({ pageParam = 1 }) => fetchMedicationsPage(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
```

## Performance Monitoring in Production

### Implementing Performance Monitoring

1. **Custom Performance Tracking**:

```typescript
// utils/performance.ts
class PerformanceMonitor {
  private metrics: Record<string, number[]> = {};
  
  startMeasure(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!this.metrics[name]) {
        this.metrics[name] = [];
      }
      
      this.metrics[name].push(duration);
      
      // Optionally send to analytics
      this.reportMetric(name, duration);
    };
  }
  
  getAverageMetric(name: string): number {
    if (!this.metrics[name] || this.metrics[name].length === 0) {
      return 0;
    }
    
    const sum = this.metrics[name].reduce((acc, val) => acc + val, 0);
    return sum / this.metrics[name].length;
  }
  
  getAllMetrics(): Record<string, { average: number; count: number }> {
    const result: Record<string, { average: number; count: number }> = {};
    
    Object.keys(this.metrics).forEach(key => {
      result[key] = {
        average: this.getAverageMetric(key),
        count: this.metrics[key].length,
      };
    });
    
    return result;
  }
  
  private reportMetric(name: string, duration: number): void {
    // Send to analytics service
    // analytics.trackPerformance(name, duration);
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

2. **Using in Components**:

```typescript
import React, { useEffect } from 'react';
import { performanceMonitor } from '../utils/performance';

function MedicationScreen() {
  useEffect(() => {
    const endMeasure = performanceMonitor.startMeasure('MedicationScreen_render');
    
    return () => {
      endMeasure();
    };
  }, []);
  
  // Component implementation
}
```

### Integrating with Analytics

```typescript
// utils/analytics.ts
import analytics from '@react-native-firebase/analytics';

export const trackPerformance = (metricName: string, value: number) => {
  analytics().logEvent('performance_metric', {
    metric_name: metricName,
    value,
  });
};
```

## TypeScript and Performance

TypeScript can help prevent performance issues by catching potential problems at compile time:

### Type-Safe Props

```typescript
// Define explicit prop types
interface MedicationItemProps {
  id: string;
  name: string;
  dosage: string;
  onPress: (id: string) => void;
}

// Use the interface for your component
const MedicationItem: React.FC<MedicationItemProps> = ({ 
  id, 
  name, 
  dosage, 
  onPress 
}) => {
  // Implementation
};
```

### Preventing Unnecessary Re-renders

```typescript
import React from 'react';

interface CounterProps {
  initialCount: number;
}

// Use React.memo with explicit type
const Counter = React.memo<CounterProps>(({ initialCount }) => {
  const [count, setCount] = React.useState(initialCount);
  
  return (
    // Implementation
  );
});
```

### Type-Safe Performance Hooks

```typescript
import { useMemo, useCallback } from 'react';

// Type-safe useMemo
function useProcessedData<T, R>(data: T[], processingFn: (data: T[]) => R, deps: any[] = [data]): R {
  return useMemo(() => processingFn(data), deps);
}

// Type-safe useCallback
function useTypedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: any[]
): T {
  return useCallback(callback, deps);
}
```

## Exercise: Performance Analysis

Analyze the performance of a medication tracking application:

1. Identify potential performance bottlenecks in the provided code
2. Measure the performance using the tools discussed
3. Implement optimizations to improve performance
4. Measure the performance again to verify improvements
5. Document your findings and optimizations

## Next Steps

In the next section, we'll explore debugging tools and techniques for React Native applications, focusing on how to effectively identify and fix issues in your code.

## Additional Resources

- [React Native Performance Documentation](https://reactnative.dev/docs/performance)
- [React DevTools](https://reactnative.dev/docs/debugging#react-developer-tools)
- [Flipper Documentation](https://fbflipper.com/)
- [React Native Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)
- [Systrace Documentation](https://reactnative.dev/docs/profiling#profiling-with-systrace)
- [Performance Optimization in React Native](https://reactnative.dev/docs/optimizing-flatlist-configuration)
