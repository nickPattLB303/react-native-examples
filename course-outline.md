# React Native Training Course Outline

This document provides a comprehensive outline of the React Native training course. Each topic includes detailed subtopics, learning objectives, and specific requirements. This outline serves as the source of truth for building course content and ensures consistency across all learning paths.

## Course Topics Overview

1. **React Native Fundamentals**
2. **React Native Environment Setup**
3. **Web Development Essentials**
4. **JavaScript Essentials**
5. **React Essentials**
6. **TypeScript Essentials**
7. **React Native Components**
8. **React Native Hooks**
9. **React Native UI and Styling**
10. **Performance and Debugging**
11. **Navigation and Routing**
12. **React Native User Input and Forms**
13. **State Management**
14. **Native Modules**
15. **EAS and Publishing**
16. **Advanced Features**
17. **Capstone Project**

---

## Topic 1: React Native Fundamentals

### Overview
An introduction to the history of mobile development, the evolution of React Native, and how React Native works under the hood. This topic provides the foundation for understanding the React Native ecosystem and architecture.

### Learning Objectives
- Explain the history and evolution of mobile development approaches
- Describe how React Native works under the hood
- Compare React Native to other mobile development frameworks
- Identify when React Native is an appropriate technology choice
- Explain the core architecture of a React Native application
- Recognize the relationship between JavaScript and native code
- Understand the role of the bridge and JSI in React Native
- Identify Expo's role in the React Native ecosystem

### Subtopics
1. **History of Mobile Development**
   - Native development (iOS, Android)
   - Web/hybrid approaches (Cordova, PhoneGap)
   - Cross-platform frameworks evolution

2. **React Native Architecture**
   - JavaScript thread
   - Native threads
   - Bridge and communication
   - JavaScript Interface (JSI)
   - Fabric renderer
   - Hermes JavaScript engine

3. **Why React Native?**
   - Performance considerations
   - Developer experience
   - Code sharing across platforms
   - Community and ecosystem

4. **Expo and React Native**
   - Relationship between Expo and React Native
   - Expo SDK and libraries
   - Managed vs. bare workflows
   - Development tools

### Pharmacy Theme Integration
Explain how React Native's capabilities align with the needs of a pharmacy application, including the ability to build cross-platform apps with native performance for features like medication tracking, barcode scanning, and secure user authentication.

### Developer Path Adaptations
- **Native Developers**: Focus on the React and JavaScript paradigms
- **Web Developers**: Focus on native mobile concepts and constraints

---

## Topic 2: React Native Environment Setup

### Overview
A practical guide to setting up a development environment for React Native using Expo Go. This topic focuses on creating the simplest possible setup for development and testing on iOS simulators.

### Learning Objectives
- Set up a complete React Native development environment
- Create a new Expo project using the latest recommended approach
- Understand the Expo Go workflow
- Run and test applications on iOS simulators
- Navigate and understand the default Expo template project structure
- Troubleshoot common environment setup issues

### Subtopics
1. **Development Environment Prerequisites**
   - Node.js installation and configuration
   - Git setup
   - VS Code and recommended extensions
   - iOS simulator setup
   - Expo CLI installation

2. **Creating Your First Project**
   - Using `npx create-expo-app@latest`
   - Understanding project structure
   - Package.json and dependencies
   - Configuration files

3. **Running and Testing Applications**
   - Starting the development server
   - Using Expo Go on simulators
   - Hot reloading and refresh
   - Expo development tools

4. **Common Troubleshooting**
   - Node.js dependency issues (`--legacy-peer-deps`)
   - Clearing cache (`rm -rf node_modules`)
   - Metro bundler problems
   - iOS simulator issues

5. **Expo vs. npm Commands**
   - When to use `npx expo` vs `npm`
   - Dependency management with Expo

### Pharmacy Theme Integration
Set up a basic SpeedyMeds project structure that will be used throughout the course, ensuring that even the initial setup is themed around pharmacy application development.

### Special Requirements
Based on the course requirements, this topic should:
- Cover only the simplest setup possible with Expo Go
- Use `npx create-expo-app@latest` as the primary method
- Focus on iOS simulator usage
- Include detailed explanations for all commands
- Clearly explain when to use `npx expo` vs npm commands
- Include a walkthrough of Expo's default template
- Provide comprehensive troubleshooting guidance

---

## Topic 3: Web Development Essentials

### Overview
A brief introduction to fundamental web development concepts that form the basis of React Native. This topic ensures all participants understand the core HTML, CSS, and web concepts that React Native builds upon.

