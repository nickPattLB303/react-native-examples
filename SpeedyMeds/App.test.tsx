import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from './App'; // Import the component to test

describe('<App />', () => {
  it('renders default message', () => {
    render(<App />);

    // Check if the default text from the Expo template is present
    // Adjust this text if you have already modified App.tsx
    const messageElement = screen.getByText(/Open up App.tsx to start working on your app!/i);
    expect(messageElement).toBeVisible();
  });

  // Add more tests here later
});