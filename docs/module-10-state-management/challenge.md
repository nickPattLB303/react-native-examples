# Module 10 Challenge: Medication Tracking App State Management

## Overview

In this challenge, you'll implement a comprehensive state management system for a medication tracking application called "MedTracker". The application will allow users to track their medications, set reminders, and view medication history. You'll use React Query for server state, Zustand for client state, Context API for shared state, and implement data persistence for offline capabilities.

## Learning Objectives

By completing this challenge, you will demonstrate your ability to:

- Implement server state management using React Query
- Implement client state management using Zustand
- Use Context API for shared state
- Implement data persistence for offline capabilities
- Apply state management best practices
- Create a scalable and maintainable state management architecture

## Prerequisites

- Completion of Module 10 sections
- Understanding of state management concepts in React Native
- Familiarity with React Query, Zustand, and Context API
- Knowledge of TypeScript

## Challenge Description

You are tasked with implementing the state management system for the MedTracker application. The application has the following main features:

1. **Authentication**: User login and registration
2. **Medication Management**: Add, edit, and delete medications
3. **Medication Reminders**: Set and manage medication reminders
4. **Medication History**: Track medication adherence history
5. **User Profile**: View and edit user profile information
6. **Settings**: App settings and preferences

### Part 1: Server State Management with React Query

Implement server state management using React Query for the following features:

1. **Authentication API**:
   - Login endpoint: `POST /api/auth/login`
   - Registration endpoint: `POST /api/auth/register`
   - Logout endpoint: `POST /api/auth/logout`
   - Refresh token endpoint: `POST /api/auth/refresh`

2. **Medications API**:
   - Get all medications: `GET /api/medications`
   - Get medication by ID: `GET /api/medications/{id}`
   - Create medication: `POST /api/medications`
   - Update medication: `PUT /api/medications/{id}`
   - Delete medication: `DELETE /api/medications/{id}`

3. **Medication History API**:
   - Get medication history: `GET /api/medications/{id}/history`
   - Add medication history entry: `POST /api/medications/{id}/history`
   - Update medication history entry: `PUT /api/medications/{id}/history/{entryId}`
   - Delete medication history entry: `DELETE /api/medications/{id}/history/{entryId}`

4. **User Profile API**:
   - Get user profile: `GET /api/users/profile`
   - Update user profile: `PUT /api/users/profile`

Implement the following React Query features:

- Query invalidation and refetching
- Optimistic updates for mutations
- Error handling and retry logic
- Pagination for medication history
- Query caching and stale time configuration
- Prefetching for improved user experience
- TypeScript integration with proper types

### Part 2: Client State Management with Zustand

Implement client state management using Zustand for the following features:

1. **Theme Store**:
   - Light/dark mode toggle
   - Custom theme colors
   - Font size preferences

2. **UI State Store**:
   - Loading states
   - Error states
   - Modal visibility
   - Navigation state

3. **Medication Reminder Store**:
   - Active reminders
   - Reminder notifications
   - Reminder settings

4. **Settings Store**:
   - Notification preferences
   - Privacy settings
   - App preferences

Implement the following Zustand features:

- Store creation with TypeScript
- Derived state and selectors
- Middleware for logging and persistence
- Async actions
- Store slicing for better organization
- Integration with React components
- Performance optimization

### Part 3: Shared State with Context API

Implement shared state using Context API for the following features:

1. **Authentication Context**:
   - Current user information
   - Authentication state (logged in, logged out)
   - Authentication methods (login, logout, register)

2. **Theme Context**:
   - Current theme
   - Theme switching functionality
   - Theme-related utilities

3. **Notification Context**:
   - In-app notifications
   - Toast messages
   - Alert dialogs

Implement the following Context API features:

- Context creation with TypeScript
- Context providers with proper typing
- Custom hooks for consuming context
- Context performance optimization
- Integration with other state management solutions

### Part 4: Data Persistence and Offline Capabilities

Implement data persistence and offline capabilities using various storage options:

