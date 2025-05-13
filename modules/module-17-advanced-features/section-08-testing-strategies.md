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

- The test file imports the function to be tested.
- `describe` groups tests for `formatSchedule`.
- Each `it` block defines a specific scenario (e.g., once daily, multiple times, invalid input).
- `expect` along with the `toBe` matcher asserts that the function's output matches the expected string for each scenario.

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

- The first test renders the button and uses `getByText` to assert that the title is displayed.
- The second test provides a `mockOnPress` function (created with `jest.fn()`). It then uses `fireEvent.press` to simulate a tap on the button (found by `getByTestId`) and asserts that `mockOnPress` was called.
- The third test checks if the button is correctly disabled by inspecting `accessibilityState.disabled` and ensuring `onPress` is not called.
- The fourth test demonstrates checking applied styles when disabled, though it notes that testing behavior over style is generally preferred.

> [!TIP]
> Aim for tests that are resilient to minor implementation changes. Querying by text content visible to users or by `testID` (for elements without distinct text) is generally more robust than querying by component hierarchy or internal structure.

### Section Exercise

Practice writing a simple unit test for a utility function.

- **Exercise 17.3: Writing a Simple Unit Test** `**(URL_to_CodeSandbox_Exercise_17.3)**` (Note: While Jest runs in Node, a CodeSandbox can be set up for simple JS function testing if an Expo Snack environment isn't ideal for just JS logic without UI.)

> 📚 **Official Documentation:**
>
> - [Jest Documentation](https://jestjs.io/docs/getting-started)
> - [React Native Testing Library Documentation](https://callstack.github.io/react-native-testing-library/)
> - [Expo: Unit Testing Guide](https://docs.expo.dev/develop/unit-testing/)
> - [React Native Docs: Testing](https://reactnative.dev/docs/testing-overview)

### Next Steps

Congratulations on completing the core content of Module 17! You've explored animations, gestures, SVGs, push notifications, offline storage, and testing strategies. These advanced features are essential for building polished, professional-grade React Native applications. The final step in this module is to apply some of these new skills in the Module Challenge.
