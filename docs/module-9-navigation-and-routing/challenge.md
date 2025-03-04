# Module 9 Challenge: Pharmacy App Navigation

## Overview

In this challenge, you'll implement a comprehensive navigation system for a pharmacy application called "PharmEasy". The application will allow users to browse medications, view details, place orders, and manage their profile. You'll create various navigation patterns, handle authentication flows, and implement deep linking.

## Learning Objectives

By completing this challenge, you will demonstrate your ability to:

- Implement complex navigation structures using Expo Router or React Navigation
- Create and manage multiple navigation patterns (stack, tab, drawer)
- Handle authentication flows and protected routes
- Implement deep linking
- Apply navigation best practices
- Create a seamless user experience with proper navigation

## Prerequisites

- Completion of Module 9 sections
- Understanding of navigation concepts in React Native
- Familiarity with Expo Router or React Navigation
- Knowledge of TypeScript

## Challenge Description

You are tasked with implementing the navigation system for the PharmEasy application. The application has the following main features:

1. **Authentication**: Login, registration, and password recovery screens
2. **Home**: Main screen with featured medications and categories
3. **Medications**: Browse and search for medications
4. **Medication Details**: View detailed information about a medication
5. **Cart**: View and manage items in the cart
6. **Checkout**: Complete the order process
7. **Orders**: View order history and track current orders
8. **Profile**: View and edit user profile information
9. **Settings**: App settings and preferences

### Part 1: Navigation Structure

Implement the following navigation structure for the PharmEasy application:

1. **Authentication Flow**:
   - Login Screen
   - Registration Screen
   - Password Recovery Screen

2. **Main App Flow** (accessible only after authentication):
   - Bottom Tab Navigator:
     - Home Tab
     - Medications Tab
     - Cart Tab
     - Orders Tab
     - Profile Tab

3. **Drawer Navigator** (accessible from all main screens):
   - Home
   - Medications
   - My Prescriptions
   - Order History
   - Settings
   - Help & Support
   - About
   - Logout

4. **Stack Navigators** within each tab:
   - Home Stack:
     - Home Screen
     - Category Screen
     - Medication Details Screen
   - Medications Stack:
     - Medications List Screen
     - Medication Details Screen
     - Search Results Screen
   - Cart Stack:
     - Cart Screen
     - Checkout Screen
     - Payment Screen
     - Order Confirmation Screen
   - Orders Stack:
     - Orders List Screen
     - Order Details Screen
     - Track Order Screen
   - Profile Stack:
     - Profile Screen
     - Edit Profile Screen
     - Addresses Screen
     - Payment Methods Screen
     - Notifications Screen

### Part 2: Authentication Flow

Implement a complete authentication flow with the following features:

1. **Protected Routes**:
   - Ensure that authenticated routes are only accessible after login
   - Redirect unauthenticated users to the login screen

2. **Authentication State Management**:
   - Implement a context or state management solution for authentication
   - Store and retrieve authentication tokens
   - Handle token expiration and refresh

3. **Logout Functionality**:
   - Implement logout functionality that clears authentication state
   - Redirect to the login screen after logout

### Part 3: Deep Linking

Implement deep linking for the PharmEasy application with the following features:

1. **URL Scheme**:
   - Define a URL scheme for the application (e.g., `pharmeasy://`)
   - Handle deep links with the defined URL scheme

2. **Deep Link Routes**:
   - Medication Details: `pharmeasy://medications/{medicationId}`
   - Order Details: `pharmeasy://orders/{orderId}`
   - Category: `pharmeasy://category/{categoryId}`
   - Search Results: `pharmeasy://search?query={searchQuery}`

3. **Universal Links** (optional):
   - Configure the application to handle universal links
   - Test universal links with a web domain

### Part 4: Navigation Patterns and User Experience

Implement the following navigation patterns and user experience enhancements:

1. **Modal Screens**:
   - Implement modal screens for quick actions (e.g., adding to cart, filtering)
   - Ensure proper modal navigation and dismissal

2. **Wizard Flows**:
   - Implement a wizard flow for the checkout process
   - Include progress indicators and back/next navigation

3. **Master-Detail Pattern**:
   - Implement a master-detail pattern for the medications list and details
   - Adapt the layout for different screen sizes (tablet vs. phone)

4. **Navigation Transitions**:
   - Customize navigation transitions for different screen types
   - Implement shared element transitions for medication images

5. **Navigation State Persistence**:
   - Ensure navigation state is preserved during app restarts
   - Implement proper handling of navigation state serialization

### Part 5: Testing and Documentation

1. **Navigation Testing**:
   - Write tests for navigation flows
   - Test deep linking functionality
   - Test authentication flows

2. **Documentation**:
   - Document the navigation structure
   - Create a navigation map or diagram
   - Document deep linking configuration
   - Provide usage examples for navigation functions

## Technical Requirements

1. **Choose a Navigation Library**:
   - Use either Expo Router or React Navigation
   - Justify your choice based on the application requirements

2. **TypeScript**:
   - Use TypeScript for all navigation-related code
   - Define proper types for navigation parameters
   - Ensure type safety for navigation functions

3. **Code Organization**:
   - Organize navigation code in a maintainable structure
   - Separate navigation logic from screen components
   - Create reusable navigation components where appropriate

4. **Performance**:
   - Optimize navigation performance
   - Implement lazy loading for screens
   - Minimize unnecessary re-renders during navigation

5. **Accessibility**:
   - Ensure navigation elements are accessible
   - Implement proper focus management during navigation
   - Add screen reader support for navigation elements

## Deliverables

1. **Navigation Implementation**:
   - Complete implementation of the navigation structure
   - Authentication flow with protected routes
   - Deep linking configuration
   - Navigation patterns and user experience enhancements

2. **Documentation**:
   - Navigation structure documentation
   - Deep linking documentation
   - Usage examples for navigation functions

3. **Tests**:
   - Navigation flow tests
   - Deep linking tests
   - Authentication flow tests

## Evaluation Criteria

Your challenge submission will be evaluated based on the following criteria:

1. **Functionality**:
   - All navigation features work as expected
   - Authentication flow properly protects routes
   - Deep linking works correctly
   - Navigation patterns are implemented effectively

2. **Code Quality**:
   - Clean, maintainable code
   - Proper TypeScript usage
   - Good code organization
   - Performance considerations

3. **User Experience**:
   - Smooth navigation transitions
   - Intuitive navigation patterns
   - Proper error handling
   - Accessibility considerations

4. **Documentation**:
   - Clear and comprehensive documentation
   - Well-documented navigation structure
   - Useful usage examples

5. **Testing**:
   - Comprehensive test coverage
   - Edge case handling
   - Test organization and clarity

## Resources

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Deep Linking in React Native](https://reactnative.dev/docs/linking)
- [Authentication Flows in React Navigation](https://reactnavigation.org/docs/auth-flow)
- [Navigation Testing](https://reactnavigation.org/docs/testing)

## Submission Guidelines

1. Create a new React Native project using Expo
2. Implement the navigation system as described
3. Include documentation in the project repository
4. Submit the project repository URL
5. Include a README with setup instructions and navigation documentation

Good luck!
