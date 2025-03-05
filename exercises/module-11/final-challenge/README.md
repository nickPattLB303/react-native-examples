# Module 11: Final Challenge - Performance Monitoring & Debugging

## Overview
This challenge brings together all the concepts learned in Module 11 to create a comprehensive performance monitoring and debugging exercise. You will work with a Health Tracker application that combines features of medication tracking, prescription management, and health vitals monitoring.

## The Challenge
The application has multiple critical performance and debugging issues including:

1. **Memory Leaks**: The application has several memory leaks in the form of uncleared timers, event listeners, and growing data structures.

2. **Performance Bottlenecks**: There are inefficient rendering patterns, expensive calculations being done unnecessarily, and other performance issues.

3. **State Management Issues**: The application has improper state management leading to stale closures, redundant renders, and unpredictable behavior.

4. **Broken UI Components**: Some components may appear correctly initially but break under specific user interactions.

5. **Error Handling Problems**: There are potential error sources without proper handling or recovery mechanisms.

## Your Task
1. Run the application in development mode with the performance monitoring tools available in React Native.

2. Identify and fix all performance issues, focusing on:
   - Removing memory leaks
   - Optimizing render performance
   - Fixing state management issues
   - Addressing error handling

3. Document your findings and fixes in a separate file, explaining:
   - What issues you found
   - How you identified them
   - How you fixed them
   - What patterns or techniques you used to prevent similar issues

## Success Criteria
Your solution will be considered successful when:

1. The application runs without memory leaks or performance degradation over time
2. All UI components render correctly and respond properly to user interactions
3. Errors are properly handled and do not crash the application
4. Your code follows best practices for React Native performance optimization

## Evaluation Tips
- Use React DevTools profiler to identify unnecessary renders
- Use the Memory Profiler to find memory leaks
- Consider using `useCallback`, `useMemo`, and `React.memo` where appropriate
- Ensure all side effects have proper cleanup
- Use Error Boundaries to catch and handle errors gracefully

## Getting Started
1. Open the starter code in the `starter` directory
2. Run the application and observe its behavior
3. Use the debugging tools to identify issues
4. Fix the issues and compare your solution with the reference implementation in the `complete` directory

Good luck! 