### Learning Objectives
- Understand the fundamental concepts of HTML structure
- Explain how CSS styling applies to React Native's styling approach
- Recognize the relationship between web components and React Native components
- Understand the DOM and how it relates to React Native's virtual component tree
- Apply web development mental models to React Native development

### Subtopics
1. **HTML Concepts**
   - Elements and attributes
   - Document structure
   - Semantic markup
   - Web accessibility basics

2. **CSS Fundamentals**
   - Selectors and properties
   - Box model
   - Layout systems (flexbox, grid)
   - Responsive design principles

3. **The Document Object Model**
   - DOM structure and manipulation
   - Event handling
   - Virtual DOM concept
   - React Native's version of the component tree

4. **Web Components to React Native Components**
   - Mapping HTML elements to React Native components
   - Style translation from CSS to React Native
   - Limitations and differences

### Pharmacy Theme Integration
Use pharmacy-themed examples when explaining HTML structure (medication lists, patient profiles) and CSS styling (pharmacy brand colors, medication card designs).

### Developer Path Adaptations
- **Native Developers**: Higher emphasis as this may be new material
- **Web Developers**: Can skim this section as review material

---

## Topic 4: JavaScript Essentials

### Overview
A focused review of modern JavaScript features and patterns used in React Native development. This topic emphasizes TypeScript usage throughout all examples, preparing participants for the typed environment of the course.

### Learning Objectives
- Apply modern JavaScript syntax and features in React Native development
- Understand functional programming concepts used in React
- Use asynchronous JavaScript patterns effectively
- Implement proper error handling in JavaScript
- Navigate JavaScript modules and import/export patterns
- Write clean, efficient JavaScript code following best practices

### Subtopics
1. **Modern JavaScript Syntax**
   - ES6+ features (arrow functions, destructuring, spread/rest)
   - Template literals
   - Optional chaining and nullish coalescing
   - Modern array methods

2. **Functional Programming Concepts**
   - Pure functions
   - Higher-order functions
   - Immutability
   - Function composition
   - Array functional methods (map, filter, reduce)

3. **Asynchronous JavaScript**
   - Promises
   - Async/await
   - Fetch API and network requests
   - Error handling patterns

4. **Modules and Organization**
   - Import/export syntax
   - Module patterns
   - Code organization
   - Barrel exports

### Pharmacy Theme Integration
Use pharmacy-related data structures and operations in examples, such as filtering medication lists, transforming prescription data, and handling asynchronous API calls to a pharmacy backend.

### Special Requirements
- All code examples must use TypeScript
- Examples should progressively build toward pharmacy application use cases

---

## Topic 5: React Essentials

### Overview
Core React concepts and patterns applied to React Native development. This topic builds a solid foundation in React fundamentals that are essential for effective React Native development.

### Learning Objectives
- Explain the core principles of React and component-based architecture
- Create functional components with hooks
- Implement proper prop typing and validation
- Manage component state effectively
- Understand the React component lifecycle
- Apply React patterns to solve common UI challenges

### Subtopics
1. **React Core Concepts**
   - Declarative UI
   - Component-based architecture
   - Virtual DOM and reconciliation
   - React Native's adaptation of React concepts

2. **Functional Components**
   - Component structure and syntax
   - Props and prop typing
   - Children and composition
   - Rendering logic and conditional rendering

3. **State and Lifecycle**
   - Component state concepts
   - useState hook
   - useEffect for lifecycle events
   - Dependencies and cleanup

4. **React Patterns**
   - Composition vs inheritance
   - Controlled vs uncontrolled components
   - Lifting state up
   - Component communication
   - Render props and higher-order components

### Pharmacy Theme Integration
Build React components for pharmacy use cases like medication details display, prescription refill interfaces, and pharmacy search functionality.

### Developer Path Adaptations
- **Native Developers**: More detailed coverage of React paradigms
- **Web React Developers**: Focus on differences between web React and React Native

---

## Topic 6: TypeScript Essentials

### Overview
Essential TypeScript concepts and practices for React Native development. This topic ensures all participants can use TypeScript effectively to create type-safe React Native applications.

### Learning Objectives
- Explain the benefits of TypeScript in React Native development
- Create and use TypeScript interfaces and types for React components
- Implement proper type checking for component props and state
- Use TypeScript with React hooks effectively
- Apply TypeScript to improve code quality and developer experience
- Debug common TypeScript errors in React Native

