# Module 11 Challenge: Performance Optimization and Debugging

## Overview

In this challenge, you'll apply the performance optimization and debugging techniques learned in this module to a medication tracking application. You'll identify and fix performance bottlenecks, debug complex issues, and implement a comprehensive performance monitoring and error reporting system.

## Learning Objectives

By completing this challenge, you will demonstrate your ability to:

- Identify and fix performance bottlenecks in a React Native application
- Debug complex issues in both JavaScript and native code
- Implement performance monitoring and error reporting
- Apply best practices for performance optimization
- Create a comprehensive debugging strategy

## Prerequisites

- Completion of Module 11 sections
- Understanding of React Native performance concepts
- Familiarity with debugging tools and techniques
- Knowledge of error handling and reporting

## Challenge Description

You've been tasked with optimizing and debugging a medication tracking application called "MedTracker". The application allows users to track their medications, set reminders, and view medication history. However, the application has several performance issues and bugs that need to be fixed.

### Part 1: Performance Analysis and Optimization

1. **Performance Audit**:
   - Use the Performance Monitor to identify performance bottlenecks in the application
   - Measure the frame rate, memory usage, and startup time
   - Document your findings in a performance audit report

2. **Optimize Medication List**:
   - The medication list screen suffers from performance issues when scrolling through a large list of medications
   - Implement optimizations to improve the scrolling performance
   - Use `FlatList` with proper configuration
   - Implement memoization to prevent unnecessary re-renders

3. **Optimize Medication Detail Screen**:
   - The medication detail screen takes too long to load
   - Identify the cause of the slow loading
   - Implement optimizations to improve the loading time
   - Use performance monitoring to verify your improvements

4. **Reduce Bundle Size**:
   - Analyze the bundle size using the Metro bundler
   - Identify large dependencies that can be optimized or replaced
   - Implement code splitting or lazy loading where appropriate
   - Measure the impact of your changes on the bundle size and startup time

### Part 2: Debugging and Error Handling

1. **Debug Medication Reminder Issue**:
   - The medication reminder feature is not working correctly
   - Set up a debugging environment using React Native Debugger or Flipper
   - Identify the cause of the issue
   - Fix the issue and verify that the reminders work correctly

2. **Debug Native Module Integration**:
   - The application uses a native module for scanning medication barcodes
   - The barcode scanner is crashing on certain devices
   - Debug the native module integration
   - Fix the issue and implement proper error handling

3. **Implement Error Boundaries**:
   - Implement error boundaries to prevent the entire application from crashing
   - Create a user-friendly error screen
   - Test the error boundaries by intentionally causing errors

4. **Implement Comprehensive Logging**:
   - Implement a structured logging system
   - Log important events and errors
   - Implement log collection for analysis
   - Ensure logs are useful for debugging

### Part 3: Production Monitoring and Crash Reporting

1. **Implement Source Maps**:
   - Configure the build process to generate source maps
   - Verify that the source maps work correctly
   - Document the process for using source maps in production debugging

2. **Implement Crash Reporting**:
   - Integrate a crash reporting service (e.g., Sentry)
   - Configure the service to capture JavaScript and native crashes
   - Implement proper context and user information
   - Test the crash reporting by intentionally causing crashes

3. **Implement Performance Monitoring**:
   - Implement custom performance tracking
   - Monitor key metrics such as screen load times and interaction times
   - Integrate with an analytics service
   - Create a dashboard for monitoring performance metrics

4. **Create a Debugging Guide**:
   - Create a comprehensive debugging guide for the application
   - Document common issues and their solutions
   - Include instructions for using debugging tools
   - Provide guidelines for performance optimization

## Deliverables

1. **Performance Audit Report**:
   - Document the performance issues found
   - Provide metrics before and after optimization
   - Explain the optimizations implemented

2. **Optimized Code**:
   - Provide the optimized code for the medication list and detail screens
   - Include comments explaining the optimizations

3. **Debugging Report**:
   - Document the debugging process for each issue
   - Explain the root cause of each issue
   - Provide the fixed code

4. **Error Handling Implementation**:
   - Provide the implementation of error boundaries
   - Include the logging system implementation
   - Document the error handling strategy

5. **Production Monitoring Setup**:
   - Provide the configuration for source maps
   - Include the crash reporting integration
   - Document the performance monitoring implementation

6. **Debugging Guide**:
   - Create a comprehensive debugging guide
   - Include common issues and solutions
   - Provide guidelines for performance optimization

## Evaluation Criteria

Your challenge submission will be evaluated based on the following criteria:

1. **Performance Improvements**:
   - Measurable improvements in frame rate, memory usage, and startup time
   - Effective use of performance optimization techniques
   - Proper implementation of memoization and list optimization

2. **Debugging Effectiveness**:
   - Successful identification and fixing of bugs
   - Proper use of debugging tools
   - Clear documentation of the debugging process

3. **Error Handling**:
   - Comprehensive error boundary implementation
   - Effective logging system
   - Proper handling of native module errors

4. **Production Monitoring**:
   - Correct implementation of source maps
   - Effective crash reporting integration
   - Comprehensive performance monitoring

5. **Documentation**:
   - Clear and comprehensive documentation
   - Useful debugging guide
   - Well-explained performance optimizations

## Resources

- [React Native Performance Documentation](https://reactnative.dev/docs/performance)
- [React Native Debugging Documentation](https://reactnative.dev/docs/debugging)
- [Flipper Documentation](https://fbflipper.com/docs/getting-started/react-native/)
- [Sentry React Native Documentation](https://docs.sentry.io/platforms/react-native/)
- [React DevTools Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)

## Submission Guidelines

1. Create a fork of the MedTracker repository
2. Implement your optimizations and fixes
3. Create a pull request with your changes
4. Include all deliverables in your pull request
5. Provide a summary of your changes in the pull request description

Good luck!
