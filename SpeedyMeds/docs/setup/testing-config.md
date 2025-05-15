# How Testing is Set Up (Jest & React Native Testing Library)

This document gives you the lowdown on how testing is set up in the SpeedyMeds project using Jest and React Native Testing Library (RNTL). Writing tests helps ensure our code works correctly and makes refactoring less scary!

**Why Test?**
- ✅ Make sure components and logic work as expected.
- 🐛 Catch bugs before they sneak in.
- 👷 Build with confidence when changing code.
- 📖 Tests act like living documentation for your code.

## Testing Tools (Already Included!)

This project comes pre-configured with standard Expo testing tools:

1.  **Jest:** The test runner that executes your tests.
2.  **`jest-expo`:** A special preset that configures Jest to work nicely with Expo and React Native.
3.  **React Native Testing Library (`@testing-library/react-native`):** The main library for writing tests for your components. It helps you test components similarly to how a user interacts with them.

## Configuration Files

- **`package.json` (or `jest.config.js`):** Tells Jest to use the `jest-expo` preset.
- **`jest.setup.js`:** This file runs before your tests. We use it to set up global "mocks" – simple fake versions of native features (like icons or fonts) that don't exist when running tests in Node.js. This prevents tests from crashing.

## How to Write Tests

Ready to write some tests for the components you build?

- **Where Tests Live:** Place test files (`*.test.tsx` or `*.test.ts`) in a `__tests__` folder, usually right next to the component file (e.g., `src/components/__tests__/MyComponent.test.tsx`).
- **Test Structure:** Use `describe()` to group tests for a specific component or feature, and `it()` (or `test()`) for individual test cases.
- **Rendering Components:** Use the `render` function. Because our app uses themes, import the custom `render` function from `src/test-utils/renderWithProviders.tsx`. This automatically wraps your component in the necessary theme providers for tests.
  ```typescript
  import { render, screen } from '../../test-utils/renderWithProviders';
  import MyComponent from '../MyComponent';

  it('should render correctly', () => {
    render(<MyComponent />);
    // ... assertions ...
  });
  ```
- **Finding Elements:** Use `screen` queries (`getByText`, `queryByRole`, `findByTestId`, etc.) to find elements you want to check. Try to use queries that find elements like a user would (e.g., by text, label, or role).
- **Simulating Events:** Use `fireEvent` (`fireEvent.press`, `fireEvent.changeText`) to simulate user actions.
- **Handling Updates:** If an action causes the component's state to update, wrap the `fireEvent` call (or other update logic) in `act` from `@testing-library/react-native` to ensure React processes the update before you make assertions.
- **Making Assertions:** Use `expect(...)` with Jest matchers (like `.toBeVisible()`, `.toHaveTextContent()`, `.toHaveBeenCalledWith(...)`) to check if the result is what you expected.

**Example Test:**

```typescript
import React from 'react';
import { render, screen, fireEvent, act } from '../../test-utils/renderWithProviders';
import MyButton from '../MyButton'; // Assume MyButton takes an onPress prop

it('calls onPress when pressed', () => {
  const mockOnPress = jest.fn(); // Create a mock function
  render(<MyButton onPress={mockOnPress} title="Press Me" />);

  const button = screen.getByRole('button', { name: /press me/i });

  // Simulate pressing the button, wrap in act
  act(() => {
    fireEvent.press(button);
  });

  // Check if our mock function was called
  expect(mockOnPress).toHaveBeenCalledTimes(1);
});
```

## Mocking

- **Modules/Hooks:** Sometimes you need to replace imported modules or hooks with fakes during tests (like we do for icons in `jest.setup.js`). Use `jest.mock('module-path')`.
- **Functions:** Use `jest.fn()` to create mock functions for props like `onPress` so you can check if they were called.

## Running Tests

Use the scripts in `package.json`:

```bash
# Run tests interactively (watches for changes)
npm test

# Run tests once (good for a final check)
npm run test:ci

# Run tests and see code coverage (how much code is tested)
npm run test:coverage
```

This setup provides a solid foundation for testing your SpeedyMeds components and logic!

---

**References:**

- [Expo Unit Testing Docs](https://docs.expo.dev/develop/unit-testing/)
- [React Native Testing Library Docs](https://callstack.github.io/react-native-testing-library/docs/getting-started)
- [Jest Docs](https://jestjs.io/docs/getting-started)
