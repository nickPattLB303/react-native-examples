# Testing Configuration (Jest & React Native Testing Library)

This document outlines the setup for unit and component testing in the SpeedyMeds project using Jest and React Native Testing Library (RNTL). This setup follows the standard practices recommended by Expo for creating reliable and maintainable tests.

Writing tests is crucial for:

- **Ensuring Correctness:** Verifying that components and logic behave as expected.
- **Preventing Regressions:** Catching bugs introduced by new changes or refactoring.
- **Facilitating Refactoring:** Providing a safety net when improving code structure.
- **Documenting Behavior:** Tests serve as executable documentation for how components should work.

## Goals for Testing in SpeedyMeds

- **Verify Component Rendering:** Ensure UI components render the correct elements based on props and state.
- **Test Component Interaction:** Simulate user actions (button presses, text input, scrolling) and verify the expected UI changes or function calls.
- **Test Business Logic:** Unit test utility functions, custom hooks (like `useInitializeAppData`), and state management logic (Zustand store actions).
- **Promote Testable Code:** Encourage writing modular and decoupled code that is easier to test in isolation.

## Tools & Packages

The testing stack relies on the standard Expo setup:

1.  **Jest:** A popular JavaScript testing framework used as the test runner. Expo projects created with default templates include a Jest setup. ([Official Docs](https://jestjs.io/))
2.  **`jest-expo`:** A Jest preset specifically for Expo projects. It configures Jest to work correctly with the Expo and React Native environment, automatically handling transpilation (via Babel) and mocking many native modules. ([Expo Docs Reference](https://docs.expo.dev/develop/unit-testing/#installation-and-configuration))
3.  **React Native Testing Library (`@testing-library/react-native`):** The primary library for testing React Native components. It encourages writing tests that resemble how users interact with the app, focusing on accessibility and observable behavior rather than implementation details. ([Official Docs](https://callstack.github.io/react-native-testing-library/))
    - **Built-in Matchers:** Since v12.4+, RNTL includes helpful Jest matchers like `toBeVisible()`, `toHaveTextContent()`, etc., directly.
4.  **`@testing-library/jest-native` (DEPRECATED):** This package previously provided the custom Jest matchers mentioned above. **It is no longer needed or maintained** and should be uninstalled if present. ([Migration Guide](https://callstack.github.io/react-native-testing-library/docs/migration/jest-matchers))
5.  **`@types/jest`:** Provides TypeScript type definitions for Jest globals (`describe`, `it`, `expect`, etc.), enabling type checking in test files. (Dev dependency)
6.  **`react-test-renderer` (DEPRECATED):** An older library for snapshot testing and shallow rendering. It's generally **not recommended** for modern component testing with RNTL and should be uninstalled if present. ([Expo Docs Note](https://docs.expo.dev/develop/unit-testing/#install-react-native-testing-library))

## Configuration Files

- **`package.json` (or `jest.config.js`):** Contains the main Jest configuration. The key setting is `"preset": "jest-expo"`. It may also include `setupFilesAfterEnv` to point to a setup script.
  ```json
  // package.json Example
  {
    // ...
    "jest": {
      "preset": "jest-expo",
      "setupFilesAfterEnv": ["./jest.setup.js"] // Points to the setup file
      // Add other Jest config overrides here if needed
      // e.g., "collectCoverage": true, "coverageDirectory": "coverage"
    }
  }
  ```
- **`jest.setup.js`:** An optional file executed by Jest _after_ the environment is set up but _before_ tests run. It's the ideal place for:
  - **Global Mocks:** Mocking native modules or external libraries that don't work in the Node.js test environment (e.g., `@expo/vector-icons`, `expo-font`, `AsyncStorage`). See the project's `jest.setup.js` for examples.
  - **Global Setup:** Any other setup needed across all test suites.
  - **Note:** This file should **no longer** contain `import '@testing-library/jest-native/extend-expect';`.

## Setup & Verification Steps

Expo's default template (`npx create-expo-app`) usually handles most of this setup. Verify or perform these steps if needed:

1.  **Install Core Dependencies:**
    ```bash
    # Installs Jest, the Expo preset, and Jest types
    npx expo install jest-expo jest @types/jest --dev
    ```
2.  **Install React Native Testing Library:**
    ```bash
    npx expo install @testing-library/react-native --dev
    ```
3.  **Uninstall Deprecated Packages (If Present):**
    ```bash
    npm uninstall react-test-renderer @types/react-test-renderer @testing-library/jest-native --save-dev
    # or
    yarn remove react-test-renderer @types/react-test-renderer @testing-library/jest-native --dev
    ```
4.  **Configure Jest Preset:** Ensure `package.json` or `jest.config.js` includes `"preset": "jest-expo"`.
5.  **Configure Setup File:**
    - Create `jest.setup.js` in the project root if you need global mocks (like in this project).
    - Add `"setupFilesAfterEnv": ["./jest.setup.js"]` to your Jest configuration (see step 1 example).
    - Populate `jest.setup.js` with necessary mocks (refer to the project's file).
6.  **Configure Test Scripts (`package.json`):**
    ```json
    "scripts": {
      // ... other scripts
      "test": "jest --watchAll", // Interactive watch mode
      "test:ci": "jest", // Run tests once (for CI)
      "test:coverage": "jest --coverage" // Run tests and generate coverage report
    },
    ```

## Writing Tests with RNTL

- **Location:** Place test files (`*.test.tsx` or `*.test.ts`) in a `__tests__` directory, typically alongside the component or module being tested (e.g., `src/components/__tests__/MyComponent.test.tsx`).
- **Structure:** Use `describe` blocks to group related tests and `it` or `test` blocks for individual test cases. Use `beforeEach` or `afterEach` for setup/cleanup within a `describe` block.
- **Rendering:** Use the `render` function from RNTL (or a custom wrapper like `renderWithProviders` if context/themes are needed).
- **Querying:** Use `screen` queries (`getByText`, `queryByRole`, `findByTestId`, etc.) to find elements in the rendered output. Prefer queries accessible to users (like `getByRole`, `getByLabelText`, `getByText`). ([RNTL Queries](https://callstack.github.io/react-native-testing-library/docs/api-queries))
- **Interaction:** Use `fireEvent` (`fireEvent.press`, `fireEvent.changeText`) to simulate user interactions. ([RNTL fireEvent](https://callstack.github.io/react-native-testing-library/docs/api-events))
- **State Updates:** Wrap code that causes state updates (like `fireEvent` or asynchronous operations) in `act` from `@testing-library/react-native` to ensure React processes updates before assertions run. ([RNTL act](https://callstack.github.io/react-native-testing-library/docs/api#act))
- **Assertions:** Use `expect` with Jest matchers (including RNTL's built-in matchers like `toBeVisible()`, `toHaveTextContent()`) to verify the results.

**Example Test Snippet:**

```typescript
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import MyComponent from '../MyComponent'; // Component using useState

it('updates text on button press', () => {
  render(<MyComponent />);

  // Initial state assertion
  expect(screen.getByText('Initial Text')).toBeVisible();

  // Find button and simulate press (state update occurs)
  const button = screen.getByRole('button', { name: /update text/i });
  act(() => { // Wrap state update in act
    fireEvent.press(button);
  });

  // Assert final state
  expect(screen.getByText('Updated Text')).toBeVisible();
  expect(screen.queryByText('Initial Text')).toBeNull(); // Old text is gone
});
```

## Mocking

- **Modules/Hooks:** Use `jest.mock('module-path')` to replace modules or hooks with mock implementations (essential for native features, navigation, context, stores). See `jest.setup.js` and individual test files for examples.
- **Functions:** Use `jest.fn()` to create mock functions for callbacks (like `onPress`) to verify if they were called.

## Conclusion

This testing setup provides a solid foundation for verifying the functionality and UI of the SpeedyMeds application. By leveraging Jest, `jest-expo`, and React Native Testing Library, we can write effective, maintainable tests that focus on user interactions and application behavior. Remember to consult the project's `jest.setup.js` and existing `__tests__` directories for practical examples within this codebase.

---

**References:**

- [Expo Unit Testing Docs](https://docs.expo.dev/develop/unit-testing/)
- [React Native Testing Library Docs](https://callstack.github.io/react-native-testing-library/docs/getting-started)
- [Jest Docs](https://jestjs.io/docs/getting-started)