### Subtopics
1. **TypeScript Fundamentals**
   - Basic types
   - Interfaces vs types
   - Type inference
   - Type assertion
   - Union and intersection types

2. **TypeScript with React Native**
   - Component prop types
   - Function typing
   - Generic components
   - Event handling with TypeScript
   - TypeScript with React state

3. **Advanced TypeScript Patterns**
   - Discriminated unions
   - Utility types
   - Type guards
   - Declaration merging
   - Module augmentation

4. **TypeScript Best Practices**
   - Type organization
   - Using type libraries
   - React Native specific typing
   - Performance considerations
   - When to use `any` and `unknown`

### Pharmacy Theme Integration
Create TypeScript interfaces for pharmacy data models like medications, prescriptions, patients, and pharmacy locations. Implement type-safe functions for medication calculations and prescription processing.

### Special Requirements
- All subsequent course material will use TypeScript
- Examples should show proper JSDoc comments alongside TypeScript typing

---

## Topic 7: React Native Components

### Overview
A deep dive into React Native's core and custom components. This topic covers both the built-in components provided by React Native and the creation of custom, reusable components for pharmacy applications.

### Learning Objectives
- Use React Native's core components effectively
- Create custom, reusable components
- Implement component composition for complex UIs
- Apply proper accessibility attributes to components
- Create responsive components that work across device sizes
- Test components for functionality and performance

### Subtopics
1. **Core Components**
   - View, Text, Image
   - ScrollView and FlatList
   - TextInput and Button
   - TouchableComponents
   - SafeAreaView and platform-specific components

2. **Component Composition**
   - Composing complex UIs from simple components
   - Component hierarchies
   - Layout strategies
   - Component boundaries
   - Cross-component communication

3. **Custom Components**
   - Creating reusable component libraries
   - Abstraction and encapsulation
   - Props API design
   - Default props and prop validation
   - Internal vs exposed state

4. **Component Accessibility**
   - Accessibility props and roles
   - Screen reader support
   - Focus management
   - Color contrast and visual accessibility
   - Testing accessibility

### Pharmacy Theme Integration
Build a library of pharmacy-specific components such as MedicationCard, PrescriptionList, DosageCalculator, and PharmacyLocator that will be reused throughout the course.

### Special Requirements
- All components must include comprehensive TypeScript typing
- All components must include accessibility support
- Examples should show both basic and advanced component patterns

---

## Topic 8: React Native Hooks

### Overview
An exploration of React hooks in the context of React Native development. This topic covers both the standard React hooks and custom hooks for pharmacy application functionality.

### Learning Objectives
- Use React's built-in hooks effectively in React Native applications
- Create custom hooks for reusable logic
- Apply hooks patterns to solve common React Native challenges
- Debug hooks-related issues
- Optimize hook performance
- Test custom hooks for reliability

### Subtopics
1. **Built-in Hooks**
   - useState for local state
   - useEffect for side effects
   - useContext for global state
   - useRef for persistent values
   - useReducer for complex state
   - useMemo and useCallback for optimization

2. **React Native Specific Hooks**
   - useWindowDimensions
   - useColorScheme
   - useFocusEffect
   - Platform-specific hook patterns

3. **Custom Hooks Development**
   - Creating reusable logic
   - Composition of hooks
   - Custom hook naming and conventions
   - Separation of concerns
   - Testing custom hooks

4. **Advanced Hook Patterns**
   - Async data fetching
   - Form handling
   - Animation controls
   - Responsive layouts
   - Feature flags

### Pharmacy Theme Integration
Create custom hooks like useMedication, usePrescription, usePharmacyLocator, and useDosageCalculator that encapsulate pharmacy-specific business logic for reuse across the application.

### Special Requirements
- All hook examples must include TypeScript typing
- Custom hooks should focus on pharmacy application use cases
- Examples should show both basic and complex hook patterns

---

## Topic 9: React Native UI and Styling

### Overview
Comprehensive coverage of styling approaches in React Native, including StyleSheet, styled-components, and UI libraries. This topic ensures participants can create visually appealing, consistent, and responsive designs.

### Learning Objectives
- Apply effective styling techniques using React Native's StyleSheet
- Implement styled-components for component-based styling
- Integrate and customize UI libraries like React Native Paper
- Create responsive layouts for different device sizes
- Implement theming and dark mode support
- Manage complex styling requirements for pharmacy applications

### Subtopics
1. **StyleSheet API**
   - Creating and organizing styles
   - Style inheritance and composition
   - Platform-specific styling
   - Layout with Flexbox
   - Style performance optimization

