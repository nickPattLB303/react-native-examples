## Section 8: Testing Strategies

This section provides an introduction to testing strategies in React Native. Writing tests is a crucial part of software development that helps ensure your application's quality, reliability, and maintainability. We will focus on unit testing with Jest and component testing with React Native Testing Library.

### Conceptual Content

**Why Test?**

Testing your code offers numerous benefits:

- **Bug Prevention:** Catch bugs early in the development cycle before they reach users.
- **Confidence in Refactoring:** Allows you to refactor code and make changes with greater confidence, knowing that tests will catch regressions.
- **Documentation:** Tests serve as a form of documentation, illustrating how components and functions are intended to be used.
- **Improved Design:** Thinking about how to test your code can often lead to better, more modular designs.
- **Collaboration:** Facilitates collaboration by providing a clear, verifiable standard for code contributions.

**Types of Tests in React Native:**

- **Unit Tests:** Focus on testing individual functions, modules, or small pieces of logic in isolation. They are typically fast to run.
  - _Example for SpeedyMeds:_ Testing a helper function that formats a prescription dosage string.
- **Component Tests:** Verify the behavior and rendering of individual React components. This includes checking if they render correctly given certain props, if they respond to user interactions (simulated), and if they manage their state appropriately.
  - _Example for SpeedyMeds:_ Testing if a `MedicationCard` component displays the correct medication name and dosage passed as props.
- **Integration Tests:** Test the interaction between multiple components or modules. They ensure that different parts of your application work together as expected.
  - _Example for SpeedyMeds:_ Testing if adding a medication to a list correctly updates the summary view.
- **End-to-End (E2E) Tests:** Simulate real user scenarios by testing the entire application flow from the user's perspective. These are typically slower and more complex to set up.
  - _Example for SpeedyMeds:_ Testing the entire flow of a user logging in, searching for a medication, and adding it to their reminder list.

This section will primarily focus on unit and component testing, which form the foundation of a solid testing strategy.

**Common Testing Tools:**

- **Jest:** A popular JavaScript testing framework developed by Facebook. It's often the default choice for React and React Native projects. Jest provides a test runner, assertion library, and mocking capabilities.
- **React Native Testing Library (RNTL):** Built on top of `react-test-renderer` and a similar philosophy to `DOM Testing Library`, RNTL encourages writing tests that interact with your components as a user would, focusing on accessibility and user-facing behavior rather than implementation details.

**Setting up Testing in an Expo Project**

Expo projects typically come with Jest pre-configured or can be easily set up.

1.  **Install dev dependencies:**

    ```bash
    npx expo install jest jest-expo @testing-library/react-native @types/jest
    # For TypeScript projects, also install type definitions
    # npm install --save-dev @types/jest (if not already included by jest-expo or similar)
    ```

2.  **Configure Jest (`jest.config.js` or in `package.json`):**
    Expo projects usually have a `jest.config.js` or Jest configuration within `package.json`. The `jest-expo` preset handles much of the React Native specific configuration.

    A typical `jest.config.js` might look like:

    ```javascript
    module.exports = {
      preset: "jest-expo",
      transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
      ],
      setupFilesAfterEnv: ["@testing-library/react-native/extend-expect"], // Optional: for RNTL custom matchers
    };
    ```

    The `transformIgnorePatterns` array is crucial for telling Jest to transform certain `node_modules` that are written in ES6+ syntax.

3.  **Add Test Script to `package.json`:**

    ```json
    // package.json
    {
      "scripts": {
        // ... other scripts
        "test": "jest"
      }
    }
    ```

    You can then run your tests using `npm test` or `yarn test`.

### Referential Content

**Writing Tests with Jest**

- **Test Files:** Jest typically looks for files with `.test.js`, `.spec.js`, `.test.tsx`, or `.spec.tsx` extensions, or files within a `__tests__` directory.
- **Core Jest Functions:**
  - `describe(name, fn)`: Creates a block that groups together several related tests.
  - `it(name, fn)` or `test(name, fn)`: Defines an individual test case.
  - `expect(value)`: Used to create an assertion. It's typically chained with matcher functions.
  - **Matchers:** Functions used with `expect` to assert values (e.g., `toBe()`, `toEqual()`, `toBeTruthy()`, `toContain()`, `toHaveBeenCalled()`).
- **Mocking:** Jest allows you to mock functions, modules, or timers to isolate tests and control dependencies.
  - `jest.fn()`: Creates a mock function whose calls can be tracked.
  - `jest.mock('./moduleName')`: Mocks an entire module.

**Writing Component Tests with React Native Testing Library (RNTL)**

React Native Testing Library helps you write tests that resemble how users interact with your components.

