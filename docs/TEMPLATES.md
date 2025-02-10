# React Native Code Templates and Documentation Standards

Version: 1.0.0

## Table of Contents
- [Code Documentation Guidelines](#code-documentation-guidelines)
  - [Component Header Format](#component-header-format)
  - [Function Documentation Format](#function-documentation-format)
  - [Inline Comment Format](#inline-comment-format)
  - [Learning Resources Format](#learning-resources-format)
- [TODO Comment Guidelines](#todo-comment-guidelines)
  - [Format Structure](#format-structure)
  - [Example Format](#example-format)
- [Quick Reference Mappings](#quick-reference-mappings)
  - [iOS to React Native](#ios-to-react-native)
  - [Android to React Native](#android-to-react-native)
- [README Template](#readme-template)
  - [Required Sections](#required-sections)
  - [Example Format](#example-format-1)

See also:
- [Training Guidelines](./GUIDELINES.md)
- [Example Implementations](./EXAMPLES.md)

## Code Documentation Guidelines

### Component Header Format
```typescript
/**
 * UserProfile Component
 * 
 * Displays and manages user profile information with editable fields
 * and real-time validation.
 * 
 * Usage:
 * ```tsx
 * <UserProfile 
 *   user={currentUser}
 *   onUpdate={handleProfileUpdate}
 * />
 * ```
 * 
 * Props:
 * - user: UserData - Current user profile information
 * - onUpdate: (data: UserData) => void - Handler for profile updates
 * 
 * Platform Considerations:
 * - iOS: Follows UIKit form input patterns
 * - Android: Implements Material Design input guidelines
 */
```

### Function Documentation Format
```typescript
/**
 * Processes and validates user profile updates
 * 
 * @param userData - Raw user input data
 * @returns Validated user data object
 * 
 * Side Effects:
 * - Logs validation errors to monitoring system
 * - Caches validated data locally
 * 
 * Performance Notes:
 * - Memoize for large datasets
 * - Validation runs on background thread
 */
```

### Inline Comment Format
```typescript
// Complex Logic: Custom validation for international phone numbers
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

// Platform Workaround: Android keyboard handling
if (Platform.OS === 'android') {
  // Prevents keyboard from pushing up content
  KeyboardAvoidingView.behavior = 'height';
}

// Platform Difference: iOS uses different shadow implementation
const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  android: {
    elevation: 5,
  },
});
```

### Learning Resources Format
```typescript
/**
 * Related Concepts:
 * - Form validation patterns in React Native
 * - Platform-specific input handling
 * - State management with complex forms
 * 
 * Common Pitfalls:
 * - Avoid direct mutation of form state
 * - Handle keyboard behavior differences
 * - Consider input focus management
 * 
 * Best Practices:
 * - Implement progressive validation
 * - Use controlled components
 * - Handle all input states (empty, error, success)
 * 
 * Further Reading:
 * - [React Native Text Input Guide](link)
 * - [Form Validation Patterns](link)
 * - [Platform Specific Design](link)
 */
```

## TODO Comment Guidelines

### Format Structure
- Task Description: Clear, specific instructions using technical terms
- Expected Behavior: Detailed outcome description
- Native Equivalent: iOS/Android parallel concepts
- Helpful Hints: Guidance without revealing solutions
- Documentation Links: Relevant official documentation
- Learning Objectives: Skills being developed

### Example Format
```typescript
// TODO: Implement the UserProfile component using functional component pattern
// Expected Behavior: Component should display user information and handle profile updates
// Native Equivalent: Similar to UIViewController (iOS) or Fragment (Android)
// Hint: Consider using useState for local state management
// Docs: See React Native components guide: [link]
// Learning: Practice component lifecycle and state management
```

## Quick Reference Mappings

### iOS to React Native
- UIViewController → Screen Component
- UITableView → FlatList
- AutoLayout → Flexbox
- UIKit Components → React Native Core Components

### Android to React Native
- Activity/Fragment → Screen Component
- RecyclerView → FlatList
- XML Layouts → JSX/Flexbox
- ViewModel → React Hooks/Context

## README Template

### Required Sections
- Setup Instructions
- Learning Objectives
- Challenge Requirements
- Testing Instructions
- Submission Guidelines

### Example Format
```markdown
# User Profile Challenge

## Learning Objectives
- Implement functional components with TypeScript
- Manage form state using Zustand
- Handle platform-specific UI differences
- Implement proper form validation
- Write comprehensive tests

## Prerequisites
- Completed Basic Components module
- Understanding of TypeScript interfaces
- Familiarity with React hooks
- Basic knowledge of form handling

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open iOS simulator:
   ```bash
   npm run ios
   ```

## Challenge Requirements
### Core Features
- [ ] Create UserProfile component
- [ ] Implement form validation
- [ ] Add error handling
- [ ] Support both platforms

### Bonus Objectives
- [ ] Add profile image upload
- [ ] Implement offline support
- [ ] Add unit tests

## Testing Instructions
1. Run the test suite:
   ```bash
   npm test
   ```
2. Verify platform-specific behavior:
   - iOS: Check form input behavior
   - Android: Verify keyboard handling

## Common Issues
- Form validation timing
- Platform-specific input handling
- State management edge cases

## Submission Guidelines
1. Complete all TODO items
2. Ensure tests pass
3. Document platform-specific considerations
4. Create pull request with:
   - Screenshots of both platforms
   - Test coverage report
   - Performance considerations
``` 