2. **Styled-Components**
   - Component-based styling
   - Dynamic styling with props
   - Theme provider
   - Style composition
   - TypeScript integration

3. **React Native Paper**
   - Material Design components
   - Customizing theme
   - Component API
   - Integration with existing components
   - Performance considerations

4. **Advanced Styling Techniques**
   - Responsive layouts
   - Adaptive styling
   - Dark mode support
   - Accessibility considerations
   - Animation and transitions

### Pharmacy Theme Integration
Design and implement a consistent pharmacy application theme with appropriate colors, typography, and component styles. Create styled medication cards, prescription lists, and pharmacy profiles.

### Special Requirements
- Cover StyleSheet, styled-components, and React Native Paper
- Examples must include comprehensive TypeScript typing
- All styled components must include accessibility support
- Demonstrate both light and dark theme implementations

---

## Topic 10: Performance and Debugging

### Overview
Tools and techniques for optimizing and debugging React Native applications. This topic equips participants with the skills to identify, diagnose, and resolve performance issues and bugs.

### Learning Objectives
- Use React Native debugging tools effectively
- Identify and resolve common performance bottlenecks
- Implement performance optimization techniques
- Debug network, state, and UI issues
- Use profiling tools to measure performance
- Apply best practices for reliable and performant applications

### Subtopics
1. **Debugging Tools and Techniques**
   - React Native Debugger
   - Chrome DevTools
   - React DevTools
   - Flipper
   - Console logging strategies
   - Error boundaries

2. **Performance Optimization**
   - Component rendering optimization
   - useCallback and useMemo
   - List rendering with FlatList
   - Image optimization
   - Reducing bundle size
   - Memory management

3. **Network Debugging**
   - API request/response inspection
   - Network request timing
   - Offline handling
   - Mock API responses
   - Network error handling

4. **Performance Testing**
   - Measuring render times
   - Frame rate monitoring
   - Bundle analyzer
   - Performance regression testing
   - Performance budgets

### Pharmacy Theme Integration
Debug and optimize pharmacy application features like medication search, prescription list scrolling, and pharmacy location mapping to ensure smooth performance even with large datasets.

### Special Requirements
- Examples should focus on pharmacy application performance challenges
- Include both basic and advanced debugging techniques
- Demonstrate common performance issues and their solutions

---

## Topic 11: Navigation and Routing

### Overview
Implementation of navigation and routing in React Native applications using both Expo Router and React Navigation. This topic ensures participants can create intuitive, performant navigation experiences.

### Learning Objectives
- Implement navigation using Expo Router
- Configure React Navigation for complex navigation patterns
- Create and manage navigation state
- Handle deep linking and universal links
- Optimize navigation performance
- Implement authentication flows with navigation

### Subtopics
1. **Expo Router**
   - File-based routing
   - Navigation patterns
   - Route parameters
   - Navigation hooks
   - Deep linking
   - Navigation guards

2. **React Navigation**
   - Navigation containers
   - Stack navigator
   - Tab navigator
   - Drawer navigator
   - Screen options
   - Navigation lifecycle

3. **Advanced Navigation Patterns**
   - Nested navigators
   - Authentication flows
   - Modal screens
   - Passing parameters
   - Custom transitions
   - Header customization

4. **Navigation State Management**
   - Navigation state
   - Route persistence
   - State syncing
   - Deep linking configuration
   - Navigation testing

### Pharmacy Theme Integration
Implement a complete navigation structure for a pharmacy application, including medication list, prescription details, pharmacy locator, and user profile screens with appropriate navigation patterns.

### Special Requirements
- Cover both Expo Router and React Navigation
- Demonstrate integration with authentication flows
- Examples must include TypeScript typing for routes and params
- Show accessibility considerations for navigation

---

## Topic 12: React Native User Input and Forms

### Overview
Comprehensive coverage of user input handling and form management in React Native. This topic focuses on creating intuitive, accessible, and validated forms for collecting user data.

### Learning Objectives
- Implement various input components effectively
- Create and validate forms in React Native
- Handle different input types (text, number, date, etc.)
- Implement proper error handling and user feedback
- Create accessible form components
- Apply form state management best practices

### Subtopics
1. **Input Components**
   - TextInput customization
   - Multiline inputs
   - Input masking
   - Platform-specific behavior
   - Focus management
   - Keyboard handling

2. **Form Management**
   - Form state organization
   - Field validation
   - Error messages
   - Form submission
   - Form reset
   - Accessibility for forms