- **Philosophy:** Test your components from the user's perspective. Query for elements by their text content, accessibility labels, or test IDs rather than relying on internal component structure or state.
- **Core RNTL Functions:**
  - `render(Component)`: Renders a React component into a virtual tree.
  - **Queries:** Functions to find elements in the rendered output (e.g., `getByText`, `queryByText`, `findByText`, `getByTestId`, `getByRole`, `getByLabelText`).
  - `fireEvent`: Used to simulate user interactions (e.g., `fireEvent.press(button)`).
  - `waitFor`: Useful for asynchronous operations, waiting for an assertion to pass.
- **Custom Matchers:** RNTL extends Jest's `expect` with custom matchers like `toBeVisible()`, `toHaveTextContent()`, etc. (requires `setupFilesAfterEnv` configuration as shown above).

### Procedural Content

**Example 1: Unit Test for a Helper Function (Jest)**

Let's say SpeedyMeds has a helper function to format a medication schedule.

```typescript
// utils/medicationFormatter.ts
/**
 * Formats a medication schedule instruction string based on how many times per day
 * the medication should be taken.
 *
 * @param {number} timesPerDay - The number of times the medication is taken per day.
 * @param {string} dosageInstruction - The specific instruction for the dosage (e.g., "Take with food").
 * @returns {string} A formatted string describing the schedule.
 */
export function formatSchedule(
  timesPerDay: number,
  dosageInstruction: string
): string {
  if (timesPerDay <= 0) {
    return `Invalid schedule: ${dosageInstruction}`;
  }
  if (timesPerDay === 1) {
    return `Once daily: ${dosageInstruction}`;
  }
  return `${timesPerDay} times daily: ${dosageInstruction}`;
}
```

A unit test for this function might look like:

```typescript
// __tests__/utils/medicationFormatter.test.ts
import { formatSchedule } from "../../utils/medicationFormatter";

describe("formatSchedule", () => {
  it("should format correctly for once daily", () => {
    expect(formatSchedule(1, "Take with food")).toBe(
      "Once daily: Take with food"
    );
  });

  it("should format correctly for multiple times daily", () => {
    expect(formatSchedule(3, "Take 8 hourly")).toBe(
      "3 times daily: Take 8 hourly"
    );
  });

  it("should handle zero times per day", () => {
    expect(formatSchedule(0, "Take as needed")).toBe(
      "Invalid schedule: Take as needed"
    );
  });

  it("should handle negative times per day", () => {
    expect(formatSchedule(-2, "Take with water")).toBe(
      "Invalid schedule: Take with water"
    );
  });
});
```

**Explanation of Example 1:**

- The test file imports the function to be tested (`formatSchedule`).
- `describe("formatSchedule", ...)` groups all tests related to the `formatSchedule` function, enhancing organization and readability of test outputs.
- Each `it(...)` block defines an individual test case, clearly describing the specific scenario it covers. This helps in quickly understanding the purpose of each test.
  - The first test (`"should format correctly for once daily"`) checks the standard output for a single daily dosage.
  - The second test (`"should format correctly for multiple times daily"`) verifies the output for medications taken more than once a day.
  - The third and fourth tests (`"should handle zero times per day"` and `"should handle negative times per day"`) are crucial edge case tests. They ensure the function behaves gracefully and provides an informative message when potentially invalid input (like 0 or negative repetitions) is provided, preventing unexpected errors or nonsensical schedule descriptions in the SpeedyMeds app.
- `expect(functionCall).toBe(expectedOutput)` is the core assertion. `expect` takes the actual value returned by `formatSchedule` and the `toBe` matcher checks for strict equality (===) against the `expectedOutput` string.
- These unit tests thoroughly validate the `formatSchedule` function by covering typical use cases and important boundary conditions, ensuring its reliability within the SpeedyMeds application logic.

**Example 2: Component Test for a Basic Button (RNTL)**

Consider a simple `CustomButton` component for SpeedyMeds.

```tsx
// components/CustomButton.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  testID?: string;
}

/**
 * @component CustomButton
 * @description A reusable button component for the SpeedyMeds application.
 * It supports a title, onPress handler, disabled state, and testID for testing.
 * @param {CustomButtonProps} props - The properties for the component.
 * @returns {React.ReactElement} The rendered CustomButton component.
 */
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      testID={testID || "custom-button"}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#03A9F4",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#BDBDBD" },
  text: { color: "white", fontWeight: "bold" },
  disabledText: { color: "#757575" },
});

export default CustomButton;
```

A component test for `CustomButton`:

