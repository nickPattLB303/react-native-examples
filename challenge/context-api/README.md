# Theme Switcher Challenge with Context API

## Learning Objectives
- Implement Context API for global state management
- Use functional components with TypeScript
- Create and use custom hooks
- Handle theme switching across the application
- Practice proper context provider patterns

## Prerequisites
- Understanding of React hooks (useState, useEffect)
- Basic TypeScript knowledge
- Familiarity with React Native components
- Knowledge of component composition

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
- [ ] Create ThemeContext with light/dark theme support
- [ ] Implement useTheme custom hook
- [ ] Create theme switcher component
- [ ] Apply theme styles across multiple components
- [ ] Add smooth theme transition animations

### Bonus Objectives
- [ ] Add system theme detection
- [ ] Implement theme persistence
- [ ] Create multiple theme variations
- [ ] Add theme switching animations

## Implementation Steps
1. Create the Theme Context
2. Implement the Theme Provider
3. Create useTheme custom hook
4. Build the theme switcher UI
5. Apply themes to components
6. Add persistence and animations

## Testing Instructions
1. Run the test suite:
   ```bash
   npm test
   ```
2. Verify theme switching:
   - Check all components update
   - Verify smooth transitions
   - Test system theme integration

## Common Issues
- Context provider placement
- Theme application consistency
- Performance with context updates
- Animation timing

## Submission Guidelines
1. Complete all TODO items
2. Ensure tests pass
3. Document theme structure
4. Create pull request with:
   - Screenshots of both themes
   - Performance measurements
   - Animation demonstrations 