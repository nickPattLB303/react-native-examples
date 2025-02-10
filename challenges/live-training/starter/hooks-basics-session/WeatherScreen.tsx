import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// TODO: Implement useState hook
// Expected Behavior: Track temperature and loading state
// Native Equivalent: Similar to UIKit @State or Android ViewModel state
// Hint: You'll need two state variables

// TODO: Implement useEffect hook
// Expected Behavior: Fetch weather data when component mounts
// Native Equivalent: Similar to viewDidLoad (iOS) or onCreate (Android)
// Hint: Use an empty dependency array for mount-only effect

export const WeatherScreen: React.FC = () => {
  // Mock weather data
  const fetchWeather = async () => {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * 30) + 10); // Random temp between 10-40°C
      }, 1000);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      {/* TODO: Add loading state display */}
      {/* TODO: Add temperature display */}
      {/* TODO: Add refresh button */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 48,
    marginVertical: 20,
  },
  loading: {
    fontSize: 18,
    color: '#666',
  },
});
