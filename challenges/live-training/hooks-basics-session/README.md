# Smart Product Card Challenge

## Learning Objectives
- Master React's `useState` for local state management
- Understand `useEffect` for side effects and lifecycle
- Create and implement custom hooks for reusable logic
- Implement styled-components with dynamic styles
- Handle platform-specific animations and interactions

## Prerequisites
- Basic understanding of React Native components
- Familiarity with TypeScript syntax
- Understanding of ES6+ JavaScript features
- Basic knowledge of async/await patterns

## Time Allocation
⏱️ Total Duration: 60 minutes
- Setup and Introduction (5 minutes)
- Core Concepts Overview (10 minutes)
- Live Coding Session (30 minutes)
- Q&A and Best Practices (10 minutes)
- Wrap-up and Next Steps (5 minutes)

## Challenge Requirements

### Core Features
- [ ] Create a ProductCard component with expand/collapse functionality
- [ ] Implement like/favorite toggle with persistence
- [ ] Add quantity selection with validation
- [ ] Create custom hooks for reusable logic
- [ ] Implement loading states and error handling

### Platform-Specific Requirements
- iOS: Implement haptic feedback for interactions
- Android: Handle ripple effects for touch feedback

### Custom Hooks to Create
1. `useFavoriteProduct`
   - Manage favorite state
   - Handle AsyncStorage persistence
   - Provide loading/error states

2. `useProductAnalytics`
   - Track product interactions
   - Monitor view duration
   - Handle analytics events

3. `useProductAnimation`
   - Manage expand/collapse animations
   - Handle platform-specific animations
   - Provide animation callbacks

## Setup Instructions
1. Navigate to the starter code directory:
   ```bash
   cd challenges/live-training/hooks-basics-session/starter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your preferred platform:
   ```bash
   npm run ios
   # or
   npm run android
   ```

## Testing Instructions
- Verify state persistence after app reload
- Test error handling with network conditions
- Validate platform-specific behaviors
- Check animation performance
- Verify analytics tracking

## Common Issues and Solutions
- State updates timing with animations
- Effect cleanup on component unmount
- Platform-specific storage handling
- Animation performance optimization

## Learning Resources
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [React Native Animation Guide](https://reactnative.dev/docs/animations)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [styled-components Documentation](https://styled-components.com/docs)

## Bonus Challenges
- [ ] Add gesture-based interactions
- [ ] Implement shared element transitions
- [ ] Add unit tests for custom hooks
- [ ] Implement skeleton loading states 