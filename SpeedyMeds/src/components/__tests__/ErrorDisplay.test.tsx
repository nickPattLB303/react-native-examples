import React from "react";
import { screen, fireEvent } from "@testing-library/react-native";
import { render } from "../../test-utils/renderWithProviders"; // Use custom render
import ErrorDisplay from "../ErrorDisplay";

describe("ErrorDisplay", () => {
  const mockRetryAction = jest.fn();

  beforeEach(() => {
    // Reset mock before each test
    mockRetryAction.mockClear();
  });

  it("renders nothing when error prop is null", () => {
    render(<ErrorDisplay error={null} />);
    // Check that known elements are not present
    // Or check that known elements are not present
    expect(screen.queryByText(/error/i)).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders correctly with a string error message and no retry button", () => {
    const errorMessage = "Network request failed";
    render(<ErrorDisplay error={errorMessage} />);

    expect(screen.getByText("Error")).toBeVisible(); // Generic title
    expect(screen.getByText(errorMessage)).toBeVisible();
    expect(screen.queryByRole("button", { name: /retry/i })).toBeNull();
  });

  it("renders correctly with an Error object message and no retry button", () => {
    const errorMessage = "Something went wrong!";
    const errorObject = new Error(errorMessage);
    render(<ErrorDisplay error={errorObject} />);

    expect(screen.getByText("An Error Occurred")).toBeVisible(); // Title for Error objects
    expect(screen.getByText(errorMessage)).toBeVisible();
    expect(screen.queryByRole("button", { name: /retry/i })).toBeNull();
  });

  it("renders correctly with an error message and a retry button", () => {
    const errorMessage = "Failed to load data";
    render(<ErrorDisplay error={errorMessage} retryAction={mockRetryAction} />);

    expect(screen.getByText("Error")).toBeVisible();
    expect(screen.getByText(errorMessage)).toBeVisible();
    expect(screen.getByRole("button", { name: /retry/i })).toBeVisible();
  });

  it("calls retryAction when the retry button is pressed", () => {
    const errorMessage = "Connection timed out";
    render(<ErrorDisplay error={errorMessage} retryAction={mockRetryAction} />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    fireEvent.press(retryButton);

    expect(mockRetryAction).toHaveBeenCalledTimes(1);
  });
});
