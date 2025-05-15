/**
 * Test Suite for HomeScreen Component (Placeholder)
 *
 * @file This file contains tests for the HomeScreen placeholder component.
 * @module screens/__tests__/HomeScreen.test
 *
 * @purpose To verify that the HomeScreen placeholder renders correctly
 * and displays its name.
 *
 * @dependencies
 * - React: For component rendering.
 * - @testing-library/react-native: For rendering (`render`), querying (`screen`).
 * - Internal:
 *   - `../../test-utils/renderWithProviders`: Custom render function including theme providers.
 *   - `../HomeScreen`: The component being tested.
 *
 * @see {@link ../HomeScreen.tsx | HomeScreen Component}
 * @see {@link ../../test-utils/renderWithProviders.tsx | Custom Render Function}
 */

import React from "react";
import { screen } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render
import HomeScreen from "../HomeScreen";

// Mock navigation props
const mockRoute = { key: "HomeScreenKey", name: "Home" as const };
const mockProps = {
  // navigation: { navigate: jest.fn() }, // Mock if navigation tested
  route: mockRoute,
};

/**
 * Test suite for the HomeScreen placeholder component.
 */
describe("HomeScreen (Placeholder)", () => {
  /**
   * Test case: Renders the placeholder text correctly.
   */
  it("renders placeholder text", () => {
    // Arrange
    render(<HomeScreen {...(mockProps as any)} />);

    // Assert
    expect(screen.getByText("Home Screen Placeholder")).toBeVisible();
  });

  // No need to test loading, error, or data states as the placeholder
  // component does not handle these.
});
