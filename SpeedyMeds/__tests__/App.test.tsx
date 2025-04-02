import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import App from "../App"; // Import the main App component

// Mock AsyncStorage if needed for theme persistence later
// jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

describe("<App />", () => {
  it("renders the initial Home screen", async () => {
    render(<App />);

    // Wait for the HomeScreen title to appear
    // The exact text might depend on how HomeScreen renders its title
    // Using findByText which handles asynchronous rendering
    const homeScreenTitle = await screen.findByText(
      /Home Screen \(Dashboard\)/i,
    );

    expect(homeScreenTitle).toBeVisible();
  });

  // Add more tests here later, potentially testing theme switching
});
