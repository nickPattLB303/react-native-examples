# Testing Configuration (Jest & React Native Testing Library)

This document outlines the setup for unit and component testing in the SpeedyMeds project using Jest and React Native Testing Library (RNTL), following the standard practices recommended by Expo. Writing tests is essential for ensuring code correctness, preventing regressions, and facilitating refactoring.

## Goals

- **Verify Component Rendering:** Ensure UI components render correctly based on props.
- **Test Component Interaction:** Simulate user interactions (presses, text input) and verify outcomes.
- **Test Logic:** Unit test utility functions, custom hooks, and state management logic.
- **Promote Testable Code:** Encourage writing code that is easier to test in isolation.

## Tools & Packages

The primary tools used are based on the standard Expo testing setup:

- **Jest:** A JavaScript testing framework. Expo projects created with default templates include a Jest setup. ([Official Docs](https://jestjs.io/))
- **`jest-expo`:** A Jest preset included by default in Expo projects. It configures Jest to work correctly with the Expo and React Native environment, mocking native modules and handling transpilation. ([Expo Docs Reference](https://docs.expo.dev/develop/unit-testing/#installation-and-configuration))
- **React Native Testing Library (`@testing-library/react-native`):** The recommended library for testing React Native components in a user-centric way. ([Official Docs](https://callstack.github.io/react-native-testing-library/))
- **`@testing-library/jest-native`**: Provides useful custom Jest matchers specific to React Native (e.g., `toBeVisible()`, `toHaveStyle()`). ([GitHub Repo](https://github.com/testing-library/jest-native))
- **`@types/jest`** (Optional): Provides TypeScript types for Jest. Install if using TypeScript.
- **`react-test-renderer`** (Deprecated): Previously common, but now deprecated by React and **should be uninstalled** if present in favor of RNTL. ([Expo Docs Note](https://docs.expo.dev/develop/unit-testing/#install-react-native-testing-library))

## Verification & Setup Steps

### 1. Verify/Ensure Base Jest Setup (`jest-expo`)

Expo's default template (`npx create-expo-app`) typically includes the necessary Jest setup:

- A `jest.config.js` file (or Jest configuration within `package.json`). The key part is `"preset": "jest-expo"`.
- Necessary dev dependencies (`jest`, `jest-expo`).
- If using TypeScript, `@types/jest` might be included or can be added.

If starting from a non-standard template or needing to verify:

```bash
# Install base dependencies if missing (use --dev for Windows)
npx expo install jest-expo jest @types/jest --dev
```

Ensure your `package.json` includes the Jest preset:

```json
// package.json
{
  // ... other config
  "jest": {
    "preset": "jest-expo"
    // Add other Jest config overrides here if needed
  }
}
```

### 2. Install Testing Library Packages

Install RNTL and the Jest Native matchers:

```bash
# Use "--" --save-dev on Windows if needed
npx expo install @testing-library/react-native @testing-library/jest-native --dev
```

**(Optional but Recommended): Uninstall `react-test-renderer` if it exists:**

```bash
npm uninstall react-test-renderer @types/react-test-renderer --save-dev
# or
yarn remove react-test-renderer @types/react-test-renderer --dev
```

### 3. Configure Jest for RNTL Matchers (`jest-native`)

To use the helpful matchers from `@testing-library/jest-native` (like `toBeVisible`), we need to tell Jest to load them before tests run. This is typically done via a setup file.

- **Create Setup File:** Create a file, e.g., `jest.setup.js` (or `.ts`) at the root of the `SpeedyMeds` project.

  ```javascript
  // Planned jest.setup.js
  // Import Jest Native matchers
  import "@testing-library/jest-native/extend-expect";

  // Add any other global setup items here if needed later
  // e.g., mocking native modules, setting up mocks for libraries like react-native-gesture-handler
  ```

- **Update Jest Config:** Modify `jest.config.js` (or wherever Jest is configured) to point to this setup file using the `setupFilesAfterEnv` option.
  ```javascript
  // Example addition to jest.config.js
  module.exports = {
    // ... other Jest config (likely preset: 'jest-expo')
    setupFilesAfterEnv: ["./jest.setup.js"], // Or .ts if using TypeScript
  };
  ```

### 4. Update Test Script

Ensure the test script in `package.json` uses a modern Jest command, like `jest --watchAll` for interactive testing:

```json
// package.json
"scripts": {
  // ... existing scripts
  "test": "jest --watchAll"
},
```

You can add other scripts for different testing flows (e.g., coverage, CI) as needed. See [Jest CLI Options](https://jestjs.io/docs/cli).

## Writing Tests

- Place test files in a `__tests__` directory, either at the root or alongside the code being tested (e.g., `src/components/__tests__/Button.test.tsx`).
- Use the `.test.ts` or `.test.tsx` file extension.
- Import necessary functions from `@testing-library/react-native` (`render`, `fireEvent`, `screen`, etc.).
- Write tests focusing on user interaction and observable output, querying the component tree in ways similar to how a user would interact with it.

- **Example Conceptual Snippet:**

  ```typescript
  import React from 'react';
  import { render, screen, fireEvent } from '@testing-library/react-native';
  import MyButton from '../MyButton'; // Example component

  it('calls onPress when clicked', () => {
    const mockOnPress = jest.fn();
    render(<MyButton title="Submit" onPress={mockOnPress} />);

    // Find the button by its text
    const buttonElement = screen.getByText('Submit');

    // Simulate a press event
    fireEvent.press(buttonElement);

    // Assert that the mock function was called
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
  ```

## Conclusion

This setup aligns the SpeedyMeds project with the standard Expo testing configuration using Jest, `jest-expo`, and React Native Testing Library. Remember that the `jest-expo` preset automatically handles much of the necessary configuration and mocking for the React Native environment, simplifying the setup process. This configuration provides a robust and user-centric approach to testing React Native components and logic.

_(Primary Reference: [Expo Unit Testing Docs](https://docs.expo.dev/develop/unit-testing/))_
_(RNTL Reference: [React Native Testing Library Docs](https://callstack.github.io/react-native-testing-library/docs/getting-started))_
_(Jest Native Matchers: [jest-native GitHub](https://github.com/testing-library/jest-native))_
