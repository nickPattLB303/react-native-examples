# Testing Configuration (Jest & React Native Testing Library)

This document outlines the setup for unit and component testing in the SpeedyMeds project using Jest and React Native Testing Library (RNTL). Writing tests is essential for ensuring code correctness, preventing regressions, and facilitating refactoring.

## Goals

*   **Verify Component Rendering:** Ensure UI components render correctly based on props.
*   **Test Component Interaction:** Simulate user interactions (presses, text input) and verify outcomes.
*   **Test Logic:** Unit test utility functions, custom hooks, and state management logic.
*   **Promote Testable Code:** Encourage writing code that is easier to test in isolation.

## Tools & Packages

*   **Jest:** A JavaScript testing framework. Expo projects typically include a basic Jest setup. ([Official Docs](https://jestjs.io/))
*   **React Native Testing Library (`@testing-library/react-native`):** Provides utilities to test React Native components in a user-centric way, focusing on how users interact with the UI rather than implementation details. ([Official Docs](https://callstack.github.io/react-native-testing-library/))
*   **`@testing-library/jest-native`**: Provides custom Jest matchers for React Native (e.g., `toBeVisible()`, `toHaveStyle()`). ([GitHub Repo](https://github.com/testing-library/jest-native))
*   **`ts-jest`** (Implicit): Usually included via Expo's Jest preset, allows Jest to work with TypeScript.
*   **`react-test-renderer`** (Implicit): Often used under the hood by RNTL for rendering components in tests.

## Verification & Setup Steps

### 1. Verify Existing Jest Setup

Expo's default template usually includes:
*   A `jest.config.js` file (or Jest configuration within `package.json`).
*   A basic test script in `package.json` (e.g., `"test": "jest"`).
*   Necessary Jest dependencies (`jest`, `jest-expo`, `ts-jest`, etc.).
We will verify these exist. The default `jest-expo` preset often handles much of the basic React Native environment setup for Jest.

### 2. Install Testing Library Packages

We need to add RNTL and the Jest Native matchers.

Command (to be run in Code mode):
```bash
npx expo install --save-dev @testing-library/react-native @testing-library/jest-native
```

### 3. Configure Jest for RNTL Matchers

To use the helpful matchers from `@testing-library/jest-native` (like `toBeVisible`), we need to tell Jest to load them before tests run. This is typically done via a setup file.

*   **Create Setup File:** Create a file, e.g., `jest.setup.js` (or `.ts`) at the root of the `SpeedyMeds` project.
    ```javascript
    // Planned jest.setup.js
    // Import Jest Native matchers
    import '@testing-library/jest-native/extend-expect';

    // Add any other global setup items here if needed later
    // e.g., mocking native modules, setting up mocks for libraries
    ```
*   **Update Jest Config:** Modify `jest.config.js` (or wherever Jest is configured) to point to this setup file using the `setupFilesAfterEnv` option.
    ```javascript
    // Example addition to jest.config.js
    module.exports = {
      // ... other Jest config (likely preset: 'jest-expo')
      setupFilesAfterEnv: ['./jest.setup.js'], // Or .ts if using TypeScript
    };
    ```

### 4. Add Test Script (if missing)

Ensure a test script exists in `package.json`:

```json
// Ensure this exists in "scripts" in package.json
"scripts": {
  // ... existing scripts
  "test": "jest"
},
```
*(Note: `npx expo run:test` might also be available and potentially preferable as it could incorporate Expo-specific test environment logic.)*

## Writing Tests

*   Place test files in a `__tests__` directory, either at the root or alongside the code being tested (e.g., `src/components/__tests__/Button.test.tsx`).
*   Use the `.test.ts` or `.test.tsx` file extension.
*   Import necessary functions from `@testing-library/react-native` (`render`, `fireEvent`, `screen`, etc.).
*   Write tests focusing on user interaction and observable output.

## Conclusion

This setup integrates Jest with React Native Testing Library, providing a powerful and user-centric approach to testing React Native components and logic. It encourages writing maintainable tests and building confidence in the application's correctness.

*(Reference: [React Native Testing Library Setup](https://callstack.github.io/react-native-testing-library/docs/getting-started))*