3. **Input Types**
   - Text and numeric inputs
   - Selection inputs (dropdown, picker)
   - Date and time inputs
   - Toggle inputs (switch, checkbox)
   - Custom input components
   - File/image uploads

4. **Advanced Form Patterns**
   - Multi-step forms
   - Conditional fields
   - Form state persistence
   - Form auto-save
   - Dynamic form generation
   - Performance optimization

### Pharmacy Theme Integration
Create forms for patient information, medication search, prescription refill requests, and pharmacy feedback that demonstrate best practices for collecting and validating healthcare-related information.

### Special Requirements
- All input examples must include accessibility support
- Forms must include proper validation and error handling
- Examples should demonstrate both simple and complex form patterns

---

## Topic 13: State Management

### Overview
Implementation of state management solutions in React Native, focusing on Context API, Zustand, and React Query. This topic excludes Redux in favor of more modern, lightweight approaches.

### Learning Objectives
- Apply appropriate state management solutions based on use cases
- Implement global state with Context API
- Use Zustand for efficient client-state management
- Manage server state with React Query (useQuery)
- Optimize state updates for performance
- Implement proper error handling and loading states

### Subtopics
1. **Context API**
   - Creating and providing context
   - Consuming context with hooks
   - Context composition
   - Performance considerations
   - TypeScript typing for context

2. **Zustand**
   - Store creation
   - State mutation
   - Selectors and derived state
   - Middleware
   - Integration with React Native

3. **React Query**
   - Data fetching with useQuery
   - Mutations with useMutation
   - Caching strategies
   - Pagination and infinite queries
   - Error and loading state management

4. **State Management Patterns**
   - Choosing the right approach for different data
   - Combining state management solutions
   - Persisting state
   - State synchronization
   - Testing state management

### Pharmacy Theme Integration
Implement state management for pharmacy data including medication inventory, prescription status, user authentication, and pharmacy locations using the appropriate state management solution for each use case.

### Special Requirements
- Exclude Redux entirely
- Focus on Context API, Zustand, and React Query
- All examples must include TypeScript typing
- Demonstrate performance optimization techniques

---

## Topic 14: Native Modules

### Overview
Exploration of native module integration in React Native, focusing on accessing device features and native functionality. This topic prepares participants to extend React Native capabilities with native code when needed.

### Learning Objectives
- Understand the interaction between JavaScript and native code
- Use Expo SDK to access native features
- Implement native module integration when necessary
- Handle platform-specific code and features
- Apply best practices for native module usage
- Debug native module issues

### Subtopics
1. **Expo SDK Native Modules**
   - Camera and image picker
   - Location services
   - Notifications
   - Sensors and device information
   - Secure storage
   - Barcode scanning

2. **Platform-Specific Code**
   - Platform module
   - Platform-specific file extensions
   - Conditional rendering
   - Platform detection
   - Feature detection

3. **Bridging Concepts**
   - JavaScript to native communication
   - Native to JavaScript events
   - Performance considerations
   - Error handling across the bridge
   - TypeScript definitions for native modules

4. **Native Module Integration**
   - When to use native modules
   - Expo development builds
   - Expo config plugins
   - Testing native functionality
   - Maintaining compatibility

### Pharmacy Theme Integration
Implement native features relevant to pharmacy applications such as barcode scanning for medication identification, camera usage for prescription photo uploads, secure storage for patient data, and notifications for medication reminders.

### Special Requirements
- Default to using Expo libraries and dependencies
- Only cover native module integration when Expo doesn't provide the functionality
- Examples must include proper error handling for native features
- Demonstrate both Android and iOS considerations

---

## Topic 15: EAS and Publishing

### Overview
A practical guide to building, deploying, and updating React Native applications using Expo Application Services (EAS). This topic prepares participants to take their applications from development to production.

### Learning Objectives
- Configure an application for production
- Use EAS Build to create native binaries
- Submit applications to app stores using EAS Submit
- Implement over-the-air updates with EAS Update
- Apply best practices for the release process
- Manage multiple environments (development, staging, production)

### Subtopics
1. **Application Configuration**
   - App.json/App.config.js setup
   - Environment variables
   - Icons and splash screens
   - Versioning
   - Permissions

2. **EAS Build**
   - Build profiles
   - Build process
   - Local vs. EAS Cloud builds
   - Build customization
   - Troubleshooting build issues

3. **EAS Submit**
   - App store preparation
   - Submission process
   - Credentials management
   - App review guidelines
   - Versioning and updates

