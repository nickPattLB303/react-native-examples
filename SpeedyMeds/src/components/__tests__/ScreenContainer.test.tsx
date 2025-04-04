import React from "react";
import { screen } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render
import { Text } from "react-native"; // Import Text for children
import ScreenContainer from "../ScreenContainer";
// Mock the theme provider if necessary, but styled-components might handle defaults.

describe("ScreenContainer", () => {
  it("renders its children correctly", () => {
    const childText = "Screen Content";
    render(
      <ScreenContainer>
        <Text>{childText}</Text>
      </ScreenContainer>,
    );

    // Check if the child text is rendered
    expect(screen.getByText(childText)).toBeVisible();
  });

  // Note: Testing specific styles (like padding, background color) applied by
  // styled-components can be brittle and is often skipped in favor of visual regression testing
  // or testing the component's behavior. However, if needed, you could use
  // `toHaveStyle` from `@testing-library/jest-native` after adding a testID.
});
