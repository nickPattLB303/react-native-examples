import React from "react";
import { screen } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render
import LoadingIndicator from "../LoadingIndicator";
// Mock the theme provider or useTheme hook if necessary,
// but Paper components often handle missing providers gracefully in tests.
// For simplicity, we'll assume default behavior is okay for now.

describe("LoadingIndicator", () => {
  it("renders the activity indicator and default message", () => {
    render(<LoadingIndicator />);

    // Check if the default message is displayed
    // Note: ActivityIndicator itself might be hard to query directly without testID
    expect(screen.getByText("Loading...")).toBeVisible();
  });

  it("renders the activity indicator and a custom message", () => {
    const customMessage = "Fetching data...";
    render(<LoadingIndicator message={customMessage} />);

    // Check if the custom message is displayed
    expect(screen.getByText(customMessage)).toBeVisible();
  });

  it("renders only the activity indicator when message is an empty string", () => {
    render(<LoadingIndicator message="" />);

    // Check that no message text is rendered (queryByText returns null if not found)
    expect(screen.queryByText(/./)).toBeNull(); // Check for any text content

    // We could add a testID to ActivityIndicator in the component if we needed to assert its presence explicitly
    // e.g., expect(screen.getByTestId('loading-indicator-activity')).toBeVisible();
  });
});
