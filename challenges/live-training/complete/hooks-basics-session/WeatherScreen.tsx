import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const WeatherScreen: React.FC = () => {
  // State hooks for temperature and loading state
  const [temperature, setTemperature] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock weather data
  const fetchWeather = async () => {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * 30) + 10); // Random temp between 10-40°C
      }, 1000);
    });
  };

  // Effect hook for initial data fetch
  useEffect(() => {
    loadWeather();
  }, []); // Empty dependency array means run once on mount

  // Function to load weather data
  const loadWeather = async () => {
    setIsLoading(true);
    try {
      const temp = await fetchWeather();
      setTemperature(temp);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      {isLoading ? (
        <Text style={styles.loading}>Loading weather data...</Text>
      ) : temperature !== null ? (
        <Text style={styles.temperature}>{temperature}°C</Text>
      ) : (
        <Text style={styles.loading}>No data available</Text>
      )}
      <Button 
        title="Refresh Weather" 
        onPress={loadWeather}
        disabled={isLoading}
      />
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
