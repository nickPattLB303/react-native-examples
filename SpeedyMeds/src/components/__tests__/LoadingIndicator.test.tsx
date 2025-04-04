import React from "react";
import { screen, act } from "@testing-library/react-native"; // Import act
import { render } from "../../test-utils/renderWithProviders"; // Use custom render
import LoadingIndicator from "../LoadingIndicator";
// Mock the theme provider or useTheme hook if necessary,
// but Paper components often handle missing providers gracefully in tests.
// For simplicity, we'll assume default behavior is okay for now.

describe("LoadingIndicator", () => {
  it("renders the activity indicator and default message", async () => {
    // Make test async
    render(<LoadingIndicator />);

    // Use findByText to wait for potential async updates
    expect(await screen.findByText("Loading...")).toBeVisible();
  });

  it("renders the activity indicator and a custom message", async () => {
    // Make test async
    const customMessage = "Fetching data...";
    render(<LoadingIndicator message={customMessage} />);

    // Use findByText to wait for potential async updates
    expect(await screen.findByText(customMessage)).toBeVisible();
  });

  it("renders only the activity indicator when message is an empty string", async () => {
    // Make test async
    render(<LoadingIndicator message="" />);

    // Wait briefly to ensure no text appears asynchronously
    // queryByText is synchronous, but we wait to be sure nothing renders later
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Allow microtasks to flush
    });
    expect(screen.queryByText(/./)).toBeNull(); // Check for any text content

    // We could add a testID to ActivityIndicator in the component if we needed to assert its presence explicitly
    // e.g., expect(await screen.findByTestId('loading-indicator-activity')).toBeVisible();
  });
});