```tsx
// __tests__/components/CustomButton.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomButton from "../../components/CustomButton";

/**
 * @interface CustomButtonProps
 * @description Defines the properties for the CustomButton component.
 * @property {string} title - The text to display on the button.
 * @property {function} onPress - The function to call when the button is pressed.
 * @property {boolean} [disabled] - Optional. If true, the button is disabled and onPress is not called.
 * @property {string} [testID] - Optional. A unique identifier for testing purposes.
 */

describe("<CustomButton />", () => {
  it("renders the button title correctly", () => {
    const buttonTitle = "Submit Prescription";
    const { getByText } = render(
      <CustomButton title={buttonTitle} onPress={() => {}} />
    );
    expect(getByText(buttonTitle)).toBeVisible();
  });

  it("calls onPress prop when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <CustomButton
        title="Tap Me"
        onPress={mockOnPress}
        testID="my-tap-button"
      />
    );

    fireEvent.press(getByTestId("my-tap-button"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("disables the button when disabled prop is true", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <CustomButton
        title="Disabled Button"
        onPress={mockOnPress}
        disabled={true}
        testID="disabled-btn"
      />
    );
    const button = getByTestId("disabled-btn");

    // Check if TouchableOpacity is disabled
    expect(button.props.accessibilityState.disabled).toBe(true);

    // Attempt to press and verify mockOnPress is not called
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("applies disabled styles when disabled", () => {
    const { getByTestId, getByText } = render(
      <CustomButton
        title="Styled Disabled"
        onPress={() => {}}
        disabled={true}
        testID="styled-disabled-btn"
      />
    );
    const button = getByTestId("styled-disabled-btn");
    const text = getByText("Styled Disabled");

    // Note: Direct style checking can be brittle.
    // It's often better to test behavior or accessibility states.
    // However, for demonstration, if styles are simple and critical:
    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: "#BDBDBD" }),
      ])
    );
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "#757575" })])
    );
  });
});
```

**Explanation of Example 2:**

This set of tests for the `CustomButton` component demonstrates how to use React Native Testing Library (RNTL) to verify component behavior from a user's perspective. The goal is to ensure the SpeedyMeds `CustomButton` is accessible, interactive, and visually appropriate in different states.

1.  **`renders the button title correctly`**: This is a basic smoke test. We `render` the `CustomButton` with a specific `title`. Then, using `getByText(buttonTitle)`, RNTL attempts to find an element in the rendered output that displays this title. `expect(...).toBeVisible()` asserts that such an element is found and is visible to the user. This confirms the button displays its intended text.

2.  **`calls onPress prop when pressed`**: This test verifies interactivity. We create a mock function `mockOnPress = jest.fn()`. This mock allows us to track if and how it's called. The `CustomButton` is rendered with this mock and a `testID` ("my-tap-button") for easy querying. `fireEvent.press(getByTestId("my-tap-button"))` simulates a user tapping the button. Finally, `expect(mockOnPress).toHaveBeenCalledTimes(1)` asserts that our mock function was called exactly once, confirming the `onPress` handler is correctly wired up.

3.  **`disables the button when disabled prop is true`**: This tests the `disabled` state. The button is rendered with `disabled={true}`. We then query for the button using its `testID`. The key assertion here is `expect(button.props.accessibilityState.disabled).toBe(true)`, which checks an important accessibility property indicating the button is indeed disabled. To further confirm, we `fireEvent.press(button)` and assert that `mockOnPress` (a new mock for this test) was `not.toHaveBeenCalled()`, ensuring a disabled button doesn't trigger its action.

4.  **`applies disabled styles when disabled`**: This test delves into visual confirmation, though RNTL generally encourages testing behavior over specific styles as styles can be brittle. Here, we render a disabled button. We then get the button and text elements. `expect(button.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ backgroundColor: "#BDBDBD" })]))` checks if the button's style array contains an object with the disabled background color. A similar check is done for the text color. This test case is included for demonstration but highlights that such style tests should be used judiciously, focusing on styles that are critical to communicating the disabled state visually if behavior/accessibility checks aren_t sufficient.

These tests collectively ensure that the `CustomButton` component not only renders correctly but also behaves as expected under different conditions and user interactions, contributing to a more robust UI for the SpeedyMeds application.

> [!TIP]
> Aim for tests that are resilient to minor implementation changes. Querying by text content visible to users or by `testID` (for elements without distinct text) is generally more robust than querying by component hierarchy or internal structure.

### Section Exercise

Practice writing a simple unit test for a utility function.

- **Exercise 17.3: Writing a Simple Unit Test** `**(https://codesandbox.io/--replace-this-with-actual-exercise-17.3-url--)**`
  (Complete this exercise using CodeSandbox, which is well-suited for testing standalone JavaScript/TypeScript utility functions.)

> 📚 **Official Documentation:**
>
> - [Jest Documentation](https://jestjs.io/docs/getting-started)
> - [React Native Testing Library Documentation](https://callstack.github.io/react-native-testing-library/)
> - [Expo: Unit Testing Guide](https://docs.expo.dev/develop/unit-testing/)
> - [React Native Docs: Testing](https://reactnative.dev/docs/testing-overview)

### Next Steps

Congratulations on completing the core content of Module 17! You've explored animations, gestures, SVGs, push notifications, offline storage, and testing strategies. These advanced features are essential for building polished, professional-grade React Native applications. The final step in this module is to apply some of these new skills in the Module Challenge.