4. **EAS Update**
   - Over-the-air updates
   - Update strategies
   - Rollbacks
   - Update testing
   - Version targeting

### Pharmacy Theme Integration
Deploy the SpeedyMeds application using EAS, implementing appropriate configurations for a healthcare application, including privacy permissions, secure update channels, and app store listing optimization.

### Special Requirements
- Focus on the EAS ecosystem for all deployment needs
- Include best practices for healthcare application deployment
- Demonstrate configuration for both iOS and Android platforms

---

## Topic 16: Advanced Features

### Overview
Exploration of advanced React Native features, focusing on animations, gestures, and other advanced capabilities. This topic prepares participants to implement sophisticated user experiences in their applications.

### Learning Objectives
- Implement animations using React Native's animation system
- Create custom gesture handlers for interactive UI elements
- Apply advanced UI patterns for enhanced user experience
- Optimize advanced features for performance
- Implement accessibility for animated and interactive elements
- Combine multiple advanced features effectively

### Subtopics
1. **Animations**
   - Animated API
   - Animation composition
   - Layout animations
   - Interpolation
   - Easing functions
   - Performance optimization

2. **Gestures**
   - PanResponder
   - Gesture Handler
   - Swipeable components
   - Draggable elements
   - Multi-touch gestures
   - Combining gestures and animations

3. **Advanced UI Patterns**
   - Parallax effects
   - Shared element transitions
   - Custom transitions
   - Collapsible headers
   - Bottom sheets
   - Interactive charts

4. **Integration with Third-Party Libraries**
   - Lottie animations
   - SVG graphics
   - 3D rendering
   - Maps and location
   - Video and audio
   - Charts and data visualization

### Pharmacy Theme Integration
Implement advanced UI features for the pharmacy application, such as animated medication reminders, gesture-based prescription management, interactive dosage calculators, and visually engaging health data visualizations.

### Special Requirements
- All advanced features must include accessibility support
- Examples should demonstrate both simple and complex implementations
- Focus on pharmacy-relevant applications of advanced features

---

## Topic 17: Capstone Project

### Overview
A comprehensive project where participants collaboratively build a complete pharmacy application (SpeedyMeds) applying all the concepts and techniques learned throughout the course. This project provides hands-on experience in a realistic development environment.

### Learning Objectives
- Apply all course concepts in a comprehensive, real-world project
- Collaborate effectively in a development team environment
- Follow software development best practices
- Implement complex features from requirements
- Debug and optimize a complete application
- Present and explain technical implementation decisions

### Subtopics
1. **Project Setup and Structure**
   - Repository organization
   - Code structure
   - Development workflow
   - Coding standards
   - Documentation

2. **Feature Implementation**
   - Core application features
   - UI implementation
   - State management
   - Data handling
   - Navigation
   - Native features

3. **Quality Assurance**
   - Testing strategies
   - Code review
   - Debugging
   - Performance optimization
   - Accessibility validation

4. **Deployment and Presentation**
   - Building for distribution
   - Deployment strategies
   - Project presentation
   - Code walkthrough
   - Future improvements

### Pharmacy Theme Integration
The entire capstone project revolves around building the SpeedyMeds pharmacy application, implementing features such as medication management, prescription tracking, pharmacy locations, user profiles, and health reminders.

### Capstone Project Description

**SpeedyMeds - React Native Training Capstone Project**

The capstone project involves building a complete React Native pharmacy application with the following features:

1. **User Authentication**
   - Login and registration
   - Profile management
   - Secure authentication

2. **Medication Management**
   - Medication list
   - Medication details
   - Search and filtering
   - Medication categories
   - Barcode scanning

3. **Prescription Tracking**
   - Active prescriptions
   - Refill requests
   - Prescription history
   - Reminder notifications

4. **Pharmacy Services**
   - Pharmacy locator
   - Store hours and services
   - Transfer prescriptions
   - Contact pharmacist

5. **Health Information**
   - Medication information
   - Drug interactions
   - Health articles
   - Dosage calculators

The project will be provided as a scaffold with initial configuration and structure, allowing participants to focus on implementing features rather than setup. Participants will work in groups or individually (depending on learning path) to complete assigned features. The project uses the full technology stack covered in the course, including Expo, TypeScript, React Navigation, styled-components, React Native Paper, Zustand, React Query, and appropriate native features.

### Special Requirements
- Project contains scaffolding and configurations set up
- Collaborative development environment
- Group-specific forks for instructor-led path
- Individual implementation option for self-led path
- Comprehensive best-practice implementations