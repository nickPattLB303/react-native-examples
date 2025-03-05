/**
 * @fileoverview Header component for the Health Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
}

// BUG: This component re-renders unnecessarily
const Header: React.FC<HeaderProps> = ({ title }) => {
  // BUG: Unnecessary state in a simple component
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  // BUG: Unnecessary effect that updates state frequently
  useEffect(() => {
    // BUG: This interval causes frequent re-renders
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    // BUG: Missing cleanup function
  }, []);
  
  // BUG: Creating new functions on every render
  const formatTitle = () => {
    return title.toUpperCase();
  };
  
  // BUG: Unnecessary complex calculation
  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
      greeting = 'Good Morning';
    } else if (hour < 18) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }
    
    return greeting;
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{formatTitle()}</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{getGreeting()} | {currentTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#4a6da7',
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitleContainer: {
    marginTop: 5,
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
  },
});

export default Header; 