1. **Authentication Persistence**:
   - Store authentication tokens securely using SecureStore
   - Implement token refresh mechanism
   - Handle authentication expiration

2. **Medication Data Persistence**:
   - Store medication data using SQLite
   - Implement database schema and migrations
   - Provide CRUD operations for offline use

3. **User Preferences Persistence**:
   - Store user preferences using AsyncStorage
   - Implement preference synchronization with server

4. **Medication Images Persistence**:
   - Store medication images using FileSystem
   - Implement image caching and optimization

Implement the following offline capabilities:

- Offline-first architecture
- Synchronization with server when online
- Conflict resolution for offline changes
- Background synchronization
- Offline error handling

### Part 5: State Management Architecture

Design and implement a comprehensive state management architecture that:

1. **Follows Best Practices**:
   - Separation of concerns
   - Single source of truth
   - Immutability
   - Performance optimization

2. **Is Scalable and Maintainable**:
   - Modular design
   - Clear boundaries between different state types
   - Consistent patterns and conventions
   - Proper error handling

3. **Provides a Good Developer Experience**:
   - Easy to understand and use
   - Well-documented
   - Type-safe with TypeScript
   - Testable

4. **Ensures Good User Experience**:
   - Fast and responsive
   - Works offline
   - Preserves user data
   - Handles errors gracefully

## Technical Requirements

1. **TypeScript**:
   - Use TypeScript for all state management code
   - Define proper types for all state
   - Ensure type safety for all state operations

2. **React Query**:
   - Use React Query v4 or later
   - Implement proper query and mutation hooks
   - Configure React Query for optimal performance

3. **Zustand**:
   - Use Zustand v4 or later
   - Implement proper store design
   - Use middleware as appropriate

4. **Context API**:
   - Use React Context API effectively
   - Implement proper context providers and consumers
   - Optimize context performance

5. **Storage**:
   - Use appropriate storage options for different data types
   - Implement proper error handling for storage operations
   - Ensure data integrity and security

6. **Testing**:
   - Write tests for state management logic
   - Test offline capabilities
   - Test error handling

## Deliverables

1. **State Management Implementation**:
   - Complete implementation of server state management with React Query
   - Complete implementation of client state management with Zustand
   - Complete implementation of shared state with Context API
   - Complete implementation of data persistence and offline capabilities

2. **Documentation**:
   - State management architecture documentation
   - API documentation
   - Usage examples for state management hooks and utilities

3. **Tests**:
   - Unit tests for state management logic
   - Integration tests for state management components
   - End-to-end tests for critical flows

## Evaluation Criteria

Your challenge submission will be evaluated based on the following criteria:

1. **Functionality**:
   - All state management features work as expected
   - Offline capabilities work correctly
   - Data persistence is implemented effectively

2. **Code Quality**:
   - Clean, maintainable code
   - Proper TypeScript usage
   - Good code organization
   - Performance considerations

3. **Architecture**:
   - Well-designed state management architecture
   - Clear separation of concerns
   - Proper use of each state management solution
   - Scalable and maintainable design

4. **User Experience**:
   - Fast and responsive application
   - Smooth offline experience
   - Proper error handling
   - Data integrity

5. **Documentation**:
   - Clear and comprehensive documentation
   - Well-documented state management architecture
   - Useful usage examples

## Resources

- [React Query Documentation](https://tanstack.com/query/latest/docs/framework/react/react-native)
- [Zustand Documentation](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [React Context API Documentation](https://reactjs.org/docs/context.html)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [Expo SecureStore Documentation](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [Expo FileSystem Documentation](https://docs.expo.dev/versions/latest/sdk/filesystem/)
- [Expo SQLite Documentation](https://docs.expo.dev/versions/latest/sdk/sqlite/)

## Submission Guidelines

1. Create a new React Native project using Expo
2. Implement the state management system as described
3. Include documentation in the project repository
4. Submit the project repository URL
5. Include a README with setup instructions and state management documentation

Good luck!
